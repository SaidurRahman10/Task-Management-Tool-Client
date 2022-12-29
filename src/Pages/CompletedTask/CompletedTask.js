import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const CompletedTask = () => {
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(
        "https://y-livid-five.vercel.app/allCompletedTask"
      );
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
  const handelNotComplete = (id) => {
    let data = { isComplete: false };
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
          toast.success(`Send it to My Mask Successfully`);
          refetch();
        }
      });
  };

  return (
    <div className="">
      <div className="text-white h-[100vh] ">
        <h1 className="text-center my-4 font-semibold text-3xl">
          YOU HAVE {tasks?.length} TASKS LEFT
        </h1>

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
                        Details
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
                        NOT COMPLETED
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
                          <Link to={`/viewDetails/${task._id}`}>
                            <button className="px-3 py-1 bg-yellow-700 hover:text-yellow-600 hover:border-2 hover:border-yellow-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100">
                              DETAILS
                            </button>
                          </Link>
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handelDelete(task._id)}
                            className="px-3 py-1 bg-red-500 hover:text-red-600 hover:border-2 hover:border-red-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100"
                          >
                            DELETE
                          </button>
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handelNotComplete(task._id)}
                            className="px-3 py-1 bg-indigo-500 hover:text-indigo-600 hover:border-2 hover:border-indigo-600 hover:bg-transparent  font-semibold rounded-lg transform duration-100"
                          >
                            {" "}
                            NOT COMPLETED
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
