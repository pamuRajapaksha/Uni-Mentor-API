import { useCallback, useEffect, useState } from 'react'
import {
  createMentor,
  deleteMentor,
  getMentors,
  updateMentor,
} from './api/mentorApi'
import './App.css'

const EMPTY_FORM = {
  name: '',
  email: '',
  expertise: '',
  year: '',
  bio: '',
}

function App() {
  const [mentors, setMentors] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const loadMentors = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMentors()
      setMentors(Array.isArray(data) ? data : [])
    } catch (err) {
      if (err.message === 'No mentors found.') {
        setMentors([])
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMentors()
  }, [loadMentors])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function startEdit(mentor) {
    setEditingId(mentor._id)
    setForm({
      name: mentor.name,
      email: mentor.email,
      expertise: mentor.expertise,
      year: String(mentor.year),
      bio: mentor.bio,
    })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      expertise: form.expertise.trim(),
      year: Number(form.year),
      bio: form.bio.trim(),
    }

    try {
      if (editingId) {
        await updateMentor(editingId, payload)
      } else {
        await createMentor(payload)
      }
      cancelEdit()
      await loadMentors()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this mentor?')) return

    setError(null)
    try {
      await deleteMentor(id)
      if (editingId === id) cancelEdit()
      await loadMentors()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Uni Mentor</h1>
        <p>Find and manage student mentors</p>
      </header>

      <main className="app-main">
        <section className="panel form-panel">
          <h2>{editingId ? 'Edit mentor' : 'Add mentor'}</h2>
          <form className="mentor-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Expertise
              <input
                name="expertise"
                value={form.expertise}
                onChange={handleChange}
                placeholder="e.g. Algorithms"
                required
              />
            </label>
            <label>
              Year
              <input
                name="year"
                type="number"
                min="1"
                max="6"
                value={form.year}
                onChange={handleChange}
                required
              />
            </label>
            <label className="full-width">
              Bio
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                required
              />
            </label>
            <div className="form-actions full-width">
              <button type="submit" disabled={submitting}>
                {submitting
                  ? 'Saving…'
                  : editingId
                    ? 'Update mentor'
                    : 'Add mentor'}
              </button>
              {editingId && (
                <button type="button" className="secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </section>

        <section className="panel list-panel">
          <div className="list-header">
            <h2>Mentors</h2>
            <button
              type="button"
              className="secondary"
              onClick={loadMentors}
              disabled={loading}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="status">Loading mentors…</p>
          ) : mentors.length === 0 ? (
            <p className="status">No mentors yet. Add the first one above.</p>
          ) : (
            <ul className="mentor-list">
              {mentors.map((mentor) => (
                <li key={mentor._id} className="mentor-card">
                  <div className="mentor-card-header">
                    <h3>{mentor.name}</h3>
                    <span className="year-badge">Year {mentor.year}</span>
                  </div>
                  <p className="mentor-email">{mentor.email}</p>
                  <p className="mentor-expertise">{mentor.expertise}</p>
                  <p className="mentor-bio">{mentor.bio}</p>
                  <div className="card-actions">
                    <button type="button" onClick={() => startEdit(mentor)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDelete(mentor._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
