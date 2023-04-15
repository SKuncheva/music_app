import * as request from './requester';


export const deleteProduct =async (id) => {
  const product=await request.del(`http://localhost:3030/data/products/${id}`);

  return product

};
