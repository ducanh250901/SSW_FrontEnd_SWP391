// Khai báo biến
let currentPage = 1;
const itemsPerPage = 3; // Số sản phẩm trên mỗi trang
const pagination = document.getElementById('pagination');
const product = document.getElementById('product-list');
let allProducts = []; // Lưu trữ tất cả sản phẩm từ API

// Gọi API và lấy tất cả sản phẩm
fetch('https://localhost:7199/Service/GetAllService')
    .then(response => response.json())
    .then(data => {
        // console.log('data: >>>>', data);
        allProducts = data.data;
        console.log('allProducts: >>>>', allProducts);
        // Hiển thị trang đầu tiên khi trang web được tải
        showProductsOnPage(currentPage);
    })
    .catch(error => console.error('error', error));

// Hiển thị sản phẩm trên trang
function showProductsOnPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = allProducts.slice(startIndex, endIndex);
    product.innerHTML = ''; // Xóa dữ liệu cũ

    productsToDisplay.forEach(service => {
        // Tạo phần tử DOM cho sản phẩm tương tự như trước
        const productElement = document.createElement('div');
        productElement.innerHTML = `
        <div class=" col-lg-12 mb-4" data-aos="fade-up">
        <div class="border-4 text-center ">
          <figure class="block-4-image">
            <a href="sendService.html?serviceID=${service.id}">
            <img src="https://media.istockphoto.com/id/162275552/tr/vekt%C3%B6r/seamless-pattern-shoe-polish-and-man-shoe.jpg?b=1&s=612x612&w=0&k=20&c=46EhTpsgs_kxLgm2yuO3QZ3z2Mody_FnmTnobAmwa5Q=" 
              alt="${service.id}" class="img-product"></a>
          </figure>
            <div class="product-infor">
            <h5 class='font-weight-bold'><a href="sendService.html?serviceID=${service.id}">
              ${service.type}</a></h5>               
              <p class="text-primary font-weight-bold">$ ${service.price}</p>
            </div>
        </div>
    </div>
    `;
        product.appendChild(productElement);
    });

    updatePagination(currentPage);
}

// Cập nhật phân trang
function updatePagination(currentPage) {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const ulElement = pagination.querySelector('ul');
    ulElement.innerHTML = '';

    const prevButton = document.createElement('li');
    prevButton.innerHTML = `<a href="#">&lt;</a>`;
    ulElement.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        if (i === currentPage) {
            pageButton.innerHTML = `<span>${i}</span>`;
        } else {
            pageButton.innerHTML = `<a href="#">${i}</a>`;
        }
        ulElement.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.innerHTML = `<a href="#">&gt;</a>`;
    ulElement.appendChild(nextButton);
}

// Xử lý sự kiện khi người dùng chọn trang trước hoặc trang sau
pagination.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        if (event.target.textContent === '‹') { // Sửa giá trị để so sánh với dấu "‹"
            if (currentPage > 1) {
                currentPage--;
            }
        } else if (event.target.textContent === '›') { // Sửa giá trị để so sánh với dấu "›"
            const totalPages = Math.ceil(allProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
            }
        } else {
            currentPage = parseInt(event.target.textContent);
        }

        showProductsOnPage(currentPage);
    }
});