    // Data
        const tutors = [
            { name: "Dr. Ahmed Rahman", subject: "Mathematics", experience: "10 yrs", rating: 4.9, rate: 800, avatar: "🧮" },
            { name: "Prof. Fatima Khan", subject: "Physics", experience: "8 yrs", rating: 4.8, rate: 750, avatar: "⚛️" },
            { name: "Sadia Islam", subject: "English", experience: "6 yrs", rating: 4.7, rate: 600, avatar: "📖" },
            { name: "Rakib Hasan", subject: "Chemistry", experience: "7 yrs", rating: 4.9, rate: 700, avatar: "🧪" },
            { name: "Nusrat Jahan", subject: "Biology", experience: "5 yrs", rating: 4.6, rate: 650, avatar: "🧬" },
            { name: "Kamrul Islam", subject: "Computer Science", experience: "9 yrs", rating: 4.8, rate: 900, avatar: "💻" }
        ];

        const products = [
            { id: 1, title: "Mathematics Guide Book", price: 450, description: "Complete guide for SSC students", image: "📚" },
            { id: 2, title: "Physics Lab Kit", price: 1200, description: "Essential equipment for physics experiments", image: "🔬" },
            { id: 3, title: "English Grammar Workbook", price: 300, description: "Practice exercises with answer key", image: "📝" },
            { id: 4, title: "Chemistry Model Set", price: 800, description: "Molecular models for better understanding", image: "🧪" },
            { id: 5, title: "Scientific Calculator", price: 1500, description: "Advanced calculator for STEM students", image: "🧮" },
            { id: 6, title: "Online Course Access", price: 2000, description: "One year access to premium courses", image: "💻" }
        ];

        let cart = [];

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadTutors();
            loadProducts();
            updateCartCount();
            
            // Allow Enter key to send message in floating chat
            const floatingChatInput = document.getElementById('floatingChatInput');
            if (floatingChatInput) {
                floatingChatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendFloatingMessage();
                    }
                });
            }
        });

        // Tutor functions
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

        // Product functions
        function loadProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">৳${product.price}</div>
                        <div class="product-description">${product.description}</div>
                        <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Cart functions
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                });
            }
            
            updateCartCount();
            showCartNotification();
        }

        function updateCartCount() {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = count;
        }

        function showCartNotification() {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Item added to cart!';
            notification.style.position = 'fixed';
            notification.style.bottom = '100px';
            notification.style.right = '30px';
            notification.style.background = '#667eea';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '20px';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        }

        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.toggle('active');
            renderCartItems();
        }

        function closeCart() {
            document.getElementById('cartModal').classList.remove('active');
        }

        function renderCartItems() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
                cartTotal.textContent = 'Total: ৳0';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">৳${item.price} each</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-total">৳${itemTotal}</div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = `Total: ৳${total}`;
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                }
                
                updateCartCount();
                renderCartItems();
            }
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Order placed successfully! 🎉\n\nTotal: ৳${total}\n\nThank you for your purchase.`);
            
            cart = [];
            updateCartCount();
            closeCart();
        }

        // Chat functions
        function toggleChat() {
            const chatButton = document.getElementById('chatButton');
            const floatingChat = document.getElementById('floatingChat');
            
            chatButton.classList.toggle('active');
            floatingChat.classList.toggle('active');
        }

        function closeChat() {
            const chatButton = document.getElementById('chatButton');
            const floatingChat = document.getElementById('floatingChat');
            
            chatButton.classList.remove('active');
            floatingChat.classList.remove('active');
        }

        function sendFloatingMessage() {
            const input = document.getElementById('floatingChatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            const chatMessages = document.getElementById('floatingChatMessages');
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
            
            // Simulate a response after a short delay
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! How can we help?",
                    "That's a great question! Let me connect you with our support team.",
                    "We have many tutors available for that subject. Check out our listings!",
                    "Welcome to our community! Feel free to ask any questions."
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                const responseDiv = document.createElement('div');
                responseDiv.className = 'chat-message admin';
                responseDiv.innerHTML = `
                    <div class="message-sender">Tutor Sheba Team</div>
                    <div class="message-text">${randomResponse}</div>
                    <div class="message-time">Just now</div>
                `;
                
                chatMessages.appendChild(responseDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        // Event listeners
        document.getElementById('chatButton').addEventListener('click', toggleChat);
        
        document.getElementById('bookingModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        document.getElementById('cartModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeCart();
            }
        });