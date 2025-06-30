'use client'
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
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

const FormSurvey = () => {
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
        <label className="font-sans text-lg text-gray-800">
          1. Which of these best describe you? (Select all that apply)
        </label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q1-A" 
              onChange={handleChange} 
              checked={formData.q1.includes('A')} 
              className="w-4 h-4"
            /> 
            Student
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q1-B" 
              onChange={handleChange} 
              checked={formData.q1.includes('B')} 
              className="w-4 h-4"
            /> 
            Professional
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q1-C" 
              onChange={handleChange} 
              checked={formData.q1.includes('C')} 
              className="w-4 h-4"
            /> 
            Freelancer
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q1-D" 
              onChange={handleChange} 
              checked={formData.q1.includes('D')} 
              className="w-4 h-4"
            /> 
            Entrepreneur
          </label>
        </div>
        {errors.q1 && <div className="text-red-500 text-sm mt-1">{errors.q1}</div>}

        {/* Question 2 */}
        <label className="font-sans text-lg text-gray-800">2. What is your current city?</label>
        <input 
          type="text" 
          name="q2" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q2} 
        />
        {errors.q2 && <div className="text-red-500 text-sm mt-1">{errors.q2}</div>}

        {/* Question 3 */}
        <label className="font-sans text-lg text-gray-800">3. Would you consider relocating?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="q3" 
          onChange={handleChange} 
          value={formData.q3}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.q3 && <div className="text-red-500 text-sm mt-1">{errors.q3}</div>}

        {/* Question 4 */}
        <label className="font-sans text-lg text-gray-800">4. What are your preferred work environments?</label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q4-A" 
              onChange={handleChange} 
              checked={formData.q4.includes('A')} 
              className="w-4 h-4"
            /> 
            Office
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q4-B" 
              onChange={handleChange} 
              checked={formData.q4.includes('B')} 
              className="w-4 h-4"
            /> 
            Remote
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q4-C" 
              onChange={handleChange} 
              checked={formData.q4.includes('C')} 
              className="w-4 h-4"
            /> 
            Hybrid
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q4-D" 
              onChange={handleChange} 
              checked={formData.q4.includes('D')} 
              className="w-4 h-4"
            /> 
            Flexible
          </label>
        </div>
        {errors.q4 && <div className="text-red-500 text-sm mt-1">{errors.q4}</div>}

        {/* Question 5 */}
        <label className="font-sans text-lg text-gray-800">5. Write a short description of your dream job.</label>
        <input 
          type="text" 
          name="q5" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q5} 
        />
        {errors.q5 && <div className="text-red-500 text-sm mt-1">{errors.q5}</div>}

        {/* Question 6 */}
        <label className="font-sans text-lg text-gray-800">6. Are you open to internships?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="q6" 
          onChange={handleChange} 
          value={formData.q6}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.q6 && <div className="text-red-500 text-sm mt-1">{errors.q6}</div>}

        {/* Question 7 */}
        <label className="font-sans text-lg text-gray-800">7. How do you prefer to communicate?</label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q7-A" 
              onChange={handleChange} 
              checked={formData.q7.includes('A')} 
              className="w-4 h-4"
            /> 
            Email
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q7-B" 
              onChange={handleChange} 
              checked={formData.q7.includes('B')} 
              className="w-4 h-4"
            /> 
            Phone
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q7-C" 
              onChange={handleChange} 
              checked={formData.q7.includes('C')} 
              className="w-4 h-4"
            /> 
            Messaging Apps
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q7-D" 
              onChange={handleChange} 
              checked={formData.q7.includes('D')} 
              className="w-4 h-4"
            /> 
            In-person
          </label>
        </div>
        {errors.q7 && <div className="text-red-500 text-sm mt-1">{errors.q7}</div>}

        {/* Question 8 */}
        <label className="font-sans text-lg text-gray-800">8. What motivates you the most?</label>
        <input 
          type="text" 
          name="q8" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q8} 
        />
        {errors.q8 && <div className="text-red-500 text-sm mt-1">{errors.q8}</div>}

        {/* Question 9 */}
        <label className="font-sans text-lg text-gray-800">9. Are you willing to work weekends?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="q9" 
          onChange={handleChange} 
          value={formData.q9}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.q9 && <div className="text-red-500 text-sm mt-1">{errors.q9}</div>}

        {/* Question 10 */}
        <label className="font-sans text-lg text-gray-800">10. What benefits are most important to you?</label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q10-A" 
              onChange={handleChange} 
              checked={formData.q10.includes('A')} 
              className="w-4 h-4"
            /> 
            Health Insurance
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q10-B" 
              onChange={handleChange} 
              checked={formData.q10.includes('B')} 
              className="w-4 h-4"
            /> 
            Remote Work
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q10-C" 
              onChange={handleChange} 
              checked={formData.q10.includes('C')} 
              className="w-4 h-4"
            /> 
            Bonus Pay
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="checkbox" 
              name="q10-D" 
              onChange={handleChange} 
              checked={formData.q10.includes('D')} 
              className="w-4 h-4"
            /> 
            Vacation Time
          </label>
        </div>
        {errors.q10 && <div className="text-red-500 text-sm mt-1">{errors.q10}</div>}

        <label className="font-sans text-lg text-gray-800">11. What is your expected salary range?</label>
        <input 
          type="text" 
          name="q11" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q11} 
        />
        {errors.q11 && <div className="text-red-500 text-sm mt-1">{errors.q11}</div>}

        <label className="font-sans text-lg text-gray-800">12. Are you currently studying?</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="q12" 
          onChange={handleChange} 
          value={formData.q12}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.q12 && <div className="text-red-500 text-sm mt-1">{errors.q12}</div>}

        <label className="font-sans text-lg text-gray-800">13. Any additional comments or notes?</label>
        <input 
          type="text" 
          name="q13" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q13} 
        />
        {errors.q13 && <div className="text-red-500 text-sm mt-1">{errors.q13}</div>}
        
        <label className="font-sans text-lg text-gray-800">14. How would you like to be contacted? (Choose one)</label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-base">
            <input 
              type="radio" 
              name="q14" 
              value="WhatsApp" 
              onChange={handleChange} 
              checked={formData.q14 === 'WhatsApp'} 
              className="w-4 h-4"
            /> 
            WhatsApp
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="radio" 
              name="q14" 
              value="Telegram" 
              onChange={handleChange} 
              checked={formData.q14 === 'Telegram'} 
              className="w-4 h-4"
            /> 
            Telegram
          </label>
          <label className="flex items-center gap-2 text-base">
            <input 
              type="radio" 
              name="q14" 
              value="Email" 
              onChange={handleChange} 
              checked={formData.q14 === 'Email'} 
              className="w-4 h-4"
            /> 
            Email
          </label>
        </div>
        {errors.q14 && <div className="text-red-500 text-sm mt-1">{errors.q14}</div>}

        <label className="font-sans text-lg text-gray-800">15. Please provide your contact information:</label>
        <input 
          type="text" 
          name="q15" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          placeholder={
            formData.q14 === 'Email' ? 'Enter your email address' : 
            formData.q14 ? 'Enter your phone number' : 
            'Enter your WhatsApp/Telegram number or Email address'
          } 
          onChange={handleChange} 
          value={formData.q15}
        />
        {errors.q15 && <div className="text-red-500 text-sm mt-1">{errors.q15}</div>}

        <label className="font-sans text-lg text-gray-800">16. Are you currently employed? (Optional)</label>
        <select 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          name="q16" 
          onChange={handleChange} 
          value={formData.q16}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <label className="font-sans text-lg text-gray-800">17. What is your full name? (Optional)</label>
        <input 
          type="text" 
          name="q17" 
          className="bg-transparent border-b-2 border-gray-300 py-2 px-1 w-full text-base outline-none focus:border-pink-400 transition-colors" 
          onChange={handleChange} 
          value={formData.q17} 
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
              sitekey="6Lc6zFgrAAAAAKj52053YpaBaLUfFuSrgXxUS_G4"
              onChange={handleCaptchaChange}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default FormSurvey;