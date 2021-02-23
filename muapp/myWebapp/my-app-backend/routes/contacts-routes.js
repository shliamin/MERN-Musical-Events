const express = require('express');

const contactsControllers = require('../controllers/contacts-controllers');

const HttpError = require('../models/http-error');

const router = express.Router();

router.get('/:cid', contactsControllers.getContactById);

router.get('/user/:uid', contactsControllers.getContactByUserId);

module.exports = router;
