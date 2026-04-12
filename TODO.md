# Smart Resume AI - Render Deployment Fix
## TODO Steps (Completed: ~~strikethrough~~)

### 1. [x] Update requirements.txt
   - Update groq to 0.9.0+
   - Loosen version pins for compatibility

### 2. [x] Refactor resume_parser.py
   - Remove global client init
   - Make parse_resume accept client param

### 3. [x] Clean up app.py
   - Remove duplicate Flask/client init
   - Pass client to parse_resume
   - Fix PORT binding for Render

### 4. [x] Test locally
    - pip install -r requirements.txt
    - python app.py
    - Test upload/chat

### 5. [x] Deploy & verify on Render
    - Push to GitHub
    - Set GROQ_API_KEY env var
    - Auto-deploys successfully
