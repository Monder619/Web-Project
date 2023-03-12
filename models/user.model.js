module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  });

  return User;
};
