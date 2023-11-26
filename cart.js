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
  const cell7 = row.insertCell(6);

  cell1.innerHTML = `<img src="${product.image}" alt="${product.id}" class="img-fluid">`;
  cell2.textContent = product.name;
  cell3.textContent = product.price;
  cell4.textContent = product.size;
  cell5.innerHTML = `
  <div class="input-group ml-5" style="max-width: 110px;">
    <div class="input-group-prepend">
      <button class="btn btn-outline-primary js-btn-minus" onclick="updateQuantity(${index}, -1)" type="button">&minus;</button>
    </div>
    <input type="text" class="form-control text-center" value="${product.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" id="quantity-${index}">
    <div class="input-group-append">
      <button class="btn btn-outline-primary js-btn-plus" onclick="updateQuantity(${index}, 1)" type="button">&plus;</button>
    </div>
  </div>`;
  cell6.textContent = product.price * product.quantity;
  cell7.innerHTML = `<button class="btn btn-primary btn-sm" 
  onclick="removeProduct(event, ${index})">X</button>`;
});

// hàm xóa sản phẩm khỏi giỏ hàng để truyền event
function removeProduct(event, index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  const row = event.target.parentNode.parentNode; // Xác định hàng cần xóa
  row.remove(); // Loại bỏ hàng khỏi bảng
}

function updateQuantity(index, change) {
  const inputQuantity = document.getElementById(`quantity-${index}`);
  let newQuantity = parseInt(inputQuantity.value) + change;

  if (newQuantity < 1) {
    newQuantity = 1;
  }

  cart[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));

  // Cập nhật giá trị trong bảng
  const row = inputQuantity.closest('tr');
  row.cells[3].textContent = newQuantity;  // Cập nhật cell4 với giá trị mới
  row.cells[5].textContent = cart[index].price * newQuantity;  // Cập nhật cell5 với giá trị mới
}



