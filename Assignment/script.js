// Home Logic:-

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
                
                // Close mobile menu on click
                const navbarToggler = document.querySelector(".navbar-toggler");
                const navbarCollapse = document.querySelector(".navbar-collapse");
                if (navbarToggler && navbarCollapse.classList.contains("show")) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Hero Button Smooth Scroll
    const heroBtn = document.querySelector(".hero-section .btn");
    if (heroBtn) {
        heroBtn.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("about").scrollIntoView({ behavior: "smooth" });
        });
    }

    // Prevent dropdown from closing when clicking inside it
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Testimonials Carousel Auto-play
    let carousel = new bootstrap.Carousel(document.querySelector('#testimonialCarousel'), {
        interval: 3000,
        wrap: true
    });

    // Contact Form Validation
    const contactForm = document.querySelector("footer form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let name = this.querySelector("input[type='text']").value.trim();
            let email = this.querySelector("input[type='email']").value.trim();
            let message = this.querySelector("textarea").value.trim();
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields before submitting.");
            } else if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
            } else {
                alert("Thank you for your message!");
                this.reset();
            }
        });
    }

    // Highlight Active Section in Navbar on Scroll
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                document.querySelector(".nav-link.active")?.classList.remove("active");
                document.querySelector(`.nav-link[href='#${section.id}']`)?.classList.add("active");
            }
        });
    });
});



// Portfolio Logic:-

document.addEventListener("DOMContentLoaded", function () {
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "block";
                    item.style.opacity = "0";
                    setTimeout(() => item.style.opacity = "1", 200);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 200);
                }
            });

            // Change active button style
            filterButtons.forEach(btn => btn.classList.remove("btn-primary"));
            this.classList.add("btn-primary");
        });
    });

    // Lightbox Feature
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    document.querySelectorAll(".lightbox-trigger").forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    closeLightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // Close lightbox on pressing Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
});



// Blog Logic:-

document.addEventListener("DOMContentLoaded", function () {
    // Read More Button Functionality
    function addReadMoreListeners() {
        const readMoreButtons = document.querySelectorAll(".read-more");
        readMoreButtons.forEach(button => {
            button.addEventListener("click", function () {
                const cardText = this.previousElementSibling;
                if (cardText.classList.contains("expanded")) {
                    cardText.classList.remove("expanded");
                    this.textContent = "Read More";
                } else {
                    cardText.classList.add("expanded");
                    this.textContent = "Read Less";
                }
            });
        });
    }
    addReadMoreListeners();

    // Load More Blog Posts Functionality
    const loadMoreButton = document.getElementById("loadMore");
    let postsLoaded = 0;
    loadMoreButton.addEventListener("click", function () {
        const blogPostsContainer = document.getElementById("blog-posts");
        
        // Simulated new blog posts (replace with actual data fetching if needed)
        const newPosts = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="https://static.vecteezy.com/system/resources/previews/000/304/787/original/vector-responsive-web-design.jpg" class="card-img-top" alt="Blog 4">
                    <div class="card-body">
                        <h5 class="card-title">The Importance of Responsive Design</h5>
                        <p class="card-text">Allows your website content to flow freely across all screen resolutions and sizes, and renders it to look great on all devices.
Makes it unnecessary to maintain different versions of your website for mobile and desktop and saves you time, resources and efforts.
Makes your site mobile-friendly, improves the way it looks on devices with both large and small screens, and increases the amount of time that visitors spend on your site.
Improves user experience by providing consistency across devices, easy navigation, and improved readability.
Can help increase conversion rates by making it easy for users to find what they’re looking for and complete their desired action.</p>
                        <button class="btn btn-primary read-more">Read More</button>
                    </div>
                </div>
            </div>
        `;
        
        blogPostsContainer.innerHTML += newPosts;
        postsLoaded++;
        
        addReadMoreListeners(); // Ensure new posts have event listeners

        if (postsLoaded >= 2) { // Example: Disable after 2 loads
            loadMoreButton.textContent = "No More Posts";
            loadMoreButton.disabled = true;
        }
    });

    // Dark Mode Toggle Functionality
    const darkModeButton = document.getElementById("darkModeBtn");
    darkModeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease";
        if (document.body.classList.contains("dark-mode")) {
            darkModeButton.textContent = "Light Mode";
        } else {
            darkModeButton.textContent = "Dark Mode";
        }
    });
});



// Contact Logic:-
document.addEventListener("DOMContentLoaded", function () {
    // Contact Form Validation and Submission
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        successMessage.classList.remove("d-none");
        contactForm.reset();
        setTimeout(() => {
            successMessage.classList.add("d-none");
        }, 3000);
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Live Chat Widget Functionality
    const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const closeChat = document.getElementById("close-chat");
    const sendChat = document.getElementById("send-chat");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.querySelector(".chat-body");

    chatToggle.addEventListener("click", function () {
        chatBox.classList.toggle("d-none");
    });

    closeChat.addEventListener("click", function () {
        chatBox.classList.add("d-none");
    });

    sendChat.addEventListener("click", function () {
        sendMessage();
    });

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== "") {
            const userMessage = document.createElement("p");
            userMessage.textContent = "You: " + message;
            chatBody.appendChild(userMessage);
            chatInput.value = "";
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
});
