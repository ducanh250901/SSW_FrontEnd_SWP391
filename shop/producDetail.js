const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('productID');

let productDataDetail

// Gọi API để lấy thông tin sản phẩm theo productID
const apiUrl = `https://localhost:7199/Product/GetProductById/${productID}`;

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        productDataDetail = data.data
        console.log('productDataDetail: >>>', productDataDetail);
        // Hiển thị thông tin sản phẩm trên trang
        document.getElementById('product-name').textContent = productDataDetail.name;
        document.getElementById('product-brand').textContent = productDataDetail.brand;
        document.getElementById('product-color').textContent = productDataDetail.color;
        document.getElementById('product-categories').textContent = productDataDetail.catagories;
        document.getElementById('product-size').textContent = productDataDetail.size;
        document.getElementById('product-price').textContent = productDataDetail.price;
        // Các thông tin khác cần được hiển thị
        // save data to local storage
        localStorage.setItem('productDataDetail', JSON.stringify(productDataDetail));
    })
    .catch((error) => console.error("Lỗi khi gọi API:", error));