function checkLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    setUserLogin(token);
    return true;
  }
  return false;
}

function setUserLogin(token) {
  let user = decodeJWT(token);
  localStorage.setItem('userLogin', JSON.stringify(user));
}

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

// check login
if (checkLogin() == false) {
  alert("You are not logged in!");
  window.location.href = "/login.html";
}
// // check admin
var token = localStorage.getItem("userLogin");
var decoded = decodeJWT(token);
console.log(decoded);

if (decoded.role == 1) {
  alert("You are admin!");
  window.location.href = "/admin/index.html";

} else if (decoded.role == 2) {
  alert("You are Staff!");
  window.location.href = "/admin/order-product.html";
} else {
  window.location.href = "/index.html"
}

