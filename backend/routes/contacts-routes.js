const express = require('express');
const {check} = require('express-validator');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:cid', contactsControllers.getContactById);

router.get('/user/:uid', contactsControllers.getContactsByUserId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({min: 5}),
    check('address')
      .not()
      .isEmpty()
  ],
  contactsControllers.createContact
  );

router.patch('/:cid', [
  check('title').not().isEmpty(),
  check('description').isLength({min:5})
  ], contactsControllers.updateContact);

router.delete('/:cid', contactsControllers.deleteContact);

module.exports = router;
