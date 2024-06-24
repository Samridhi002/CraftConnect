// DOM Elements
const buyerViewBtn = document.getElementById('buyerViewBtn');
const sellerViewBtn = document.getElementById('sellerViewBtn');
const sellerView = document.getElementById('sellerView');
const toggleAddProductBtn = document.getElementById('toggleAddProductBtn');
const addProductForm = document.getElementById('addProductForm');
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// Sample product data (replace with actual data from your backend)
let products = [
    { id: 1, name: "Handmade Scarf", price: 29.99, category: "clothing", description: "Warm and stylish handmade scarf." },
    { id: 2, name: "Ceramic Vase", price: 49.99, category: "home-decor", description: "Beautiful hand-painted ceramic vase." },
    { id: 3, name: "Leather Wallet", price: 39.99, category: "accessories", description: "Durable handcrafted leather wallet." },
];

// View Toggle
buyerViewBtn.addEventListener('click', () => {
    buyerViewBtn.classList.add('active');
    sellerViewBtn.classList.remove('active');
    sellerView.classList.add('hidden');
    productGrid.classList.remove('hidden');
});

sellerViewBtn.addEventListener('click', () => {
    sellerViewBtn.classList.add('active');
    buyerViewBtn.classList.remove('active');
    sellerView.classList.remove('hidden');
    productGrid.classList.add('hidden');
});

// Toggle Add Product Form
toggleAddProductBtn.addEventListener('click', () => {
    addProductForm.classList.toggle('hidden');
    toggleAddProductBtn.textContent = addProductForm.classList.contains('hidden') ? 'Add New Product' : 'Cancel';
});

// Add Product Form Submission
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
    };
    products.push(newProduct);
    addProductForm.reset();
    addProductForm.classList.add('hidden');
    toggleAddProductBtn.textContent = 'Add New Product';
    renderProducts();
});

// Render Products
function renderProducts(filteredProducts = products) {
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="/api/placeholder/250/200" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);

        // Add animation to product cards
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            productCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Search and Filter
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const sortValue = sortFilter.value;

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (categoryValue === '' || product.category === categoryValue)
    );

    // Sort products
    filteredProducts.sort((a, b) => {
        if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
        if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
        if (sortValue === 'price-asc') return a.price - b.price;
        if (sortValue === 'price-desc') return b.price - a.price;
    });

    renderProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
sortFilter.addEventListener('change', filterProducts);

// Initialize
renderProducts();

// Animate navbar on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add to Cart Animation
productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        button.textContent = 'Added!';
        button.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 1500);
    }
});

// Initialize Feather Icons
feather.replace();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});