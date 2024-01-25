"use client";

import {
  useState
} from "react";

import React from 'react'

// The business email
const BUSINESS_EMAIL = "francessicam@gmail.com";

const ContactPage = () => {
  // States for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Handler for the name change
   * @param {Event} e The event
   */
  const handleOnNameChange = (e) => {
    setName(e.target.value);
  }

  /**
   * Handler for the email change
   * @param {Event} e The event
   */
  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
  }

  /**
   * Handleer for the phone number change 
   * @param {Event} e The event
   */
  const handleOnPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  /**
   * Handle for the message change
   * @param {Event} e The event
   */
  const handleOnMessageChange = (e) => {
    setMessage(e.target.value);
  }

  /**
   * Resets the values of the states.
   * Resets name, email, phone number, and message.
   */
  const resetValue = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  }

  /**
   * Handler for the submit event
   * @param {Event} e The event
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Used for debugging
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Phone number: ", phoneNumber);
    console.log("Message: ", message);

    resetValue();
  }
  return (
    <div className="flex flex-col h-screen mt-auto mb-auto">
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 p-12'>
        <div className="flex flex-row gap-8">
          <InputLabel type="text" placeholder="Name" value={name} onChange={handleOnNameChange}/>
          <InputLabel type="text" placeholder="Email*" value={email} onChange={handleOnEmailChange}/>
        </div>
        <div>
          <InputLabel type="text" placeholder="Phone number*" value={phoneNumber} onChange={handleOnPhoneNumberChange}/>
        </div>
        <div>
          <TextAreaLabel placeholder="Message*" value={message} onChange={handleOnMessageChange}/>
        </div>
        <div className="flex flex-row">
          <button type="submit" className="sign_button">Submit</button>
        </div>
      </form>

      <div className="text-center">
        <h1 className="text-center text-2xl font-bold">Add some stuff here</h1>
        <p>asdasdsadjhgkjhgkjg</p>
      </div>
    </div>
  )
}

/**
 * Represents the text area label for the form
 * @param {String} placeholder The placeholder for the text area
 * @param {String} value The value for the text area
 * @param {Function} onChange The handler for the change event
 * @returns The text area label
 */
function TextAreaLabel ({placeholder, value, onChange}) {
  return (
    <label className="flex flex-col flex-1">
            <textarea  placeholder={placeholder} className="form_input" rows="3" value={value} onChange={onChange} required/>
    </label>
  )
}


/**
 * Represents the input label for the form
 * @param {type} type The type of the input
 * @param {String} placeholder The placeholder for the input
 * @param {String} className The class name for the input
 * @param {String} value The value for the input
 * @param {Function} onChange The handler for the change event
 * @returns The input label for the form
 */
function InputLabel({type, placeholder, className, value, onChange}) {
  return (
    <label className="flex flex-col flex-1">
            <input type={type} placeholder={placeholder} className={`form_input ${className}`}  value={value} onChange={onChange} required/>
          </label>
  )
}

export default ContactPage