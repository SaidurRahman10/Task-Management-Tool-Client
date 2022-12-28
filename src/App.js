
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Route/Route';
import { Toaster } from 'react-hot-toast';
import banner from './img/4.png'

function App() {
  return (
    <div className=" bg-fixed  bg-no-repeat bg-cover"
    style={{ backgroundImage: `url(${banner})` }}>
      <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;
