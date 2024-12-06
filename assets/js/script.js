$(document).ready(function() {
    // Xử lý nút "Xem tất cả sản phẩm"
    $('.view-all-btn').on('click', function(e) {
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

    // Xử lý đánh giá sao và form review
    const $stars = $('.star-rating .star');
    const $ratingInput = $('#rating');
    const $submitButton = $('#submitButton');
    const $reviewForm = $('#reviewForm');
    const $confirmationMessage = $('#confirmationMessage');

    // Ẩn message khi load trang
    $confirmationMessage.removeClass('show');

    $stars.on('click', function() {
        const rating = $(this).data('value');
        $ratingInput.val(rating);

        $stars.each(function() {
            const $star = $(this);
            $star.removeClass('active');
            if ($star.data('value') <= rating) {
                $star.addClass('active');
            }
        });

        $submitButton.prop('disabled', false);
    });

    $reviewForm.on('submit', function(e) {
        e.preventDefault();

        const productName = $('#product-name').val();
        const rating = $ratingInput.val();
        const review = $('#review').val();

        // Hiển thị message
        $confirmationMessage.addClass('show');
        
        // Reset form
        this.reset();
        $stars.removeClass('active');
        $submitButton.prop('disabled', true);

        // Ẩn message sau 3 giây
        setTimeout(() => {
            $confirmationMessage.removeClass('show');
        }, 3000);
    });

    // Khởi tạo carousel
    const reviewCarousel = new bootstrap.Carousel($('#reviewCarousel')[0], {
        interval: 5000,
        wrap: true
    });

    // Xử lý form liên hệ
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Hiển thị thông báo thành công
        const $confirmationMessage = $('#confirmationMessage');
        $confirmationMessage.text('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        $confirmationMessage.addClass('show');
        
        // Reset form
        this.reset();
        
        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            $confirmationMessage.removeClass('show');
        }, 3000);
    });

    // Xử lý chuyển đổi form đăng nhập/đăng ký
    window.toggleAuthForms = function() {
        $('#loginContainer, #registerContainer').toggle();
    };

    // Xử lý hiển thị form đăng nhập
    window.showLoginForm = function() {
        $('#loginContainer').show();
        $('#registerContainer').hide();
        $('#authModal').modal('show');
    };

    // Helper functions
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    // Xử lý đặt hàng
    $('.btn-outline-danger').on('click', function(e) {
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
});

// Thêm hiệu ứng fade in khi load trang
$(window).on('load', function() {
    $('body').addClass('loaded');
}); 