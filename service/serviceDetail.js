const urlParams = new URLSearchParams(window.location.search);
const serviceID = urlParams.get('serviceID');

let serviceDataDetail

// Gọi API để lấy thông tin sản phẩm theo productID
const apiUrl = `https://localhost:7199/Service/GetServicetById/${serviceID}`;

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        serviceDataDetail = data
        console.log('serviceDataDetail: >>>', serviceDataDetail);
        // Hiển thị thông tin sản phẩm trên trang
        document.getElementById('c_type').textContent = `Service Type: ${serviceDataDetail.data.type}`;

        // Các thông tin khác cần được hiển thị
        // save data to local storage
        localStorage.setItem('serviceDataDetail', JSON.stringify(serviceDataDetail));
    })
    .catch((error) => console.error("Lỗi khi gọi API:", error));