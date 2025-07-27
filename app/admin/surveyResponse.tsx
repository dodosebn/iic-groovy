'use client';

import { useEffect, useState, useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { CiTrash, CiSquareCheck } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<SurveyResponse>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const res = await fetch('/api/send-survey-feedback');
        if (!res.ok) throw new Error('Failed to fetch responses');
        const data = await res.json();
        setResponses(data);
      } catch (err) {
        console.error('Error fetching survey responses:', err);
        toast.error('Failed to load survey responses');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();
  }, []);

  const handleEdit = (response: SurveyResponse) => {
    setEditingId(response.id);
    setEditForm({ ...response });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id: number) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/send-survey-feedback/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error('Failed to update response');

      setResponses(responses.map(res => res.id === id ? { ...res, ...editForm } : res));
      setEditingId(null);
      setEditForm({});
      toast.success('Response updated successfully');
    } catch (err) {
      console.error('Error updating survey response:', err);
      toast.error('Failed to update response');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this response?')) return;

    try {
      const res = await fetch(`/api/send-survey-feedback/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete response');

      setResponses(responses.filter(res => res.id !== id));
      toast.success('Response deleted successfully');
    } catch (err) {
      console.error('Error deleting survey response:', err);
      toast.error('Failed to delete response');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
  };

  const getFilterRangeText = () => {
    switch (dateFilter) {
      case '2daysago': return 'last 2 days';
      case '3daysago': return 'last 3 days';
      case '1weekago': return 'last week';
      case '1monthago': return 'last month';
      default: return '';
    }
  };

  const normalizeDate = (dateString: string) => {
    // Parse the Supabase timestamp (e.g., "2025-07-27 10:31:41.998438+00")
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const { filteredResponses, filterMessage } = useMemo(() => {
    let message = '';
    const lowerSearch = searchTerm.toLowerCase().trim();
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let startDate = new Date(0);

    switch (dateFilter) {
      case '2daysago':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 2);
        break;
      case '3daysago':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 3);
        break;
      case '1weekago':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case '1monthago':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        break;
    }

    const filtered = responses.filter((response) => {
      const matchesSearch =
        response.full_name.toLowerCase().includes(lowerSearch) ||
        response.current_role.toLowerCase().includes(lowerSearch) ||
        response.location_city.toLowerCase().includes(lowerSearch);

      const createdAt = normalizeDate(response.created_at);
      const isInDateRange = dateFilter ? createdAt >= startDate : true;

      return matchesSearch && isInDateRange;
    });

    if (filtered.length === 0) {
      if (dateFilter && searchTerm) {
        message = `No responses found for ${getFilterRangeText()} matching "${searchTerm}"`;
      } else if (dateFilter) {
        message = `No responses found for ${getFilterRangeText()}`;
      } else if (searchTerm) {
        message = `No responses match "${searchTerm}"`;
      }
    }

    return { filteredResponses: filtered, filterMessage: message };
  }, [responses, searchTerm, dateFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (responses.length === 0) return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">No Survey Responses Yet</h1>
      <p className="text-gray-600">Check back later when responses start coming in.</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Survey Responses</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search responses..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <MdCancelPresentation className="h-5 w-5" />
              </button>
            )}
          </div>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Dates</option>
            <option value="2daysago">Last 2 Days</option>
            <option value="3daysago">Last 3 Days</option>
            <option value="1weekago">Last 7 Days</option>
            <option value="1monthago">Last 30 Days</option>
          </select>

          {(searchTerm || dateFilter) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredResponses.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {filterMessage || 'No responses found'}
            {(searchTerm || dateFilter) && (
              <button
                onClick={clearFilters}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors block mx-auto"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          filteredResponses.map((res) => (
            <div key={res.id} className="border rounded-lg shadow bg-white overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-b">
                <div>
                  <h3 className="font-medium text-gray-900">{res.full_name}</h3>
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(res.created_at).toLocaleString()} • {res.location_city}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {editingId === res.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(res.id)}
                        disabled={updatingId === res.id}
                        className="p-1 text-green-600 hover:text-green-800 flex items-center space-x-1"
                        title="Save"
                      >
                        {updatingId === res.id ? (
                          <span className="text-xs animate-pulse">Updating...</span>
                        ) : (
                          <CiSquareCheck className="h-5 w-5" />
                        )}
                      </button>
                      <button onClick={handleCancelEdit} className="p-1 text-red-600 hover:text-red-800" title="Cancel">
                        <MdCancelPresentation className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(res)} className="p-1 text-blue-600 hover:text-blue-800" title="Edit">
                        <FaRegEdit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(res.id)} className="p-1 text-red-600 hover:text-red-800" title="Delete">
                        <CiTrash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-5">
                {editingId === res.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" name="full_name" value={editForm.full_name || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                      <input type="text" name="current_role" value={editForm.current_role || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" name="location_city" value={editForm.location_city || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" name="willing_to_relocate" checked={editForm.willing_to_relocate || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-700">Willing to Relocate</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Environment</label>
                      <input type="text" name="work_environment" value={editForm.work_environment || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Communication</label>
                      <input type="text" name="communication" value={editForm.communication || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dream Job</label>
                      <textarea name="dream_job" value={editForm.dream_job || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" rows={2} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                      <textarea name="additional_comments" value={editForm.additional_comments || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" rows={2} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="py-1"><strong className="text-gray-700">Current Role:</strong> {res.current_role}</div>
                    <div className="py-1"><strong className="text-gray-700">City:</strong> {res.location_city}</div>
                    <div className="py-1"><strong className="text-gray-700">Willing to Relocate:</strong> {res.willing_to_relocate ? 'Yes' : 'No'}</div>
                    <div className="py-1"><strong className="text-gray-700">Work Environment:</strong> {res.work_environment}</div>
                    <div className="py-1"><strong className="text-gray-700">Communication:</strong> {res.communication}</div>
                    <div className="py-1"><strong className="text-gray-700">Schedule:</strong> {res.schedule}</div>
                    <div className="py-1"><strong className="text-gray-700">Dream Job:</strong> {res.dream_job}</div>
                    <div className="py-1"><strong className="text-gray-700">Motivation:</strong> {res.motivation}</div>
                    <div className="py-1"><strong className="text-gray-700">Open to Internship:</strong> {res.open_to_internship ? 'Yes' : 'No'}</div>
                    <div className="py-1"><strong className="text-gray-700">Expected Benefits:</strong> {res.benefits}</div>
                    <div className="py-1"><strong className="text-gray-700">Salary Range:</strong> {res.salary_range}</div>
                    <div className="py-1"><strong className="text-gray-700">Education Status:</strong> {res.education_status}</div>
                    <div className="py-1"><strong className="text-gray-700">Employment Status:</strong> {res.employment_status}</div>
                    <div className="py-1"><strong className="text-gray-700">Contact Method:</strong> {res.contact_method}</div>
                    <div className="py-1"><strong className="text-gray-700">Contact Details:</strong> {res.contact_details}</div>
                    <div className="md:col-span-2 py-1">
                      <strong className="text-gray-700">Additional Comments:</strong>
                      <p className="mt-1 text-gray-800">{res.additional_comments}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SurveyResponses;