
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Route/Route';

// bg-gradient-to-r from-pink-400 via-cyan-900 to-teal-500
function App() {
  return (
    <div className="   "
    >
      <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;
