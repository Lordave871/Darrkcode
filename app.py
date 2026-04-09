from flask import Flask, request, jsonify,render_template,redirect, url_for, flash,session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import os
import webbrowser
import firebase_admin
from firebase_admin import credentials, auth
import pymysql
from urllib.parse import quote_plus
from config import Config

# Import for MySQL
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = app.config["SECRET_KEY"]
CORS(app)  # This allows your HTML file to talk to this server

# Dummy database (In a real app, use SQLAlchemy or MongoDB)

# -------------------------------------------------------------

# Initialize MySQL connection
mysql = MySQL(app)

def get_db_connection():
    return pymysql.connect(
        host=app.config["DATABASE_HOST"],
        user=app.config["DATABASE_USER"],
        password=app.config["DATABASE_PASSWORD"],
        db=app.config["DATABASE_NAME"],
        port=app.config["DATABASE_PORT"],
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/init-db')
def initialize_database():
    """
    Utility route to create the 'games' and 'screenshots' tables and populate them.
    """
    try:
        cur = mysql.connection.cursor()
        
        create_game_table_query = """
        CREATE TABLE IF NOT EXISTS user (
            id INT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email TEXT ,
            password TEXT,
            active INT,
            dept INT,
            course TEXT,
            streak INT



        )
        """
        cur.execute(create_game_table_query)
            

        mysql.connection.commit()
        cur.close()
        
        return jsonify({"status": "success", "message": "Database has been created"})

    except Exception as e:
        print(f"Error initializing database: {e}")
        return jsonify({"status": "error", "message": f"Database initialization failed: {e}"}), 500

# --- Flask Routes ---
   
@app.route("/logout")
def logout():
    session.pop('user', None)
    return redirect(url_for("index"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login_register')
def login():
    return render_template('login_register.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/programmingl_language')
def language():
    return render_template('programmingl_language.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/privacy-policy')
def policy():
    return render_template('privacy-policy.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route("/google-login", methods=["POST"])
def google_login():
    connection = None
    try:
        data = request.get_json()
        if not data or "idToken" not in data:
            return jsonify({"error": "No ID Token provided"}), 400
            
        decoded = auth.verify_id_token(data.get("idToken"))
        email = decoded["email"]
        name = decoded.get("name", "User")

        connection = get_db_connection()
        with connection.cursor() as cur:
            cur.execute("SELECT id, name FROM users WHERE email = %s", (email,))
            user = cur.fetchone()

            if not user:
                cur.execute(
                    "INSERT INTO users (name, email, password, active,streak) VALUES (%s, %s, %s, %s,%s)",
                    (name, email, None, 0,1)
                )
                connection.commit()
                cur.execute("SELECT id, genre FROM users WHERE email = %s", (email,))
                user = cur.fetchone()

        session["user"] = email
        session["user_id"] = user["id"]

        # Check for genre to decide redirect

        return jsonify({"redirect": url_for("profile")})

    except Exception as e:
        print(f"CRITICAL LOGIN ERROR: {e}")
        return jsonify({"error": "Auth failed"}), 500
    finally:
        if connection:
            connection.close()

@app.route('/admin')
def admin():

    return render_template('admin.html')

@app.route('/skill')
def skill():
    return render_template('skill.html')




@app.route('/premium')
def premium():
    return render_template('premium.html')

@app.route('/profile')
def profile():
    email = session.get("user")
    user_id = session.get("user_id")
    
    if not email:
        return redirect(url_for("signin"))

    connection = get_db_connection()
    try:
        with connection.cursor() as cur:
            cur.execute("SELECT name, email, streak, course FROM users WHERE id = %s", (user_id,))
            user = cur.fetchone()

            if not user:
                return redirect(url_for("logout"))

            name = user["name"]
            course = user["course"]
            streak = user["streak"]


            recent_interest = user.get("current_interest")
            text = name[0].upper() if name else "U"

    finally:
        connection.close()

    return render_template(
        "profile.html",
        name=name,
        text=text,
        steak=streak,
        email=email,
        course=course,
        
    )

@app.route('/learn/python')
def python():
    return render_template('python.html')

@app.route('/learn/javascript')
def javascript():
    return render_template('javascript.html')

@app.route('/learn/typescript')
def typescript():
    return render_template('typescript.html')

@app.route('/learn/java')
def java():
    return render_template('java.html')

@app.route('/learn/cpp')
def cpp():
    return render_template('cpp.html')

@app.route('/learn/csharp')
def csharp():
    return render_template('csharp.html')

@app.route('/learn/rust')
def rust():
    return render_template('rust.html')

@app.route('/learn/go')
def go():
    return render_template('go.html')

@app.route('/learn/kotlin')
def kotlin():
    return render_template('kotlin.html')

@app.route('/learn/swift')
def swift():
    return render_template('swift.html')

@app.route('/learn/php')
def php():
    return render_template('php.html')

@app.route('/learn/ruby')
def ruby():
    return render_template('ruby.html')




@app.route('/auth', methods=['POST'])
def authenticate():
    data = request.json
    auth_type = data.get('type')
    email = data.get('email')
    password = data.get('password')

    if auth_type == 'signup':
        full_name = data.get('fullName')
        # Check if user already exists        
        # Save user
        connection = get_db_connection()
        try:
            with connection.cursor() as cur:
                cur.execute("SELECT id FROM users WHERE email = %s", (email,))
                if cur.fetchone():
                    flash("This email is already registered. Please login.", "warning")
                    return redirect(url_for("signin"))

                hashed_pw = generate_password_hash(password)
                cur.execute(
                    "INSERT INTO users (name, email, password,active,streak) VALUES (%s, %s, %s, %s,%s)",
                    (name, email, hashed_pw, 0,1)
                )
                connection.commit()

            flash("Account created successfully! You can now log in.", "success")
            return redirect(url_for("login"))

        except Exception as e:
            if connection:
                connection.rollback()
            print(f"Signup Error: {e}")
            flash("A system error occurred.", "error")
        finally:
            if connection:
                connection.close()
        print(f"New User Registered: {full_name} ({email})")
        return jsonify({"message": "Account created successfully!"}), 201

    elif auth_type == 'login':
        # Check credentials
        connection = get_db_connection()
    try:
        with connection.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cur.fetchone()

        if user and check_password_hash(user["password"], password):
            session["user"] = email
            session["user_id"] = user["id"]
            
            # Decide where to send them based on if they have a genre
            target_url = url_for("profile") 
            
            return jsonify({
                "status": "success", 
                "redirect": target_url,
                "user_email": user["email"],
                "user_name": user["name"]
            })
        else:
            return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    except Exception as e:
        print(f"Login Error: {e}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500
    finally:
        connection.close()



if __name__ == '__main__':
    app.run(debug=True, port=5000)