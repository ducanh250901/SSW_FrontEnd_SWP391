
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn biểu mẫu gửi dữ liệu mặc định

    // Lấy dữ liệu từ biểu mẫu
    const formData = new FormData(document.getElementById("myForm"));
    const selectedRadio = document.querySelector('input[name="deliveryOption"]:checked');

    // Tạo đối tượng dịch vụ mới
    const serviceData = {
        full_name: formData.get("c_fname"),
        phone_number: formData.get("c_lname"),
        email: formData.get("c_email"),
        subject: formData.get("c_subject"),
        message: formData.get("c_message"),
        deliveryOption: selectedRadio ? selectedRadio.value : "",
    };

    // Lấy danh sách dịch vụ từ Local Storage hoặc tạo một mảng rỗng nếu chưa có
    let cartDataService = JSON.parse(localStorage.getItem('cartDataService')) || [];

    // Thêm dịch vụ mới vào danh sách
    cartDataService.push(serviceData);

    // Lưu danh sách dịch vụ vào Local Storage
    localStorage.setItem('cartDataService', JSON.stringify(cartDataService));

    Toastify({
        text: "Add to cart successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();


});
