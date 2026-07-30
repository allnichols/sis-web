import { Container,  Box } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export default function DashboardHome() {
  return (
    <Container>
      <Box bd={1}  style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
      }}>
      <h2>Dashboard</h2>
      
      <Link className="back-link" to="/">
        Update onboarding details
      </Link>
      </Box>
    </Container>
  )
}
