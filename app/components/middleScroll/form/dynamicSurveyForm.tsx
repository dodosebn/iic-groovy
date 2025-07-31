'use client';
import React from 'react';

interface Question {
  label: string;
  type: string;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export function DynamicSurveyForm({ survey }: { survey: Survey }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{survey.title}</h2>
      <p className="text-sm text-gray-600">{survey.description}</p>
      <form className="space-y-3">
        {survey.questions.map((q, idx) => (
          <div key={idx}>
            <label className="block mb-1 font-medium">{q.label}</label>
            {q.type === 'text' && <input type="text" className="w-full border p-2 rounded" />}
            {q.type === 'textarea' && <textarea className="w-full border p-2 rounded" />}
            {q.type === 'rating' && <input type="number" min={1} max={5} className="w-full border p-2 rounded" />}
            {q.type === 'checkbox' && <input type="checkbox" />}
            {q.type === 'radio' && <input type="radio" />}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
