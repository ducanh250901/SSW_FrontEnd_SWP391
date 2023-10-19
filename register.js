
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);
    const apiUrl = `https://localhost:7199/Auth/Register?username=${username}&password=${password}`; // Thay 'example.com' bằng URL của máy chủ API của bạn

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status = true) {
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


