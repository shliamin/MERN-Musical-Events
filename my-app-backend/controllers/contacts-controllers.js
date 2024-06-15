const { uuid } = require('uuidv4');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Contact = require('../models/contact');
const User = require('../models/user');


const getContactById = async (req,res,next)=>{
  const contactId = req.params.cid;

  let contact;
  try{
    contact = await Contact.findById(contactId);
  } catch (err){
    const error = new HttpError(
      'Something went wrong, could not find a contact.', 500
    );
    return next(error);
  }

  if(!contact) {
    const error = new HttpError('Could not find a contact for the provided id.', 404);
    return next(error);
  }

  res.json({contact: contact.toObject({getters: true})});
};

const getContactsByUserId = async (req,res,next) =>{
  const userId = req.params.uid;

  let userWithContacts;
  try {
    userWithContacts = await User.findById(userId).populate('contacts');
  } catch(err){
    const error = new HttpError(
      'Fetching contacts failed, please try again later',
      500
    );
    return next(error);
  }

  if(!userWithContacts|| userWithContacts.contacts.length === 0) {
    return next(
      new HttpError('Could not find contacts for the provided user id.', 404)
    );
  }

  res.json({contacts: userWithContacts.contacts.map(contact => contact.toObject({getters: true}))});
};

const createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next(
    new HttpError('Invalid inputs passed, please check your data.', 422)
    );
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Address_book_1.jpg',
    creator
  });

  let user;

  try{
    user = await User.findById(creator);

  }catch (err){
    const error = new HttpError(
      'Creating contact failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user){
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdContact.save({ session: sess});
    user.contacts.push(createdContact);
    await user.save({session: sess});
    await sess.commitTransaction();
  } catch(err){
    const error = new HttpError(
      'Creating contact failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({contact: createdContact});
};

const updateContact = async (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next (
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description} = req.body;
  const contactId = req.params.cid;

  let contact;
  try{
    contact = await Contact.findById(contactId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update contact.', 500
    );
    return next(error);
  }

  contact.title = title;
  contact.description = description;

  try {
    await contact.save();
  } catch (err){
    const error = new HttpError(
      'Something went wrong, could not update contact.', 500
    );
    return next(error);
  }

  res.status(200).json({contact: contact.toObject({getters: true})});
};

const deleteContact = async (req,res,next) => {
  const contactId = req.params.cid;

  let contact;
  try{
    contact = await Contact.findById(contactId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete contact',
      500
    );
    return next(error);
  }

  if(!contact){
    const error = new HttpError('Could not find contact for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await contact.remove({session: sess});
    contact.creator.contacts.pull(contact);
    await contact.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete contact',
      500
    );
    return next(error);
  }

  res.status(200).json({message: 'Deleted contact.'});
};

exports.getContactById = getContactById;
exports.getContactsByUserId = getContactsByUserId;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
