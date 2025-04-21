import { useEffect, useState } from 'react';
import axios from 'axios';
import ResumeForm from '../components/ResumeForm';

const API = 'https://localhost:7211/api/resumes';

function Home() {
  const [resumes, setResumes] = useState([]);
  const [editingResume, setEditingResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch resumes from API on component mount
  useEffect(() => {
    axios
      .get(API)
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (newResume) => {
    setResumes(prev => [...prev, newResume]);
    setIsModalOpen(false); // Close the modal after adding the resume
  };

  const handleUpdate = (updatedResume) => {
    setResumes(prev =>
      prev.map(resume => (resume.id === updatedResume.id ? updatedResume : resume))
    );
    setIsModalOpen(false); // Close the modal after updating the resume
    setEditingResume(null); // Clear the editing state
  };

  const handleEdit = (resume) => {
    setEditingResume(resume);
    setIsModalOpen(true); // Open the modal for editing the resume
  };

  const handleAddNew = () => {
    setEditingResume(null); // Ensure no resume is being edited when adding a new one
    setIsModalOpen(true); // Open the modal for adding a new resume
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>
      
      {/* Add Resume Button */}
      <button
        onClick={handleAddNew}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add New User
      </button>

      {/* Render ResumeForm Modal */}
      <ResumeForm
        isOpen={isModalOpen}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onClose={() => setIsModalOpen(false)} // Close the modal
        editingResume={editingResume}
      />

      {/* Render Resumes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resumes.map(resume => (
          <div key={resume.id} className="border p-4 mb-2 rounded shadow bg-white">
            <h2 className="text-xl text-gray-900 font-semibold">{resume.fullName}</h2>
            <p className="text-gray-700">{resume.title}</p>
            <p className="text-gray-500">{resume.summary}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(resume)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => alert('View functionality not implemented yet.')}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
