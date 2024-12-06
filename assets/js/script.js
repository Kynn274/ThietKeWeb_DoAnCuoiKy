document.addEventListener('DOMContentLoaded', function() {
    // Xử lý nút "Xem tất cả sản phẩm"
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Thêm hiệu ứng fade out
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Chuyển trang sau khi hiệu ứng fade out hoàn thành
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 300);
        });
    }
});

// Thêm hiệu ứng fade in khi load trang
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
}); 