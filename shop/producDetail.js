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

        let selectSize = document.getElementById('product-size')

        // Tạo một option với giá trị mặc định được chọn (ví dụ: size đầu tiên trong mảng)

        productDataDetail.inStoreProducts.forEach(product => {
            console.log('size: >>>', product.size);
            const option = document.createElement('option');
            option.value = product.size;
            option.text = product.size;
            selectSize.add(option);

        });
        // Hiển thị thông tin sản phẩm trên trang

        document.getElementById('product-img').src = productDataDetail.pictureLink;
        document.getElementById('product-name').textContent = productDataDetail.name;
        document.getElementById('product-brand').textContent = productDataDetail.brand;
        document.getElementById('product-color').textContent = productDataDetail.color;
        document.getElementById('product-categories').textContent = productDataDetail.catagories;
        document.getElementById('product-price').textContent = `$ ${productDataDetail.price}`;

        // Các thông tin khác cần được hiển thị
        // save data to local storage
        localStorage.setItem('productDataDetail', JSON.stringify(productDataDetail));
        console.log('Stored productDataDetail in local storage:', localStorage.getItem('productDataDetail'));

        // Lắng nghe sự kiện khi kích thước sản phẩm được chọn
        // Lắng nghe sự kiện khi kích thước sản phẩm được chọn
        selectSize.addEventListener('change', function () {
            const selectedSize = this.value;

            // Lấy thông tin sản phẩm từ local storage
            let storedProductDetail = JSON.parse(localStorage.getItem('productDataDetail')) || {};
            console.log('stpreProductDetail: >>>', storedProductDetail);


            // Nếu tìm thấy, cập nhật thông tin size đã chọn
            storedProductDetail.selectedSize = selectedSize;

            localStorage.setItem('productDataDetail', JSON.stringify(storedProductDetail));
            console.log(storedProductDetail);

        });
    })
    .catch((error) => console.error("Lỗi khi gọi API:", error));
