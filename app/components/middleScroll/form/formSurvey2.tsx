'use client'
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';


interface FormData {
  name: string;
  q1: string[];
  q2: string;
  q3: string;
  q4: string[];
  q5: string;
  q6: string;
  q7: string[];
  q8: string;
  q9: string;
  q10: string[];
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
}

interface OptionTexts {
  [key: string]: {
    [key: string]: string;
  };
}

const FormSurvey2 = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    q1: [],
    q2: '',
    q3: '',
    q4: [],
    q5: '',
    q6: '',
    q7: [],
    q8: '',
    q9: '',
    q10: [],
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const optionTexts: OptionTexts = {
    'q1': {
      'A': 'Student',
      'B': 'Professional',
      'C': 'Freelancer',
      'D': 'Entrepreneur'
    },
    'q4': {
      'A': 'Office',
      'B': 'Remote',
      'C': 'Hybrid',
      'D': 'Flexible'
    },
    'q7': {
      'A': 'Email',
      'B': 'Phone',
      'C': 'Messaging Apps',
      'D': 'In-person'
    },
    'q10': {
      'A': 'Health Insurance',
      'B': 'Remote Work',
      'C': 'Bonus Pay',
      'D': 'Vacation Time'
    }
  };

  useEffect(() => {
    if (questionRefs.current[currentQuestion - 1]) {
      questionRefs.current[currentQuestion - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentQuestion]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : undefined;
    
    if (type === 'checkbox') {
      const questionName = name.split('-')[0];
      const optionValue = name.split('-')[1];
      
      setFormData(prev => {
        const currentOptions = prev[questionName as keyof FormData] as string[] || [];
        if (checked) {
          return { ...prev, [questionName]: [...currentOptions, optionValue] };
        } else {
          return { ...prev, [questionName]: currentOptions.filter(item => item !== optionValue) };
        }
      });
    } else if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    // Move to next question when a selection is made
    if (type !== 'text' && name !== 'q15' && name !== 'q17' && name !== 'q5' && name !== 'q8' && name !== 'q11' && name !== 'q13') {
      setTimeout(() => {
        setCurrentQuestion(prev => Math.min(prev + 1, 17));
      }, 300);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (formData.q1.length === 0) newErrors.q1 = 'Please select at least one option';
    if (!formData.q2.trim()) newErrors.q2 = 'Please enter your current city';
    if (!formData.q3) newErrors.q3 = 'Please select an option';
    if (formData.q4.length === 0) newErrors.q4 = 'Please select at least one option';
    if (!formData.q5.trim()) newErrors.q5 = 'Please describe your dream job';
    if (!formData.q6) newErrors.q6 = 'Please select an option';
    if (formData.q7.length === 0) newErrors.q7 = 'Please select at least one option';
    if (!formData.q8.trim()) newErrors.q8 = 'Please enter what motivates you';
    if (!formData.q9) newErrors.q9 = 'Please select an option';
    if (formData.q10.length === 0) newErrors.q10 = 'Please select at least one option';
    if (!formData.q11.trim()) newErrors.q11 = 'Please enter your expected salary range';
    if (!formData.q12) newErrors.q12 = 'Please select an option';
    if (!formData.q13.trim()) newErrors.q13 = 'Please enter any additional comments';
    if (!formData.q14) newErrors.q14 = 'Please select a contact method';
    if (!formData.q15.trim()) newErrors.q15 = 'Please provide your contact information';

    if (formData.q14 === 'Email' && formData.q15 && !/^\S+@\S+\.\S+$/.test(formData.q15)) {
      newErrors.q15 = 'Please enter a valid email address';
    } else if ((formData.q14 === 'WhatsApp' || formData.q14 === 'Telegram') && formData.q15 && !/^[0-9]+$/.test(formData.q15)) {
      newErrors.q15 = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;
    
    return isValid;
  };

  const handleCaptchaChange = (value: string | null) => {
    setIsVerified(!!value);
    if (value) {
      submitForm();
    }
  };

  const getDisplayValue = (question: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map(v => optionTexts[question]?.[v] || v).join(', ');
    }
    return value;
  };

  const submitForm = () => {
    const toastId = toast.loading('Submitting your form...', {
      position: "top-center"
    });

    const questionTexts = {
      q1: '1. Which of these best describe you?',
      q2: '2. What is your current city?',
      q3: '3. Would you consider relocating?',
      q4: '4. What are your preferred work environments?',
      q5: '5. Write a short description of your dream job.',
      q6: '6. Are you open to internships?',
      q7: '7. How do you prefer to communicate?',
      q8: '8. What motivates you the most?',
      q9: '9. Are you willing to work weekends?',
      q10: '10. What benefits are most important to you?',
      q11: '11. What is your expected salary range?',
      q12: '12. Are you currently studying?',
      q13: '13. Any additional comments or notes?',
      q14: '14. How would you like to be contacted?',
      q15: '15. Contact information:',
      q16: '16. Are you currently employed?',
      q17: '17. Full name:'
    };

    const templateParams = {
      from_name: formData.q17 || 'Anonymous',
      to_name: 'Survey Administrator',
      message: Object.entries(formData)
        .map(([key, value]) => {
          const displayValue = getDisplayValue(key, value);
          return `${questionTexts[key as keyof typeof questionTexts]}: ${displayValue || 'No answer'}`;
        })
        .join('\n\n'),
      reply_to: formData.q14 === 'email' ? formData.q15 : 'no-reply@example.com'
    };

    console.log('Sending email with params:', templateParams);

    emailjs.send(
      process.env.EMAIL_SERVICE!,
      process.env.EMAIL_TEMPLATE!,
      templateParams,
      process.env.EMAIL_GENERAL
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      
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
      
      setFormData({
        name: '',
        q1: [],
        q2: '',
        q3: '',
        q4: [],
        q5: '',
        q6: '',
        q7: [],
        q8: '',
        q9: '',
        q10: [],
        q11: '',
        q12: '',
        q13: '',
        q14: '',
        q15: '',
        q16: '',
        q17: ''
      });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      
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
      if (captchaRef.current) {
        captchaRef.current.reset();
      }
    });
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

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index + 1);
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
        className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-8" 
        onSubmit={handleSubmit} 
        ref={formRef}
      >
        {/* Progress indicator */}
        <div className="flex overflow-x-auto gap-2 pb-4">
          {Array.from({ length: 17 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuestionClick(index)}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentQuestion > index + 1 ? 'bg-green-500 text-white' : 
                  currentQuestion === index + 1 ? 'bg-pink-500 text-white' : 
                  'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div 
ref={(el) => { questionRefs.current[0] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 1 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            1. Which of these best describe you? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="checkbox" 
                  name={`q1-${option}`} 
                  onChange={handleChange} 
                  checked={formData.q1.includes(option)} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{optionTexts['q1'][option]}</span>
              </label>
            ))}
          </div>
          {errors.q1 && <div className="text-red-500 text-sm mt-1">{errors.q1}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 2 */}
        <div 
ref={(el) => { questionRefs.current[1] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 2 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            2. What is your current city?
          </label>
          <input 
            type="text" 
            name="q2" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q2} 
          />
          {errors.q2 && <div className="text-red-500 text-sm mt-2">{errors.q2}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 3 */}
        <div 
ref={(el) => { questionRefs.current[2] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 3 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            3. Would you consider relocating?
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q3" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q3 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          {errors.q3 && <div className="text-red-500 text-sm mt-1">{errors.q3}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 4 */}
        <div 
ref={(el) => { questionRefs.current[3] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 4 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            4. What are your preferred work environments? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="checkbox" 
                  name={`q4-${option}`} 
                  onChange={handleChange} 
                  checked={formData.q4.includes(option)} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{optionTexts['q4'][option]}</span>
              </label>
            ))}
          </div>
          {errors.q4 && <div className="text-red-500 text-sm mt-1">{errors.q4}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 4 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 5 */}
        <div 
ref={(el) => { questionRefs.current[4] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 5 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            5. Write a short description of your dream job.
          </label>
          <input 
            type="text" 
            name="q5" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q5} 
          />
          {errors.q5 && <div className="text-red-500 text-sm mt-2">{errors.q5}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 5 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 6 */}
        <div 
ref={(el) => { questionRefs.current[5] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 6 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            6. Are you open to internships?
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q6" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q6 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          {errors.q6 && <div className="text-red-500 text-sm mt-1">{errors.q6}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 6 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        <div 
ref={(el) => { questionRefs.current[6] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 7 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            7. How do you prefer to communicate? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="checkbox" 
                  name={`q7-${option}`} 
                  onChange={handleChange} 
                  checked={formData.q7.includes(option)} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{optionTexts['q7'][option]}</span>
              </label>
            ))}
          </div>
          {errors.q7 && <div className="text-red-500 text-sm mt-1">{errors.q7}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 7 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 8 */}
        <div 
ref={(el) => { questionRefs.current[7] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 8 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            8. What motivates you the most?
          </label>
          <input 
            type="text" 
            name="q8" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q8} 
          />
          {errors.q8 && <div className="text-red-500 text-sm mt-2">{errors.q8}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 8 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 9 */}
        <div 
ref={(el) => { questionRefs.current[8] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 9 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            9. Are you willing to work weekends?
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q9" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q9 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          {errors.q9 && <div className="text-red-500 text-sm mt-1">{errors.q9}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 9 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 10 */}
        <div 
ref={(el) => { questionRefs.current[9] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 10 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            10. What benefits are most important to you? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="checkbox" 
                  name={`q10-${option}`} 
                  onChange={handleChange} 
                  checked={formData.q10.includes(option)} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{optionTexts['q10'][option]}</span>
              </label>
            ))}
          </div>
          {errors.q10 && <div className="text-red-500 text-sm mt-1">{errors.q10}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 10 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 11 */}
        <div 
ref={(el) => { questionRefs.current[10] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 11 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            11. What is your expected salary range?
          </label>
          <input 
            type="text" 
            name="q11" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q11} 
          />
          {errors.q11 && <div className="text-red-500 text-sm mt-2">{errors.q11}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 11 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 12 */}
        <div 
ref={(el) => { questionRefs.current[11] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 12 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            12. Are you currently studying?
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q12" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q12 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          {errors.q12 && <div className="text-red-500 text-sm mt-1">{errors.q12}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 12 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 13 */}
        <div 
ref={(el) => { questionRefs.current[12] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 13 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            13. Any additional comments or notes?
          </label>
          <input 
            type="text" 
            name="q13" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q13} 
          />
          {errors.q13 && <div className="text-red-500 text-sm mt-2">{errors.q13}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 13 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 14 */}
        <div 
ref={(el) => { questionRefs.current[13] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 14 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            14. How would you like to be contacted? (Choose one)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['WhatsApp', 'Telegram', 'Email'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q14" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q14 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          {errors.q14 && <div className="text-red-500 text-sm mt-1">{errors.q14}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 14 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 15 */}
        <div 
ref={(el) => { questionRefs.current[14] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 15 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            15. Please provide your contact information:
          </label>
          <input 
            type="text" 
            name="q15" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            placeholder={
              formData.q14 === 'Email' ? 'Enter your email address' : 
              formData.q14 ? 'Enter your phone number' : 
              'Enter your WhatsApp/Telegram number or Email address'
            } 
            onChange={handleChange} 
            value={formData.q15}
          />
          {errors.q15 && <div className="text-red-500 text-sm mt-2">{errors.q15}</div>}
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 15 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 16 */}
        <div 
ref={(el) => { questionRefs.current[15] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 16 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            16. Are you currently employed? (Optional)
          </label>
          <div className="flex flex-wrap gap-4 mb-6">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-3 px-4 py-3  rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <input 
                  type="radio" 
                  name="q16" 
                  value={option} 
                  onChange={handleChange} 
                  checked={formData.q16 === option} 
                  className="w-5 h-5 accent-pink-500"
                /> 
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
          <hr className={`mt-6 border-t-2 border-gray-200 ${currentQuestion === 16 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        </div>

        {/* Question 17 */}
        <div 
ref={(el) => { questionRefs.current[16] = el; }}
          className={`transition-opacity duration-300 ${currentQuestion === 17 ? 'opacity-100' : 'opacity-50'}`}
        >
          <label className="block text-xl font-bold text-gray-800 mb-4">
            17. What is your full name? (Optional)
          </label>
          <input 
            type="text" 
            name="q17" 
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
            onChange={handleChange} 
            value={formData.q17} 
          />
        </div>
        
        <button 
          type="submit" 
          className="mt-8 bg-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl"
        >
          Submit Survey
        </button>
        
        {showCaptcha && (
          <div className="mt-8">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey="6Lc6zFgrAAAAAKj52053YpaBaLUfFuSrgXxUS_G4"
              onChange={handleCaptchaChange}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default FormSurvey2;