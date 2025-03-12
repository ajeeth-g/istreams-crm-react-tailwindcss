import { useState } from "react";

const ContactForm = ({ onCreate }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    profilePic: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newContact);
    setNewContact({ name: "", role: "", email: "", phone: "", profilePic: "" });
  };

  return (
    <div className="p-4 w-full max-w-lg bg-gray-200 rounded-md shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Create Contact</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="p-2 border rounded-md text-gray-700 w-full"
          required
        />
        <input
          type="text"
          name="role"
          value={newContact.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="p-2 border rounded-md text-gray-700 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="p-2 border rounded-md text-gray-700 w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          value={newContact.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="p-2 border rounded-md text-gray-700 w-full"
          required
        />
        <input
          type="url"
          name="profilePic"
          value={newContact.profilePic}
          onChange={handleInputChange}
          placeholder="Profile Picture URL"
          className="p-2 border rounded-md text-gray-700 w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
