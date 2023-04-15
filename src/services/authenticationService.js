import * as res from "./requester";

export const login = (info) =>
  res.post("http://localhost:3030/users/login", info);

export const register = (info) =>
  res.post("http://localhost:3030/users/register", info);

export const logout = async (token) => {
  try {
    const response = await fetch("http://localhost:3030/users/logout", {
      headers: {
        "X-Authorization": token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
