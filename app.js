const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const role = require('./routes/role.route');
const user = require('./routes/user.route');
const product = require('./routes/product.route');
const order = require('./routes/order.route');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/role', role);
app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/order', order);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
