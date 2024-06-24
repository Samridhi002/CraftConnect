document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Profile picture upload
    const profileUpload = document.getElementById('profile-upload');
    const profileImage = document.getElementById('profile-image');

    profileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Tab navigation
    const navItems = document.querySelectorAll('.profile-nav a');
    const contentSections = document.querySelectorAll('.main-content > div');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Sample data (replace with actual data fetching in a real application)
    const recentOrders = [
        { id: '1234', product: 'Handmade Vase', date: '2024-06-20', status: 'Shipped', total: 45.99 },
        { id: '1235', product: 'Wooden Sculpture', date: '2024-06-19', status: 'Processing', total: 89.99 },
        { id: '1236', product: 'Knitted Scarf', date: '2024-06-18', status: 'Delivered', total: 29.99 }
    ];

    const topProducts = [
        { name: 'Ceramic Mug', sales: 50 },
        { name: 'Woven Basket', sales: 45 },
        { name: 'Painted Canvas', sales: 40 }
    ];

    const notifications = [
        { message: 'New order received', date: '2024-06-24' },
        { message: 'Product restocked', date: '2024-06-23' },
        { message: 'Review posted', date: '2024-06-22' }
    ];

    // Populate dashboard cards
    function populateDashboard() {
        const recentOrdersList = document.getElementById('recent-orders');
        const topProductsList = document.getElementById('top-products');
        const notificationsList = document.getElementById('notifications');

        recentOrders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order #${order.id} - ${order.product} (${order.date})`;
            recentOrdersList.appendChild(li);
        });

        topProducts.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.sales} sales`;
            topProductsList.appendChild(li);
        });

        notifications.forEach(notification => {
            const li = document.createElement('li');
            li.textContent = `${notification.message} (${notification.date})`;
            notificationsList.appendChild(li);
        });
    }

    populateDashboard();

    // Sales chart
    const salesChartCtx = document.getElementById('sales-chart').getContext('2d');
    new Chart(salesChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Earnings chart
    const earningsChartCtx = document.getElementById('earnings-chart').getContext('2d');
    new Chart(earningsChartCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Earnings',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Populate orders table
    function populateOrdersTable() {
        const orderTableBody = document.getElementById('order-table-body');
        recentOrders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.id}</td>
                <td>Customer Name</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>$${order.total.toFixed(2)}</td>
            `;
            orderTableBody.appendChild(tr);
        });
    }

    populateOrdersTable();

    // Add new product
    const addProductBtn = document.getElementById('add-product');
    const productGrid = document.getElementById('product-grid');

    addProductBtn.addEventListener('click', function() {
        const productName = prompt('Enter product name:');
        if (productName) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="/api/placeholder/200/200" alt="${productName}">
                <h3>${productName}</h3>
                <p>Price: $XX.XX</p>
                <button class="btn btn-primary">Edit</button>
            `;
            productGrid.appendChild(productCard);
        }
    });

    // Handle settings form submission
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(settingsForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Settings updated:', data);
        alert('Settings updated successfully!');
    });

    // Add hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize the dashboard as the default view
    document.querySelector('.profile-nav a[href="#dashboard"]').click();
});