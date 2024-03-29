document.addEventListener("DOMContentLoaded", () => {
    loadCheckout();
});

function loadCheckout() {

    // Load Order Product
    const orderProduct = JSON.parse(localStorage.getItem("cart"));
    console.log('cart: >>>', orderProduct);
    let totalProduct = 0;

    if (orderProduct) {
        let dataOrderProduct = document.getElementById("dataOrderProduct");
        let orderProductTotalElement = document.getElementById("orderProductTotal");
        let htmlProduct = "";

        orderProduct.forEach((item, index) => {
            totalProduct += item.price * item.quantity;
            htmlProduct += `
            <tr>
              <td>${item.name} <strong class="mx-2">x</strong> ${item.quantity
                } - $${item.price} </td>
              <td>$${item.price * item.quantity}</td>
            </tr>
          `;
        });

        dataOrderProduct.innerHTML = htmlProduct;
        orderProductTotalElement.textContent = `$${totalProduct.toFixed(2)}`;
    }


    // Load Order Service
    const orderService = JSON.parse(localStorage.getItem("cartDataService"));
    console.log('cart service: >>>>', orderService);
    let totalService = 0;

    if (orderService) {
        let dataOrderService = document.getElementById("dataOrderService");
        let orderServiceTotalElement = document.getElementById("orderServiceTotal");
        let htmlService = "";

        orderService.forEach((item, index) => {
            totalService += item.servicePrice * item.quantity;
            htmlService += `
            <tr>
              <td>${item.serviceType} <strong class="mx-2">x</strong> ${item.quantity
                } - $${item.servicePrice} </td>
              <td>$${item.servicePrice * item.quantity}</td>
            </tr>
          `;
        });

        dataOrderService.innerHTML = htmlService;
        orderServiceTotalElement.textContent = `$${totalService.toFixed(2)}`;
    }


    // Load Grand Total
    const grandTotalElement = document.getElementById("grandTotal");
    let grandTotal = 0;
    if (totalProduct && totalService) {
        grandTotal = totalProduct + totalService;
    } else if (totalProduct === 0) {
        grandTotal = totalService
    } else {
        grandTotal = totalProduct
    }

    grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
}

function placeOrder() {

    // Gửi dữ liệu đơn hàng product đến API
    const orderProduct = JSON.parse(localStorage.getItem("cart"));
    if (orderProduct) {
        const apiUrlProduct = "https://localhost:7199/Order/AddProductOrder";
        const orderProductData = orderProduct.map((item) => {
            return {
                productId: item.id,
                quantity: item.quantity,
                size: item.size
            };
        });

        $.ajax({
            url: apiUrlProduct,
            type: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },

            data: JSON.stringify(orderProductData),
            contentType: "application/json",
            success: function (data) {
                if (data.status === true) {
                    console.log("Order Product successful");
                    // Xóa giỏ hàng product sau khi đặt hàng thành công
                    localStorage.removeItem("cart");
                    // Gọi hàm thực hiện các bước xử lý khác hoặc chuyển hướng đến trang cảm ơn
                    handleOrderSuccess();
                }
            },
            error: function (data) {
                console.log("Order Product failed");
                alert("Order Product failed");
            },
        });
    }

    // Gửi dữ liệu đơn hàng service đến API
    const orderService = JSON.parse(localStorage.getItem("cartDataService"));
    if (orderService) {
        const apiUrlService = "https://localhost:7199/Order/AddServiceOrder";
        const orderServiceData = orderService.map((item) => {
            return {
                serviceID: item.serviceID,
                quantity: item.quantity
            };
        });

        $.ajax({
            url: apiUrlService,
            type: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: JSON.stringify(orderServiceData),
            contentType: "application/json",
            success: function (data) {
                if (data.status === true) {
                    console.log("Order Service successful");
                    // Xóa giỏ hàng service sau khi đặt hàng thành công
                    localStorage.removeItem("cartDataService");
                    // Gọi hàm thực hiện các bước xử lý khác hoặc chuyển hướng đến trang cảm ơn
                    handleOrderSuccess();
                }
            },
            error: function (data) {
                console.log("Order Service failed");
                alert("Order Service failed");
            },
        });
    }
}

function handleOrderSuccess() {
    // Thực hiện các bước xử lý khác sau khi đặt hàng thành công
    alert("Order placed successfully!");
    window.location.href = "thankyou.html";
}

