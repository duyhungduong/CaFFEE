const backendDomin = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  uploadTable: {
    url: `${backendDomin}/api/upload-table`,
    method: "post",
  },
  allTable: {
    url: `${backendDomin}/api/get-table`,
    method: "get",
  },
  updateTable: {
    url: `${backendDomin}/api/update-table`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  typeTable: {
    url: `${backendDomin}/api/get-typeTable`,
    method: "get",
  },
  areaTable: {
    url: `${backendDomin}/api/get-areaTable`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartTable :{
    url: `${backendDomin}/api/addtabletocart`,
    method: "post",
  },
  addToCartProductCount :{
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },addToCartTableCount :{
    url: `${backendDomin}/api/countaddtocarttable`,
    method: "get",
  }, addToProductView : {
    url: `${backendDomin}/api/view-cart-product`,
    method: "get",
  }, updateCartProduct : {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct : {
      url : `${backendDomin}/api/delete-cart-product`,
      method : 'post'
  },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment : {
      url : `${backendDomin}/api/checkout`,
      method : 'post'
    }

};

export default SummaryApi;
