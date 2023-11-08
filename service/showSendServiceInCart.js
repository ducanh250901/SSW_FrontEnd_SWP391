// Lấy danh sách dịch vụ từ Local Storage
const cartDataService = JSON.parse(localStorage.getItem('cartDataService'));

if (cartDataService) {
    // Tạo bảng và dựng dữ liệu từ danh sách dịch vụ
    const table = document.getElementById('cart-table');
    cartDataService.forEach(function (serviceData) {
        const row = table.insertRow(table.rows.length);

        const fullNameCell = row.insertCell(0);
        const phoneNumberCell = row.insertCell(1);
        const emailCell = row.insertCell(2);
        const subjectCell = row.insertCell(3);
        const messageCell = row.insertCell(4);
        const deliveryOptionCell = row.insertCell(5);

        fullNameCell.innerHTML = serviceData.full_name;
        phoneNumberCell.innerHTML = serviceData.phone_number;
        emailCell.innerHTML = serviceData.email;
        subjectCell.innerHTML = serviceData.subject;
        messageCell.innerHTML = serviceData.message;
        deliveryOptionCell.innerHTML = serviceData.deliveryOption;
    });
}

