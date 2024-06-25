document.addEventListener('DOMContentLoaded', () => {
    // Product slider
    const productSlider = document.getElementById('product-slider');
    const products = [
        { name: 'Handmade Scarf', price: 29.99, image: 'scarf.jpg' },
        { name: 'Pottery Vase', price: 49.99, image: 'vase.jpg' },
        { name: 'Wooden Cutting Board', price: 39.99, image: 'cutting-board.jpg' },
        { name: 'Knitted Blanket', price: 79.99, image: 'blanket.jpg' },
        { name: 'Handmade Soap Set', price: 19.99, image: 'soap.jpg' },
    ];

    products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="cta-button">Add to Cart</button>
        `;
        
        productSlider.appendChild(card);
    });

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                header.style.borderRadius = '4px';
            } else {
                content.style.display = 'block';
                header.style.borderRadius = '4px 4px 0 0';
            }
        });
    });

    // Updated Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the href attribute starts with '#'
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // For other links, allow default behavior (i.e., navigation to other pages)
        });
    });

    // Add animation to feature items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature-item').forEach(item => {
        observer.observe(item);
    });
});