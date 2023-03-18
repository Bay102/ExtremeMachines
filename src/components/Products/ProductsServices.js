import { COMMERCE_API_KEY, PRODUCTS_URL } from "./Prod_Constants";


export class ProductsService {
   async fetchProducts() {
     return new Promise(async (success, failure) => {
       try {
         //   const response = await fetch(`${PRODUCTS_URL}${COMMERCE_API_KEY}`);
 
         const url = new URL(PRODUCTS_URL);
 
         const params = {
           limit: '25',
         };
         Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
 
         const headers = {
           'X-Authorization': COMMERCE_API_KEY,
           Accept: 'application/json',
           'Content-Type': 'application/json',
         };
 
         const response = await fetch(url, {
           method: 'GET',
           headers: headers,
         });
         
 
         if (response.ok) {
           const json = await response.json();
           const wantedProductInfo = json.data.map((item) => ({
             category: item.categories,
             id: item.id,
             title: item.name,
             imageUrl: item.image.url,
             availQuantity: item.inventory.available,
             price: item.price.formatted_with_symbol,
             description: item.description,
             quantity: 1,
           }));

          //  console.log(wantedProductInfo);
           success({ response, wantedProductInfo });
         } else {
           failure({ error: 'invalid http request' });
         }
       } catch (error) {
         failure(error);
       }
     });
   }
 }
 