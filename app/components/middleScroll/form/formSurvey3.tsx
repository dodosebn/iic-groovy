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

const FormSurvey3 = () => {
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

    if (formData.currentRole.length === 0) {
      newErrors.currentRole = 'Please select at least one option';
      isValid = false;
    }
    if (!formData.location.city.trim()) {
      newErrors.city = 'Please enter your current city';
      isValid = false;
    }
    if (!formData.location.willingToRelocate) {
      newErrors.willingToRelocate = 'Please select an option';
      isValid = false;
    }
    if (formData.workPreferences.environment.length === 0) {
      newErrors.workEnvironment = 'Please select at least one option';
      isValid = false;
    }
    if (!formData.careerGoals.dreamJob.trim()) {
      newErrors.dreamJob = 'Please describe your dream job';
      isValid = false;
    }
    if (!formData.careerGoals.openToInternship) {
      newErrors.openToInternship = 'Please select an option';
      isValid = false;
    }
    if (formData.workPreferences.communication.length === 0) {
      newErrors.communication = 'Please select at least one option';
      isValid = false;
    }
    if (!formData.careerGoals.motivation.trim()) {
      newErrors.motivation = 'Please enter what motivates you';
      isValid = false;
    }
    if (!formData.workPreferences.schedule) {
      newErrors.willingToWorkWeekends = 'Please select an option';
      isValid = false;
    }
    if (formData.expectations.benefits.length === 0) {
      newErrors.benefits = 'Please select at least one option';
      isValid = false;
    }
    if (!formData.expectations.salaryRange.trim()) {
      newErrors.salaryRange = 'Please enter your expected salary range';
      isValid = false;
    }
    if (!formData.educationStatus) {
      newErrors.currentlyStudying = 'Please select an option';
      isValid = false;
    }
    if (!formData.additionalComments.trim()) {
      newErrors.additionalComments = 'Please enter any additional comments';
      isValid = false;
    }
    if (!formData.contactInfo.method) {
      newErrors.contactMethod = 'Please select a contact method';
      isValid = false;
    }
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
      
      <div>
        <div className="pt-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Career Preferences Survey</h1>
          </div>
        </div>

        <form 
          ref={formRef}
          className="pb-5 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
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
              <label className="block text-md font-medium text-gray-700 mb-1">
                Which of these best describe you? (Select all that apply) 
              </label>
              {errors.currentRole && <p className="text-red-500 text-xs mb-2">{errors.currentRole}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Student', 'Professional', 'Freelancer', 'Entrepreneur'].map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`currentRole-${role}`}
                      checked={formData.currentRole.includes(role)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-md text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Current City 
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-lg focus:ring-2
                   focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Would you consider relocating? 
                </label>
                <select
                  name="willingToRelocate"
                  value={formData.location.willingToRelocate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-lg focus:ring-2
                   focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.willingToRelocate && <p className="text-red-500 text-xs mt-1">{errors.willingToRelocate}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Preferred Work Environments (Select all that apply) 
              </label>
              {errors.workEnvironment && <p className="text-red-500 text-xs mb-2">{errors.workEnvironment}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Office', 'Remote', 'Hybrid', 'Flexible'].map((env) => (
                  <label key={env} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`workEnvironment-${env}`}
                      checked={formData.workPreferences.environment.includes(env)}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-md text-gray-700">{env}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Preferred Communication Methods (Select all that apply) 
              </label>
              {errors.communication && <p className="text-red-500 text-xs mb-2">{errors.communication}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Email', 'Phone', 'Messaging Apps', 'In-person'].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`communication-${method}`}
                      checked={formData.workPreferences.communication.includes(method)}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-md text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Are you willing to work weekends? 
              </label>
              <select
                name="willingToWorkWeekends"
                value={formData.workPreferences.schedule}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md ring-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.willingToWorkWeekends && <p className="text-red-500 text-xs mt-1">{errors.willingToWorkWeekends}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Describe your dream job 
              </label>
              <textarea
                name="dreamJob"
                value={formData.careerGoals.dreamJob}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe the type of work environment, responsibilities, and impact you'd like to have..."
              />
              {errors.dreamJob && <p className="text-red-500 text-xs mt-1">{errors.dreamJob}</p>}
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                What motivates you the most in your work? 
              </label>
              <input
                type="text"
                name="motivation"
                value={formData.careerGoals.motivation}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E.g., Solving complex problems, helping others, creative expression..."
              />
              {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Are you open to internships? 
                </label>
                <select
                  name="openToInternship"
                  value={formData.careerGoals.openToInternship}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md ring-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.openToInternship && <p className="text-red-500 text-xs mt-1">{errors.openToInternship}</p>}
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Are you currently studying?
                </label>
                <select
                  name="currentlyStudying"
                  value={formData.educationStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.currentlyStudying && <p className="text-red-500 text-xs mt-1">{errors.currentlyStudying}</p>}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                What benefits are most important to you? (Select all that apply) 
              </label>
              {errors.benefits && <p className="text-red-500 text-xs mb-2">{errors.benefits}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Health Insurance', 'Remote Work', 'Bonus Pay', 'Vacation Time'].map((benefit) => (
                  <label key={benefit} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`benefits-${benefit}`}
                      checked={formData.expectations.benefits.includes(benefit)}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-md text-gray-700">{benefit}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                What is your expected salary range? 
              </label>
              <input
                type="text"
                name="salaryRange"
                value={formData.expectations.salaryRange}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E.g., $50,000 - $70,000 or negotiable"
              />
              {errors.salaryRange && <p className="text-red-500 text-xs mt-1">{errors.salaryRange}</p>}
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Are you currently employed? (Optional)
              </label>
              <select
                name="currentlyEmployed"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                How would you like to be contacted? 
              </label>
              {errors.contactMethod && <p className="text-red-500 text-xs mb-2">{errors.contactMethod}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Email', 'WhatsApp', 'Telegram'].map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactInfo.method === method}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-md text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                {formData.contactInfo.method === 'Email' 
                  ? 'Email Address' 
                  : 'Phone Number'}
              </label>
              <input
                type={formData.contactInfo.method === 'Email' ? 'email' : 'tel'}
                name="contactDetails"
                value={formData.contactInfo.details}
                onChange={handleChange}
                className="w-full px-4 py-2 ring-1 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={
                  formData.contactInfo.method === 'Email' 
                    ? 'your.email@example.com' 
                    : '+1 123 456 7890'
                }
              />
              {errors.contactDetails && <p className="text-red-500 text-xs mt-1">{errors.contactDetails}</p>}
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Any additional comments or notes? 
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
              {errors.additionalComments && <p className="text-red-500 text-xs mt-1">{errors.additionalComments}</p>}
            </div>
          </div>

          {showCaptcha && (
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="px-8 py-3 w-full bg-indigo-600 rounded-lg text-lg font-medium
             text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
            disabled={showCaptcha && !isVerified}
          >
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSurvey3;