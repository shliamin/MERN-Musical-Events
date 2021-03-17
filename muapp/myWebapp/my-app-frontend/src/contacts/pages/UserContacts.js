import React from 'react';
import { useParams} from 'react-router-dom';

import ContactList from '../components/ContactList';


const DUMMY_CONTACTS = [
  {
    id: 'c1',
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
    id: 'c2',
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

const UserContacts = () => {
  const userId = useParams().userId;
  const loadedContacts = DUMMY_CONTACTS.filter(contact => contact.creator === userId);
  return <ContactList items={loadedContacts}/>;
};

export default UserContacts;
