
localStorage.clear()

document.addEventListener("DOMContentLoaded", function () {
    // Đoạn mã này chỉ chạy sau khi trang đã tải xong

    window.addEventListener("load", function () {
        var token = localStorage.getItem("token");
        var userName = this.localStorage.getItem("userName");


        // Lấy thông tin giỏ hàng hiện tại của người dùng (nếu có)
        const userCart = JSON.parse(localStorage.getItem(loggedInUsername)) || [];

        // Thêm sản phẩm vào giỏ hàng
        userCart.push(productToAdd);
        localStorage.setItem(userName, JSON.stringify(userCart));

        // Lấy thông tin sản phẩm từ trang productDetail.html
        const productName = document.getElementById('product-name');
        const productPrice = document.getElementById('product-price');


        // Đặt sự kiện click cho nút "Add To Cart"
        document.querySelector('.buy-now').addEventListener('click', function () {

            // Lấy số lượng sản phẩm được chọn (đây có thể sử dụng input[type="number"] thay vì input[type="text"])
            const productQuantity = document.querySelector('.form-control').value;

            // Tạo một đối tượng sản phẩm
            const product = {
                name: productName.textContent,
                price: parseFloat(productPrice), // Loại bỏ dấu "$" và chuyển đổi sang số
                quantity: productQuantity,
            };

            // Kiểm tra xem giỏ hàng đã được lưu trong localStorage hay chưa
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('cart: >>>>', cart);

            // Thêm sản phẩm vào giỏ hàng
            cart.push(product);
            console.log('product:', product);

            // Lưu lại giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('cart after added: >>>>', cart);

            // Hiển thị thông báo cho người dùng (tùy chọn)
            alert(`Đã thêm ${product.quantity} sản phẩm ${product.name} vào giỏ hàng.`);
        });
    });

})
