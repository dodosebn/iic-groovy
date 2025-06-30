'use client'
import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

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

const FormSurvey4 = () => {
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

  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        process.env.EMAIL_SERVICE!,
        process.env.EMAIL_TEMPLATE!,
        formRef.current!,
        process.env.EMAIL_GENERAL
      );
      
      toast.success('Survey submitted successfully!', {
        position: "top-center",
        theme: "dark",
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
    } catch (error) {
      toast.error('Failed to submit survey. Please try again.', {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const floatingOrbs = Array(10).fill(0).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-gradient-to-br from-pink-500 to-purple-600 opacity-20"
      initial={{
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
      }}
      animate={{
        x: [null, Math.random() * 100 - 50],
        y: [null, Math.random() * 100 - 50],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingOrbs}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
      </div>

      <ToastContainer />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 mx-auto py-16   lg:px-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-5 border border-gray-700 shadow-2xl"
        >
          {/* <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4"
            >
              Groovy Career Survey
            </motion.h1>
          
          </div> */}

          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-12"
          >
            {/* Question 1 */}
            <motion.div 
              className={`p-6 rounded-xl transition-all duration-300 ${activeQuestion === 1 ? 'bg-gray-700/50 border border-pink-500/30' : 'bg-gray-800/30'}`}
              onMouseEnter={() => setActiveQuestion(1)}
              onMouseLeave={() => setActiveQuestion(null)}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">1. Which of these best describe you?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Student', 'Professional', 'Freelancer', 'Entrepreneur'].map((option, i) => (
                  <motion.label 
                    key={option}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${formData.q1.includes(String.fromCharCode(65 + i)) ? 'bg-pink-500/20 border border-pink-500/50' : 'bg-gray-700/50 hover:bg-gray-700/70'}`}
                  >
                    <input 
                      type="checkbox" 
                      name={`q1-${String.fromCharCode(65 + i)}`} 
                      onChange={handleChange} 
                      checked={formData.q1.includes(String.fromCharCode(65 + i))} 
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center ${formData.q1.includes(String.fromCharCode(65 + i)) ? 'bg-pink-500' : 'bg-gray-600 border border-gray-500'}`}>
                      {formData.q1.includes(String.fromCharCode(65 + i)) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Question 2 */}
            <motion.div 
              className={`p-6 rounded-xl transition-all duration-300 ${activeQuestion === 2 ? 'bg-gray-700/50 border border-pink-500/30' : 'bg-gray-800/30'}`}
              onMouseEnter={() => setActiveQuestion(2)}
              onMouseLeave={() => setActiveQuestion(null)}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">2. What is your current city?</h3>
              <div className="relative">
                <input 
                  type="text" 
                  name="q2" 
                  value={formData.q2}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border-b-2 border-gray-600 focus:border-pink-500 text-white text-xl py-3 px-4 rounded-lg focus:outline-none transition-all"
                  placeholder="Enter your city"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </motion.div>

            {/* Question 3 */}
            <motion.div 
              className={`p-6 rounded-xl transition-all duration-300 ${activeQuestion === 3 ? 'bg-gray-700/50 border border-pink-500/30' : 'bg-gray-800/30'}`}
              onMouseEnter={() => setActiveQuestion(3)}
              onMouseLeave={() => setActiveQuestion(null)}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">3. Would you consider relocating?</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Yes', 'No'].map((option) => (
                  <motion.label 
                    key={option}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all ${formData.q3 === option ? 'bg-pink-500/20 border border-pink-500/50' : 'bg-gray-700/50 hover:bg-gray-700/70'}`}
                  >
                    <input 
                      type="radio" 
                      name="q3" 
                      value={option}
                      onChange={handleChange}
                      checked={formData.q3 === option}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${formData.q3 === option ? 'border-4 border-pink-500' : 'border-2 border-gray-500'}`}></div>
                    <span className="text-lg">{option}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Question 4 */}
            <motion.div 
              className={`p-6 rounded-xl transition-all duration-300 ${activeQuestion === 4 ? 'bg-gray-700/50 border border-pink-500/30' : 'bg-gray-800/30'}`}
              onMouseEnter={() => setActiveQuestion(4)}
              onMouseLeave={() => setActiveQuestion(null)}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">4. What are your preferred work environments?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Office', 'Remote', 'Hybrid', 'Flexible'].map((option, i) => (
                  <motion.label 
                    key={option}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${formData.q4.includes(String.fromCharCode(65 + i)) ? 'bg-pink-500/20 border border-pink-500/50' : 'bg-gray-700/50 hover:bg-gray-700/70'}`}
                  >
                    <input 
                      type="checkbox" 
                      name={`q4-${String.fromCharCode(65 + i)}`} 
                      onChange={handleChange} 
                      checked={formData.q4.includes(String.fromCharCode(65 + i))} 
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center ${formData.q4.includes(String.fromCharCode(65 + i)) ? 'bg-pink-500' : 'bg-gray-600 border border-gray-500'}`}>
                      {formData.q4.includes(String.fromCharCode(65 + i)) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Question 5 */}
            <motion.div 
              className={`p-6 rounded-xl transition-all duration-300 ${activeQuestion === 5 ? 'bg-gray-700/50 border border-pink-500/30' : 'bg-gray-800/30'}`}
              onMouseEnter={() => setActiveQuestion(5)}
              onMouseLeave={() => setActiveQuestion(null)}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-pink-300">5. Describe your dream job</h3>
              <div className="relative">
                <textarea 
                  name="q5" 
                  value={formData.q5}
                  onChange={() => handleChange}
                  className="w-full bg-gray-700/50 border-2 border-gray-600 focus:border-pink-500 text-white text-xl py-3 px-4 rounded-lg focus:outline-none transition-all min-h-[120px]"
                  placeholder="Tell us about your ideal work situation..."
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div className="pt-8">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-5 px-8 rounded-xl text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg hover:shadow-pink-500/30 transition-all ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaPaperPlane size={30} />

                   <span className='text-3xl pl-2'>submit</span> 
                  </span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* <div className="mt-12 text-center text-gray-400">
          <p>Your information will be kept confidential</p>
        </div> */}
      </motion.div>
    </div>
  );
};

export default FormSurvey4;