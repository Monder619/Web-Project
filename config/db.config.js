module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Cow.7???',
  DB: 'Restaurant',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
