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
const address = localStorage.getItem('address');
const genderBefore = localStorage.getItem('gender');
const gender = document.querySelector('input[name="gender"][value="' + genderBefore + '"]');
if (gender) {
    gender.checked = true;
}

document.getElementById("infor_id").value = user.AccountID;
document.getElementById("infor_name").value = fullName;
document.getElementById("infor_phone").value = phone;
document.getElementById("infor_address").value = address;