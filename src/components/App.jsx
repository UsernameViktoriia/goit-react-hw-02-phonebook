import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  toFilter = e => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };
  onAddContact = ({ name, number }) => {
    if (
      this.state.contacts.find(
        cont => cont.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { name, number, id: nanoid() }],
      };
    });
  };
  onDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1
          style={{
            fontSize: 40,
            color: '#1251cc',
          }}
        >
          Phonebook
        </h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2
          style={{
            fontSize: 40,
            color: '#1251cc',
          }}
        >
          Contacts
        </h2>
        <Filter toFilter={this.toFilter} value={this.state.filter} />
        <ContactList
          contacts={this.filterContacts()}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}
