import { Container, Card, Box } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export function DashboardPage({ students }: { students: number }) {
  return (
    <Container>
      <Box bd={1}  style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
      }}>
      <h2>Dashboard</h2>
      <p className="panel-copy">
        Your institution currently has <strong>{students}</strong> students.
      </p>
      <Link className="back-link" to="/">
        Update onboarding details
      </Link>
      </Box>
    </Container>
  )
}

export function validateDashboardSearch(search: Record<string, unknown>) {
  const parsed = Number(search.students)

  return {
    students: Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0,
  }
}
