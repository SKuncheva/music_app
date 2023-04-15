
import * as request from './requester';


export const getBanner = async () => {
  const res = await request.get('http://localhost:3030/jsonstore/banner');
  const banners=Object.values(res);
  // console.log(banners);
  return banners;

};
