import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { json, useLoaderData, useNavigate } from 'react-router-dom';


const Update = () => {
    const data = useLoaderData();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const photoUpdate = () =>{
        toast.error('Updated photo are not permitted')
    }

    const handelUpdateTask = (allData) =>{
            console.log(allData)
            fetch(`http://localhost:5000/alltask/${data._id}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(allData)

            })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    toast.success(`Updated ${allData.name} Successfully`)
                    navigate('/mytask')
                }
            })

    }

    return (
        <div  className='h-[100vh]'>

        <div className='lg:w-[33rem] mx-auto mt-16 shadow-2xl p-10 bg-slate-100 bg-opacity-25 rounded-lg '>
            <h1 className="text-center my-5 text-2xl text-white font-semibold uppercase ">Let's update this {data?.name}</h1>

            <form onSubmit={handleSubmit(handelUpdateTask)}>
            <div className="form-control w-full max-w-xs mb-2">
                <label className="label"> <span className="label-text font-semibold text-white">Task Name</span></label>
                <input defaultValue={data.name} placeholder='Task Name' type="text" {...register("name")} className="border-primary text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-96 rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] my-2 shadow-lg" />
               
            </div>
            <div className='my-2'>
          
       
              <input className='p-3 rounded-lg shadow-xl' type="datetime-local" defaultValue={data?.date}  name="datetime" {...register("date")} id="" />
       
            </div>
        <div className="">
         <label className="mb-3 block text-base font-medium text-white">
         Description
         </label>
         <textarea defaultValue={data?.description}
         type="text"  {...register("description")}
            rows="3"
            placeholder="Description"
            className="border-form-stroke text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-96 rounded-lg border-[1.5px] py-2 px-3 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] shadow-lg"
            ></textarea>
           
      </div>
           
            <div className="form-control w-full max-w-xs mt-1">
                <label className="label"> <span className="label-text text-base font-medium text-white">Photo</span></label>
                <div onClick={photoUpdate}>
                <input   type="file"  className="block w-96 mb-5 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none  shadow-lg " disabled />
                </div>
              
            </div>
            <input className='bg-green-500 text-white  px-5 py-2 rounded-xl hover:border hover:bg-white hover:text-black hover:border-text-600 hover:font-semibold duration-300 transform  mt-4' value="Update Task" type="submit" />
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </form>
        </div>
        </div>
    );
};

export default Update;