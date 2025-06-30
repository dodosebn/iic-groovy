'use client'
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';

// Types
type ContactMethod = 'WhatsApp' | 'Telegram' | 'Email' | '';
type EmploymentStatus = 'Yes' | 'No' | '';
type RelocationStatus = 'Yes' | 'No' | '';
type WorkPreference = 'Yes' | 'No' | '';

interface FormData {
  fullName: string;
  roles: string[];
  currentCity: string;
  willingToRelocate: RelocationStatus;
  preferredWorkEnvironments: string[];
  dreamJobDescription: string;
  openToInternships: WorkPreference;
  preferredCommunicationMethods: string[];
  motivation: string;
  willingToWorkWeekends: WorkPreference;
  importantBenefits: string[];
  expectedSalaryRange: string;
  currentlyStudying: EmploymentStatus;
  additionalComments: string;
  contactMethod: ContactMethod;
  contactInfo: string;
  currentlyEmployed: EmploymentStatus;
}

interface QuestionConfig {
  id: keyof FormData;
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
      id: 'roles',
      type: 'checkbox',
      text: '1. Which of these best describe you? (Select all that apply)',
      required: true,
      options: [
        { value: 'A', label: 'Student' },
        { value: 'B', label: 'Professional' },
        { value: 'C', label: 'Freelancer' },
        { value: 'D', label: 'Entrepreneur' }
      ]
    },
    {
      id: 'currentCity',
      type: 'text',
      text: '2. What is your current city?',
      required: true,
      placeholder: 'Enter your current city'
    },
    {
      id: 'willingToRelocate',
      type: 'radio',
      text: '3. Would you consider relocating?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'preferredWorkEnvironments',
      type: 'checkbox',
      text: '4. What are your preferred work environments? (Select all that apply)',
      required: true,
      options: [
        { value: 'A', label: 'Office' },
        { value: 'B', label: 'Remote' },
        { value: 'C', label: 'Hybrid' },
        { value: 'D', label: 'Flexible' }
      ]
    },
    {
      id: 'dreamJobDescription',
      type: 'text',
      text: '5. Write a short description of your dream job.',
      required: true,
      placeholder: 'Describe your dream job'
    },
    {
      id: 'openToInternships',
      type: 'radio',
      text: '6. Are you open to internships?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'preferredCommunicationMethods',
      type: 'checkbox',
      text: '7. How do you prefer to communicate? (Select all that apply)',
      required: true,
      options: [
        { value: 'A', label: 'Email' },
        { value: 'B', label: 'Phone' },
        { value: 'C', label: 'Messaging Apps' },
        { value: 'D', label: 'In-person' }
      ]
    },
    {
      id: 'motivation',
      type: 'text',
      text: '8. What motivates you the most?',
      required: true,
      placeholder: 'Describe what motivates you'
    },
    {
      id: 'willingToWorkWeekends',
      type: 'radio',
      text: '9. Are you willing to work weekends?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'importantBenefits',
      type: 'checkbox',
      text: '10. What benefits are most important to you? (Select all that apply)',
      required: true,
      options: [
        { value: 'A', label: 'Health Insurance' },
        { value: 'B', label: 'Remote Work' },
        { value: 'C', label: 'Bonus Pay' },
        { value: 'D', label: 'Vacation Time' }
      ]
    },
    {
      id: 'expectedSalaryRange',
      type: 'text',
      text: '11. What is your expected salary range?',
      required: true,
      placeholder: 'Enter your expected salary range'
    },
    {
      id: 'currentlyStudying',
      type: 'radio',
      text: '12. Are you currently studying?',
      required: true,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'additionalComments',
      type: 'text',
      text: '13. Any additional comments or notes?',
      required: true,
      placeholder: 'Add any additional comments'
    },
    {
      id: 'contactMethod',
      type: 'radio',
      text: '14. How would you like to be contacted? (Choose one)',
      required: true,
      options: [
        { value: 'WhatsApp', label: 'WhatsApp' },
        { value: 'Telegram', label: 'Telegram' },
        { value: 'Email', label: 'Email' }
      ]
    },
    {
      id: 'contactInfo',
      type: 'text',
      text: '15. Please provide your contact information:',
      required: true,
      placeholder: (formData: FormData) => 
        formData.contactMethod === 'Email' ? 'Enter your email address' : 
        formData.contactMethod ? 'Enter your phone number' : 
        'Enter your WhatsApp/Telegram number or Email address',
      validation: (value, formData) => {
        if (!value) return 'Contact information is required';
        if (formData.contactMethod === 'Email' && !/^\S+@\S+\.\S+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        if ((formData.contactMethod === 'WhatsApp' || formData.contactMethod === 'Telegram') && !/^[0-9]+$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        return null;
      }
    },
    {
      id: 'currentlyEmployed',
      type: 'radio',
      text: '16. Are you currently employed? (Optional)',
      required: false,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      id: 'fullName',
      type: 'text',
      text: '17. What is your full name? (Optional)',
      required: false,
      placeholder: 'Enter your full name'
    }
  ];

  // State
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    roles: [],
    currentCity: '',
    willingToRelocate: '',
    preferredWorkEnvironments: [],
    dreamJobDescription: '',
    openToInternships: '',
    preferredCommunicationMethods: [],
    motivation: '',
    willingToWorkWeekends: '',
    importantBenefits: [],
    expectedSalaryRange: '',
    currentlyStudying: '',
    additionalComments: '',
    contactMethod: '',
    contactInfo: '',
    currentlyEmployed: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effects
  useEffect(() => {
    if (questionRefs.current[currentQuestion]) {
      questionRefs.current[currentQuestion]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentQuestion]);

  // Handlers
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;
    
    if (type === 'checkbox') {
      const questionName = name.split('-')[0] as keyof FormData;
      const optionValue = name.split('-')[1];
      
      setFormData(prev => {
        const currentOptions = prev[questionName] as string[] || [];
        if (checked) {
          return { ...prev, [questionName]: [...currentOptions, optionValue] };
        } else {
          return { 
            ...prev, 
            [questionName]: (currentOptions as string[]).filter(item => item !== optionValue) 
          };
        }
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    // Auto-advance for non-text inputs
    const currentConfig = questionsConfig[currentQuestion];
    if (type !== 'text' && currentConfig.type !== 'text') {
      setTimeout(() => {
        setCurrentQuestion(prev => Math.min(prev + 1, questionsConfig.length - 1));
      }, 300);
    }
  }, [currentQuestion, errors]);

 const validateForm = useCallback(() => {
  const newErrors: Record<string, string> = {};
  let isValid = true;

  questionsConfig.forEach(question => {
    if (!question.required) return;

    const value = formData[question.id];

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

  const submitForm = useCallback(() => {
    const toastId = toast.loading('Submitting your form...', {
      position: "top-center"
    });

   const templateParams = {
  from_name: formData.fullName || 'Anonymous',
  to_name: 'Survey Administrator',
  message: questionsConfig.map(question => {
    const value = formData[question.id];
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return `${question.text}: ${displayValue || 'No answer'}`;
  }).join('\n\n'),
  reply_to: formData.contactMethod.toLowerCase() === 'email' ? formData.contactInfo : 'no-reply@example.com'
};

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE!,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
    )
    .then((response) => {
      toast.update(toastId, {
        render: "Form submitted successfully!",
        type: "success",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        roles: [],
        currentCity: '',
        willingToRelocate: '',
        preferredWorkEnvironments: [],
        dreamJobDescription: '',
        openToInternships: '',
        preferredCommunicationMethods: [],
        motivation: '',
        willingToWorkWeekends: '',
        importantBenefits: [],
        expectedSalaryRange: '',
        currentlyStudying: '',
        additionalComments: '',
        contactMethod: '',
        contactInfo: '',
        currentlyEmployed: ''
      });
    })
    .catch((err) => {
      toast.update(toastId, {
        render: `Failed to submit form: ${err.text || 'Please try again later.'}`,
        type: "error",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
    .finally(() => {
      setShowCaptcha(false);
      setIsVerified(false);
      captchaRef.current?.reset();
    });
  }, [formData]);

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
    const value = formData[question.id];
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
        className="w-full  mx-auto py-5 flex flex-col gap-5" 
        onSubmit={handleSubmit} 
        ref={formRef}
      >
        {/* Progress indicator */}
    <div className="flex flex-wrap gap-2 pb-4 sm:px-4">
  {questionsConfig.map((_, index) => (
    <button
      key={index}
      type="button"
      onClick={() => handleQuestionClick(index)}
      className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-medium ${
        currentQuestion > index
          ? 'bg-green-500 text-white'
          : currentQuestion === index
          ? 'bg-pink-500 text-white'
          : 'text-gray-700 border border-gray-300'
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>


        {/* Questions */}
        {questionsConfig.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => { questionRefs.current[index] = el; }}
            // className={`transition-opacity duration-300 ${
            //   currentQuestion === index ? 'opacity-100' : 'opacity-50'
            // }`}
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
          className="mt-8 bg-pink-500 text-white font-bold py-4  rounded-full text-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
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