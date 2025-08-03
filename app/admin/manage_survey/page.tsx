'use client'

import { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Question = {
  label: string
  type: 'text' | 'textarea' | 'rating' | 'checkbox' | 'radio'
  options?: string[]
}

type Survey = {
  id: string
  title: string
  description: string
  tag: string
  questions: Question[]
  created_at: string
}

export default function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchSurveys = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/boss_feedback')
      const data = await res.json()
      setSurveys(data)
    } catch (err: any) {
      toast.error('Failed to fetch surveys: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this survey?')) return
    setIsDeleting(id)
    try {
      const res = await fetch(`/api/boss_feedback/${id}`, {
        method: 'DELETE',
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Delete failed')
      toast.success('Survey deleted successfully')
      fetchSurveys()
    } catch (err: any) {
      toast.error('Error deleting survey: ' + err.message)
    } finally {
      setIsDeleting(null)
    }
  }

  const handleEditChange = (field: keyof Survey, value: any) => {
    if (!editingSurvey) return
    setEditingSurvey({ ...editingSurvey, [field]: value })
  }

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    if (!editingSurvey) return
    const updatedQuestions = [...editingSurvey.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }

    if (field === 'type') {
      if (value === 'checkbox' || value === 'radio') {
        updatedQuestions[index].options = ['']
      } else {
        delete updatedQuestions[index].options
      }
    }

    setEditingSurvey({ ...editingSurvey, questions: updatedQuestions })
  }

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    if (!editingSurvey) return
    const updatedQuestions = [...editingSurvey.questions]
    if (updatedQuestions[qIndex].options) {
      updatedQuestions[qIndex].options![oIndex] = value
      setEditingSurvey({ ...editingSurvey, questions: updatedQuestions })
    }
  }

  const handleAddOption = (qIndex: number) => {
    if (!editingSurvey) return
    const updatedQuestions = [...editingSurvey.questions]
    if (updatedQuestions[qIndex].options) {
      updatedQuestions[qIndex].options!.push('')
    } else {
      updatedQuestions[qIndex].options = ['']
    }
    setEditingSurvey({ ...editingSurvey, questions: updatedQuestions })
  }

  const handleAddQuestion = () => {
    if (!editingSurvey) return
    setEditingSurvey({
      ...editingSurvey,
      questions: [
        ...editingSurvey.questions,
        { label: '', type: 'text', options: [] }
      ]
    })
  }

  const handleRemoveQuestion = (index: number) => {
    if (!editingSurvey) return
    const updatedQuestions = [...editingSurvey.questions]
    updatedQuestions.splice(index, 1)
    setEditingSurvey({ ...editingSurvey, questions: updatedQuestions })
  }

  const handleUpdate = async () => {
    if (!editingSurvey) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/boss_feedback/${editingSurvey.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingSurvey.title,
          description: editingSurvey.description,
          tag: editingSurvey.tag,
          questions: editingSurvey.questions,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Update failed')
      toast.success('Survey updated successfully')
      setEditingSurvey(null)
      fetchSurveys()
    } catch (err: any) {
      toast.error('Failed to update survey: ' + err.message)
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Surveys</h1>
        <p className="text-gray-600 mt-2">View, edit and delete your feedback surveys</p>
      </div>

      {editingSurvey && (
        <div className="bg-white shadow rounded-xl p-6 border border-gray-200 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Edit Survey</h2>
            <button onClick={() => setEditingSurvey(null)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block font-medium text-sm mb-1">Title</label>
              <input
                value={editingSurvey.title}
                onChange={(e) => handleEditChange('title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Description</label>
              <textarea
                value={editingSurvey.description}
                onChange={(e) => handleEditChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Tag</label>
              <input
                value={editingSurvey.tag}
                onChange={(e) => handleEditChange('tag', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Questions</h3>
            <div className="space-y-4">
              {editingSurvey.questions.map((q, index) => (
                <div key={index} className="p-4 border bg-gray-50 rounded space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Question {index + 1}</label>
                    <button onClick={() => handleRemoveQuestion(index)} className="text-red-500 text-sm">
                      Remove
                    </button>
                  </div>

                  <input
                    value={q.label}
                    onChange={(e) => handleQuestionChange(index, 'label', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Enter question"
                  />

                  <div className="grid gap-3">
                    <div>
                      <label className="text-sm block mb-1 font-medium">Type</label>
                      <select
                        value={q.type}
                        onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="rating">Rating</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                      </select>
                    </div>

                    {(q.type === 'checkbox' || q.type === 'radio') && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Options</label>
                        <div className="space-y-2">
                          {q.options?.map((opt, oIdx) => (
                            <input
                              key={oIdx}
                              type="text"
                              value={opt}
                              placeholder={`Option ${oIdx + 1}`}
                              onChange={(e) => handleOptionChange(index, oIdx, e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddOption(index)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            + Add Option
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-3 px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
            >
              + Add Question
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setEditingSurvey(null)}
              className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : surveys.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No surveys available</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div key={survey.id} className="bg-white border border-gray-200  shadow-sm hover:shadow-md transition p-5 relative">
              <span className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-sm font-medium
               px-4 py-1 rounded-bl-lg">
                {survey.tag}
              </span>

              <h3 className="text-lg font-semibold text-gray-800">{survey.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{survey.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(survey.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex gap-2">
                 <button
  onClick={() => setEditingSurvey(survey)}
  className="p-2 flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
>
  <FaRegEdit />
  <span>Edit</span>
</button>

                  <button
  onClick={() => handleDelete(survey.id)}
  disabled={isDeleting === survey.id}
  className="p-2 flex items-center justify-center gap-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
>
  {isDeleting === survey.id ? (
    'Deleting...'
  ) : (
    <>
      <FaTrash />
      <span>Delete</span>
    </>
  )}
</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
