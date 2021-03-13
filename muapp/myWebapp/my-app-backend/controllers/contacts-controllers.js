const { uuid } = require('uuidv4');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Contact = require('../models/contact');

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

const createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, address, creator} = req.body;

  let coordinates;
  try{
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdContact = new Contact({
    title,
    description,
    address,
    location: coordinates,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator
  });

  try{
    await createdContact.save();
  } catch(err){
    const error = new HttpError(
      'Creating contact failed, please try again.',
      500
    );
    return next(error);
  }

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
