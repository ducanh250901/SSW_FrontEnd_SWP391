const serviceAll = document.getElementById("service");

const serviceApiUrl = `https://localhost:7199/Service/GetAllService`;

fetch(serviceApiUrl)
    .then((respone) => respone.json())
    // console.log("respone: >>>>>" + respone)
    .then((data) => {
        console.log("data: >>>>", data);

        // Shuffle the array of services
        const randomservices = shuffle(data.data);

        // Select the first 4 services
        const servicesToShow = randomservices.slice(0, 4);


        serviceAll.innerHTML = ''

        servicesToShow.forEach((service) => {
            const carousel = document.createElement("div");
            carousel.className = 'item';
            carousel.innerHTML = `
            <div class="block-4 text-center">
                <figure class="block-4-image">
                <a href="/service/sendService.html?serviceID=${service.id}">
                    <img src="https://media.istockphoto.com/id/162275552/tr/vekt%C3%B6r/seamless-pattern-shoe-polish-and-man-shoe.jpg?b=1&s=612x612&w=0&k=20&c=46EhTpsgs_kxLgm2yuO3QZ3z2Mody_FnmTnobAmwa5Q=" 
                    alt="${service.id}" class="img-product"></a>
                </figure>
                <div class="block-4-text p-4">
                <h8 class='font-weight-bold'>
                    <a href="/service/sendService.html?serviceID=${service.id}">
                        ${service.type}</a>
                </h8>    
                    <p class="text-primary font-weight-bold">$ ${service.price}</p>
                </div>
            </div>
        </div>
              `;
            serviceAll.appendChild(carousel);
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
