import React, { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './ContactForm.css';

const DUMMY_CONTACTS = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world',
    imageUrl: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous skyscrapers in the world',
    imageUrl: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UpdateContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const contactId = useParams().contactId;


  const identifiedContact = DUMMY_CONTACTS.find(p => p.id === contactId);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: identifiedContact.title,
      isValid: true
    },
    description: {
      value: identifiedContact.description,
      isValid: true
    }
  }, true);



  useEffect(() => {
    setFormData({
    title: {
      value: identifiedContact.title,
      isValid: true
    },
    description: {
      value: identifiedContact.description,
      isValid: true
    }
  }, true);
    setIsLoading(false);
  }, [setFormData, identifiedContact]);


  const contactUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedContact){
    return (
    <div className="center">
      <h2>Could not find contact!</h2>
    </div>
    );
  }

  if (isLoading){
    return (
    <div className="center">
      <h2>Loading...</h2>
    </div>
    );
  }

  return (
    <form className="place-form" onSubmit={contactUpdateSubmitHandler}>
    <Input
    id="title"
    element="input"
    type="text"
    label="Title"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid title."
    onInput={inputHandler}
    initialValue={formState.inputs.title.value}
    initialValid={formState.inputs.title.isValid}
    />
    <Input
    id="description"
    element="textarea"
    label="Description"
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter a valid description (min. 5 characters)."
    onInput={inputHandler}
    initialValue={formState.inputs.description.value}
    initialValid={formState.inputs.description.isValid}
    />
    <Button type="submit" disabled={!formState.isValid}>
      UPDATE CONTACT
    </Button>
  </form>
  );
};

export default UpdateContact;
