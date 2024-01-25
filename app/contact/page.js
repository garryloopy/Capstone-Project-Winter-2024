"use client";

import {
  useState
} from "react";

import React from 'react'

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  }

  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleOnPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleOnMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const resetValue = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    resetValue();
  }
  return (
    <div className="flex flex-col">
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 p-12'>
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
          <button type="submit" className="bg-gray-500 flex-1">Submit</button>
        </div>
      </form>
    </div>
  )
}

function TextAreaLabel ({placeholder, value, onChange}) {
  return (
    <label className="flex flex-col flex-1">
            <textarea  placeholder={placeholder} className="px-4 py-2 rounded-md" rows="3" value={value} onChange={onChange} required/>
    </label>
  )
}


function InputLabel({type, placeholder, className, value, onChange}) {
  return (
    <label className="flex flex-col flex-1">
            <input type={type} placeholder={placeholder} className={`px-4 py-2 rounded-md ${className}`}  value={value} onChange={onChange} required/>
          </label>
  )
}

export default ContactPage