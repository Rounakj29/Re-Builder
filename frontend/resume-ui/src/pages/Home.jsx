import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview.jsx';

const API = 'https://localhost:7211/api/resumes';

function Home() {
  const [resumes, setResumes] = useState([]);
  const [editingResume, setEditingResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const printRef = useRef();

  // Fetch resumes
  useEffect(() => {
    axios
      .get(API)
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: selectedResume ? `${selectedResume.fullName}_Resume` : 'Resume',
    onAfterPrint: () => console.log('Print completed')
  });

  const handleAdd = (newResume) => {
    setResumes(prev => [...prev, newResume]);
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedResume) => {
    setResumes(prev =>
      prev.map(resume => (resume.id === updatedResume.id ? updatedResume : resume))
    );
    setIsModalOpen(false);
    setEditingResume(null);
  };

  const handleEdit = (resume) => {
    setEditingResume(resume);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingResume(null);
    setIsModalOpen(true);
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

      {/* Resume Form Modal */}
      <ResumeForm
        isOpen={isModalOpen}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onClose={() => setIsModalOpen(false)}
        editingResume={editingResume}
      />

      {/* Resume List */}
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
                onClick={() => setSelectedResume(resume)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resume Preview + Download Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-[850px] max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedResume(null)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>

            {/* Download Button */}
            <button 
              onClick={handlePrint}
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Download as PDF
            </button>

            {/* Resume Content */}
            <div className="print-container">
              <ResumePreview ref={printRef} resume={selectedResume} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;