// const productList = document.getElementById("product-list");

const apiUrl = `https://localhost:7199/Product/GetAllProduct`;

fetch(apiUrl)
  .then((respone) => respone.json())
  // console.log("respone: >>>>>" + respone)
  .then((data) => {
    console.log("data: >>>>", data);

    productList.innerHTML = ''

    data.forEach((shop) => {
      const shopAll = document.createElement("div");
      shopAll.innerHTML = `
                <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                    <div class="block-4 text-center border">
                      <figure class="block-4-image">
                        <a href="productDetail.html"><img src="${shop.image}" 
                        alt="${shop.image}"
                            class="img-fluid"></a>
                      </figure>
                      <div class="block-4-text p-4">
                        <h3><a href="productDetail.html">${shop.name}</a></h3>
                        <p class="mb-0">${shop.description}</p>
                        <p class="text-primary font-weight-bold">${shop.cost}</p>
                      </div>
                    </div>
                </div>
                        `;
      productList.appendChild(shopAll);
    });
  })
  .catch((error) => console.error("Lỗi khi gọi API:", error));
