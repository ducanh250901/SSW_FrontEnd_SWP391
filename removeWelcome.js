window.addEventListener("load", function () {
    var token = localStorage.removeItem("token");
    var userName = localStorage.removeItem("userName");
    var loggedInUser = document.getElementById("loggedInUser");

    if (token && userName) {
        // Hiển thị tên người dùng nếu có token
        loggedInUser.innerText = "Welcome " + userName;
    }

    // this.localStorage.clear();
});
