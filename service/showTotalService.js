
// dom load
document.addEventListener("DOMContentLoaded", () => {
    loadCheckOut();
});

function loadCheckOut() {
    const order = JSON.parse(localStorage.getItem("cartService"));
    console.log('orderService: >>>>', order);
    let dataOrder = document.getElementById("dataOrder");
    let total = 0;
    let html = "";
    order.forEach((item, index) => {
        total += item.price;
        html += `
      <tr>
        <td>${item.type} <strong class="mx-2">x</strong>
          $${item.price} </td>
        
      </tr>
      `;
    });
    html += `
    <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
    <td class="text-black font-weight-bold"><strong>$${total}</strong></td>
    `;
    dataOrder.innerHTML = html;
}
function order() {
    if (checkLogin() == false) {
        alert("Please login to order");
        return;
    }
    let order = JSON.parse(localStorage.getItem("cartService"));
    let orderService = order.map((item, index) => {
        return {
            serviceID: item.id,
            price: item.quantity,
        };
    });

    const apiUrl = "https://localhost:7199/Order/AddOrder";
    $.ajax({
        url: apiUrl,
        type: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: JSON.stringify(orderProduct),
        contentType: "application/json",
        success: function (data) {
            if (data.status == true) {
                alert(data.message);
                localStorage.removeItem("cartData");
                window.location.href = "/index.html";
            }
        },
        error: function (data) {
            alert("Order fail");
        },
    });
}
