'use client'

import { useState } from 'react'

const tagged = [
  { id: 1, name: 'Getting Started' },
  { id: 2, name: 'Health' },
  { id: 3, name: 'Lifestyle' },
    // { id: 4, name: 'All' }

]

type Question = {
  label: string
  type: 'text' | 'textarea' | 'rating' | 'checkbox' | 'radio'
  options?: string[]
}

export default function CreateSurveyForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { label: '', type: 'text' }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const updated = [...questions]

    if (field === 'options') {
      updated[index].options = value.split(',').map(opt => opt.trim())
    } else {
      updated[index][field] = value as any

      // Handle type change side effects
      if (field === 'type') {
        if (value === 'checkbox' || value === 'radio') {
          updated[index].options = ['']
        } else {
          delete updated[index].options
        }
      }
    }

    setQuestions(updated)
  }

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions]
    if (updated[qIndex].options) {
      updated[qIndex].options![oIndex] = value
      setQuestions(updated)
    }
  }

  const addOption = (qIndex: number) => {
    const updated = [...questions]
    if (updated[qIndex].options) {
      updated[qIndex].options!.push('')
      setQuestions(updated)
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { label: '', type: 'text' }])
  }

  const removeQuestion = (index: number) => {
    const updated = [...questions]
    updated.splice(index, 1)
    setQuestions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = { title, description, tag, questions }

    try {
      const res = await fetch('/api/boss_surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Something went wrong')
      alert('Survey created successfully!')
      setTitle('')
      setDescription('')
      setTag('')
      setQuestions([{ label: '', type: 'text' }])
    } catch (err: any) {
      alert(`Failed to create survey: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-xl font-bold">Create New Survey</h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Tag</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a tag</option>
          {tagged.map((item) => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">Questions</label>
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4 p-3 border rounded bg-gray-50">
            <div className="mb-2">
              <label className="block text-sm">Label</label>
              <input
                value={q.label}
                onChange={(e) => handleQuestionChange(idx, 'label', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Type</label>
              <select
                value={q.type}
                onChange={(e) => handleQuestionChange(idx, 'type', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="rating">Rating</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            </div>

            {(q.type === 'checkbox' || q.type === 'radio') && (
              <div className="mb-2 space-y-2">
                <label className="block text-sm font-medium">Options</label>
                {q.options?.map((opt, oIdx) => (
                  <input
                    key={oIdx}
                    type="text"
                    value={opt}
                    placeholder={`Option ${oIdx + 1}`}
                    onChange={(e) => handleOptionChange(idx, oIdx, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addOption(idx)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}

            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(idx)}
                className="text-red-500 text-sm"
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
        >
          + Add Question
        </button>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isSubmitting ? 'Creating...' : 'Create Survey'}
        </button>
      </div>
    </form>
  )
}
