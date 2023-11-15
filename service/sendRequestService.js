
document.addEventListener('DOMContentLoaded', function () {
    // Bắt sự kiện submit của form
    document.getElementById('sendRquest').addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn việc gửi form thông qua trình duyệt

        // Lấy giá trị từ các trường input
        var serviceType = document.getElementById('c_type').value;
        var servicePrice = document.getElementById('c_price').value;
        var fullName = document.getElementById('c_fname').value;
        var phoneNumber = document.getElementById('c_phone').value;
        var quantity = document.getElementById('c_quantiy').value;
        var message = document.getElementById('c_message').value;
        var deliveryOption;
        var deliveryOptions = document.getElementsByName('deliveryOption');
        for (var i = 0; i < deliveryOptions.length; i++) {
            if (deliveryOptions[i].checked) {
                deliveryOption = deliveryOptions[i].value;
                break;
            }
        }

        // Tạo một đối tượng chứa thông tin sản phẩm
        var serviceData = {
            serviceID: serviceID,
            serviceType: serviceType,
            servicePrice: servicePrice,
            fullName: fullName,
            phoneNumber: phoneNumber,
            quantity: quantity,
            message: message,
            deliveryOption: deliveryOption

        };

        console.log(serviceData);

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
});
