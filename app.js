const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const routes = require('./routes');

const app = express();
const { PORT = 3001 } = process.env;


app.use(express.json());
app.use("/", mainRouter);
app.use('/', routes);

app.use((req, res, next) => {
  req.user = {
    _id: '68fffcb7f3b6a3b7448a41c5'// paste the _id of the test user created in the previous step
  };
  next();
});


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});