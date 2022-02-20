exports.apiEnum = {
  API_REGISTER: "/auth/register",
  API_LOGIN: "/auth/login",
  API_UPDATE_PROFILE: "/auth/update-details",
  API_FORGOT_PASSWORD: "/auth/forget-password",
  API_RESET_PASSWORD: "/auth/reset-password/:reset-token",
  API_GET_TOKEN: "/auth/token",
  API_CHECK_STUDENT: "/check",
  API_UPDATE_PASSWORD: "/auth/update-password",
  API_GET_MY_PROFILE: "/auth/profile",

  API_ADD_PRODUCT_TO_CART: "/cart/add/:productId",
  API_REDUCE_PRODUCT_FROM_CART: "/cart/reduce/:productId",
  API_GET_CART: "/cart",
  API_REMOVE_PRODUCT_FROM_CART: "/cart/:productId",

  API_GET_PRODUCTS: "/products",
  API_GET_PRODUCT: "/products/:productId",
  API_DELETE_PRODUCT: "/products/:productId",
  API_UPDATE_PRODUCT: "/products/:productId",
  API_CREATE_PRODUCT: "/products/add-product",

  API_DELETE_SKILL: "/auth/delete-skill",
  API_GET_SUBJECT: "/subjects",
  API_GET_SKILL: "/skills",
  API_GET_DOWNLOAD: "/download",
};
