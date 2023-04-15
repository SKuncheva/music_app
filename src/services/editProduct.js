import * as request from './requester';


export const edit =async (id,data) => {
  const product=await request.put(`http://localhost:3030/data/products/${id}`,data);

  return product

};
