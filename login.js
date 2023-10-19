
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);
    const apiUrl = `https://localhost:7199/Auth/Login`; // Thay 'example.com' bằng URL của máy chủ API của bạn

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                // Bạn có thể chuyển hướng người dùng đến trang đăng nhập tại đây
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    // Thực hiện yêu cầu POST đến API đăng nhập
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
        .then(response => response.json())
        .then(data => {
            // Xử lý phản hồi sau khi đăng nhập
            if (data.success) {
                document.getElementById("welcome").style.display = "block";
                document.getElementById("loggedInUser").innerText = loginUsername;
                document.querySelector(".signup").style.display = "none";
                document.querySelector(".login").style.display = "none";
            } else {
                alert(data.message);
            }
        });
});

