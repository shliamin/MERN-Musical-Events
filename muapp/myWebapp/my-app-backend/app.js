const express = require('express');
const bodyParser = require('body-parser');

const contactsRoutes = require('./routes/contacts-routes');

const app = express();

app.use('/api/contacts', contactsRoutes); // => /api/contatcs/...

app.listen(5000);
