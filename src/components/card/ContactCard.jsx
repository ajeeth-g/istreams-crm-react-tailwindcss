import { useState } from "react";
//import { motion } from "framer-motion";
import { Edit, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

const ContactCard = ({ contact }) => {
  const { name, role, email, phone, profilePic } = contact;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'
  const [editedContact, setEditedContact] = useState({
    name,
    role,
    email,
    phone,
  });

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  return (

    
    <div className="p-3 h-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-200 mb-4 rounded-md flex items-center justify-between space-x-4 shadow-lg">
      {/* Profile Picture */}
      <img
        src={profilePic}
        alt="Profile"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
      />

      {/* Contact Info */}
      <div className="flex flex-col text-sm flex-1">
        <span className="font-semibold text-gray-900">{name}</span>
        <span className="text-gray-600">{role}</span>
        <span className="text-gray-500">{email}</span>
        <span className="text-gray-500">{phone}</span>
      </div>

      {/* Edit & Delete Icons */}
      <div className="flex space-x-2">
        <Edit
          className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => openModal("edit")}
        />
        <Trash2
          className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => openModal("delete")}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="fixed inset-0 bg-transparent" />
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative z-10">
            {/* Close Icon (X) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            <DialogTitle className="text-lg font-semibold text-gray-700">
              {modalType === "edit" ? "Edit Contact" : "Delete Contact"}
            </DialogTitle>

            <Description className="mt-2 text-gray-600">
              {modalType === "edit"
                ? "Update the contact details below."
                : "Are you sure you want to delete this contact? This action cannot be undone."}
            </Description>

            {modalType === "edit" ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedContact.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md text-gray-700 w-full"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={editedContact.role}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md text-gray-700 w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editedContact.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md text-gray-700 w-full"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedContact.phone}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md text-gray-700 w-full"
                  />
                </div>
              </div>
            ) : null}

            {/* Modal Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                {modalType === "edit" ? "Cancel" : "No"}
              </button>
              {modalType === "edit" ? (
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Update
                </button>
              ) : (
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Yes, Delete
                </button>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};

export default ContactCard;
