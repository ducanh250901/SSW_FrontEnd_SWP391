
function addToCart() {
    const product = JSON.parse(localStorage.getItem("productDataDetail"));
    console.log(product);
    const cart = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.pictureLink,
        quantity: Number(document.getElementById("quantity").value),
    };
    saveCart(cart);
}

function saveCart(cart) {
    let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
    // check if cart is empty
    if (cartArray.length == 0) {
        cartArray.push(cart);
    } else {
        let index = cartArray.findIndex((item) => item.id == cart.id);
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