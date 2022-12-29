import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewDetails = () => {
    const data = useLoaderData();
    return (
        <div className='h-[100vh] text-white '>
                    <h1 className='text-3xl font-bold my-7 text-white text-center uppercase underline'>Task Details</h1>
            <div className='w-96 mx-auto mt-10 border-2 p-8 rounded-xl'>
            <div className="  overflow-hidden shadow-lg rounded-lg ">
  <img className="w-full" src={data.img} alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{data.name}</div>
    <p className="text-slate-400 text-base">
     {data.description}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#task</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#Completed Task</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#{data.name}</span>
  </div>
</div>
            </div>
        </div>
    );
};

export default ViewDetails;