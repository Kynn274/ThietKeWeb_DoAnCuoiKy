$(document).ready(function() {
    // Xử lý hiển thị form đánh giá
    window.showReviewForm = function() {
        $('#reviewModal').modal('show');
    };

    // Xử lý submit form đánh giá
    $('#reviewForm').on('submit', function(e) {
        e.preventDefault();
        // Xử lý logic gửi đánh giá
        $('#reviewModal').modal('hide');
        // Hiển thị thông báo thành công
    });
}); 