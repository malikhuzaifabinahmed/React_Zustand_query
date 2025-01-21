import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto p-4 md:p-8 container">
      <h1 className="mb-6 md:mb-8 font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="mb-4 md:mb-6">
          <label htmlFor="name" className="block mb-2 text-sm md:text-base text-gray-700 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 md:p-3 border border-gray-300 dark:border-gray-600 rounded w-full 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
            text-sm md:text-base"
            required
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label htmlFor="email" className="block mb-2 text-sm md:text-base text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 md:p-3 border border-gray-300 dark:border-gray-600 rounded w-full 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
            text-sm md:text-base"
            required
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label htmlFor="message" className="block mb-2 text-sm md:text-base text-gray-700 dark:text-gray-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="p-2 md:p-3 border border-gray-300 dark:border-gray-600 rounded w-full 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400
            text-sm md:text-base"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
          px-4 py-2 md:px-6 md:py-3 rounded text-white text-sm md:text-base"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
