document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('pending-order-button').addEventListener('click', function () {
        // Xử lý khi nút "Pending Order" được nhấn
        // Lấy giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Lấy ra table "Pending Order"
        const pendingOrderTable = document.getElementById('pending-order-table');
        const tbody = pendingOrderTable.getElementsByTagName('tbody')[0];

        // Lặp qua từng sản phẩm trong giỏ hàng và thêm chúng vào bảng "Pending Order"
        cart.forEach(product => {
            const row = tbody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.innerHTML = `<h2 class="h5 text-black">ID Cart</h2>`;
            cell2.innerHTML = `<h2 class="h5 text-black">${product.name} $${product.price}</h2>`;
            cell3.textContent = `$${product.price}`;
            cell4.textContent = `$${product.price}`;
            cell5.innerHTML = `<button href="#" class="btn btn-primary btn-sm">X</button>`;
        });

        // Xóa giỏ hàng
        localStorage.removeItem('cart');

        // Hiển thị thông báo cho người dùng
        alert('Đã chuyển các sản phẩm vào "Pending Order". Giỏ hàng đã được làm trống.');
    });

})