exports.raiseQuantityByOne = async (items, id) => {
  let existingProduct = items.findIndex(
    (prod) => prod.productId.toString() === id.toString()
  );
  let newQuantity = 1;
  let productsUpdate = [...items];
  if (existingProduct >= 0) {
    newQuantity = items[existingProduct].quantity + 1;
    productsUpdate[existingProduct].quantity = newQuantity;
  } else
    productsUpdate.push({
      productId: id,
      quantity: newQuantity,
    });
  return productsUpdate;
};

exports.reduceQuantityByOne = async (items, id) => {
  let existingProduct = items.findIndex(
    (prod) => prod.productId.toString() === id.toString()
  );

  let newQuantity;
  let productsUpdate = [...items];
  if (existingProduct >= 0) {
    newQuantity = items[existingProduct].quantity - 1;
    productsUpdate[existingProduct].quantity = newQuantity;
  }
  return productsUpdate;
};

exports.removeOneProduct = async (items, id) => {
  return await items.filter(
    (prod) => prod.productId.toString() !== id.toString()
  );
};
