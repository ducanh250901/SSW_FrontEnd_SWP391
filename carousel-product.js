const product = document.getElementById("product");

const productApiAurl = `https://localhost:7199/Product/GetAllProduct`;

fetch(productApiAurl)
    .then((respone) => respone.json())
    // console.log("respone: >>>>>" + respone)
    .then((data) => {
        console.log("data: >>>>", data)

        // Shuffle the array of products
        const randomProducts = shuffle(data.data);

        // Select the first 5 products
        const productsToShow = randomProducts.slice(0, 4);

        product.innerHTML = ''

        productsToShow.forEach((shop) => {
            const carousel = document.createElement("div");
            carousel.className = 'item';
            carousel.innerHTML = `
                <div class="block-4 text-center">
                    <figure class="block-4-image">
                    <a href="/shop/productDetail.html?productID=${shop.id}">
                        <img src="${shop.pictureLink}" 
                        alt="${shop.pictureLink}" class="img-product"></a>
                    </figure>
                    <div class="block-4-text p-4">
                    <h8 class='font-weight-bold'>
                        <a href="/shop/productDetail.html?productID=${shop.id}">
                            ${shop.name}</a>
                    </h8>
                        <p class="mb-0 font-weight-bold">${shop.brand}</p>
                        <p class="text-primary font-weight-bold">$ ${shop.price}</p>
                    </div>
                </div>
            </div>
                  `;
            product.appendChild(carousel);
        });

    })

    .catch((error) => console.error("Lỗi khi gọi API:", error));

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
