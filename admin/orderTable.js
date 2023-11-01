async function getDataOrderList() {
    const api = await fetch(`https://localhost:7199/Order/Get All Order`)

    const data = await api.json()
    if (data.status == 200) {
        console.log('api: >>>>>>', data);

    } else console.log('connect failed');

    console.log(data.message);

}

getDataOrderList()