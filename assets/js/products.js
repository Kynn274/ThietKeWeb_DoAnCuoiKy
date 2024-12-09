$(document).ready(function() {
    // Thêm hiệu ứng fade in khi load trang
    $('body').addClass('loaded');

    // Xử lý lọc danh mục
    const $categoryButtons = $('.category-item');
    const $products = $('[data-category]');
    const $backButton = $('.back-btn');
    let previousCategory = 'all';

    $categoryButtons.not('.back-btn').on('click', function() {
        const category = $(this).data('category');
        
        // Lưu trạng thái trước khi thay đổi
        if (category !== 'all') {
            $backButton.addClass('show');
            previousCategory = $('.category-item.active').data('category');
        } else {
            $backButton.removeClass('show');
        }

        // Remove active class from all buttons
        $categoryButtons.removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');

        // Filter products with animation
        filterProducts(category);
    });

    // Xử lý nút quay lại
    $backButton.on('click', function() {
        // Quay lại trạng thái trước đó
        $(`[data-category="${previousCategory}"]`).trigger('click');
        $backButton.removeClass('show');
    });

    // Hàm lọc sản phẩm
    function filterProducts(category) {
        $products.each(function() {
            const $product = $(this);
            if (category === 'all' || $product.data('category') === category) {
                $product.css('display', 'block')
                       .css('animation', 'fadeIn 0.5s ease forwards');
            } else {
                $product.css('display', 'none');
            }
        });
    }

    // Xử lý nút yêu thích
    $('.action-btn:first-child').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
        const $icon = $(this).find('i');
        if ($(this).hasClass('active')) {
            $icon.removeClass('bi-heart').addClass('bi-heart-fill');
        } else {
            $icon.removeClass('bi-heart-fill').addClass('bi-heart');
        }
    });

    // Xử lý nút giỏ hàng
    $('.action-btn:nth-child(2)').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('Đã thêm vào giỏ hàng!', 'success');
    });

    // Xử lý nút xem chi tiết
    $('.action-btn:last-child').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('Chức năng xem chi tiết sản phẩm đang được phát triển!', 'warning');
    });

    // Xử lý đặt hàng
    $('.product-grid .btn-outline-danger').on('click', function(e) {
        e.preventDefault();
        
        // Lấy thông tin sản phẩm
        const $productCard = $(this).closest('.product-card');
        const productName = $productCard.find('.product-title').text();
        const productPrice = $productCard.find('.price').text();
        const productImage = $productCard.find('.product-image').attr('src');

        // Cập nhật thông tin sản phẩm vào modal
        $('#orderModal .product-name').text(productName);
        $('#orderModal .product-price').text(productPrice);
        $('#orderModal .product-thumbnail').attr('src', productImage);

        // Hiển thị modal
        $('#orderModal').modal('show');
    });

    // Xử lý form đặt hàng
    $('#orderForm').on('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        
        const receiverName = $('#receiverName').val();
        const receiverPhone = $('#receiverPhone').val();
        const receiverAddress = $('#receiverAddress').val();
        
        if (!receiverName) {
            $('#receiverName').addClass('is-invalid');
            isValid = false;
        } else {
            $('#receiverName').removeClass('is-invalid');
        }
        
        if (!validatePhone(receiverPhone)) {
            $('#receiverPhone').addClass('is-invalid');
            isValid = false;
        } else {
            $('#receiverPhone').removeClass('is-invalid');
        }
        
        if (!receiverAddress) {
            $('#receiverAddress').addClass('is-invalid');
            isValid = false;
        } else {
            $('#receiverAddress').removeClass('is-invalid');
        }
        
        if (!isValid) return;

        // Lấy thông tin đơn hàng
        const orderData = {
            productName: $('.product-name').text(),
            productPrice: $('.product-price').text(),
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            receiverAddress: receiverAddress,
            orderNote: $('#orderNote').val()
        };
        
        // TODO: Gửi request đặt hàng
        console.log('Order:', orderData);
        
        // Hiển thị thông báo thành công
        const $confirmationMessage = $('#confirmationMessage');
        $confirmationMessage.text('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        $confirmationMessage.addClass('show');
        
        // Đóng modal
        $('#orderModal').modal('hide');
        
        // Reset form
        this.reset();
        
        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            $confirmationMessage.removeClass('show');
        }, 3000);
    });

    // Xử lý nút đóng modal
    $('#orderModal .btn-close, #orderModal .btn-secondary').on('click', function() {
        $('#orderModal').modal('hide');
    });

    // Xử lý reset form khi đóng modal
    $('#orderModal').on('hidden.bs.modal', function () {
        $('#orderForm').trigger('reset');
        $('.is-invalid').removeClass('is-invalid');
    });

    // Khởi tạo biến đếm giỏ hàng
    let cartCount = 0;

    // Xử lý thêm vào giỏ hàng
    $('.product-grid .action-btn:nth-child(2), .product-grid .btn-outline-danger').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Tăng số lượng trong giỏ hàng
        cartCount++;
        
        // Cập nhật hiển thị số lượng
        $('.cart-count').text(cartCount);
        
        // Hiệu ứng cho nút giỏ hàng
        const $cartButton = $('#cartButton');
        $cartButton.addClass('animate__animated animate__rubberBand');
        setTimeout(() => {
            $cartButton.removeClass('animate__animated animate__rubberBand');
        }, 1000);
        
        // Hiển thị thông báo
        const $productCard = $(this).closest('.product-card');
        const productName = $productCard.find('h3').text();
        
        showNotification(`Đã thêm "${productName}" vào giỏ hàng!`, 'success');
    });

    // Xử lý click vào nút giỏ hàng
    $('#cartButton').on('click', function() {
        showNotification('Chức năng giỏ hàng đang được phát triển!', 'warning');
    });
});

