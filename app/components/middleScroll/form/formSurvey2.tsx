'use client'
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';

// Types
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

interface QuestionConfig {
  id: string;
  path: string[]; // Path to the field in the FormData structure
  type: 'text' | 'radio' | 'checkbox';
  text: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string | ((formData: FormData) => string);
  validation?: (value: string, formData: FormData) => string | null;
}

const FormSurvey2 = () => {
  // Form configuration
  const questionsConfig: QuestionConfig[] = [
    {
      id: 'currentRole',
      path: ['currentRole'],
      type: 'checkbox',
      text: 'Which of these best describe you? (Select all that apply)',
      required: true,
      options: [
        { value: 'Student', label: 'Student' },
        { value: 'Professional', label: 'Professional' },
        { value: 'Freelancer', label: 'Freelancer' },
        { value: 'Entrepreneur', label: 'Entrepreneur' }
      ]
    },
    {
      id: 'currentCity',
      path: ['location', 'city'],
      type: 'text',
      text: 'What is your current city?',
      required: true,
      placeholder: 'Enter your current city'
    },
    {
      id: 'willingToRelocate',
      path: ['location', 'willingToRelocate'],
      type: 'radio',
      text: 'Would you consider relocating?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'preferredWorkEnvironments',
      path: ['workPreferences', 'environment'],
      type: 'checkbox',
      text: 'What are your preferred work environments? (Select all that apply)',
      required: true,
      options: [
        { value: 'Office', label: 'Office' },
        { value: 'Remote', label: 'Remote' },
        { value: 'Hybrid', label: 'Hybrid' },
        { value: 'Flexible', label: 'Flexible' }
      ]
    },
    {
      id: 'dreamJobDescription',
      path: ['careerGoals', 'dreamJob'],
      type: 'text',
      text: 'Write a short description of your dream job.',
      required: true,
      placeholder: 'Describe your dream job'
    },
    {
      id: 'openToInternships',
      path: ['careerGoals', 'openToInternship'],
      type: 'radio',
      text: 'Are you open to internships?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'preferredCommunicationMethods',
      path: ['workPreferences', 'communication'],
      type: 'checkbox',
      text: 'How do you prefer to communicate? (Select all that apply)',
      required: true,
      options: [
        { value: 'Email', label: 'Email' },
        { value: 'Phone', label: 'Phone' },
        { value: 'Messaging Apps', label: 'Messaging Apps' },
        { value: 'In-person', label: 'In-person' }
      ]
    },
    {
      id: 'motivation',
      path: ['careerGoals', 'motivation'],
      type: 'text',
      text: 'What motivates you the most?',
      required: true,
      placeholder: 'Describe what motivates you'
    },
    {
      id: 'willingToWorkWeekends',
      path: ['workPreferences', 'schedule'],
      type: 'radio',
      text: 'Are you willing to work weekends?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'importantBenefits',
      path: ['expectations', 'benefits'],
      type: 'checkbox',
      text: 'What benefits are most important to you? (Select all that apply)',
      required: true,
      options: [
        { value: 'Health Insurance', label: 'Health Insurance' },
        { value: 'Remote Work', label: 'Remote Work' },
        { value: 'Bonus Pay', label: 'Bonus Pay' },
        { value: 'Vacation Time', label: 'Vacation Time' }
      ]
    },
    {
      id: 'expectedSalaryRange',
      path: ['expectations', 'salaryRange'],
      type: 'text',
      text: 'What is your expected salary range?',
      required: true,
      placeholder: 'Enter your expected salary range'
    },
    {
      id: 'currentlyStudying',
      path: ['educationStatus'],
      type: 'radio',
      text: 'Are you currently studying?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'additionalComments',
      path: ['additionalComments'],
      type: 'text',
      text: 'Any additional comments or notes?',
      required: true,
      placeholder: 'Add any additional comments'
    },
    {
      id: 'contactMethod',
      path: ['contactInfo', 'method'],
      type: 'radio',
      text: 'How would you like to be contacted? (Choose one)',
      required: true,
      options: [
        { value: 'WhatsApp', label: 'WhatsApp' },
        { value: 'Telegram', label: 'Telegram' },
        { value: 'Email', label: 'Email' }
      ]
    },
    {
      id: 'contactInfo',
      path: ['contactInfo', 'details'],
      type: 'text',
      text: 'Please provide your contact information:',
      required: true,
      placeholder: (formData: FormData) => 
        formData.contactInfo.method === 'Email' ? 'Enter your email address' : 
        formData.contactInfo.method ? 'Enter your phone number' : 
        'Enter your WhatsApp/Telegram number or Email address',
      validation: (value, formData) => {
        if (!value) return 'Contact information is required';
        if (formData.contactInfo.method === 'Email' && !/^\S+@\S+\.\S+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        if ((formData.contactInfo.method === 'WhatsApp' || formData.contactInfo.method === 'Telegram') && !/^[0-9]+$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        return null;
      }
    },
    {
      id: 'currentlyEmployed',
      path: ['employmentStatus'],
      type: 'radio',
      text: 'Are you currently employed? (Optional)',
      required: false,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'fullName',
      path: ['fullName'],
      type: 'text',
      text: 'What is your full name? (Optional)',
      required: false,
      placeholder: 'Enter your full name'
    }
  ];

  // State
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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Helper function to get nested field value
  const getNestedValue = (obj: any, path: string[]) => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
  };

  // Helper function to set nested field value
  const setNestedValue = (obj: any, path: string[], value: any) => {
    const newObj = { ...obj };
    let current = newObj;
    
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[path[path.length - 1]] = value;
    return newObj;
  };

  // Handlers
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;
    
    const question = questionsConfig.find(q => q.id === name.split('-')[0]);
    if (!question) return;

    if (type === 'checkbox') {
      const optionValue = name.split('-')[1];
      const currentValue = getNestedValue(formData, question.path) || [];
      
      setFormData(prev => {
        if (checked) {
          return setNestedValue(prev, question.path, [...currentValue, optionValue]);
        } else {
          return setNestedValue(prev, question.path, currentValue.filter((item: string) => item !== optionValue));
        }
      });
    } else {
      setFormData(prev => setNestedValue(prev, question.path, value));
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [formData, errors]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    questionsConfig.forEach(question => {
      if (!question.required) return;

      const value = getNestedValue(formData, question.path);

      if (
        (Array.isArray(value) && value.length === 0) ||
        (!Array.isArray(value) && !value)
      ) {
        newErrors[question.id] = 'This field is required';
        isValid = false;
        return;
      }

      if (question.validation) {
        const validationError = question.validation(
          Array.isArray(value) ? value.join(', ') : value,
          formData
        );
        if (validationError) {
          newErrors[question.id] = validationError;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleCaptchaChange = useCallback((value: string | null) => {
    setIsVerified(!!value);
    if (value) {
      submitForm();
    }
  }, []);

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

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    const isValid = validateForm();
    
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  }, [validateForm, errors, isVerified, submitForm]);

  const handleQuestionClick = useCallback((index: number) => {
    setCurrentQuestion(index);
  }, []);

  // Render functions
  const renderQuestionInput = (question: QuestionConfig) => {
    const value = getNestedValue(formData, question.path);
    const error = errors[question.id];
    
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            name={question.id}
            className={`w-full px-4 py-3 text-lg ring-1 rounded-lg focus:ring-2 outline-none transition-all ${
              error && 'ring-red-500'
            }`}
            onChange={handleChange}
            value={Array.isArray(value) ? value.join(', ') : value || ''}
            placeholder={
              typeof question.placeholder === 'function' 
                ? question.placeholder(formData) 
                : question.placeholder
            }
          />
        );
      
      case 'radio':
        return (
          <div className="flex flex-wrap gap-4 mb-6">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-center 
              gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  onChange={handleChange}
                  checked={value === option.value}
                  className="w-5 h-5 accent-pink-500"
                />
                <span className="text-lg">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="flex flex-wrap gap-4 mb-6">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-3 px-4 py-3 rounded-full
               cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  name={`${question.id}-${option.value}`}
                  onChange={handleChange}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  className="w-5 h-5 accent-pink-500"
                />
                <span className="text-lg md:text-xl ">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return null;
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
        className="w-full mx-auto py-5 flex flex-col gap-5" 
        onSubmit={handleSubmit} 
        ref={formRef}
      >
        {questionsConfig.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => { questionRefs.current[index] = el; }}
          >
            <label className="block text-lg md:text-xl font-bold text-gray-800 mb-4">
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {renderQuestionInput(question)}
            
            {errors[question.id] && (
              <div className="text-red-500 text-sm mt-2">{errors[question.id]}</div>
            )}
          </div>
        ))}
        
        <button 
          type="submit" 
          className="mt-8 bg-pink-500 text-white font-bold py-4 rounded-full text-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
        >
          Submit Survey
        </button>
        
        {showCaptcha && (
          <div className="mt-8">
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

export default FormSurvey2;