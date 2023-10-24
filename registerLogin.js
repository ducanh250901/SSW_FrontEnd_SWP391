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
            // Xử lý phản hồi sau khi đăng nhập
            if (data.status == true) {
                alert("Login status: " + data.message);
                var token = data.data.token;
                console.log(token);
                var username = loginUsername;
                console.log(username);
                localStorage.setItem("token", token);
                localStorage.setItem("userName", username);

                // document.getElementById("welcome").style.display = "block";
                // document.getElementById("loggedInUser").innerText = loginUsername;
                window.location.href = "index.html";

                // document.querySelector(".signup").style.display = "none";
                // document.querySelector(".login").style.display = "none";
            } else {
                alert("Login failed");
            }
        });
});
