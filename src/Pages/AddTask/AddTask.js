import React from 'react';
import { useForm } from 'react-hook-form';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelAddTask = data => {
        console.log(data);
    }
    return (
        <div className='w-[33rem] mx-auto mt-16 shadow-2xl p-10 bg-slate-100 rounded-lg'>
            <h1 className='text-3xl font-bold my-7 text-gray-600'>ADD YOUR TASK</h1>
           <form onSubmit={handleSubmit(handelAddTask)}>
            <div className="form-control w-full max-w-xs mb-2">
                <label className="label"> <span className="label-text font-semibold text-gray-600">Task Name</span></label>
                <input type="text" {...register("name", {
                    required: "Name is Required"
                })} className="border-primary text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] my-2 shadow-lg" />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
        <div class="">
         <label className="mb-3 block text-base font-medium text-gray-600">
         Description
         </label>
         <textarea
         type="text" {...register("description", {
            required: "Description is Required"
        })}
            rows="3"
            placeholder="Description"
            class="border-form-stroke text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-80 rounded-lg border-[1.5px] py-2 px-3 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] shadow-lg"
            ></textarea>
             {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>
           
            <div className="form-control w-full max-w-xs mt-1">
                <label className="label"> <span className="label-text text-base font-medium text-gray-600">Photo</span></label>
                <input type="file" {...register("image", {
                    required: "Photo is Required"
                })} className="block w-full mb-5 text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none  shadow-lg" />
                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
            </div>
            <input className='bg-slate-500 text-white  px-5 py-2 rounded-xl hover:border hover:bg-transparent hover:text-slate-500 hover:border-slate-600 hover:font-semibold duration-300 transform  mt-4' value="Create Task" type="submit" />
        </form>
        </div>
    );
};

export default AddTask;