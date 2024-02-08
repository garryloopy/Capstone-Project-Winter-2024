"use client";

import { useState } from "react";

import Image from "next/image";

import React from "react";

// The business email
const BUSINESS_EMAIL = "francessicam@gmail.com";

// Default submitted user
const defaultSubmittedUser = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

/**
 * Checks if the email is valid or not
 * Uses Disify API
 * For more info:
 *  https://www.disify.com/
 * @param {String} emailToValidate The email to validate
 * @returns Json format from API call, or promise
 */
const validateEmail = async (emailToValidate) => {
  const response = await fetch(
    `https://www.disify.com/api/email/${emailToValidate}`
  );
  const data = await response.json();

  return data;
};

/**
 * Represents a contact us page component
 * @returns A contact page component
 */
const ContactPage = () => {
  // States for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  // Handles state for email validity
  const [emailValidity, setEmailValidity] = useState(false);

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
   * Handler for checking if email is valid
   */
  const handleValidationEmail = async () => {
    const data = await validateEmail(email);

    setEmailValidity(data.format);
  };

  /**
   * Handler for the submit event
   * @param {Event} e The event
   */
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    //Do some stuff, send email to the business email

    handleValidationEmail();

    //Show confirmation
    setSubmittedUser({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    });
    setShowConfirmation(true);

    // Reset values
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
          <div className="flex flex-col border bg-white/95 p-8 pb-12 rounded-md">
            <button
              className="text-gray-700 font-bold hover:text-gray-800 hover:bg-red-400 hover: ml-auto p-1 px-2"
              onClick={handleOnCloseConfirmation}
            >
              X
            </button>
            <div className="flex flex-col gap-8">
              <p className="text-gray-800 font-bold text-2xl">
                Thank you, {submittedUser.name}.
              </p>
              <div>
                <p className="text-gray-800">
                  A confirmation email has been sent to {submittedUser.email}.
                </p>
                <p className="text-gray-800">
                  We will get back to you in 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 p-12">
        <p className="text-center text-2xl mb-4">Get in touch with us!</p>
        <div className="flex flex-row gap-8">
          <div>
            <p className="text-gray-900 font-thin text-md text-sm">Name*</p>
            <InputLabel
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleOnNameChange}
            />
          </div>
          <div>
            <p className="text-gray-900 font-thin text-sm">Email address*</p>
            <InputLabel
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleOnEmailChange}
            />
          </div>
        </div>
        <div>
          <p className="text-gray-900 font-thin text-md text-sm">
            Phone number*
          </p>
          <InputLabel
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Phone number 123-456-7890"
            value={phoneNumber}
            onChange={handleOnPhoneNumberChange}
          />
        </div>
        <div>
          <p className="text-gray-900 font-thin text-md text-sm">Message*</p>
          <TextAreaLabel
            placeholder="Message"
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
 * @param {String} pattern The pattern for the input
 * @param {Function} onChange The handler for the change event
 * @returns The input label for the form
 */
function InputLabel({
  type,
  placeholder,
  className,
  value,
  onChange,
  pattern,
}) {
  return (
    <label className="flex flex-col flex-1">
      <input
        type={type}
        placeholder={placeholder}
        className={`form_input ${className}`}
        value={value}
        onChange={onChange}
        pattern={pattern}
        required
      />
    </label>
  );
}

export default ContactPage;
