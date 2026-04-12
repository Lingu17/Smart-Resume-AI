from flask import Flask, render_template, request, jsonify

# Smart Resume AI
# Created by Lingraj Malipatil
import os
from groq import Groq
from werkzeug.utils import secure_filename
from resume_parser import parse_resume

app = Flask(__name__)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)


if not GROQ_API_KEY:
    print("Warning: GROQ_API_KEY not set. Chat will not work.")
client = Groq(api_key=GROQ_API_KEY)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html", result=None)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files.get("resume")
    if not file or file.filename == "":
        return render_template("index.html", result={"ai_feedback": "No file selected."})

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    
    data = parse_resume(filepath)
    return render_template("index.html", result=data)

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a concise AI career coach."},
                {"role": "user", "content": user_msg}
            ],
            temperature=0.1,
            max_tokens=500
        )
        return jsonify({"reply": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}. Make sure GROQ_API_KEY is set."})

if __name__ == "__main__":
    app.run(debug=True)
