import Todo from './Todo'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentPanel, setCurrentPanel] = useState('Greet');
  return (
    <>
      <Todo 
        currentPanel={currentPanel}
        setCurrentPanel={setCurrentPanel}
      />

      <div className="toast-container" aria-live="polite" aria-atomic="true">
          <ToastContainer 
              position="bottom-right"
              stacked={true}
              draggable={false}
          />
      </div>
    </>
  )
}

export default App
