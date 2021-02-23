const { uuid } = require('uuidv4');

const HttpError = require('../models/http-error');

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


const getContactById = (req,res,next)=>{
  const contactId = req.params.cid; // {cid: 'p1'}

  const contact = DUMMY_CONTACTS.find(c => {
    return c.id === contactId;
  });

  if(!contact) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({contact}); // => {contact} => {contact: contact}
};

// function getContactById() {...}
// const getContactById = function() {...}

const getContactByUserId = (req,res,next) =>{
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
};

const createContact = (req, res, next) => {
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
  const { title, description} = req.body;
  const contactId = req.params.cid;

  const updatedContact = { ...DUMMY_CONTACTS.find(c => c.id === contactId)};
  const contactIndex = DUMMY_CONTACTS.findIndex(c => c.id === contactId);
  updatedContact.title = title;
  updatedContact.description = description;

  DUMMY_CONTACTS[contactIndex] = updatedContact;

  res.status(200).json({contact: updatedContact});
};

const deleteContact = (req,res,next) => {};

exports.getContactById = getContactById;
exports.getContactByUserId = getContactByUserId;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
