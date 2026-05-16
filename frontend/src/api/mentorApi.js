const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/api/mentor${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || data.error || response.statusText
    throw new Error(message)
  }

  return data
}

export function getMentors() {
  return request('/getall')
}

export function createMentor(mentor) {
  return request('/create', {
    method: 'POST',
    body: JSON.stringify(mentor),
  })
}

export function updateMentor(id, mentor) {
  return request(`/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(mentor),
  })
}

export function deleteMentor(id) {
  return request(`/delete/${id}`, { method: 'DELETE' })
}
