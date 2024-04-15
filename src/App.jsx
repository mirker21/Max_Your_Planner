import Todo from './Todo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Todo />

      <div className="toast-container">
          <ToastContainer 
              position="bottom-right"
              stacked={true}
          />
      </div>
    </>
  )
}

export default App
