document.addEventListener('DOMContentLoaded', function() {
    // Thêm hiệu ứng fade in khi load trang
    document.body.classList.add('loaded');

    // Xử lý lọc danh mục
    const categoryButtons = document.querySelectorAll('.category-item');
    const products = document.querySelectorAll('[data-category]');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            // Filter products
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                    // Add animation
                    product.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Xử lý nút yêu thích
    const favoriteButtons = document.querySelectorAll('.action-btn:first-child');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
        });
    });

    // Xử lý nút giỏ hàng
    const cartButtons = document.querySelectorAll('.action-btn:nth-child(2)');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            alert('Đã thêm vào giỏ hàng!');
        });
    });

    // Xử lý nút xem chi tiết
    const viewButtons = document.querySelectorAll('.action-btn:last-child');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Thêm logic xem chi tiết ở đây
            alert('Xem chi tiết sản phẩm');
        });
    });
});

// Thêm animation cho fadeIn
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`);

// Xử lý nút Back to Top
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 