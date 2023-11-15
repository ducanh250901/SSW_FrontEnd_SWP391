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

let user = decodeJWT(localStorage.getItem('token'))
console.log('user: >>>>', user);
let accountID = user.AccountID

if (user && user.Role === 'Customer') {
    // Gọi hàm để lấy đơn hàng khi trang được load
    document.addEventListener("DOMContentLoaded", function () {
        loadOrders();
    });

    function loadOrders() {
        // Đường dẫn API
        const apiUrl = `https://localhost:7199/Order/GetOrderbyAccountID/${accountID}`;

        // Sử dụng Fetch API để gửi yêu cầu
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Xử lý dữ liệu trả về từ API
                console.log('data: >>>', data);
                displayOrders(data.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    }

    function displayOrders(orders) {
        // Lấy tbody của bảng
        const tableBody = document.getElementById("dataTable");

        // Xóa nội dung cũ trong tbody
        tableBody.innerHTML = "";

        // Thêm dữ liệu mới vào tbody
        orders.forEach(function (order) {
            let orderDate = new Date(order.orderDate)
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.accountId}</td>
            <td>${orderDate.getDate()}/${orderDate.getMonth() + 1} /${orderDate.getFullYear()}
            <br>
            ${orderDate.getHours()} :${orderDate.getMinutes()}:${orderDate.getSeconds()}</td>
            <td>${order.total}</td>
            <td>${order.status === 1 ? 'Deliveried' : 'Pending'}</td>
        `;

            // Thêm hàng vào tbody
            tableBody.appendChild(row);
        });
    }
} else alert(`You aren't customer`);

