import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './ContactForm.styled';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { number, name } = this.state;
    this.props.onAddContact({ number, name });
    this.setState({
      number: '',
      name: '',
    });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Label className="input-group">
          <span>Name</span>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label className="input-group">
          <span>Number</span>
          <Input
            type="tel"
            name="number"
            onChange={this.onChange}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
