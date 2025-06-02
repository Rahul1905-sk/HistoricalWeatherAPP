import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster position="top-right" toastOptions={{
      style: {
        border: '1px solid #3B82F6',
        padding: '16px',
        color: '#1F2937',
      },
    }} />
  </>
);