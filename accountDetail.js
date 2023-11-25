function decodeJWT(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
    }

    const encodedPayload = parts[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);

    return payload;
}

const token = localStorage.getItem("token");
console.log('token: >>>', token);
let user = decodeJWT(token)
console.log('user: >>>', user);
console.log('accountID: >>>', user.AccountID);

const fullName = localStorage.getItem("fullName");
const phone = localStorage.getItem("phone");
const address = localStorage.getItem('address')

if (fullName && phone && address) {
    window.location.href = "/index.html";
} else {

}

document.getElementById("infor_id").value = user.AccountID;

document.getElementById("accountDetailForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var accountId = document.getElementById("infor_id").value;
    var fullName = document.getElementById("infor_name").value;

    var phone = document.getElementById("infor_phone").value;
    // Lưu thông tin vào localStorage
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("phone", phone);

    var address = document.getElementById("infor_address").value;

    localStorage.setItem('address', address);
    // Trong phần xác định giới tính
    var gender = document.querySelector('input[name="gender"]:checked');
    var selectedGender = gender ? (gender.value === "male") : null;


    // Lấy giá trị các trường khác tương tự

    const apiUrl = "https://localhost:7199/AccountDetail/AddAccountDetail";
    console.log('Data sent to server:', JSON.stringify({
        accountId: accountId,
        fullname: fullName,
        address: address,
        phone: phone,
        gender: selectedGender,
    }));


    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            accountId: accountId,
            fullname: fullName,
            address: address,
            phone: phone,
            gender: selectedGender
        })

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === true) {
                alert("Account details saved successfully!");
                window.location.href = "/index.html";
                // Có thể thêm các xử lý khác sau khi lưu thành công
            } else {
                alert("Failed to save account details.\n" + data.message);
            }
        });
});

