const productList = document.getElementById("product-list");

const apiUrl = `https://localhost:7199/Product/GetAllProduct`;

fetch(apiUrl)
  .then((respone) => respone.json())
  // console.log("respone: >>>>>" + respone)
  .then((data) => {
    console.log("data: >>>>", data)

    productList.innerHTML = ''

    data.data.forEach((shop) => {
      const shopAll = document.createElement("div");
      shopAll.innerHTML = `
                  <div class=" col-lg-12 mb-4" data-aos="fade-up">
                      <div class=" text-center ">
                        <figure class="block-4-image">
                        <a href="productDetail.html?productID=${shop.id}">
                        <img src="${shop.pictureLink}" 
                        alt="${shop.pictureLink}" class="img-product"></a>
                        </figure>
                        <div class="product-infor">
                          <h8><a href="productDetail.html?productID=${shop.id}">
                          ${shop.name}</a></h8>
                          <p class="mb-0">${shop.catagories}</p>
                          <p class="mb-0">${shop.brand}</p>
                          <p class="text-primary font-weight-bold">${shop.price}</p>
                        </div>
                      </div>
                  </div>`;
      productList.appendChild(shopAll);
    });
  })
  .catch((error) => console.error("Lỗi khi gọi API:", error));
