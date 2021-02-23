const { uuid } = require('uuidv4');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_CONTACTS = [
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


const getContactById = (req,res,next)=>{
  const contactId = req.params.cid; // {cid: 'p1'}

  const contact = DUMMY_CONTACTS.find(c => {
    return c.id === contactId;
  });

  if(!contact) {
    throw new HttpError('Could not find a contact for the provided id.', 404);
  }

  res.json({contact}); // => {contact} => {contact: contact}
};

// function getContactById() {...}
// const getContactById = function() {...}

const getContactsByUserId = (req,res,next) =>{
  const userId = req.params.uid;

  const contacts = DUMMY_CONTACTS.filter(c => {
    return c.creator === userId;
  });

  if(!contacts || contacts.length === 0) {
    return next(
      new HttpError('Could not find contacts for the provided user id.', 404)
    );
  }

  res.json({contacts});
};

const createContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description, coordinates, address, creator} = req.body;
  const createdContact = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_CONTACTS.push(createdContact);

  res.status(201).json({contact: createdContact});
};

const updateContact = (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description} = req.body;
  const contactId = req.params.cid;

  const updatedContact = { ...DUMMY_CONTACTS.find(c => c.id === contactId)};
  const contactIndex = DUMMY_CONTACTS.findIndex(c => c.id === contactId);
  updatedContact.title = title;
  updatedContact.description = description;

  DUMMY_CONTACTS[contactIndex] = updatedContact;

  res.status(200).json({contact: updatedContact});
};

const deleteContact = (req,res,next) => {
  const contactId = req.params.cid;
  if (!DUMMY_CONTACTS.find(c => c.id ===  contactId)) {
    throw new HttpError('Could not find a contact for that id.', 404);
  }
  DUMMY_CONTACTS = DUMMY_CONTACTS.filter(c => c.id !== contactId);
  res.status(200).json({message: 'Deleted contact.'});
};

exports.getContactById = getContactById;
exports.getContactsByUserId = getContactsByUserId;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
