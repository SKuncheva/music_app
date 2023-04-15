const request = async (method, url, data) => {
  try {
      const user = localStorage.getItem('authenticate');
      const authorizedUser = JSON.parse(user || '{}');

      let headers = {}

      if (authorizedUser.accessToken) {
          headers['X-Authorization'] = authorizedUser.accessToken;
      }

      let result;

      if (method === 'GET') {
        result = fetch(url, { headers });
      } else {
        result = fetch(url, {
              method,
              headers: {
                  ...headers,
                  'content-type': 'application/json'
              },
              body: JSON.stringify(data)
          });
      }
      const response = await result;
      const resultOfResponse = await response.json();
      return resultOfResponse;
  } catch (error) {
      console.log(error);
  }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
