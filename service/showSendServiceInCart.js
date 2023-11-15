// Lấy danh sách dịch vụ từ Local Storage
const cartDataService = JSON.parse(localStorage.getItem('cartDataService'));
console.log('cart service after added: >>>', cartDataService);

if (cartDataService) {
    // Tạo bảng và dựng dữ liệu từ danh sách dịch vụ
    const cartServiceTable = document.getElementById('service-table');
    const tbody = cartServiceTable.getElementsByTagName('tbody')[0];
    cartDataService.forEach(function (serviceData, index) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);


        cell1.textContent = serviceData.serviceType;
        cell2.textContent = serviceData.fullName;
        cell3.textContent = serviceData.phoneNumber;
        cell4.textContent = serviceData.deliveryOption;
        cell5.textContent = serviceData.message;
        cell6.textContent = serviceData.quantity;
        cell7.textContent = serviceData.servicePrice * serviceData.quantity;
        cell8.innerHTML = `<button class="btn btn-primary btn-sm" 
  onclick="removeProduct(event, ${index})">X</button>`;
    })
    // hàm xóa sản phẩm khỏi giỏ hàng để truyền event
    function removeProduct(event, index) {
        cartDataService.splice(index, 1);
        localStorage.setItem('cartDataService', JSON.stringify(cart));
        const row = event.target.parentNode.parentNode; // Xác định hàng cần xóa
        row.remove(); // Loại bỏ hàng khỏi bảng
    }
}

