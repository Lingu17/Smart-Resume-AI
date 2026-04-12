🚀 Smart Resume AI

Smart Resume AI is an AI-powered web application that analyzes resumes and provides intelligent feedback to help job seekers improve their chances of getting hired.

The system extracts resume content, evaluates skills, detects missing keywords, and generates improvement suggestions using AI.

🌟 Features
📄 Upload resumes in PDF or DOCX format
🤖 AI-powered resume analysis
🔍 Detect skill gaps and missing keywords
💡 Provide smart improvement suggestions
🎨 Clean and modern web interface
⚡ Built using Flask + AI API
🧠 How It Works

1️⃣ User uploads a resume
2️⃣ System extracts text from the document
3️⃣ AI analyzes the resume content
4️⃣ Suggestions and improvements are generated

🛠 Tech Stack
Frontend
HTML
CSS
JavaScript
Backend
Python
Flask
AI Integration
Groq API
Libraries
pdfplumber
python-docx
python-dotenv
📂 Project Structure
Smart-Resume-AI
│
├── app.py
├── resume_parser.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
├── uploads/
├── .gitignore
└── README.md
⚙️ Installation

Clone the repository

git clone https://github.com/Lingu17/Smart-Resume-AI.git

Navigate to the project directory

cd Smart-Resume-AI

Create virtual environment

python -m venv venv

Activate environment

Windows

venv\Scripts\activate

Install dependencies

pip install -r requirements.txt
🔑 Environment Variables

Create a .env file in the project root:

GROQ_API_KEY=your_api_key_here
▶️ Run the Application
python app.py

Open in browser

http://127.0.0.1:5000
📸 Demo

Upload a resume and receive AI-generated suggestions to improve the resume.

(You can add screenshots here later)

🚀 Future Improvements
ATS Resume Score
AI Interview Question Generator
Resume Keyword Optimization
Job Recommendation System
LinkedIn Profile Analyzer
👨‍💻 Author

Lingraj Malipatil

GitHub
https://github.com/Lingu17