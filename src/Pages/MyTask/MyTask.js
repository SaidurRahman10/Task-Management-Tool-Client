import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';


const MyTask = () => {
  const navigate = useNavigate()
    const {
        data: tasks = [],
        isLoading,
        refetch
      
      } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/alltask");
          const data = await res.json();
          return data;
        },
      });


      if(isLoading){
        return <Loading></Loading>
      }
      const handelDelete = (id) =>{
        const agree = window.confirm(`Would you like to delete this task?`)
        if(agree){
            fetch(`http://localhost:5000/alltask/${id}`,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    toast.success('Delete Successfully')
                    refetch();
                }
            })
            
        }
      }
      const handelComplete = (id) =>{
        // console.log(allData)
        let data = {isComplete:true}
        fetch(`http://localhost:5000/alltaskComplete/${id}`,{

            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`Complete Successfully`)
                refetch();
                navigate('/completedtask')


                
            }
        })

}

 
    return (
        <div className='text-white h-[100vh] '>
            <h1 className='text-center my-4 font-semibold text-3xl'>YOU HAVE {tasks?.length} TASKS LEFT</h1>

          
<div className="flex flex-col">
  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className=" border-b shadow-2xl  bg-slate-500 bg-opacity-30">
            <tr>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                #
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
             Image
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
            Name
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left ">
              Date
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Update
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
               Delete
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
               Completed
              </th>
            </tr>
          </thead>
          <tbody>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
            {
                tasks?.map((task,i )=>   <tr key={task._id} className="bg-slate-100 bg-opacity-30 border-b transition duration-300 ease-in-out hover:bg-gray-700 shadow-xl">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{i+1}</td>
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                  <img className='w-10 h-10 rounded-3xl' src={task?.img} alt="" />
                </td>
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                {task?.name}
                </td>
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
               {task?.date}
                </td>
            
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
               <Link to={`/UPDATE/${task._id}`}>
               <button className='px-3 py-1 bg-teal-500 hover:text-teal-600 border hover:border-teal-600 hover:bg-transparent  font-semibold rounded-lg transform duration-300'>Update</button>
               </Link>
                </td>
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                <button onClick={()=>handelDelete(task._id)} className='px-3 py-1 bg-red-500 hover:text-red-600 border hover:border-red-600 hover:bg-transparent  font-semibold rounded-lg transform duration-300'>Delete</button>
                </td>
                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
             <button onClick={()=> handelComplete(task._id)} className='px-3 py-1 bg-green-500 hover:text-green-600 border hover:border-green-600 hover:bg-transparent  font-semibold rounded-lg transform duration-300'>Complete</button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default MyTask;