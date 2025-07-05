'use client'
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';

type FormData = {
  fullName: string;
  currentRole: string[];
  location: {
    city: string;
    willingToRelocate: string;
  };
  workPreferences: {
    environment: string[];
    communication: string[];
    schedule: string;
  };
  careerGoals: {
    dreamJob: string;
    motivation: string;
    openToInternship: string;
  };
  expectations: {
    benefits: string[];
    salaryRange: string;
  };
  educationStatus: string;
  employmentStatus: string;
  contactInfo: {
    method: string;
    details: string;
  };
  additionalComments: string;
};

type FormSection = 'personal' | 'preferences' | 'career' | 'contact';
type ProgressSteps = { id: FormSection; label: string }[];

const FormSurvey3 = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    currentRole: [],
    location: { city: '', willingToRelocate: '' },
    workPreferences: { environment: [], communication: [], schedule: '' },
    careerGoals: { dreamJob: '', motivation: '', openToInternship: '' },
    expectations: { benefits: [], salaryRange: '' },
    educationStatus: '',
    employmentStatus: '',
    contactInfo: { method: '', details: '' },
    additionalComments: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const progressSteps: ProgressSteps = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'career', label: 'Career Goals' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof FormData, string];
      
      if (type === 'checkbox') {
        const currentOptions = (formData[parent] as any)[child] as string[] || [];
        const updatedOptions = checked 
          ? [...currentOptions, value]
          : currentOptions.filter(item => item !== value);
        
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent] as object),
            [child]: updatedOptions
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent] as object),
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    // Personal section validation
    if (formData.currentRole.length === 0) {
      newErrors.currentRole = 'Please select at least one option';
      isValid = false;
    }
    if (!formData.location.city.trim()) {
      newErrors.location = 'Please enter your current city';
      isValid = false;
    }
    if (!formData.location.willingToRelocate) {
      newErrors.location = 'Please indicate relocation willingness';
      isValid = false;
    }

    // Preferences section validation
    if (formData.workPreferences.environment.length === 0) {
      newErrors.workPreferences = 'Please select at least one work environment';
      isValid = false;
    }
    if (formData.workPreferences.communication.length === 0) {
      newErrors.workPreferences = 'Please select at least one communication method';
      isValid = false;
    }
    if (!formData.workPreferences.schedule) {
      newErrors.workPreferences = 'Please indicate weekend work preference';
      isValid = false;
    }

    // Career section validation
    if (!formData.careerGoals.dreamJob.trim()) {
      newErrors.careerGoals = 'Please describe your dream job';
      isValid = false;
    }
    if (!formData.careerGoals.motivation.trim()) {
      newErrors.careerGoals = 'Please describe your motivation';
      isValid = false;
    }
    if (!formData.careerGoals.openToInternship) {
      newErrors.careerGoals = 'Please indicate internship interest';
      isValid = false;
    }
    if (formData.expectations.benefits.length === 0) {
      newErrors.expectations = 'Please select at least one benefit';
      isValid = false;
    }
    if (!formData.expectations.salaryRange.trim()) {
      newErrors.expectations = 'Please provide expected salary range';
      isValid = false;
    }

    // Contact section validation
    if (!formData.contactInfo.method) {
      newErrors.contactInfo = 'Please select a contact method';
      isValid = false;
    }
    if (!formData.contactInfo.details.trim()) {
      newErrors.contactInfo = 'Please provide contact details';
      isValid = false;
    } else if (
      formData.contactInfo.method === 'Email' && 
      !/^\S+@\S+\.\S+$/.test(formData.contactInfo.details)
    ) {
      newErrors.contactInfo = 'Please enter a valid email address';
      isValid = false;
    } else if (
      (formData.contactInfo.method === 'WhatsApp' || formData.contactInfo.method === 'Telegram') && 
      !/^[0-9]+$/.test(formData.contactInfo.details)
    ) {
      newErrors.contactInfo = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCaptchaChange = (value: string | null) => {
    setIsVerified(!!value);
    if (value) {
      submitForm();
    }
  };

  const submitForm = () => {
    const toastId = toast.loading('Submitting your form...', {
      position: "top-center"
    });

    const templateParams = {
      from_name: formData.fullName || 'Anonymous',
      to_name: 'Survey Administrator',
      message: `
        Full Name: ${formData.fullName || 'Not provided'}
        
        Current Role: ${formData.currentRole.join(', ') || 'Not specified'}
        Location: ${formData.location.city || 'Not specified'}
        Willing to Relocate: ${formData.location.willingToRelocate || 'Not specified'}
        
        Preferred Work Environment: ${formData.workPreferences.environment.join(', ') || 'Not specified'}
        Preferred Communication: ${formData.workPreferences.communication.join(', ') || 'Not specified'}
        Willing to Work Weekends: ${formData.workPreferences.schedule || 'Not specified'}
        
        Dream Job Description: ${formData.careerGoals.dreamJob || 'Not provided'}
        Primary Motivation: ${formData.careerGoals.motivation || 'Not provided'}
        Open to Internship: ${formData.careerGoals.openToInternship || 'Not specified'}
        
        Desired Benefits: ${formData.expectations.benefits.join(', ') || 'Not specified'}
        Expected Salary Range: ${formData.expectations.salaryRange || 'Not specified'}
        
        Currently Studying: ${formData.educationStatus || 'Not specified'}
        Currently Employed: ${formData.employmentStatus || 'Not specified'}
        
        Preferred Contact Method: ${formData.contactInfo.method || 'Not specified'}
        Contact Details: ${formData.contactInfo.details || 'Not provided'}
        
        Additional Comments: ${formData.additionalComments || 'None'}
      `,
      reply_to: formData.contactInfo.method === 'Email' ? formData.contactInfo.details : 'no-reply@example.com'
    };

    emailjs.send(
      process.env.EMAIL_SERVICE!,
      process.env.EMAIL_TEMPLATE!,
      templateParams,
      process.env.EMAIL_GENERAL
    )
    .then(() => {
      toast.update(toastId, {
        render: "Form submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      
      setFormData({
        fullName: '',
        currentRole: [],
        location: {
          city: '',
          willingToRelocate: '',
        },
        workPreferences: {
          environment: [],
          communication: [],
          schedule: '',
        },
        careerGoals: {
          dreamJob: '',
          motivation: '',
          openToInternship: '',
        },
        expectations: {
          benefits: [],
          salaryRange: '',
        },
        educationStatus: '',
        employmentStatus: '',
        contactInfo: {
          method: '',
          details: '',
        },
        additionalComments: '',
      });
    })
    .catch((err) => {
      toast.update(toastId, {
        render: `Failed to submit form: ${err.text || 'Please try again later.'}`,
        type: "error",
        isLoading: false,
      });
    })
    .finally(() => {
      setShowCaptcha(false);
      setIsVerified(false);
      captchaRef.current?.reset();
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowCaptcha(true);
      if (isVerified) {
        submitForm();
      }
    } else {
      toast.error('Please fill in all required fields correctly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen py-12 lg:px-8">
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
      
      <div>
        <div className="pt-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Career Preferences Survey</h1>
            
            <div className="relative">
              <div className="flex justify-between mb-2">
                {progressSteps.map((step) => (
                  <div
                    key={step.id}
                    className="text-sm font-medium text-indigo-600"
                  >
                    {step.label}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: '100%' }}              
                />
              </div>
            </div>
          </div>
        </div>

        <form 
          ref={formRef}
          className="pb-5 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2
                 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Which of these best describe you? (Select all that apply) *
              </label>
              {errors.currentRole && <p className="text-red-500 text-xs mb-2">{errors.currentRole}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Student', 'Professional', 'Freelancer', 'Entrepreneur'].map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="currentRole"
                      value={role}
                      checked={formData.currentRole.includes(role)}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-1 rounded"
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current City *
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="New York"
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Would you consider relocating? *
                </label>
                <select
                  name="location.willingToRelocate"
                  value={formData.location.willingToRelocate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe, for the right opportunity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Work Preferences Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Work Preferences</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Work Environments (Select all that apply) *
              </label>
              {errors.workPreferences && <p className="text-red-500 text-xs mb-2">{errors.workPreferences}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Office', 'Remote', 'Hybrid', 'Flexible'].map((env) => (
                  <label key={env} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="workPreferences.environment"
                      value={env}
                      checked={formData.workPreferences.environment.includes(env)}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-1 rounded"
                    />
                    <span className="text-sm text-gray-700">{env}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Communication Methods (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Email', 'Phone', 'Messaging Apps', 'In-person'].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="workPreferences.communication"
                      value={method}
                      checked={formData.workPreferences.communication.includes(method)}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-1 rounded"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Are you willing to work weekends? *
              </label>
              <select
                name="workPreferences.schedule"
                value={formData.workPreferences.schedule}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md ring-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Occasionally">Occasionally</option>
              </select>
            </div>
          </div>

          {/* Career Goals Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Career Goals</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe your dream job *
              </label>
              <textarea
                name="careerGoals.dreamJob"
                value={formData.careerGoals.dreamJob}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe the type of work environment, responsibilities, and impact you'd like to have..."
              />
              {errors.careerGoals && <p className="text-red-500 text-xs mt-1">{errors.careerGoals}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What motivates you the most in your work? *
              </label>
              <input
                type="text"
                name="careerGoals.motivation"
                value={formData.careerGoals.motivation}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E.g., Solving complex problems, helping others, creative expression..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are you open to internships? *
                </label>
                <select
                  name="careerGoals.openToInternship"
                  value={formData.careerGoals.openToInternship}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md ring-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Depends">Depends on the opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are you currently studying? (Optional)
                </label>
                <select
                  name="educationStatus"
                  value={formData.educationStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What benefits are most important to you? (Select all that apply) *
              </label>
              {errors.expectations && <p className="text-red-500 text-xs mb-2">{errors.expectations}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Health Insurance', 'Remote Work', 'Bonus Pay', 'Vacation Time', 'Professional Development', 'Flexible Hours'].map((benefit) => (
                  <label key={benefit} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="expectations.benefits"
                      value={benefit}
                      checked={formData.expectations.benefits.includes(benefit)}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-1 rounded"
                    />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What is your expected salary range? *
              </label>
              <input
                type="text"
                name="expectations.salaryRange"
                value={formData.expectations.salaryRange}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1  rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E.g., $50,000 - $70,000 or negotiable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Are you currently employed? (Optional)
              </label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No, looking for work</option>
                <option value="Freelance">Freelance/Contract</option>
              </select>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How would you like to be contacted? *
              </label>
              {errors.contactInfo && <p className="text-red-500 text-xs mb-2">{errors.contactInfo}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Email', 'WhatsApp', 'Telegram'].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="contactInfo.method"
                      value={method}
                      checked={formData.contactInfo.method === method}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-1"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.contactInfo.method === 'Email' 
                  ? 'Email Address *' 
                  : 'Phone Number (with country code) *'}
              </label>
              <input
                type={formData.contactInfo.method === 'Email' ? 'email' : 'tel'}
                name="contactInfo.details"
                value={formData.contactInfo.details}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={
                  formData.contactInfo.method === 'Email' 
                    ? 'your.email@example.com' 
                    : '+1 123 456 7890'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Any additional comments or notes? (Optional)
              </label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2
                 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Anything else you'd like to share..."
              />
            </div>

            {showCaptcha && (
              <div className="mt-5">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey="6Lc6zFgrAAAAAKj52053YpaBaLUfFuSrgXxUS_G4"
                  onChange={handleCaptchaChange}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 rounded-lg text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={showCaptcha && !isVerified}
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSurvey3;