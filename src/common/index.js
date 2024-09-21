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
    method: "get"
  },
  categoryWiseProduct : {
    url: `${backendDomin}/api/category-product`,
    method: "post"
  },
  productDetails:{
    url: `${backendDomin}/api/product-details`,
    method: "post"
  }
};

export default SummaryApi;
