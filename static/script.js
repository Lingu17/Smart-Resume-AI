// Enhanced UI Interactions for Smart Resume AI

document.addEventListener('DOMContentLoaded', function() {
    // File input styling and filename display
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const uploadBtn = document.querySelector('.btn:not(.btn-secondary)');
    
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                fileNameDisplay.textContent = e.target.files[0].name;
                fileNameDisplay.style.color = '#00f5a0';
                uploadBtn.style.background = '#00c97b';
            } else {
                fileNameDisplay.textContent = 'No file selected';
                fileNameDisplay.style.color = '#94a3b8';
                uploadBtn.style.background = '';
            }
        });
    }

    // Form submission loading state
    const uploadForm = document.getElementById('uploadForm');
    const loader = document.getElementById('loader');
    if (uploadForm && loader) {
        uploadForm.addEventListener('submit', function() {
            loader.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';
        });
    }

    // Progress bar animations with stagger effect
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.dataset.target;
        }, index * 200);
    });

    // Skill tags hover animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0, 245, 160, 0.3)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Chat enhancements
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (chatInput && sendBtn) {
        // Enter to send
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Send button states
        chatInput.addEventListener('input', function() {
            sendBtn.disabled = this.value.trim() === '';
            sendBtn.style.opacity = this.value.trim() ? '1' : '0.5';
        });
    }

    // Global sendMessage function with enhanced UX
    window.sendMessage = async function() {
        const input = document.getElementById('chatInput');
        const chatBox = document.getElementById('chatBox');
        const text = input.value.trim();
        if (!text) return;

        input.disabled = true;
        input.placeholder = 'Sending...';

        // User message
        const userMsg = document.createElement('div');
        userMsg.className = 'message msg-user';
        userMsg.innerHTML = `<span>${text}</span>`;
        chatBox.appendChild(userMsg);

        // AI typing indicator
        const aiTyping = document.createElement('div');
        aiTyping.className = 'message msg-ai typing-indicator';
        aiTyping.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatBox.appendChild(aiTyping);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            
            if (!response.ok) throw new Error('Network error');
            
            const data = await response.json();
            
            // Replace typing with response
            aiTyping.classList.remove('typing-indicator');
            aiTyping.innerHTML = data.reply.replace(/\n/g, '<br>');
            aiTyping.style.color = '';
            
            // Auto-scroll
            chatBox.scrollTop = chatBox.scrollHeight;
            
        } catch (error) {
            aiTyping.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Sorry, I encountered an error. Please try again.';
            aiTyping.style.color = '#ff6b6b';
        } finally {
            input.disabled = false;
            input.value = '';
            input.placeholder = 'Ask anything about your career...';
            input.focus();
        }
    };

    // Feature highlights animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Add typing indicator CSS
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        color: var(--text-muted) !important;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: var(--primary);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
        0%, 60%, 100% { transform: scale(1); }
        30% { transform: scale(1.3); }
    }
    
    .msg-user span {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .feature-card {
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 245, 160, 0.15);
    }
`;
document.head.appendChild(style);

