import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@mantine/core/styles.css'

import './index.css'
import App from './App'


const theme = createTheme({
  // fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
  components: { 
    Box: {
      styles: () => ({
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px',
          padding: '2rem',
          backgroundColor: '#fff',
        },
      }), 
        }
    }
  });

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
