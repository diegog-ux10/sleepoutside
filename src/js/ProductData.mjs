const baseURL = import.meta.env.VITE_SERVER_URL;
console.log(baseURL)
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  // getData() {
  //   return fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data);

  async getData(category) {
    console.log(baseURL + `produts/search/${category}`);
    const response = await fetch(baseURL + `produts/search/${category}`);
    
    const data = await convertToJson(response);
    console.log(data);
    return data.Result;
  }

  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
