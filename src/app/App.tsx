import { RouterProvider } from 'react-router-dom';
import { AppProvider, useAppContext } from '../context/AppContext';
import { router } from './routes';
import { Loading } from '../components/Loading/Loading';

function AppContent() {
  const { isLoading, error, retry } = useAppContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: '#991b1b',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          padding: '1rem',
          color: '#fee2e2',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '350px',
        }}>
          <div>{error}</div>
          <button
            onClick={retry}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              border: '1px solid #ef4444',
              borderRadius: '6px',
              color: '#fef2f2',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Retry Connection
          </button>
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
