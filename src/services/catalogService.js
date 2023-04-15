import * as request from './requester';


export const products = async () => {
  const res = await request.get('http://localhost:3030/data/products');
  const products=Object.values(res);
  // console.log(products);
  return products;
};
