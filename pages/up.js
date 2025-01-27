import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setPhoto(files[0]);
    } else {
      if (name === 'name') setName(value);
      if (name === 'email') setEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('photo', photo);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await res.json();
      if (response.success) {
        toast.success('Form submitted successfully!');
      } else {
        toast.error(`Form submission failed: ${response.error}`);
      }
    } catch (error) {
      toast.error('Form submission failed: An error occurred');
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
