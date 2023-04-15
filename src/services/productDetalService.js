import * as request from './requester';


export const product = async (id) => {
    const result = await request.get(`http://localhost:3030/data/products/${id}`);
    const productDetail=result
    return productDetail;
  };
  