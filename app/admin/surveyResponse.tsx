'use client';

import { useEffect, useState, useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { CiTrash, CiSquareCheck } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SurveyResponse {
  id: string;
  survey_id: string;
  answers: Record<string, string | string[]>;
  created_at: string;
}

export default function SurveyResponses() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string | string[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/send-survey-feedback');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponses(data);
      } catch (err) {
        console.error('Error fetching responses:', err);
        toast.error('Failed to load responses');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleEdit = (response: SurveyResponse) => {
    setEditingId(response.id);
    setEditForm({ ...response.answers });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/send-survey-feedback/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: editForm }),
      });

      if (!res.ok) throw new Error('Failed to update response');

      setResponses(responses.map(res => 
        res.id === id ? { ...res, answers: editForm } : res
      ));
      setEditingId(null);
      toast.success('Response updated successfully');
    } catch (err) {
      console.error('Error updating response:', err);
      toast.error('Failed to update response');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this response?')) return;

    try {
      const res = await fetch(`/api/send-survey-feedback/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete response');

      setResponses(responses.filter(res => res.id !== id));
      toast.success('Response deleted successfully');
    } catch (err) {
      console.error('Error deleting response:', err);
      toast.error('Failed to delete response');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
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
      // Search through all answer values
      const answerValues = Object.values(response.answers).flatMap(answer => 
        Array.isArray(answer) ? answer : [answer]
      );
      
      const matchesSearch = answerValues.some(value => 
        String(value).toLowerCase().includes(lowerSearch)
      );

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

  const formatAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer || 'No answer provided';
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
          filteredResponses.map((response) => (
            <div key={response.id} className="border rounded-lg shadow bg-white overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-b">
                <div>
                  <h3 className="font-medium text-gray-900">Survey ID: {response.survey_id}</h3>
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(response.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {editingId === response.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(response.id)}
                        disabled={updatingId === response.id}
                        className="p-1 text-green-600 hover:text-green-800 flex items-center space-x-1"
                        title="Save"
                      >
                        {updatingId === response.id ? (
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
                      <button onClick={() => handleEdit(response)} className="p-1 text-blue-600 hover:text-blue-800" title="Edit">
                        <FaRegEdit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(response.id)} className="p-1 text-red-600 hover:text-red-800" title="Delete">
                        <CiTrash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-5">
                {editingId === response.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(response.answers).map(([questionKey, answer]) => (
                      <div key={questionKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {questionKey}
                        </label>
                        <textarea
                          name={questionKey}
                          value={Array.isArray(editForm[questionKey]) 
                            ? (editForm[questionKey] as string[]).join(', ')
                            : (editForm[questionKey] as string) || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(response.answers).map(([questionKey, answer], index) => (
                      <div key={index} className="border-b pb-2 last:border-b-0">
                        <p className="text-sm font-medium text-gray-700">{questionKey}</p>
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {formatAnswer(answer)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}