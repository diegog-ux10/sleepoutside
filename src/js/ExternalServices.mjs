const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return json;
  } else {
    // throw new Error('Bad Response');
    throw { name: 'error', message: json };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const res = await fetch(baseURL + `checkout/`, options).then(convertToJson);
    console.log(res);
    return res;
  }
}
