const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('productID');

let productDataDetail

// Gọi API để lấy thông tin sản phẩm theo productID
const apiUrl = `https://localhost:7199/Product/GetProductById/${productID}`;

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        productDataDetail = data
        console.log('productDataDetail: >>>', productDataDetail);
        // Hiển thị thông tin sản phẩm trên trang
        document.getElementById('product-name').textContent = productDataDetail.data.name;
        document.getElementById('product-brand').textContent = data.brand;
        document.getElementById('product-color').textContent = data.data.color;
        document.getElementById('product-categories').textContent = data.categories;
        document.getElementById('product-size').textContent = data.size;
        document.getElementById('product-price').textContent = data.price;
        // Các thông tin khác cần được hiển thị
    })
    .catch((error) => console.error("Lỗi khi gọi API:", error));