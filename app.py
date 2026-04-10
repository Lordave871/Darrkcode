from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
import firebase_admin
from firebase_admin import credentials, auth
import pymysql
from config import Config

app = Flask(__name__)

# --- Firebase Initialization ---
# Ensure serviceAccountKey.json is in your root directory and added to .gitignore
if not firebase_admin._apps:
    try:
        cred = credentials.Certificate("config/firebase_key.json") 
        firebase_admin.initialize_app(cred)
    except Exception as e:
        print(f"Firebase Init Error: {e}")

app.config.from_object(Config)
app.secret_key = app.config.get("SECRET_KEY", "default_secret_key_123")
CORS(app) 

# --- Database Helper ---
def get_db_connection():
    """Establishes connection to Aiven MySQL with required SSL settings."""
    return pymysql.connect(
        host=app.config["DATABASE_HOST"],
        user=app.config["DATABASE_USER"],
        password=app.config["DATABASE_PASSWORD"],
        db=app.config["DATABASE_NAME"],
        port=app.config["DATABASE_PORT"],
        ssl={'ssl': {}},  # Mandatory for Aiven MySQL
        cursorclass=pymysql.cursors.DictCursor
    )

# --- Database Setup Route ---
@app.route('/init-db')
def initialize_database():
    connection = None
    try:
        connection = get_db_connection()
        with connection.cursor() as cur:
            create_users_table = """
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                password TEXT,
                active INT DEFAULT 0,
                streak INT DEFAULT 1,
                course TEXT
            )
            """
            cur.execute(create_users_table)
            connection.commit()
        return jsonify({"status": "success", "message": "Database ttables ready"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if connection: connection.close()

# --- Main Navigation Routes ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login_register')
def login_page():
    return render_template('login_register.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/privacy-policy')
def policy():
    return render_template('privacy-policy.html')

@app.route('/premium')
def premium():
    return render_template('premium.html')

@app.route('/skill')
def skill():
    return render_template('skill.html')

@app.route('/programmingl_language')
def language():
    return render_template('programmingl_language.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

# --- Authentication Logic ---

@app.route("/google-login", methods=["POST"])
def google_login():
    connection = None
    try:
        data = request.get_json()
        token = data.get("idToken")
        if not token:
            return jsonify({"error": "No ID token provided"}), 400

        decoded = auth.verify_id_token(token)
        email = decoded["email"]
        name = decoded.get("name", "User")

        connection = get_db_connection()
        with connection.cursor() as cur:
            cur.execute("SELECT id FROM user WHERE email = %s", (email,))
            user = cur.fetchone()

            if not user:
                cur.execute(
                    "INSERT INTO user (name, email, password, active, streak) VALUES (%s, %s, %s, %s, %s)",
                    (name, email, None, 1, 1)
                )
                connection.commit()
                cur.execute("SELECT id FROM user WHERE email = %s", (email,))
                user = cur.fetchone()

        session["user"] = email
        session["user_id"] = user["id"]
        return jsonify({"redirect": url_for("profile")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection: connection.close()

@app.route('/auth', methods=['POST'])
def authenticate():
    data = request.json
    auth_type = data.get('type')
    email = data.get('email')
    password = data.get('password')
    connection = get_db_connection()

    try:
        with connection.cursor() as cur:
            if auth_type == 'signup':
                full_name = data.get('fullName')
                cur.execute("SELECT id FROM user WHERE email = %s", (email,))
                if cur.fetchone():
                    return jsonify({"message": "User already exists"}), 400

                hashed_pw = generate_password_hash(password)
                cur.execute(
                    "INSERT INTO user (name, email, password, active, streak) VALUES (%s, %s, %s, %s, %s)",
                    (full_name, email, hashed_pw, 1, 1)
                )
                connection.commit()
                return jsonify({"status": "success", "message": "Account created!"}), 201

            elif auth_type == 'login':
                cur.execute("SELECT * FROM user WHERE email = %s", (email,))
                user = cur.fetchone()
                # Ensure user has a password (not a Google-only user)
                if user and user["password"] and check_password_hash(user["password"], password):
                    session["user"] = email
                    session["user_id"] = user["id"]
                    # Important: Frontend expects 'redirect' key
                    return jsonify({"redirect": url_for("profile")})
                return jsonify({"message": "Invalid email or password"}), 401
    finally:
        connection.close()

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# --- User Experience Routes ---

@app.route('/profile')
def profile():
    user_id = session.get("user_id")
    if not user_id:
        return redirect(url_for("login_page"))

    connection = get_db_connection()
    try:
        with connection.cursor() as cur:
            cur.execute("SELECT name, email, streak, course FROM user WHERE id = %s", (user_id,))
            user = cur.fetchone()
            if not user:
                return redirect(url_for("logout"))
            
            initial = user['name'][0].upper() if user['name'] else "U"
            return render_template("profile.html", name=user['name'], email=user['email'], 
                                   streak=user['streak'], course=user['course'], text=initial)
    finally:
        connection.close()

# --- Admin API ---

@app.route('/admin')
def admin_page():
    return render_template('admin.html')

@app.route('/admin/users')
def get_all_users():
    connection = get_db_connection()
    try:
        with connection.cursor() as cur:
            cur.execute("SELECT id, name, email, streak, course, active FROM user")
            users = cur.fetchall()
            return jsonify(users)
    finally:
        connection.close()

@app.route('/admin/delete-user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cur:
            cur.execute("DELETE FROM user WHERE id = %s", (user_id,))
            connection.commit()
            return jsonify({"status": "success", "message": "User deleted"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        connection.close()

# --- Learning Content Routes ---

@app.route('/learn/python')
def python(): return render_template('python.html')
@app.route('/learn/javascript')
def javascript(): return render_template('javascript.html')
@app.route('/learn/typescript')
def typescript(): return render_template('typescript.html')
@app.route('/learn/java')
def java(): return render_template('java.html')
@app.route('/learn/cpp')
def cpp(): return render_template('cpp.html')
@app.route('/learn/csharp')
def csharp(): return render_template('csharp.html')
@app.route('/learn/rust')
def rust(): return render_template('rust.html')
@app.route('/learn/go')
def go(): return render_template('go.html')
@app.route('/learn/kotlin')
def kotlin(): return render_template('kotlin.html')
@app.route('/learn/swift')
def swift(): return render_template('swift.html')
@app.route('/learn/php')
def php(): return render_template('php.html')
@app.route('/learn/ruby')
def ruby(): return render_template('ruby.html')

if __name__ == '__main__':
    # On Render, 'port' is usually managed by the environment
    app.run(debug=True)
