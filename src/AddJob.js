// import React, { useState } from 'react';
// import axios from 'axios';

// const AddJob = () => {
//   const [job, setJob] = useState({
//     title: '',
//     company: '',
//     location: '',
//     affiliateLink: '',
//   });

//   const handleChange = (e) => {
//     setJob({ ...job, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/jobs', job);
//       alert('Job added successfully');
//     } catch (error) {
//       console.error('Error adding job:', error);
//       alert('Failed to add job');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         placeholder="Job Title"
//         value={job.title}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="company"
//         placeholder="Company"
//         value={job.company}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="location"
//         placeholder="Location"
//         value={job.location}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="affiliateLink"
//         placeholder="Affiliate Link"
//         value={job.affiliateLink}
//         onChange={handleChange}
//       />
//       <button type="submit">Add Job</button>
//     </form>
//   );
// };

// export default AddJob;



import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    affiliateLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const [error, setError] = useState(''); // To handle form errors

  const handleChange = (e) => {
    setError(''); // Clear error on input change
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Simple URL validation function
  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate http/https
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate IP
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable form during submission

    // Check if the affiliate link is a valid URL
    if (!isValidUrl(job.affiliateLink)) {
      setError('Please provide a valid URL for the affiliate link.');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/jobs', job); // Backend API endpoint
      alert('Job added successfully');
      setJob({
        title: '',
        company: '',
        location: '',
        affiliateLink: '',
      }); // Reset form after submission
    } catch (error) {
      console.error('Error adding job:', error);
      setError('Failed to add job. Please try again.');
    } finally {
      setIsSubmitting(false); // Enable form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={job.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="affiliateLink"
        placeholder="Affiliate Link (e.g. https://example.com/job123)"
        value={job.affiliateLink}
        onChange={handleChange}
        required
      />

      {/* Display error if there's a validation issue */}
      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Job...' : 'Add Job'}
      </button>
    </form>
  );
};

export default AddJob;
