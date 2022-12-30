import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Typewriter } from 'react-simple-typewriter'
import Fade from 'react-reveal/Fade';

const MyTask = () => {
  const navigate = useNavigate();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("https://y-livid-five.vercel.app/alltask");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  const handelDelete = (id) => {
    const agree = window.confirm(`Would you like to delete this task?`);
    if (agree) {
      fetch(`https://y-livid-five.vercel.app/alltask/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Delete Successfully");
            refetch();
          }
        });
    }
  };
  const handelComplete = (id) => {
    // console.log(allData)
    let data = { isComplete: true };
    fetch(`https://y-livid-five.vercel.app/alltaskComplete/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Complete Successfully`);
          refetch();
        }
      });
  };

  return (
    <div className="text-white pb-80 ">
      <Fade top>

      <h1 className='text-center my-4 font-semibold text-3xl'>   <Typewriter
                       loop={20}
                      cursor
                      cursorStyle='_'
                     words={[` YOU HAVE ${tasks?.length} TASKS LEFT`, ` ONLY ${tasks?.length} TASKS HERE`, ` COMPLETE THIS ${tasks?.length} TASKS `]}
                    /></h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className=" border-b shadow-2xl  bg-slate-500 bg-opacity-30">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4 text-left"
                    >
                      Completed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Toaster position="top-center" reverseOrder={false} />
                  {tasks?.map((task, i) => (
                    <tr
                      key={task._id}
                      className="bg-slate-100 bg-opacity-30 border-b transition duration-300 ease-in-out hover:bg-gray-700 shadow-xl"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {i + 1}
                      </td>
                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                        <img
                          className="w-10 h-10 rounded-3xl"
                          src={task?.img}
                          alt=""
                        />
                      </td>
                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                        {task?.name}
                      </td>
                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                        {task?.date}
                      </td>

                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                        <Link to={`/UPDATE/${task._id}`}>
                          <button className="px-3 py-1 bg-teal-500 hover:text-teal-600 hover:border-2 hover:border-teal-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handelDelete(task._id)}
                          className="px-3 py-1 bg-red-500 hover:text-red-600 hover:border-2 hover:border-red-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                       <Link to='/completedtask'>
                       <button
                          onClick={() => handelComplete(task._id)}
                          className="px-3 py-1 bg-green-500 hover:text-green-600 hover:border-2 hover:border-green-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100"
                        >
                          Complete
                        </button>
                       </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </Fade>
  
    </div>
  );
};

export default MyTask;
