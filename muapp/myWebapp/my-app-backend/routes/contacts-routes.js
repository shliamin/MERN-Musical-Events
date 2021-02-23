const express = require('express');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:cid', contactsControllers.getContactById);

router.get('/user/:uid', contactsControllers.getContactByUserId);

router.post('/', contactsControllers.createContact);

router.patch('/:cid', contactsControllers.updateContact);

router.delete('/:cid', contactsControllers.deleteContact);

module.exports = router;
