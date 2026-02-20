import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProvider, useAppContext } from '../context/AppContext';
import { router } from './routes';
import { Loading } from '../components/Loading/Loading';
import { ErrorToast } from '../components/ErrorToast/ErrorToast';

function AppContent() {
  const { isLoading, error, retry } = useAppContext();
  const [dismissed, setDismissed] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error && !dismissed && (
        <ErrorToast
          message={error}
          onRetry={() => { setDismissed(false); retry(); }}
          onDismiss={() => setDismissed(true)}
        />
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
