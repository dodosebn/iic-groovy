'use client';
import { useEffect, useState } from 'react';

interface SurveyResponse {
  id: number;
  created_at: string;
  full_name: string;
  current_role: string;
  location_city: string;
  willing_to_relocate: boolean;
  work_environment: string;
  communication: string;
  schedule: string;
  dream_job: string;
  motivation: string;
  open_to_internship: boolean;
  benefits: string;
  salary_range: string;
  education_status: string;
  employment_status: string;
  contact_method: string;
  contact_details: string;
  additional_comments: string;
}

const SurveyResponses = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const res = await fetch('/api/send-survey-feedback');
        const data = await res.json();
        setResponses(data);
      } catch (err) {
        console.error('Error fetching survey responses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();
  }, []);

  if (loading) return <p className="p-4">Loading survey responses...</p>;
  if (responses.length === 0) return <p className="p-4">No survey responses yet.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Survey Responses</h1>
      <div className="space-y-6">
        {responses.map((res) => (
          <div key={res.id} className="p-5 border rounded-lg shadow bg-white">
            <p className="text-xs text-gray-500 mb-2">Submitted: {new Date(res.created_at).toLocaleString()}</p>
            <ul className="space-y-1 text-sm text-gray-800">
              <li><strong>Full Name:</strong> {res.full_name}</li>
              <li><strong>Current Role:</strong> {res.current_role}</li>
              <li><strong>City:</strong> {res.location_city}</li>
              <li><strong>Willing to Relocate:</strong> {res.willing_to_relocate ? 'Yes' : 'No'}</li>
              <li><strong>Work Environment:</strong> {res.work_environment}</li>
              <li><strong>Communication:</strong> {res.communication}</li>
              <li><strong>Schedule:</strong> {res.schedule}</li>
              <li><strong>Dream Job:</strong> {res.dream_job}</li>
              <li><strong>Motivation:</strong> {res.motivation}</li>
              <li><strong>Open to Internship:</strong> {res.open_to_internship ? 'Yes' : 'No'}</li>
              <li><strong>Expected Benefits:</strong> {res.benefits}</li>
              <li><strong>Salary Range:</strong> {res.salary_range}</li>
              <li><strong>Education Status:</strong> {res.education_status}</li>
              <li><strong>Employment Status:</strong> {res.employment_status}</li>
              <li><strong>Preferred Contact Method:</strong> {res.contact_method}</li>
              <li><strong>Contact Details:</strong> {res.contact_details}</li>
              <li><strong>Additional Comments:</strong> {res.additional_comments}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyResponses;
