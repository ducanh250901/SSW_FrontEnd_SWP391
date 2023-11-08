const productList = document.getElementById("product-list");

const apiUrl = `https://localhost:7199/Service/GetAllService`;

fetch(apiUrl)
  .then((respone) => respone.json())
  // console.log("respone: >>>>>" + respone)
  .then((data) => {
    console.log("data: >>>>", data);

    productList.innerHTML = ''

    data.data.forEach((service) => {
      const shopAll = document.createElement("div");
      shopAll.innerHTML = `
      <div class=" col-lg-12 mb-4" data-aos="fade-up">
          <div class=" text-center ">
            <figure class="block-4-image">
              <a href="sendService.html?serviceID=${service.id}">
              <img src="${service.pictureLink}" 
                alt="${service.pictureLink}" class="img-product"></a>
            </figure>
              <div class="product-infor">
              <h5><a href="sendService.html?serviceID=${service.id}">
                ${service.type}</a></h5>               
                <p class="text-primary font-weight-bold">${service.price}</p>
              </div>
          </div>
      </div> `;
      productList.appendChild(shopAll);
    });
  })
  .catch((error) => console.error("Lỗi khi gọi API:", error));
