
function addToCart() {
    // const product = JSON.parse(localStorage.getItem("productDataDetail"));
    // console.log('product:>>', product);
    let selectElement = document.getElementById("product-size");
    const selectedSize = selectElement.options[selectElement.selectedIndex].value;
    console.log('Selected Size:', selectedSize);
    // Lấy thông tin sản phẩm từ local storage
    let storedProductDetail = JSON.parse(localStorage.getItem('productDataDetail')) || {};
    console.log('storedProductDetail:>>', storedProductDetail);

    if (storedProductDetail && selectedSize) {
        const cart = {
            id: storedProductDetail.id,
            name: storedProductDetail.name,
            brand: storedProductDetail.brand,
            price: storedProductDetail.price,
            image: storedProductDetail.pictureLink,
            size: storedProductDetail.selectedSize || selectedSize, // Use selected size or the one in local storage
            quantity: Number(document.getElementById("quantity").value),
        };
        saveCart(cart);
        console.log('cart:>>>', cart);
    } else {
        console.error("Không tìm thấy thông tin sản phẩm hoặc size đã chọn.");
    }

    function saveCart(cart) {
        let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
        // check if cart is empty
        if (cartArray.length == 0) {
            cartArray.push(cart);
        } else {
            let index = cartArray.findIndex((item) => item.id == cart.id
                && item.size == cart.size);
            if (index == -1) {
                cartArray.push(cart);
            } else {
                cartArray[index].quantity += cart.quantity;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
        Toastify({
            text: "Add to cart successfully",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true,
        }).showToast();
    }
}