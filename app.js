const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const routes = require('./routes');

const app = express();
const { PORT = 3001 } = process.env;


app.use(express.json());
app.use("/", mainRouter);
app.use('/', routes);


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