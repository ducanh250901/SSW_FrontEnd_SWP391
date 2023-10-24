window.addEventListener("load", function () {
    var token = localStorage.getItem("token");
    var userName = this.localStorage.getItem("userName");
    var loggedInUser = document.getElementById("loggedInUser");

    if (token && userName) {
        // Hiển thị tên người dùng nếu có token
        loggedInUser.innerText = "Welcome " + userName;
    }
});
