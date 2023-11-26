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
        cell6.innerHTML = `
  <div class="input-group mb-3" style="max-width: 120px;">
    <div class="input-group-prepend">
      <button class="btn btn-outline-primary js-btn-minus" onclick="updateQuantity(${index}, -1)" type="button">&minus;</button>
    </div>
    <input type="text" class="form-control text-center" value="${serviceData.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" id="quantity-${index}">
    <div class="input-group-append">
      <button class="btn btn-outline-primary js-btn-plus" onclick="updateQuantity(${index}, 1)" type="button">&plus;</button>
    </div>
  </div>`;
        cell7.textContent = serviceData.servicePrice * serviceData.quantity;
        cell8.innerHTML = `<button class="btn btn-primary btn-sm" 
  onclick="removeProduct(event, ${index})">X</button>`;
    })
    // hàm xóa sản phẩm khỏi giỏ hàng để truyền event
    function removeProduct(event, index) {
        cartDataService.splice(index, 1);
        localStorage.setItem('cartDataService', JSON.stringify(cartDataService));
        const row = event.target.parentNode.parentNode; // Xác định hàng cần xóa
        row.remove(); // Loại bỏ hàng khỏi bảng
    }
}

function updateQuantity(index, change) {
    const inputQuantity = document.getElementById(`quantity-${index}`);
    let newQuantity = parseInt(inputQuantity.value) + change;

    if (newQuantity < 1) {
        newQuantity = 1;
    }

    cartDataService[index].quantity = newQuantity;
    localStorage.setItem('cartDataService', JSON.stringify(cartDataService));

    // Cập nhật giá trị trong bảng
    const row = inputQuantity.closest('tr');
    row.cells[5].textContent = newQuantity;  // Cập nhật cell4 với giá trị mới
    row.cells[6].textContent = cartDataService[index].price * newQuantity;  // Cập nhật cell5 với giá trị mới
}



