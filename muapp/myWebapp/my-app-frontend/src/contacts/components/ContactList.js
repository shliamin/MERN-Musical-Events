import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ContactItem from './ContactItem';
import Button from '../../shared/components/FormElements/Button';
import './ContactList.css';


const ContactList = props => {
  if (props.items.length === 0){
    return (
      <div className="place-list center">
      <Card>
        <h2>No contacts found. Maybe create one?</h2>
        <Button to="/contacts/new">Share Contact</Button>
      </Card>
    </div>
    );
  }

  return  <ul className="place-list">
    {props.items.map(contact => (
      <ContactItem
      key={contact.id}
      id={contact.id}
      image={contact.image}
      title={contact.title}
      description={contact.description}
      address={contact.address}
      creatorId={contact.creator}
      coordinates ={contact.location}
      />
    ))}
  </ul>;
};

export default ContactList;
