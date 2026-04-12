# Smart Resume AI
# Created by Lingraj Malipatil

import pdfplumber
import docx
import json
import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)


def parse_resume(file_path):

    text = ""

    # Extract text from resume
    if file_path.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

    elif file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"

    # Limit input length for AI
    text = text.strip()[:8000]

    # Enhanced AI Prompt for Top 5 Matches + ATS Score + Improvement Suggestions
    prompt = f"""You are an expert ATS Resume Analyzer and Career Advisor.

Analyze this resume and provide:

1. Top 5 job role matches with ATS scores (95-60%)
2. Extracted skills 
3. Best primary role
4. ATS score (0-100) and actionable improvement suggestions (3-5 bullet points)

Return ONLY valid JSON in this EXACT format - no extra text:

{{
  "name": "Full Name",
  "email": "email@example.com",
  "skills": ["Python", "React", "AWS", "Leadership"],
  "best_job_role": "Senior Full Stack Developer",
  "ats_score": 87,
  "job_matches": [
    ["Senior Full Stack Developer", 92],
    ["Software Engineer", 88],
    ["DevOps Engineer", 79],
    ["Backend Developer", 74],
    ["Tech Lead", 68]
  ],
  "ai_feedback": "ATS Score: 87/100\\n\\nStrengths:\\n• Excellent technical skills with Python/React/AWS\\n• 5+ years experience matches senior roles\\n\\nImprovements for 95+:\\n• Add quantifiable achievements (e.g. 'Increased revenue 40%')\\n• Include ATS keywords from job descriptions\\n• Add certifications section\\n• Shorten to 1-2 pages\\n• Use standard fonts/headers"
}}

Resume content:
{text}

Respond with ONLY the JSON above."""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional ATS Resume Parser. Always respond with valid JSON only. Follow the exact JSON schema provided. Provide realistic top 5 job matches based on skills/experience. Give honest ATS score and specific, actionable improvement suggestions."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1500,
            response_format={"type": "json_object"}
        )
        result = json.loads(response.choices[0].message.content)
        
        # Ensure top 5 matches (pad if less)
        while len(result.get("job_matches", [])) < 5:
            result["job_matches"].append(["General Role", 50])
            
        return result
        
    except Exception as e:
        return {
            "name": "Analysis Error",
            "email": "",
            "skills": [],
            "best_job_role": "Unable to analyze",
            "ats_score": 0,
            "job_matches": [],
            "ai_feedback": f"Error: {str(e)}\n\nTry a different resume format or check API key."
        }
