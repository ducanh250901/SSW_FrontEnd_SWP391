
// check login
// if (checkLogin() == false) {
//     alert("You are not logged in!");
//     window.location.href = "/login.html";
// }

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


// Gọi hàm kiểm tra quyền truy cập khi trang admin được tải
if (window.location.pathname.includes('/admin')) {
    checkAdminAccess();
}

// Hàm kiểm tra quyền truy cập vào trang admin
function checkAdminAccess() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You are not logged in!');
        window.location.href = '/login.html';
        return;
    }

    let user = decodeJWT(token);
    // console.log(user.Role);
    if (!user || (user.Role !== 'Admin' && user.Role !== 'Staff')) {
        window.location.href = '/index.html';
        alert('You do not have access to this page!');
    }
}



// Đăng ký
document
    .getElementById("registrationForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        var registerUsername = document.getElementById("registerUsername").value;
        var registerPassword = document.getElementById("registerPassword").value;
        console.log("registerUsername: " + registerUsername);
        console.log("registerPassword: " + registerPassword);

        // Thực hiện yêu cầu POST đến API đăng ký
        const apiUrl = `https://localhost:7199/Auth/Register?username=${registerUsername}&password=${registerPassword}`;
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ username: registerUsername, password: registerPassword })
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý phản hồi sau khi đăng ký
                if (data.status == true) {
                    alert("Registration successful!" + data.message);
                    // Bạn có thể chuyển hướng người dùng đến trang đăng nhập tại đây
                } else {
                    alert("Registration failed ");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

// Đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    const apiUrl = `https://localhost:7199/Auth/Login?username=${loginUsername}&password=${loginPassword}`;

    console.log("loginUsername: " + loginUsername);
    console.log("loginPassword: " + loginPassword);
    // Thực hiện yêu cầu POST đến API đăng nhập
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('data:>>>', data);
            // Xử lý phản hồi sau khi đăng nhập
            if (data.status == true) {
                alert("Login status: " + data.message);
                var token = data.data.token;
                console.log(token);

                let user = decodeJWT(token);
                console.log('user: >>>', user);
                console.log(user.Role);


                if (user.Role === "Admin") {
                    alert("Hello admin!");
                    window.location.href = "/admin/index.html";
                } else if (user.Role === "Staff") {
                    alert("Hello Staff!");
                    window.location.href = "/admin/order-product.html";
                } else {
                    alert(`Welcome to my System\nCustomer: ${loginUsername}`)
                    window.location.href = "/accountDetail.html"
                }

                // Gọi hàm kiểm tra quyền truy cập khi trang admin được tải
                const adminPages = [
                    '/admin/index.html',
                    '/admin/order-product.html',
                    '/admin/order-service.html',
                    '/admin/account-table.html'
                ];

                if (adminPages.includes(window.location.pathname)) {
                    checkAdminAccess();
                }

                // Ví dụ kiểm tra vai trò trước khi chuyển hướng

                var username = loginUsername;
                console.log(username);
                localStorage.setItem("token", token);
                localStorage.setItem("userName", username);

            } else {
                alert(`Login failed \n${data.message}`);
            }
        });
});
