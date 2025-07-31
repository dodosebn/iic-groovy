'use client';

import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Question {
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export function DynamicSurveyForm({ survey }: { survey: Survey }) {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name] || []), value] 
          : (prev[name] || []).filter((v: string) => v !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    survey.questions.forEach((q, idx) => {
      if (q.required) {
        if (q.type === 'checkbox' || q.type === 'radio') {
          if (!formData[`question-${idx}`] || formData[`question-${idx}`].length === 0) {
            newErrors[`question-${idx}`] = 'This field is required';
            isValid = false;
          }
        } else {
          if (!formData[`question-${idx}`]?.trim()) {
            newErrors[`question-${idx}`] = 'This field is required';
            isValid = false;
          }
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleCaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
    if (token) {
      submitForm();
    }
  };

const submitForm = async () => {
  const toastId = toast.loading('Submitting your survey...', {
    position: "top-center"
  });

  try {
    const response = await fetch('/api/survey_responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyId: survey.id,
        answers: formData,
      }),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || 'Something went wrong');

    toast.update(toastId, {
      render: "Survey submitted successfully!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });

    setFormData({});
    setErrors({});
  } catch (err: any) {
    toast.update(toastId, {
      render: `Error: ${err.message}`,
      type: "error",
      isLoading: false,
    });
  } finally {
    setShowCaptcha(false);
    setIsVerified(false);
    captchaRef.current?.reset();
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      toast.error('Please fill in all required fields correctly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    
    setShowCaptcha(true);
    if (isVerified) {
      submitForm();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="w-full py-3 flex flex-col gap-5 bg-transparent">
        <h2 className="font-sans text-2xl font-bold text-gray-800">{survey.title}</h2>
        <p className="font-sans text-sm text-gray-600">{survey.description}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {survey.questions.map((q, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="font-sans text-lg text-gray-800">
                {q.label}
                {q.required && <span className="text-red-500"> *</span>}
              </label>

              {q.type === 'text' && (
                <input
                  type="text"
                  name={`question-${idx}`}
                  className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
              )}

              {q.type === 'textarea' && (
                <textarea
                  name={`question-${idx}`}
                  className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors"
                  rows={4}
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
              )}

              {q.type === 'rating' && (
                <input
                  type="number"
                  name={`question-${idx}`}
                  min={1}
                  max={5}
                  className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
              )}

              {q.type === 'checkbox' && q.options?.length ? (
                <div className="flex flex-col gap-2.5">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center gap-2 text-base">
                      <input
                        type="checkbox"
                        name={`question-${idx}`}
                        value={option}
                        onChange={handleChange}
                        checked={formData[`question-${idx}`]?.includes(option) || false}
                        className="w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {q.type === 'radio' && q.options?.length ? (
                <div className="flex flex-col gap-2.5">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={option}
                        onChange={handleChange}
                        checked={formData[`question-${idx}`] === option}
                        className="w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {q.type === 'select' && q.options?.length ? (
                <select
                  name={`question-${idx}`}
                  className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                >
                  <option value="">Select</option>
                  {q.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}

              {errors[`question-${idx}`] && (
                <div className="text-red-500 text-sm mt-1">{errors[`question-${idx}`]}</div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-8 bg-pink-500 text-white font-bold py-4 px-6 rounded-full text-lg cursor-pointer hover:bg-pink-600 transition-colors"
          >
            Submit Survey
          </button>

          {showCaptcha && (
            <div className="mt-5">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
}