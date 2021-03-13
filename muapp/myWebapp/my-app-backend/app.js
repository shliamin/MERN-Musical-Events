const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactsRoutes = require('./routes/contacts-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/contacts', contactsRoutes);
app.use('/api/users', usersRoutes);

app.use((req,res,next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error,req,res,next) => {
  if (res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occured!'});
});

mongoose
  .connect('mongodb+srv://oKxPJ6DnKxVFzd4L:oKxPJ6DnKxVFzd4L@cluster0.of3bb.mongodb.net/adviz?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

