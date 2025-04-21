import React from 'react';

// You can forwardRef to allow printing
const ResumePreview = React.forwardRef(({ resume }, ref) => {
  if (!resume) return null;

  const {
    fullName,
    title,
    summary,
    contactInfo,
    experiences,
    educations,
    projects,
    skills,
    certifications,
    languages,
    socialLinks,
  } = resume;

  return (
    <div ref={ref} className="p-6 text-gray-900 font-sans bg-white">
      <h1 className="text-3xl font-bold">{fullName}</h1>
      <h2 className="text-xl text-gray-600">{title}</h2>
      <p className="mt-2">{summary}</p>

      <section className="mt-6">
        <h3 className="text-lg font-semibold">Contact Info</h3>
        <p>Email: {contactInfo?.email}</p>
        <p>Phone: {contactInfo?.phone}</p>
        <p>Address: {contactInfo?.address}</p>
      </section>

      {experiences.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Experience</h3>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{exp.role} at {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {educations.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Education</h3>
          {educations.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{edu.degree}, {edu.fieldOfStudy}</p>
              <p className="text-sm text-gray-600">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{proj.name}</p>
              <p>{proj.summary}</p>
              <p className="text-sm text-blue-500">{proj.url}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <ul className="list-disc ml-5">
            {skills.map((skill, i) => (
              <li key={i}>{skill.name} ({skill.proficiency})</li>
            ))}
          </ul>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i}>
              <p>{cert.title} - {cert.issuer}</p>
              <p className="text-sm">{cert.dateIssued} - {cert.expirationDate}</p>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Languages</h3>
          <ul className="list-disc ml-5">
            {languages.map((lang, i) => (
              <li key={i}>{lang.name} ({lang.proficiency})</li>
            ))}
          </ul>
        </section>
      )}

      {socialLinks.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Social Links</h3>
          <ul>
            {socialLinks.map((link, i) => (
              <li key={i}><a href={link.url} className="text-blue-600">{link.platform}</a></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

export default ResumePreview;
