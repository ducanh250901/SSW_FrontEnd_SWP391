// Dữ liệu danh sách sản phẩm, bạn có thể thay đổi dữ liệu này
const productList = [
    {
        name: "Tank Top",
        description: "Finding perfect t-shirt",
        price: "$50",
    },
    {
        name: "Corater",
        description: "Finding perfect products",
        price: "$50",
    },
    // Thêm các sản phẩm khác vào đây
];

// Số sản phẩm trên mỗi trang
const productsPerPage = 5;

// Hàm để hiển thị danh sách sản phẩm trên trang cụ thể
function displayProducts(page) {
    console.log(page);
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < productList.length; i++) {
        const product = productList[i];
        const productHTML = `
      <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
        <div class="block-4 text-center border">
          <figure class="block-4-image">
            <a href="/productDetail.html"><img src="images/cloth_1.jpg" alt="Image placeholder" class="img-fluid"></a>
          </figure>
          <div class="block-4-text p-4">
            <h3><a href="/productDetail.html">${product.name}</a></h3>
            <p class="mb-0">${product.description}</p>
            <p class="text-primary font-weight-bold">${product.price}</p>
          </div>
        </div>
      </div>
    `;
        productContainer.innerHTML += productHTML;
    }
}

// Hàm để tạo phân trang
function createPagination() {
    const totalProducts = productList.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const paginationContainer = document.querySelector(".site-block-27 ul");
    paginationContainer.innerHTML = "";

    for (let page = 1; page <= totalPages; page++) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${page}</a>`;

        li.addEventListener("click", () => {
            displayProducts(page);
            setActivePage(page);
        });


        paginationContainer.appendChild(li);


    }

    displayProducts(1);
    setActivePage(1);
}

// Hàm để đánh dấu trang hiện tại
function setActivePage(page) {
    const paginationItems = document.querySelectorAll(".site-block-27 ul li");
    paginationItems.forEach((item, index) => {
        if (index + 1 === page) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Khởi tạo phân trang
createPagination();