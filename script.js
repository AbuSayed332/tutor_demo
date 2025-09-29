 
        const tutors = [
            { name: "Dr. Ahmed Rahman", subject: "Mathematics", experience: "10 yrs", rating: 4.9, rate: 800, avatar: "🧮" },
            { name: "Prof. Fatima Khan", subject: "Physics", experience: "8 yrs", rating: 4.8, rate: 750, avatar: "⚛️" },
            { name: "Sadia Islam", subject: "English", experience: "6 yrs", rating: 4.7, rate: 600, avatar: "📖" },
            { name: "Rakib Hasan", subject: "Chemistry", experience: "7 yrs", rating: 4.9, rate: 700, avatar: "🧪" },
            { name: "Nusrat Jahan", subject: "Biology", experience: "5 yrs", rating: 4.6, rate: 650, avatar: "🧬" },
            { name: "Kamrul Islam", subject: "Computer Science", experience: "9 yrs", rating: 4.8, rate: 900, avatar: "💻" }
        ];

        function loadTutors(tutorsToShow = tutors) {
            const grid = document.getElementById('tutorsGrid');
            grid.innerHTML = '';
            
            tutorsToShow.forEach(tutor => {
                const card = document.createElement('div');
                card.className = 'tutor-card';
                card.innerHTML = `
                    <div class="tutor-avatar">${tutor.avatar}</div>
                    <div class="tutor-name">${tutor.name}</div>
                    <div class="tutor-subject">${tutor.subject}</div>
                    <div class="tutor-info">
                        <div class="info-item">
                            <div class="info-label">Experience</div>
                            <div class="info-value">${tutor.experience}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Rating</div>
                            <div class="info-value rating">★ ${tutor.rating}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Rate</div>
                            <div class="info-value">৳${tutor.rate}/hr</div>
                        </div>
                    </div>
                    <button class="btn-book" onclick="bookTutor('${tutor.name}')">Book Session</button>
                `;
                grid.appendChild(card);
            });
        }

        function bookTutor(name) {
            document.getElementById('tutorName').value = name;
            document.getElementById('bookingModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('bookingModal').classList.remove('active');
        }

        function confirmBooking() {
            const studentName = document.getElementById('studentName').value;
            const studentEmail = document.getElementById('studentEmail').value;
            const tutorName = document.getElementById('tutorName').value;
            
            if (!studentName || !studentEmail) {
                alert('Please fill in all required fields!');
                return;
            }
            
            alert(`Booking confirmed! 🎉\n\nTutor: ${tutorName}\nStudent: ${studentName}\n\nYou will receive a confirmation email shortly.`);
            closeModal();
        }

        function searchTutors() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const filtered = tutors.filter(t => 
                t.name.toLowerCase().includes(query) || 
                t.subject.toLowerCase().includes(query)
            );
            loadTutors(filtered);
            document.getElementById('tutors').scrollIntoView({ behavior: 'smooth' });
        }

        function filterBySubject(subject) {
            const filtered = tutors.filter(t => t.subject === subject);
            loadTutors(filtered);
            document.getElementById('tutors').scrollIntoView({ behavior: 'smooth' });
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            
            const now = new Date();
            const timeStr = 'Just now';
            
            messageDiv.innerHTML = `
                <div class="message-sender">You</div>
                <div class="message-text">${message}</div>
                <div class="message-time">${timeStr}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            input.value = '';
        }

        function toggleChat() {
            const chatBoard = document.getElementById('chatBoard');
            chatBoard.classList.toggle('active');
        }

        // Allow Enter key to send message
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
        });

        // Load tutors on page load
        loadTutors();

        // Close modal when clicking outside
        document.getElementById('bookingModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
