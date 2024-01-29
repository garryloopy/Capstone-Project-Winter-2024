"use client";

import { useState } from "react";

import Image from "next/image";

import lord_farquaad from "@/public/images/lord_farquaad.jpg";

import React from "react";

// The business email
const BUSINESS_EMAIL = "francessicam@gmail.com";

const defaultSubmittedUser = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const ContactPage = () => {
  // States for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [submittedUser, setSubmittedUser] = useState(defaultSubmittedUser);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * Handler for the name change
   * @param {Event} e The event
   */
  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };

  /**
   * Handler for the email change
   * @param {Event} e The event
   */
  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handleer for the phone number change
   * @param {Event} e The event
   */
  const handleOnPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  /**
   * Handle for the message change
   * @param {Event} e The event
   */
  const handleOnMessageChange = (e) => {
    setMessage(e.target.value);
  };

  /**
   * Resets the values of the states.
   * Resets name, email, phone number, and message.
   */
  const resetValue = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  /**
   * Handler for the submit event
   * @param {Event} e The event
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Do some stuff, send email to the business email

    //Show confirmation
    setSubmittedUser({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    });
    setShowConfirmation(true);

    resetValue();
  };

  /**
   * Handler closing the confirmation modal
   */
  const handleOnCloseConfirmation = () => {
    setShowConfirmation(false);

    setSubmittedUser(defaultSubmittedUser);
  };

  return (
    <div className="flex flex-col justify-center h-screen gap-12 items-center">
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div className="flex- flex-col bg-white/75 p-8 rounded-md">
            <div className="text-right">
              <button onClick={handleOnCloseConfirmation}>X</button>
            </div>
            <div>
              <p>Thank you, {submittedUser.name}.</p>
              <p>
                A confirmation email has been sent to {submittedUser.email}.
              </p>
              <p>We will get back to you in 3-5 business days.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 p-12">
        <p className="text-center text-2xl mb-4">Get in touch with us!</p>
        <div className="flex flex-row gap-8">
          <InputLabel
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleOnNameChange}
          />
          <InputLabel
            type="text"
            placeholder="Email*"
            value={email}
            onChange={handleOnEmailChange}
          />
        </div>
        <div>
          <InputLabel
            type="text"
            placeholder="Phone number*"
            value={phoneNumber}
            onChange={handleOnPhoneNumberChange}
          />
        </div>
        <div>
          <TextAreaLabel
            placeholder="Message*"
            value={message}
            onChange={handleOnMessageChange}
          />
        </div>
        <div className="flex flex-row">
          <button type="submit" className="sign_button mx-24">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Represents the text area label for the form
 * @param {String} placeholder The placeholder for the text area
 * @param {String} value The value for the text area
 * @param {Function} onChange The handler for the change event
 * @returns The text area label
 */
function TextAreaLabel({ placeholder, value, onChange }) {
  return (
    <label className="flex flex-col flex-1">
      <textarea
        placeholder={placeholder}
        className="form_input"
        rows="3"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
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
function InputLabel({ type, placeholder, className, value, onChange }) {
  return (
    <label className="flex flex-col flex-1">
      <input
        type={type}
        placeholder={placeholder}
        className={`form_input ${className}`}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}

export default ContactPage;
