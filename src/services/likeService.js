import * as request from "./requester";

export const likeS = async (data) => {
  const likedProduct = await request.post("http://localhost:3030/data/likes",data);
  return likedProduct;
};
export const get = async () => {
  const likedProduct = await request.get("http://localhost:3030/data/likes/");
  return likedProduct;
};
export const deleteL = async (id) => {
    const delProduct = await request.del(`http://localhost:3030/data/likes/${id}`);
    return delProduct;
  };

