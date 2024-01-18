export default class ProductData {
    constructor(category) {
      this.category = category;
      this.path = `../json/${this.category}.json`;
    }
    getData() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
    async findProductById(id) {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    }
  }

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
}
    init();{};

    
    function addProductToCart(product) {
        setLocalStorage('so-cart', product);
      }
      // add to cart button event handler
    //   async function addToCartHandler(e) {
    //     const product = await dataSource.findProductById(e.target.dataset.id);
        // addProductToCart(product);
    }
}
