'use client'
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

const FormSurvey = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      
      <form 
        className="w-full py-3 flex flex-col gap-5 bg-transparent" 
        onSubmit={handleSubmit} 
        ref={formRef}
      >
        {/* Current Role */}
        <label className="font-sans text-lg text-gray-800">
          Which of these best describe you? (Select all that apply)
        </label>
        <div className="flex flex-col gap-2.5">
          {['Student', 'Professional', 'Freelancer', 'Entrepreneur'].map(role => (
            <label key={role} className="flex items-center gap-2 text-base">
              <input 
                type="checkbox" 
                name={`currentRole-${role}`} 
                onChange={handleChange} 
                checked={formData.currentRole.includes(role)} 
                className="w-4 h-4"
              /> 
              {role}
            </label>
          ))}
        </div>
        {errors.currentRole && <div className="text-red-500 text-sm mt-1">{errors.currentRole}</div>}

        {/* Current City */}
        <label className="font-sans text-lg text-gray-800">What is your current city?</label>
        <input 
          type="text" 
          name="city" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.location.city} 
        />
        {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}

        {/* Willing to Relocate */}
        <label className="font-sans text-lg text-gray-800">Would you consider relocating?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="willingToRelocate" 
          onChange={handleChange} 
          value={formData.location.willingToRelocate}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.willingToRelocate && <div className="text-red-500 text-sm mt-1">{errors.willingToRelocate}</div>}

        {/* Work Environment */}
        <label className="font-sans text-lg text-gray-800">What are your preferred work environments? (Select all that apply)</label>
        <div className="flex flex-col gap-2.5">
          {['Office', 'Remote', 'Hybrid', 'Flexible'].map(env => (
            <label key={env} className="flex items-center gap-2 text-base">
              <input 
                type="checkbox" 
                name={`workEnvironment-${env}`} 
                onChange={handleChange} 
                checked={formData.workPreferences.environment.includes(env)} 
                className="w-4 h-4"
              /> 
              {env}
            </label>
          ))}
        </div>
        {errors.workEnvironment && <div className="text-red-500 text-sm mt-1">{errors.workEnvironment}</div>}

        {/* Dream Job */}
        <label className="font-sans text-lg text-gray-800">Write a short description of your dream job.</label>
        <input 
          type="text" 
          name="dreamJob" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.careerGoals.dreamJob} 
        />
        {errors.dreamJob && <div className="text-red-500 text-sm mt-1">{errors.dreamJob}</div>}

        {/* Open to Internship */}
        <label className="font-sans text-lg text-gray-800">Are you open to internships?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="openToInternship" 
          onChange={handleChange} 
          value={formData.careerGoals.openToInternship}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.openToInternship && <div className="text-red-500 text-sm mt-1">{errors.openToInternship}</div>}

        {/* Communication Methods */}
        <label className="font-sans text-lg text-gray-800">How do you prefer to communicate? (Select all that apply)</label>
        <div className="flex flex-col gap-2.5">
          {['Email', 'Phone', 'Messaging Apps', 'In-person'].map(method => (
            <label key={method} className="flex items-center gap-2 text-base">
              <input 
                type="checkbox" 
                name={`communication-${method}`} 
                onChange={handleChange} 
                checked={formData.workPreferences.communication.includes(method)} 
                className="w-4 h-4"
              /> 
              {method}
            </label>
          ))}
        </div>
        {errors.communication && <div className="text-red-500 text-sm mt-1">{errors.communication}</div>}

        {/* Motivation */}
        <label className="font-sans text-lg text-gray-800">What motivates you the most?</label>
        <input 
          type="text" 
          name="motivation" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.careerGoals.motivation} 
        />
        {errors.motivation && <div className="text-red-500 text-sm mt-1">{errors.motivation}</div>}

        {/* Willing to Work Weekends */}
        <label className="font-sans text-lg text-gray-800">Are you willing to work weekends?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="willingToWorkWeekends" 
          onChange={handleChange} 
          value={formData.workPreferences.schedule}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.willingToWorkWeekends && <div className="text-red-500 text-sm mt-1">{errors.willingToWorkWeekends}</div>}

        {/* Benefits */}
        <label className="font-sans text-lg text-gray-800">What benefits are most important to you? (Select all that apply)</label>
        <div className="flex flex-col gap-2.5">
          {['Health Insurance', 'Remote Work', 'Bonus Pay', 'Vacation Time'].map(benefit => (
            <label key={benefit} className="flex items-center gap-2 text-base">
              <input 
                type="checkbox" 
                name={`benefits-${benefit}`} 
                onChange={handleChange} 
                checked={formData.expectations.benefits.includes(benefit)} 
                className="w-4 h-4"
              /> 
              {benefit}
            </label>
          ))}
        </div>
        {errors.benefits && <div className="text-red-500 text-sm mt-1">{errors.benefits}</div>}

        {/* Salary Range */}
        <label className="font-sans text-lg text-gray-800">What is your expected salary range?</label>
        <input 
          type="text" 
          name="salaryRange" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.expectations.salaryRange} 
        />
        {errors.salaryRange && <div className="text-red-500 text-sm mt-1">{errors.salaryRange}</div>}

        {/* Currently Studying */}
        <label className="font-sans text-lg text-gray-800">Are you currently studying?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="currentlyStudying" 
          onChange={handleChange} 
          value={formData.educationStatus}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.currentlyStudying && <div className="text-red-500 text-sm mt-1">{errors.currentlyStudying}</div>}

        {/* Additional Comments */}
        <label className="font-sans text-lg text-gray-800">Any additional comments or notes?</label>
        <input 
          type="text" 
          name="additionalComments" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.additionalComments} 
        />
        {errors.additionalComments && <div className="text-red-500 text-sm mt-1">{errors.additionalComments}</div>}

        {/* Contact Method */}
        <label className="font-sans text-lg text-gray-800">How would you like to be contacted? (Choose one)</label>
        <div className="flex flex-col gap-2.5">
          {['WhatsApp', 'Telegram', 'Email'].map(method => (
            <label key={method} className="flex items-center gap-2 text-base">
              <input 
                type="radio" 
                name="contactMethod" 
                value={method} 
                onChange={handleChange} 
                checked={formData.contactInfo.method === method} 
                className="w-4 h-4"
              /> 
              {method}
            </label>
          ))}
        </div>
        {errors.contactMethod && <div className="text-red-500 text-sm mt-1">{errors.contactMethod}</div>}

        {/* Contact Details */}
        <label className="font-sans text-lg text-gray-800">Please provide your contact information:</label>
        <input 
          type="text" 
          name="contactDetails" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          placeholder={
            formData.contactInfo.method === 'Email' ? 'Enter your email address' : 
            formData.contactInfo.method ? 'Enter your phone number' : 
            'Enter your WhatsApp/Telegram number or Email address'
          } 
          onChange={handleChange} 
          value={formData.contactInfo.details}
        />
        {errors.contactDetails && <div className="text-red-500 text-sm mt-1">{errors.contactDetails}</div>}

        {/* Currently Employed (Optional) */}
        <label className="font-sans text-lg text-gray-800">Are you currently employed? (Optional)</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="currentlyEmployed" 
          onChange={handleChange} 
          value={formData.employmentStatus}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Full Name (Optional) */}
        <label className="font-sans text-lg text-gray-800">What is your full name? (Optional)</label>
        <input 
          type="text" 
          name="fullName" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.fullName} 
        />
        
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
    </>
  );
};

export default FormSurvey;