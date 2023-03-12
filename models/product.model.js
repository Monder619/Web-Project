module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
    },
    flavour: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  return Product;
};
