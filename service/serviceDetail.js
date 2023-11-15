const urlParams = new URLSearchParams(window.location.search);
const serviceID = urlParams.get('serviceID');

var fullName = localStorage.getItem("fullName");
console.log('fullName: >>', fullName);
var phone = localStorage.getItem("phone");
console.log('phone: >>', phone);


let serviceDataDetail

// Gọi API để lấy thông tin sản phẩm theo productID
const apiUrl = `https://localhost:7199/Service/GetServicetById/${serviceID}`;

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        serviceDataDetail = data.data
        console.log('serviceDataDetail: >>>', serviceDataDetail);
        console.log(serviceDataDetail.type);
        // Hiển thị thông tin sản phẩm trên trang
        document.getElementById('c_type').value = serviceDataDetail.type;
        document.getElementById('c_price').value = serviceDataDetail.price;
        document.getElementById("c_fname").value = fullName;
        document.getElementById("c_phone").value = phone;

        // Các thông tin khác cần được hiển thị
        // save data to local storage
        localStorage.setItem('serviceDataDetail', JSON.stringify(serviceDataDetail));
    })
    .catch((error) => console.error("Lỗi khi gọi API:", error));