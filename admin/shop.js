$(document).ready(function () {
    const dataTable = $('#dataTable');

    const apiUrl = 'https://localhost:7199/shop/GetAllshop';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('data:', data);

            dataTable.empty();

            data.data.forEach(shop => {
                const row = $('<tr></tr>');
                row.html(`
                            <td>${shop.id}</td>
                            <td>${shop.brand}</td>
                            <td>${shop.name}</td>
                            <td>${shop.price}</td>
                            <td><button onclick="viewDetails('${shop.id}')">View Details</button></td>
                        `);
                dataTable.append(row);
            });
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
});

function viewDetails(shopId) {
    // You can implement this function to show more details about the shop
    console.log('View details for shop ID:', shopId);
}