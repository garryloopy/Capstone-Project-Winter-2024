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
      name: currentFirstName,
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
          name: `${currentFirstName} ${currentLastName}`,
          email: currentEmail,
          phoneNumber: currentPhoneNumber,
          message: currentMessage,
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
      className="border w-[52rem] min-h-[44rem] shadow-lg bg-gray-100/90 rounded-md p-12 flex flex-col gap-10"
      onSubmit={handleOnSubmit}
    >
      {/* Loading  */}
      <Loading isLoading={isLoading} />

      {/* Confirmation message  */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm z-10">
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
                  We will get back to you shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header for form  */}
      <div className="border-b border-orange-400 w-full h-16 flex items-end justify-center mb-4 pb-2">
        <p className="text-3xl font-medium text-orange-400">
          Get in touch with us
        </p>
      </div>

      {/* Section for name  */}
      <div className="flex flex-row gap-8">
        {/* First Name  */}
        <label className="h-14  text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-gray-50">
          {/* Input for first name  */}
          <input
            type="text"
            className="w-full h-1/2 outline-none peer bg-inherit p-2 text-gray-600 rounded-b-md"
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
            <p className="font-semibold text-sm">First name</p>
          </div>

          {/* Invalid  */}
          <div className="absolute h-1/2 w-full -bottom-8 px-2 opacity-0 peer-invalid:opacity-65 transition-opacity duration-300 pointer-events-none">
            <p className="text-xs font-medium text-red-500">
              First name cannot be empty.
            </p>
          </div>
        </label>

        {/* Last Name  */}
        <label className="h-14 text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-gray-50">
          {/* Input for last name  */}
          <input
            type="text"
            className="w-full h-1/2 outline-none peer in-range:bg-gray-800 p-2 bg-inherit text-gray-600 rounded-b-md"
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
            <p className="font-semibold text-sm">Last name</p>
          </div>

          {/* Invalid  */}
          <div className="absolute h-1/2 w-full -bottom-8 px-2 opacity-0 peer-invalid:opacity-65 transition-opacity duration-300 pointer-events-none">
            <p className="text-xs font-medium text-red-500">
              Last name cannot be empty.
            </p>
          </div>
        </label>
      </div>

      {/* Section for email  */}
      <label className="h-14 w-full relative flex flex-col justify-end cursor-text  border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-gray-50">
        {/* Input  */}
        <input
          type="email"
          className="w-full h-1/2 outline-none peer p-2 bg-inherit text-sm text-gray-600 rounded-b-md"
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
          <p className="font-semibold text-sm">Email</p>
        </div>

        {/* Invalid  */}
        <div className="absolute h-1/2 w-full -bottom-8 px-2 opacity-0 peer-invalid:opacity-65 transition-opacity duration-300 pointer-events-none">
          <p className="text-xs font-medium text-red-500">
            Please enter a valid email address.
          </p>
        </div>
      </label>

      {/* Section for phone number  */}
      <label className="h-14 w-full relative flex flex-col justify-end cursor-text  border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-gray-50">
        {/* Input  */}
        <input
          type="text"
          className="w-full h-1/2 outline-none peer p-2 bg-inherit text-sm text-gray-600 rounded-b-md"
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
          <p className="font-semibold text-sm">Phone number</p>
        </div>

        {/* Invalid  */}
        <div className="absolute h-1/2 w-full -bottom-8 px-2 opacity-0 peer-invalid:opacity-65 transition-opacity duration-300 pointer-events-none">
          <p className="text-xs font-medium text-red-500">
            Please enter a valid phone number. 123-456-7890.
          </p>
        </div>
      </label>

      {/* Section for message  */}
      <label className="min-h-max w-full relative flex flex-col justify-start cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-gray-50">
        {/* Main section container  */}
        <textarea
          className="w-full h-full mt-16 p-4 outline-none peer text-sm bg-inherit text-gray-600 rounded-b-md"
          rows={4}
          required
          value={currentMessage}
          onChange={handleOnMessageChange}
        />
        {/* Top section container  */}
        <div className="w-full h-16 absolute top-0 flex items-center  border-b border-gray-200 justify-center pointer-events-none text-gray-950 opacity-50 peer-focus:opacity-100 peer-required:text-red-500 peer-valid:text-green-500 peer-valid:opacity-100 transition-all duration-300 group-hover:opacity-100 bg-gray-100 rounded-t-md">
          <p className="font-semibold text-sm">Message</p>
        </div>

        {/* Invalid  */}
        <div className="absolute inset-0 -inset-y-5 px-2 flex flex-col justify-end opacity-0 peer-invalid:opacity-65 transition-opacity duration-300 pointer-events-none">
          <p className="text-xs font-medium text-red-500 text-center">
            Message cannot be empty.
          </p>
        </div>
      </label>

      {/* Submit  */}
      <div className="w-full h-16 flex items-center justify-center mt-auto mb-0">
        <button
          className="w-1/2 h-12 bg-orange-400 hover:bg-orange-500 hover:text-gray-50 active:bg-orange-400 active:text-gray-100 rounded-md shadow-md focus:shadow-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus:outline-none"
          type="submit"
        >
          <p className="text-md text-gray-100">Submit</p>
        </button>
      </div>
    </form>
  );
}
