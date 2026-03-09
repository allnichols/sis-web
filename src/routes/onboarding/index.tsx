import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Container } from '@mantine/core'

export function OnboardingPage() {
  const navigate = useNavigate({ from: '/' })
  const [studentCount, setStudentCount] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsed = Number(studentCount)

    if (!Number.isInteger(parsed) || parsed < 1) {
      setError('Enter a valid number of students (minimum 1).')
      return
    }

    setError('')
    navigate({
      to: '/dashboard',
      search: { students: parsed },
    })
  }

  return (
    <Container>
      <section className="panel">
        <h2>Onboarding</h2>
        <p className="panel-copy">
          Start by entering the total number of students in your institution.
        </p>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <label htmlFor="students">How many students do you have?</label>
        <input
          id="students"
          name="students"
          type="number"
          min={1}
          step={1}
          placeholder="e.g. 750"
          value={studentCount}
          onChange={(event) => setStudentCount(event.target.value)}
          required
        />
        {error ? <p className="error-message">{error}</p> : null}
        <button type="submit">Continue to Dashboard</button>
      </form>
    </section>
    </Container>
  )
}
