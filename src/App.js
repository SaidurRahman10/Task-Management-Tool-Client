
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Route/Route';


function App() {
  return (
    <div className=" bg-fixed  bg-no-repeat bg-cover bg-gradient-to-r from-pink-400 via-cyan-900 to-teal-500 "
    >
      <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;
