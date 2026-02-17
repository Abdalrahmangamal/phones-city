import axios from 'axios';

const BASE_URL = 'https://system.cityphonesa.com/';

async function checkProducts() {
    try {
        console.log('Fetching products list...');
        const response = await axios.get(`${BASE_URL}api/v1/products`, {
            headers: { 'Accept-Language': 'ar' }
        });
        const products = response.data.data;

        console.log(`Fetched ${products.length} products from list.`);

        // Check up to 5 products to see structure
        const checkCount = Math.min(products.length, 5);
        for (let i = 0; i < checkCount; i++) {
            const p = products[i];
            console.log(`\n--------------------------------------------------`);
            console.log(`Checking Product ID: ${p.id} Name: ${p.name}`);
            try {
                const detailRes = await axios.get(`${BASE_URL}api/v1/products/${p.id}`, {
                    headers: { 'Accept-Language': 'ar' }
                });
                const detail = detailRes.data.data;

                console.log(`Images Type: ${typeof detail.images}`);
                console.log(`Images IsArray: ${Array.isArray(detail.images)}`);
                console.log(`Images Content:`, JSON.stringify(detail.images, null, 2));

                if (detail.options && detail.options.length > 0) {
                    console.log(`Has ${detail.options.length} options.`);
                    console.log(`Option 0 Images:`, JSON.stringify(detail.options[0].images, null, 2));
                } else {
                    console.log(`No options.`);
                }
            } catch (e) {
                console.error(`Failed to fetch details for ${p.id}: ${e.message}`);
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkProducts();
