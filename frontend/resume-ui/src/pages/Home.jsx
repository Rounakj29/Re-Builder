// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResumeForm from '../components/ResumeForm';

const API = 'https://localhost:7211/api/resumes';

function Home() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get(API)
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (newResume) => {
    setResumes(prev => [...prev, newResume]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Manager</h1>
      <ResumeForm onAdd={handleAdd} />
      {resumes.map(resume => (
        <div key={resume.id} className="border p-4 mb-2 rounded shadow">
          <h2 className="text-xl font-semibold">{resume.fullName}</h2>
          <p className="text-gray-700">{resume.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
