module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    product: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });

  return Order;
};
