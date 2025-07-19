'use client';
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';

type ContactMethod = 'WhatsApp' | 'Telegram' | 'Email' | '';
type YesNo = 'Yes' | 'No' | '';

interface FormData {
  fullName: string;
  currentRole: string[];
  location: {
    city: string;
    willingToRelocate: YesNo;
  };
  workPreferences: {
    environment: string[];
    communication: string[];
    schedule: YesNo;
  };
  careerGoals: {
    dreamJob: string;
    motivation: string;
    openToInternship: YesNo;
  };
  expectations: {
    benefits: string[];
    salaryRange: string;
  };
  educationStatus: YesNo;
  employmentStatus: YesNo;
  contactInfo: {
    method: ContactMethod;
    details: string;
  };
  additionalComments: string;
}

const FormSurvey2 = () => {
  const [formData, setFormData] = useState<FormData>({
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
    additionalComments: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;
    
    if (name.startsWith('currentRole-')) {
      const role = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        currentRole: checked 
          ? [...prev.currentRole, role] 
          : prev.currentRole.filter(r => r !== role)
      }));
    } 
    else if (name.startsWith('workEnvironment-')) {
      const env = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        workPreferences: {
          ...prev.workPreferences,
          environment: checked 
            ? [...prev.workPreferences.environment, env] 
            : prev.workPreferences.environment.filter(e => e !== env)
        }
      }));
    }
    else if (name.startsWith('communication-')) {
      const method = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        workPreferences: {
          ...prev.workPreferences,
          communication: checked 
            ? [...prev.workPreferences.communication, method] 
            : prev.workPreferences.communication.filter(m => m !== method)
        }
      }));
    }
    else if (name.startsWith('benefits-')) {
      const benefit = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        expectations: {
          ...prev.expectations,
          benefits: checked 
            ? [...prev.expectations.benefits, benefit] 
            : prev.expectations.benefits.filter(b => b !== benefit)
        }
      }));
    }
    else if (name === 'city') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          city: value
        }
      }));
    }
    else if (name === 'willingToRelocate') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          willingToRelocate: value as YesNo
        }
      }));
    }
    else if (name === 'dreamJob') {
      setFormData(prev => ({
        ...prev,
        careerGoals: {
          ...prev.careerGoals,
          dreamJob: value
        }
      }));
    }
    else if (name === 'openToInternship') {
      setFormData(prev => ({
        ...prev,
        careerGoals: {
          ...prev.careerGoals,
          openToInternship: value as YesNo
        }
      }));
    }
    else if (name === 'motivation') {
      setFormData(prev => ({
        ...prev,
        careerGoals: {
          ...prev.careerGoals,
          motivation: value
        }
      }));
    }
    else if (name === 'willingToWorkWeekends') {
      setFormData(prev => ({
        ...prev,
        workPreferences: {
          ...prev.workPreferences,
          schedule: value as YesNo
        }
      }));
    }
    else if (name === 'salaryRange') {
      setFormData(prev => ({
        ...prev,
        expectations: {
          ...prev.expectations,
          salaryRange: value
        }
      }));
    }
    else if (name === 'currentlyStudying') {
      setFormData(prev => ({
        ...prev,
        educationStatus: value as YesNo
      }));
    }
    else if (name === 'additionalComments') {
      setFormData(prev => ({
        ...prev,
        additionalComments: value
      }));
    }
    else if (name === 'contactMethod') {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          method: value as ContactMethod
        }
      }));
    }
    else if (name === 'contactDetails') {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          details: value
        }
      }));
    }
    else if (name === 'currentlyEmployed') {
      setFormData(prev => ({
        ...prev,
        employmentStatus: value as YesNo
      }));
    }
    else if (name === 'fullName') {
      setFormData(prev => ({
        ...prev,
        fullName: value
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

    // Current Role validation
    if (formData.currentRole.length === 0) {
      newErrors.currentRole = 'Please select at least one option';
      isValid = false;
    }

    // City validation
    if (!formData.location.city.trim()) {
      newErrors.city = 'Please enter your current city';
      isValid = false;
    }

    // Willing to relocate validation
    if (!formData.location.willingToRelocate) {
      newErrors.willingToRelocate = 'Please select an option';
      isValid = false;
    }

    // Work environment validation
    if (formData.workPreferences.environment.length === 0) {
      newErrors.workEnvironment = 'Please select at least one option';
      isValid = false;
    }

    // Dream job validation
    if (!formData.careerGoals.dreamJob.trim()) {
      newErrors.dreamJob = 'Please describe your dream job';
      isValid = false;
    }

    // Open to internship validation
    if (!formData.careerGoals.openToInternship) {
      newErrors.openToInternship = 'Please select an option';
      isValid = false;
    }

    // Communication methods validation
    if (formData.workPreferences.communication.length === 0) {
      newErrors.communication = 'Please select at least one option';
      isValid = false;
    }

    // Motivation validation
    if (!formData.careerGoals.motivation.trim()) {
      newErrors.motivation = 'Please enter what motivates you';
      isValid = false;
    }

    // Willing to work weekends validation
    if (!formData.workPreferences.schedule) {
      newErrors.willingToWorkWeekends = 'Please select an option';
      isValid = false;
    }

    // Benefits validation
    if (formData.expectations.benefits.length === 0) {
      newErrors.benefits = 'Please select at least one option';
      isValid = false;
    }

    // Salary range validation
    if (!formData.expectations.salaryRange.trim()) {
      newErrors.salaryRange = 'Please enter your expected salary range';
      isValid = false;
    }

    // Education status validation
    if (!formData.educationStatus) {
      newErrors.currentlyStudying = 'Please select an option';
      isValid = false;
    }

    // Additional comments validation
    if (!formData.additionalComments.trim()) {
      newErrors.additionalComments = 'Please enter any additional comments';
      isValid = false;
    }

    // Contact method validation
    if (!formData.contactInfo.method) {
      newErrors.contactMethod = 'Please select a contact method';
      isValid = false;
    }

    // Contact details validation
    if (!formData.contactInfo.details.trim()) {
      newErrors.contactDetails = 'Please provide your contact information';
      isValid = false;
    } else if (
      formData.contactInfo.method === 'Email' && 
      !/^\S+@\S+\.\S+$/.test(formData.contactInfo.details)
    ) {
      newErrors.contactDetails = 'Please enter a valid email address';
      isValid = false;
    } else if (
      (formData.contactInfo.method === 'WhatsApp' || formData.contactInfo.method === 'Telegram') && 
      !/^[0-9]+$/.test(formData.contactInfo.details)
    ) {
      newErrors.contactDetails = 'Please enter a valid phone number';
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

  const submitForm = async () => {
    const toastId = toast.loading('Submitting your form...', {
      position: "top-center"
    });

    try {
      const res = await fetch("/api/send-second", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.update(toastId, {
          render: "Form submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        // Reset form
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
          additionalComments: ''
        });
        window.location.reload();

      } else {
        toast.update(toastId, {
          render: data?.message || 'Something went wrong!',
          type: "error",
          isLoading: false,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: `Failed to submit form: ${err.message || 'Please try again later.'}`,
        type: "error",
        isLoading: false,
      });
    } finally {
      setShowCaptcha(false);
      setIsVerified(false);
      captchaRef.current?.reset();
    }
  };

  const handleSubmit = (e: FormEvent) => {
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
      
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Career Preferences Survey</h1>
        </div>

        <form 
          ref={formRef}
          className="w-full mx-auto py-5 flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          {/* Full Name (Optional) */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Full Name (Optional)
            </label>
            <input
              type="text"
              name="fullName"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.fullName ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.fullName}
              placeholder="John Doe"
            />
          </div>

          {/* Current Role */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Which of these best describe you? (Select all that apply)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Student', 'Professional', 'Freelancer', 'Entrepreneur'].map(role => (
                <label key={role} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name={`currentRole-${role}`}
                    onChange={handleChange}
                    checked={formData.currentRole.includes(role)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg md:text-xl">{role}</span>
                </label>
              ))}
            </div>
            {errors.currentRole && <div className="text-red-500 text-sm mt-2">{errors.currentRole}</div>}
          </div>

          {/* Current City */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Current City
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="city"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.city ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.location.city}
              placeholder="New York"
            />
            {errors.city && <div className="text-red-500 text-sm mt-2">{errors.city}</div>}
          </div>

          {/* Willing to Relocate */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Would you consider relocating?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="willingToRelocate"
                    value={option}
                    onChange={handleChange}
                    checked={formData.location.willingToRelocate === option}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            {errors.willingToRelocate && <div className="text-red-500 text-sm mt-2">{errors.willingToRelocate}</div>}
          </div>

          {/* Work Environment */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Preferred Work Environments (Select all that apply)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Office', 'Remote', 'Hybrid', 'Flexible'].map(env => (
                <label key={env} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name={`workEnvironment-${env}`}
                    onChange={handleChange}
                    checked={formData.workPreferences.environment.includes(env)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg md:text-xl">{env}</span>
                </label>
              ))}
            </div>
            {errors.workEnvironment && <div className="text-red-500 text-sm mt-2">{errors.workEnvironment}</div>}
          </div>

          {/* Dream Job */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Describe your dream job
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="dreamJob"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.dreamJob ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.careerGoals.dreamJob}
              placeholder="Describe the type of work environment, responsibilities, and impact you'd like to have..."
              rows={3}
            />
            {errors.dreamJob && <div className="text-red-500 text-sm mt-2">{errors.dreamJob}</div>}
          </div>

          {/* Open to Internship */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Are you open to internships?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="openToInternship"
                    value={option}
                    onChange={handleChange}
                    checked={formData.careerGoals.openToInternship === option}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            {errors.openToInternship && <div className="text-red-500 text-sm mt-2">{errors.openToInternship}</div>}
          </div>

          {/* Communication Methods */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Preferred Communication Methods (Select all that apply)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Email', 'Phone', 'Messaging Apps', 'In-person'].map(method => (
                <label key={method} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name={`communication-${method}`}
                    onChange={handleChange}
                    checked={formData.workPreferences.communication.includes(method)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg md:text-xl">{method}</span>
                </label>
              ))}
            </div>
            {errors.communication && <div className="text-red-500 text-sm mt-2">{errors.communication}</div>}
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              What motivates you the most in your work?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="motivation"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.motivation ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.careerGoals.motivation}
              placeholder="E.g., Solving complex problems, helping others, creative expression..."
            />
            {errors.motivation && <div className="text-red-500 text-sm mt-2">{errors.motivation}</div>}
          </div>

          {/* Willing to Work Weekends */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Are you willing to work weekends?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="willingToWorkWeekends"
                    value={option}
                    onChange={handleChange}
                    checked={formData.workPreferences.schedule === option}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            {errors.willingToWorkWeekends && <div className="text-red-500 text-sm mt-2">{errors.willingToWorkWeekends}</div>}
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              What benefits are most important to you? (Select all that apply)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Health Insurance', 'Remote Work', 'Bonus Pay', 'Vacation Time'].map(benefit => (
                <label key={benefit} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name={`benefits-${benefit}`}
                    onChange={handleChange}
                    checked={formData.expectations.benefits.includes(benefit)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg md:text-xl">{benefit}</span>
                </label>
              ))}
            </div>
            {errors.benefits && <div className="text-red-500 text-sm mt-2">{errors.benefits}</div>}
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              What is your expected salary range?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="salaryRange"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.salaryRange ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.expectations.salaryRange}
              placeholder="E.g., $50,000 - $70,000 or negotiable"
            />
            {errors.salaryRange && <div className="text-red-500 text-sm mt-2">{errors.salaryRange}</div>}
          </div>

          {/* Currently Studying */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Are you currently studying?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="currentlyStudying"
                    value={option}
                    onChange={handleChange}
                    checked={formData.educationStatus === option}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            {errors.currentlyStudying && <div className="text-red-500 text-sm mt-2">{errors.currentlyStudying}</div>}
          </div>

          {/* Additional Comments */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Any additional comments or notes?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="additionalComments"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.additionalComments ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.additionalComments}
              placeholder="Anything else you'd like to share..."
              rows={3}
            />
            {errors.additionalComments && <div className="text-red-500 text-sm mt-2">{errors.additionalComments}</div>}
          </div>

          {/* Contact Method */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              How would you like to be contacted?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Email', 'WhatsApp', 'Telegram'].map(method => (
                <label key={method} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    onChange={handleChange}
                    checked={formData.contactInfo.method === method}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{method}</span>
                </label>
              ))}
            </div>
            {errors.contactMethod && <div className="text-red-500 text-sm mt-2">{errors.contactMethod}</div>}
          </div>

          {/* Contact Details */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Contact Information
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="contactDetails"
              className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
                errors.contactDetails ? 'ring-red-500' : 'ring-gray-300'
              }`}
              onChange={handleChange}
              value={formData.contactInfo.details}
              placeholder={
                formData.contactInfo.method === 'Email' ? 'Enter your email address' : 
                formData.contactInfo.method ? 'Enter your phone number' : 
                'Enter your WhatsApp/Telegram number or Email address'
              }
            />
            {errors.contactDetails && <div className="text-red-500 text-sm mt-2">{errors.contactDetails}</div>}
          </div>

          {/* Currently Employed (Optional) */}
          <div>
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              Are you currently employed? (Optional)
            </label>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="currentlyEmployed"
                    value={option}
                    onChange={handleChange}
                    checked={formData.employmentStatus === option}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-8 bg-pink-500 text-white font-bold py-4 rounded-full text-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
            disabled={showCaptcha && !isVerified}
          >
            Submit Survey
          </button>

          {showCaptcha && (
            <div className="mt-8 flex justify-center">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormSurvey2;