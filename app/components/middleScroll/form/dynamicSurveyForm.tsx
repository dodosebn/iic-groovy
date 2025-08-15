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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v: string) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
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
        const field = formData[`question-${idx}`];
        if (
          (q.type === 'checkbox' || q.type === 'radio') &&
          (!field || field.length === 0)
        ) {
          newErrors[`question-${idx}`] = 'This field is required';
          isValid = false;
        } else if (!field?.toString().trim()) {
          newErrors[`question-${idx}`] = 'This field is required';
          isValid = false;
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
      position: 'top-center',
    });

    try {
      const labeledAnswers: Record<string, any> = {};
      survey.questions.forEach((q, idx) => {
        const key = `question-${idx}`;
        labeledAnswers[q.label] = formData[key];
      });

      const questions = survey.questions.map((q, idx) => ({
        id: `question-${idx}`,
        text: q.label,
      }));

      const response = await fetch('/api/survey_responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId: survey.id,
          surveyTitle: survey.title,
          questions,
          answers: labeledAnswers,
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      toast.update(toastId, {
        render: 'Survey submitted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      setFormData({});
      setErrors({});
    } catch (err: any) {
      toast.update(toastId, {
        render: `Error: ${err.message}`,
        type: 'error',
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
        const errorElement = document.querySelector(
          `[name="${firstErrorField}"]`
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      toast.error('Please fill in all required fields correctly', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'colored',
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
      <ToastContainer position="top-center" theme="colored" />

      <div className="w-full max-w-2xl mx-auto py-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">{survey.title}</h2>
        <p className="text-lg text-gray-600 text-center">{survey.description}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {survey.questions.map((q, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <label className="text-xl font-bold text-gray-900">
                {idx + 1}. {q.label}
                {q.required && <span className="text-red-500 ml-1">*</span>}
              </label>
<div className='ml-2'>
              {q.type === 'text' && (
                <div className='ml-2'>

                <input
                  type="text"
                  name={`question-${idx}`}
                  className="border border-gray-500 rounded-md py-2 px-3 w-full focus:border-transparent text-gray-700"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
                </div>

              )}
</div>
              {q.type === 'textarea' && (
                                <div className='ml-2'>

                <textarea
                  name={`question-${idx}`}
                  className="border border-gray-500 rounded-md py-2 px-3 w-full focus:border-transparent text-gray-700"
                  rows={4}
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
                </div>
              )}

              {q.type === 'rating' && (
                                <div className='ml-2'>
                <input
                  type="number"
                  name={`question-${idx}`}
                  min={1}
                  max={5}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:border-transparent text-gray-700"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                />
                </div>
              )}

              {q.type === 'checkbox' && (
                                                    <div className='ml-2'>

                <div className="flex flex-row flex-wrap gap-7">
                  {q.options?.map((option, i) => (

                    <label key={i} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="checkbox"
                        name={`question-${idx}`}
                        value={option}
                        onChange={handleChange}
                        checked={formData[`question-${idx}`]?.includes(option) || false}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                    <span className="text-md capitalize text-gray-800">{option}</span>
                    </label>
                  ))}
                                      </div>

                </div>
              )}

              {q.type === 'radio' && (
                                                    <div className='ml-2'>

                <div className="flex flex-row flex-wrap gap-7">
                  
                  {q.options?.map((option, i) => (

                    <label key={i} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={option}
                        onChange={handleChange}
                        checked={formData[`question-${idx}`] === option}
                        className="w-5 h-5  text-pink-600 focus:ring-pink-500 border-gray-300"
                      />
                    <span className="text-md capitalize text-gray-800">{option}</span>
                    </label>
                  ))}
</div>
                </div>
              )}

              {q.type === 'select' && (
                                <div className='ml-2'>

                <select
                  name={`question-${idx}`}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:border-transparent text-gray-700"
                  onChange={handleChange}
                  value={formData[`question-${idx}`] || ''}
                >
                  <option value="">Select an option</option>
                  {q.options?.map((option, i) => (
                    <option key={i} value={option} className="text-md capitalize text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
                </div>
              )}

              {errors[`question-${idx}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`question-${idx}`]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 bg-pink-600 text-white font-bold py-3 px-6 rounded-4xl hover:bg-pink-700 
            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors text-lg"
          >
            Submit Survey
          </button>

          {showCaptcha && (
            <div className="mt-5 flex justify-center">
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
