document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star-rating .star");
    const ratingInput = document.getElementById("rating");
    const submitButton = document.getElementById("submitButton");
    const reviewForm = document.getElementById("reviewForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    // Xử lý khi người dùng click vào sao
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            const rating = star.getAttribute("data-value");
            ratingInput.value = rating;

            // Đặt class 'active' cho các sao được chọn
            stars.forEach((s) => {
                s.classList.remove("active");
                if (s.getAttribute("data-value") <= rating) {
                    s.classList.add("active");
                }
            });

            // Kích hoạt nút gửi khi có xếp hạng
            if (rating > 0) {
                submitButton.disabled = false;
                submitButton.classList.add("enabled");
            }
        });
    });

    // Hiển thị thông báo xác nhận khi gửi form
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Lấy dữ liệu từ biểu mẫu
        const productName = document.getElementById("product-name").value;
        const rating = ratingInput.value;
        const review = document.getElementById("review").value;

        // Hiển thị thông báo cảm ơn
        confirmationMessage.textContent = `Cảm ơn bạn đã gửi đánh giá về sản phẩm "${productName}" với ${rating} sao! Chúng tôi rất trân trọng ý kiến của bạn.`;
        confirmationMessage.classList.remove("hidden");
        confirmationMessage.classList.add("visible");

        // Reset form sau khi hiển thị thông báo
        reviewForm.reset();
        stars.forEach((s) => s.classList.remove("active"));
        submitButton.disabled = true;
        submitButton.classList.remove("enabled");

        // Ẩn thông báo sau 5 giây
        setTimeout(() => {
            confirmationMessage.classList.remove("visible");
            confirmationMessage.classList.add("hidden");
        }, 5000);
    });
});
function toggleDescription(button) {
    var fullDesc = button.previousElementSibling; // Phần miêu tả đầy đủ (p.full-desc)
    var shortDesc = fullDesc.previousElementSibling; // Phần miêu tả ngắn gọn (p.short-desc)

    // Kiểm tra phần miêu tả đầy đủ có đang ẩn không
    if (fullDesc.style.display === "none") {
        fullDesc.style.display = "block"; // Hiển thị miêu tả đầy đủ
        shortDesc.style.display = "none"; // Ẩn miêu tả ngắn gọn
        button.innerText = "Thu gọn"; // Đổi nút thành "Thu gọn"
    } else {
        fullDesc.style.display = "none"; // Ẩn miêu tả đầy đủ
        shortDesc.style.display = "block"; // Hiển thị miêu tả ngắn gọn
        button.innerText = "Xem thêm"; // Đổi nút thành "Xem thêm"
    }
}
