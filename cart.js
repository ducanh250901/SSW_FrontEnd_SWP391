// Lấy giỏ hàng từ localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('cart after added: >>>', cart);

// Lặp qua các sản phẩm trong giỏ hàng và hiển thị chúng trong bảng
const cartTable = document.getElementById('cart-table');
const tbody = cartTable.getElementsByTagName('tbody')[0];

cart.forEach((product, index) => {
  console.log('product:', product);
  console.log('productQuantity:', product.quantity);

  const row = tbody.insertRow();
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);

  cell1.innerHTML = `<img src="images/product_image.jpg" alt="Product Image" class="img-fluid">`;
  cell2.textContent = product.name;
  cell3.textContent = product.price;
  cell4.textContent = product.quantity;
  cell5.textContent = product.price * product.quantity;
  cell6.innerHTML = `<button class="btn btn-primary btn-sm" 
  onclick="removeProduct(event, ${index})">X</button>`;
});

// hàm xóa sản phẩm khỏi giỏ hàng để truyền event
function removeProduct(event, index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  const row = event.target.parentNode.parentNode; // Xác định hàng cần xóa
  row.remove(); // Loại bỏ hàng khỏi bảng
}