// Thêm animation cho fadeIn
$('head').append(`
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
const $backToTopButton = $('#backToTop');

$(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
        $backToTopButton.addClass('show');
    } else {
        $backToTopButton.removeClass('show');
    }
});

$backToTopButton.on('click', function() {
    $('html, body').animate({
        scrollTop: 0
    }, 'smooth');
});

// Xử lý nút quay về trang chủ
$('.back-home-btn').on('click', function(e) {
    e.preventDefault();
    
    // Thêm hiệu ứng fade out
    $('body').css({
        'opacity': '0',
        'transition': 'opacity 0.3s ease'
    });
    
    // Chuyển trang sau khi hiệu ứng fade out hoàn thành
    setTimeout(() => {
        window.location.href = $(this).attr('href');
    }, 300);
});

function showNotification(message, type = 'success') {
    const toast = $('#notificationToast');
    
    // Đặt màu nền dựa trên loại thông báo
    if (type === 'success') {
        toast.css('background', 'rgba(40, 167, 69, 0.95)');
    } else if (type === 'warning') {
        toast.css('background', 'rgba(255, 193, 7, 0.95)');
    } else if (type === 'error') {
        toast.css('background', 'rgba(220, 53, 69, 0.95)');
    }
    
    // Cập nhật nội dung
    toast.find('.toast-body').text(message);
    
    // Reset animation
    toast.removeClass('show');
    void toast[0].offsetWidth; // Force reflow
    
    // Hiển thị toast với animation mới
    toast.addClass('show');
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        toast.removeClass('show');
    }, 3000);
} 

// Xử lý form đăng nhập và đăng ký
$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    // Xử lý đăng nhập
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    
    // Thêm validation
    if (!validateEmail(email)) {
        $('#loginEmail').addClass('is-invalid');
        return;
    }
    
    if (password.length < 6) {
        $('#loginPassword').addClass('is-invalid');
        return;
    }
    
    // TODO: Gửi request đăng nhập
    console.log('Login:', { email, password });
});

$('#registerForm').on('submit', function(e) {
    e.preventDefault();
    // Xử lý đăng ký
    const fullName = $('#registerFullName').val();
    const email = $('#registerEmail').val();
    const phone = $('#registerPhone').val();
    const password = $('#registerPassword').val();
    const confirmPassword = $('#registerConfirmPassword').val();
    
    // Validation
    let isValid = true;
    
    if (!fullName) {
        $('#registerFullName').addClass('is-invalid');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        $('#registerEmail').addClass('is-invalid');
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        $('#registerPhone').addClass('is-invalid');
        isValid = false;
    }
    
    if (password.length < 8) {
        $('#registerPassword').addClass('is-invalid');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        $('#registerConfirmPassword').addClass('is-invalid');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // TODO: Gửi request đăng ký
    console.log('Register:', { fullName, email, phone, password });
});
function showLoginForm() {
    const $modal = $('#authModal');
    $('#loginContainer').show();
    $('#registerContainer').hide();
    $modal.modal('show');
}

function toggleAuthForms() {
    const loginContainer = $('#loginContainer');
    const registerContainer = $('#registerContainer');
    if (loginContainer.css('display') === 'none') {
        loginContainer.css('display', 'block');
        registerContainer.css('display', 'none');
    } else {
        loginContainer.css('display', 'none');
        registerContainer.css('display', 'block');
    }
}