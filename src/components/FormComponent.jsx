import React, { useState } from "react";

const FormComponent = ({ displayPopup, closePopup, formStyles }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referralCode: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(""); // State for global error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.referralCode)
      errors.referralCode = "Referral Code is required";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch(
          "https://accredian-backend-task-csvx.onrender.com/api/referrals",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          // Handle success
          setSuccessMessage("Form submitted successfully!");
          setFormData({
            name: "",
            email: "",
            referralCode: "",
            message: "",
          });
        } else {
          // Handle server-side validation error or other issues
          const errorData = await response.json();
          setSubmitError(errorData.message || "Form submission failed");
        }
      } catch (error) {
        // Handle network errors or other unexpected errors
        setSubmitError("Error submitting form. Please try again.");
      }
    }
  };

  return (
    <div
      className={`absolute z-10 w-full max-w-lg h-[500px] mx-auto bg-white p-8 rounded-lg mt-[100px] drop-shadow-sm border ${
        displayPopup ? "block" : "hidden"
      }`}
      style={formStyles}
    >
      <button
        className="absolute top-[10px] right-[10px] text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={closePopup}
      >
        &times;
      </button>
      <form
        className="w-full h-full flex flex-col justify-between mt-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-full flex flex-col justify-between">
          <div className="relative mt-4">
            <input
              className="w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 border-neutral-300 focus:border-blue-500"
              name="name"
              id="name"
              type="text"
              placeholder="Name (Required)"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="relative mt-4">
            <input
              className="w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 border-neutral-300 focus:border-blue-500"
              name="email"
              id="email"
              type="email"
              placeholder="Email (Required)"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative mt-4">
            <input
              className="w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 border-neutral-300 focus:border-blue-500"
              name="referralCode"
              id="referralCode"
              type="text"
              placeholder="Referral Code (Required)"
              value={formData.referralCode}
              onChange={handleChange}
            />
            {errors.referralCode && (
              <p className="text-red-500 text-xs mt-1">{errors.referralCode}</p>
            )}
          </div>
          <div className="relative mt-4">
            <input
              className="w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 border-neutral-300 focus:border-blue-500"
              name="message"
              id="message"
              type="text"
              placeholder="Message (Required)"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
        </div>
        {(submitError || successMessage) && (
          <p
            className={`text-xs mt-2 text-center ${
              submitError ? "text-red-500" : "text-blue-500"
            }`}
          >
            {submitError || successMessage}
          </p>
        )}
        <div className="w-full mt-6 flex justify-center">
          <button
            className="bg-blue-400 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
