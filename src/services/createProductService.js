import * as request from './requester';


export const products =async (data) => {
  const product=await request.post('http://localhost:3030/data/products',data);
  return product
};
