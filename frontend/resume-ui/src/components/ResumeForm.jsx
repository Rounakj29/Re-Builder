import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://localhost:7211/api/Resumes';

export default function ResumeFormModal({ isOpen, onClose, onAdd, onUpdate, editingResume }) {
  const emptyResume = {
    fullName: '',
    title: '',
    summary: '',
    contactInfo: { email: '', phone: '', address: '' },
    experiences: [],
    educations: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    socialLinks: [],
  };

  const [form, setForm] = useState(emptyResume);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingResume) {
      setForm({ ...emptyResume, ...editingResume });
    }
  }, [editingResume]);

  const handleChange = (e, path = []) => {
    const updated = { ...form };
    let obj = updated;
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = e.target.value;
    setForm(updated);
  };

  const handleListChange = (section, index, field, value) => {
    const updated = { ...form };
    updated[section][index][field] = value;
    setForm(updated);
  };

  const addItem = section => {
    const templates = {
      experiences: { company: '', role: '', location: '', startDate: '', endDate: '', description: '', technologies: [] },
      educations: { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', gradeOrScore: '' },
      projects: { name: '', summary: '', technologies: '', url: '' },
      skills: { name: '', category: '', proficiency: '' },
      certifications: { title: '', issuer: '', dateIssued: '', expirationDate: '', credentialUrl: '' },
      languages: { name: '', proficiency: '' },
      socialLinks: { platform: '', url: '' },
    };
    setForm(prev => ({
      ...prev,
      [section]: [...prev[section], templates[section]]
    }));
  };

  const removeItem = (section, index) => {
    const updated = [...form[section]];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingResume) {
        await axios.put(`${API}/${editingResume.id}`, form);
        onUpdate(form);
      } else {
        const res = await axios.post(API, form);
        onAdd(res.data);
      }
      onClose();
      setForm(emptyResume);
    } catch (err) {
      console.error('Error details:', err); // Log the full error object for debugging
      const status = err.response?.status;
      const errorData = err.response?.data;
      const errorMessage = errorData?.message || err.message || 'Failed to save resume';

      // Include status code and additional details in the error message
      setError(`Error ${status || ''}: ${errorMessage}. ${errorData ? JSON.stringify(errorData) : ''}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    return form.fullName && form.title && form.summary;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-h-[90vh] overflow-y-auto max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          {editingResume ? 'Edit Resume' : 'Add New Resume'}
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
    <input
      name="fullName"
      value={form.fullName}
      onChange={e => handleChange(e, ['fullName'])}
      placeholder="Full Name"
      className="input w-full"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input
      name="title"
      value={form.title}
      onChange={e => handleChange(e, ['title'])}
      placeholder="Title"
      className="input w-full"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
    <textarea
      name="summary"
      value={form.summary}
      onChange={e => handleChange(e, ['summary'])}
      placeholder="Summary"
      className="input w-full"
      required
    />
  </div>
</div>


          {/* Contact Info */}
          <h3 className="font-semibold text-gray-700">Contact Info</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                placeholder="Email"
                className="input"
                value={form.contactInfo?.email || ''}
                onChange={e => handleChange(e, ['contactInfo', 'email'])}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Phone</label>
              <input
                placeholder="Phone"
                className="input"
                value={form.contactInfo?.phone || ''}
                onChange={e => handleChange(e, ['contactInfo', 'phone'])}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Address</label>
              <input
                placeholder="Address"
                className="input"
                value={form.contactInfo?.address || ''}
                onChange={e => handleChange(e, ['contactInfo', 'address'])}
              />
            </div>
          </div>

          {/* Reusable Section Builder */}
          {[
            { label: 'Experiences', key: 'experiences', fields: ['company', 'role', 'location', 'startDate', 'endDate', 'description'] },
            { label: 'Educations', key: 'educations', fields: ['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'gradeOrScore'] },
            { label: 'Projects', key: 'projects', fields: ['name', 'summary', 'technologies', 'url'] },
            { label: 'Skills', key: 'skills', fields: ['name', 'category', 'proficiency'] },
            { label: 'Certifications', key: 'certifications', fields: ['title', 'issuer', 'dateIssued', 'expirationDate', 'credentialUrl'] },
            { label: 'Languages', key: 'languages', fields: ['name', 'proficiency'] },
            { label: 'Social Links', key: 'socialLinks', fields: ['platform', 'url'] },
          ].map(section => (
            <div key={section.key}>
              <div className="flex justify-between items-center mt-6">
                <h3 className="font-semibold text-gray-700">{section.label}</h3>
                <button type="button" onClick={() => addItem(section.key)} className="text-blue-600 text-sm">
                  + Add
                </button>
              </div>
              {form[section.key].map((item, i) => (
                <div key={i} className="border p-4 mb-2 rounded relative bg-gray-50">
                  {section.fields.map(field => (
  <div key={field} className="mb-4">
    <label className="font-semibold text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
    <input
      className="input"
      placeholder={field}
      type={['startDate', 'endDate', 'dateIssued', 'expirationDate'].includes(field) ? 'date' : 'text'}
      value={item[field] || ''}
      onChange={e => handleListChange(section.key, i, field, e.target.value)}
    />
  </div>
))}
                  <button
                    type="button"
                    onClick={() => removeItem(section.key, i)}
                    className="text-red-500 text-sm absolute top-2 right-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button type="button" onClick={() => { setForm(emptyResume); onClose(); }} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !validateForm()}
              className={`px-4 py-2 rounded ${loading || !validateForm() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
            >
              {loading ? 'Submitting...' : editingResume ? 'Update Resume' : 'Add Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
