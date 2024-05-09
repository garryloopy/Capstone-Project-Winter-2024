"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

// Default submitted user
const defaultSubmittedUser = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export default function ContactForm() {
  // States for user
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // Confirmation stuff
  const [submittedUser, setSubmittedUser] = useState(defaultSubmittedUser);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * Handler for the phone number event change
   * @param {Event} e The phone number change event
   */
  const handleOnPhoneNumberChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;

    // Represents potential phone number
    let potentialPhoneNumber = ["", "", "", "", "", "", "", "", "", "", "", ""];

    // Return if value is greater than 12
    if (valueLength > 12) return;

    for (let char = 0; char < valueLength; char++) {
      if (char === 3 && value[char] != "-") {
        potentialPhoneNumber[3] = "-";
        potentialPhoneNumber[4] = value[char];
        continue;
      } else if (char === 7 && value[char] != "-") {
        potentialPhoneNumber[8] = "-";
        potentialPhoneNumber[9] = value[char];
        continue;
      }

      potentialPhoneNumber[char] = value[char];
    }

    setCurrentPhoneNumber(potentialPhoneNumber.join(""));
  };

  /**
   * Handler for the email change
   * @param {Event} e The email change event
   */
  const handleOnEmailChange = (e) => {
    const value = e.target.value;
    setCurrentEmail(value);
  };

  /**
   * Handler for the first name change
   * @param {Event} e The first name change event
   */
  const handleOnFirstNameChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;

    if (valueLength > 25) return;

    const sanitizedInput = value.replace(/[^A-Za-z ]/g, "");

    setCurrentFirstName(sanitizedInput);
  };

  /**
   * Handler for the last name event
   * @param {Event} e The last name change event
   */
  const handleOnLastNameChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;

    if (valueLength > 25) return;

    const sanitizedInput = value.replace(/[^A-Za-z ]/g, "");

    setCurrentLastName(sanitizedInput);
  };

  /**
   * Handler for the message change
   * @param {Event} e The message change event
   */
  const handleOnMessageChange = (e) => {
    const value = e.target.value;

    setCurrentMessage(value);
  };

  /**
   * Handler for the submit event
   * @param {Event} e The event
   */
  const handleOnSubmit = async (e) => {
    // Set loading
    setIsLoading(true);

    e.preventDefault();

    // Make API call to the server
    handleAPICall();

    //Show confirmation
    setSubmittedUser({
      name: currentFirstName.trim(),
      email: currentEmail,
      phoneNumber: currentPhoneNumber,
      message: currentMessage,
    });
    setShowConfirmation(true);

    // Reset values
    resetValue();

    // Set loading
    setIsLoading(false);
  };

  /**
   * Resets the values of the states.
   * Resets name, email, phone number, and message.
   */
  const resetValue = () => {
    setCurrentEmail("");
    setCurrentFirstName("");
    setCurrentLastName("");
    setCurrentMessage("");
    setCurrentPhoneNumber("");
  };

  /**
   * Handles api call
   */
  async function handleAPICall() {
    try {
      const res = await fetch("api/email/sendContactConfirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${currentFirstName.trim()} ${currentLastName.trim()}`,
          email: currentEmail.trim(),
          phoneNumber: currentPhoneNumber.trim(),
          message: currentMessage.trim(),
        }),
      });
      if (res.status === 200) {
        setShowConfirmation(true);
      } else {
        console.error(
          "Failed to send email. Server responded with status:",
          res.status
        );
      }
    } catch (error) {
      console.error("An error occurred while sending email:", error);
    }
  }

  /**
   * Handler closing the confirmation modal
   */
  const handleOnCloseConfirmation = () => {
    setShowConfirmation(false);

    setSubmittedUser(defaultSubmittedUser);
  };

  return (
    <form
      className="border w-[52rem] min-h-[44rem] shadow-lg bg-white rounded-xl overflow-hidden"
      onSubmit={handleOnSubmit}
    >
      {/* Loading  */}
      <Loading isLoading={isLoading} />

      {/* Confirmation message  */}
      <div
        data-confirmation={showConfirmation}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm z-10 data-[confirmation=true]:opacity-100 opacity-0 data-[confirmation=true]:pointer-events-auto pointer-events-none transition-opacity duration-500"
      >
        <div className="flex flex-col p-8 pb-12 border rounded-md bg-white/95">
          <button
            className="p-1 px-2 ml-auto font-bold text-gray-700 hover:text-gray-800 hover:bg-red-400 hover:"
            onClick={handleOnCloseConfirmation}
          >
            X
          </button>
          <div className="flex flex-col gap-8">
            <p className="text-2xl font-bold text-gray-800">
              Thank you, {submittedUser.name}.
            </p>
            <div>
              <p className="text-gray-800">
                A confirmation email has been sent to {submittedUser.email}.
              </p>
              <p className="text-gray-800">We will get back to you shortly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inner container  */}
      <div className="relative flex flex-col gap-10 p-12 mt-4 bg-yellow-50/5">
        {/* Header for form  */}
        {/* <div className="flex items-end justify-center w-full h-16 mb-4">
          <p className="text-lg font-semibold text-yellow-500 lg:text-3xl">
            Get in touch with us
          </p>
        </div> */}
        

        {/* Section for name  */}
        <div className="flex flex-row gap-8">
          {/* First Name  */}
          <label
            className="relative flex flex-col justify-end flex-1 w-full text-sm transition-all duration-300 bg-white rounded-md shadow-sm h-14 cursor-text ring-1 ring-gray-200 focus-within:shadow-md focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 group"
          >
            {/* Input for first name  */}
            <input
              type="text"
              className="w-full p-2 text-gray-600 outline-none h-1/2 peer bg-inherit rounded-b-md"
              value={currentFirstName}
              onChange={handleOnFirstNameChange}
              required
            />

            {/* Inner container for text  */}
            <div
              className={`absolute text-gray-950 inset-0 flex items-center p-2 ${
                currentFirstName.length > 0 && "-translate-y-3"
              }  pointer-events-none peer-valid:text-green-500 opacity-50 peer-focus:opacity-100 peer-required:text-red-500 transition-all duration-300 peer-focus:-translate-y-3 group-hover:opacity-100`}
            >
              <p className="text-sm font-semibold">First name</p>
            </div>

            {/* Invalid  */}
            <div className="absolute w-full px-2 transition-opacity duration-300 opacity-0 pointer-events-none h-1/2 -bottom-8 peer-invalid:opacity-65">
              <p className="text-xs italic font-medium text-red-500">
                First name cannot be empty.
              </p>
            </div>
          </label>

          {/* Last Name  */}
          <label
            className="relative flex flex-col justify-end flex-1 w-full text-sm transition-all duration-300 bg-white rounded-md shadow-sm h-14 cursor-text ring-1 ring-gray-200 focus-within:shadow-md focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 group"
          >
            {/* Input for last name  */}
            <input
              type="text"
              className="w-full p-2 text-gray-600 outline-none h-1/2 peer in-range:bg-gray-800 bg-inherit rounded-b-md"
              value={currentLastName}
              onChange={handleOnLastNameChange}
              required
            />

            {/* Inner container for text  */}
            <div
              className={`absolute text-gray-950 inset-0 flex items-center p-2 ${
                currentLastName.length > 0 && "-translate-y-3"
              }  pointer-events-none peer-valid:text-green-500 opacity-50 peer-focus:opacity-100 peer-required:text-red-500 transition-all duration-300 peer-focus:-translate-y-3 group-hover:opacity-100`}
            >
              <p className="text-sm font-semibold">Last name</p>
            </div>

            {/* Invalid  */}
            <div className="absolute w-full px-2 transition-opacity duration-300 opacity-0 pointer-events-none h-1/2 -bottom-8 peer-invalid:opacity-65">
              <p className="text-xs italic font-medium text-red-500">
                Last name cannot be empty.
              </p>
            </div>
          </label>
        </div>

        {/* Section for email  */}
        <label
          className="relative flex flex-col justify-end w-full transition-all duration-300 bg-white rounded-md shadow-sm h-14 cursor-text ring-1 ring-gray-200 focus-within:shadow-md focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 group"
        >
          {/* Input  */}
          <input
            type="email"
            className="w-full p-2 text-sm text-gray-600 outline-none h-1/2 peer bg-inherit rounded-b-md"
            onChange={handleOnEmailChange}
            value={currentEmail}
            required
          />

          {/* Inner container for text  */}
          <div
            className={`absolute text-sm text-gray-950 inset-0 flex items-center p-2 ${
              currentEmail.length > 0 && "-translate-y-3"
            }  pointer-events-none peer-focus:-translate-y-3 peer-valid:text-green-500 opacity-50 peer-focus:opacity-100 peer-required:text-red-500 transition-all duration-300 group-hover:opacity-100`}
          >
            <p className="text-sm font-semibold ">Email</p>
          </div>

          {/* Invalid  */}
          <div className="absolute w-full px-2 transition-opacity duration-300 opacity-0 pointer-events-none h-1/2 -bottom-8 peer-invalid:opacity-65">
            <p className="text-xs italic font-medium text-red-500">
              Please enter a valid email address.
            </p>
          </div>
        </label>

        {/* Section for phone number  */}
        <label
          className="relative flex flex-col justify-end w-full transition-all duration-300 bg-white rounded-md shadow-sm h-14 cursor-text ring-1 ring-gray-200 focus-within:shadow-md focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 group"
        >
          {/* Input  */}
          <input
            type="text"
            className="w-full p-2 text-sm text-gray-600 outline-none h-1/2 peer bg-inherit rounded-b-md"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={handleOnPhoneNumberChange}
            value={currentPhoneNumber}
            required
          />

          {/* Inner container for text  */}
          <div
            className={`absolute text-sm text-gray-950 inset-0 flex items-center p-2 ${
              currentPhoneNumber.length > 0 && "-translate-y-3"
            }  pointer-events-none peer-focus:-translate-y-3 peer-valid:text-green-500 opacity-50 peer-focus:opacity-100 peer-required:text-red-500 transition-all duration-300 group-hover:opacity-100`}
          >
            <p className="text-sm font-semibold">Phone number</p>
          </div>

          {/* Invalid  */}
          <div className="absolute w-full px-2 transition-opacity duration-300 opacity-0 pointer-events-none h-1/2 -bottom-8 peer-invalid:opacity-65">
            <p className="text-xs italic font-medium text-red-500">
              Please enter a valid phone number. 123-456-7890.
            </p>
          </div>
        </label>

        {/* h-14  text-sm w-full flex-1 relative flex flex-col justify-end cursor-text ring-1 ring-gray-200 rounded-md shadow-sm focus-within:shadow-md
          focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 transition-all duration-300 group bg-white */}

        {/* Section for message  */}
        <label
          className="relative flex flex-col justify-start w-full transition-all duration-300 bg-white rounded-md shadow-sm min-h-max cursor-text ring-1 ring-gray-200 focus-within:shadow-md focus-within:shadow-yellow-200/50 focus-within:ring-yellow-400 group"
        >
          {/* Main section container  */}
          <textarea
            className="w-full h-full p-4 mt-16 text-sm text-gray-600 outline-none peer bg-inherit rounded-b-md"
            rows={4}
            required
            value={currentMessage}
            onChange={handleOnMessageChange}
          />
          {/* Top section container  */}
          <div className="absolute top-0 flex items-center justify-center w-full h-16 transition-all duration-300 border-b border-gray-200 opacity-50 pointer-events-none text-gray-950 peer-focus:opacity-100 peer-required:text-red-500 peer-valid:text-green-500 peer-valid:opacity-100 group-hover:opacity-100 bg-gray-50 rounded-t-md">
            <p className="text-sm font-semibold">Message</p>
          </div>

          {/* Invalid  */}
          <div className="absolute inset-0 flex flex-col justify-end px-2 transition-opacity duration-300 opacity-0 pointer-events-none -inset-y-5 peer-invalid:opacity-65">
            <p className="text-xs italic font-medium text-center text-red-500">
              Message cannot be empty.
            </p>
          </div>
        </label>

        {/* Submit  */}
        <div className="flex items-center justify-center w-full h-16 mt-auto mb-0">
          <button
            className="w-1/2 h-12 transition-all duration-300 bg-yellow-400 shadow-md hover:bg-yellow-300 active:bg-yellow-400 active:text-gray-100 rounded-3xl focus:shadow-lg focus:shadow-yellow-200/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-200 focus:outline-none"
            type="submit"
          >
            <p className="font-semibold text-gray-100 text-md hover:text-gray-700">Submit now</p>
          </button>
        </div>
      </div>
    </form>
  );
}
