const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_CONTACTS = [
{
  id: 'p1',
  title: 'Empire State Building',
  description: 'One of the most famous sky scrapers in the world!',
  location: {
    lat: 40.7485574,
    lng: -73.9871516
  },
  address: '20 W 34th St, New York, NY 10001',
  creator: 'u1'
}];

router.get('/:cid', (req,res,next)=>{
  const contactId = req.params.cid; // {cid: 'p1'}

  const contact = DUMMY_CONTACTS.find(c => {
    return c.id === contactId;
  });

  if(!contact) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({contact}); // => {contact} => {contact: contact}
});

router.get('/user/:uid', (req,res,next) =>{
  const userId = req.params.uid;

  const contact = DUMMY_CONTACTS.find(c => {
    return c.creator === userId;
  });

  if(!contact) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }

  res.json({contact});
});

module.exports = router;
