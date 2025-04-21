// src/components/ResumeForm.jsx
import { useState } from 'react';
import axios from 'axios';

const API = 'https://localhost:7211/api/Resumes';

function ResumeForm({ onAdd }) {
  const [form, setForm] = useState({
    fullName: '',
    title: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(API, form);
      onAdd(res.data); // send back to parent
      setForm({ fullName: '', title: '' }); // reset
    } catch (err) {
      console.error('Failed to create resume', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Add New Resume</h2>
      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="block mb-2 p-2 border w-full"
        required
      />
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="block mb-2 p-2 border w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}

export default ResumeForm;
