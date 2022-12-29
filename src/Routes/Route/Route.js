
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main';
import AddTask from '../../Pages/AddTask/AddTask';
import CompletedTask from '../../Pages/CompletedTask/CompletedTask';
import Login from '../../Pages/Login/Login';
import Registration from '../../Pages/Login/Registration';
import MyTask from '../../Pages/MyTask/MyTask';
import Update from '../../Pages/Update/Update';
import ViewDetails from '../../Pages/ViewDetails/ViewDetails';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


    export  const router = createBrowserRouter([
        {path:'/',element:<Main></Main>,children:[
            {path:'/',element:<AddTask></AddTask>},
            {path:'/mytask',element:<MyTask></MyTask>},
            {path:"/completedtask",element:<CompletedTask></CompletedTask>},
            {path:'/UPDATE/:id',element:<Update></Update>,loader:({params})=> fetch(`http://localhost:5000/alltask/${params.id}`)},
            {path:'/signup',element:<Registration></Registration>},
            {path:'/login',element:<Login></Login>},
            {path:'/viewDetails/:id',element:<PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,loader:({params})=> fetch(`http://localhost:5000/alltask/${params.id}`)}

        ]}
    ])
 


