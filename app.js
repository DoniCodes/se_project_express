const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const auth = (req, res, next) => {
  // Authentication logic here
  req.user = { _id: '690b958d3e891a5ee63f602a' };
  next();
}


app.use(express.json());

app.use(auth);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});