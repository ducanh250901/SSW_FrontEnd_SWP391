
// Sự kiện khi nhấn nút "Pending Order"
const pendingOrderButton = document.querySelector('#pending-order-button');
const cartTable = document.querySelector('#cart-table');
const pendingOrderTable = document.querySelector('#pending-order-table');
const cartTableBody = cartTable.querySelector('tbody');
const pendingOrderTableBody = pendingOrderTable.querySelector('tbody');

pendingOrderButton.addEventListener('click', function () {
    // Tạo một hàng trống trong bảng trang Pending Order
    const newRow = document.createElement('tr');
    pendingOrderTableBody.appendChild(newRow);

    // Lấy tất cả các hàng trong bảng trang Cart
    const cartRows = cartTableBody.querySelectorAll('tr');

    // Duyệt qua từng hàng trong bảng trang Cart
    cartRows.forEach(function (cartRow) {
        // Sao chép toàn bộ nội dung của hàng trong trang Cart
        const clonedRow = cartRow.cloneNode(true);

        // Thêm hàng đã sao chép vào hàng trống trong trang Pending Order
        newRow.appendChild(clonedRow);
    });

    // Xóa toàn bộ nội dung trong bảng trang Cart
    cartTableBody.innerHTML = '';

    // Ẩn bảng trang Cart (nếu bạn muốn ẩn nó sau khi di chuyển)
    cartTable.style.display = 'none';

    // Hiển thị bảng trang Pending Order (nếu bạn muốn hiển thị sau khi di chuyển)
    pendingOrderTable.style.display = 'table';
});

