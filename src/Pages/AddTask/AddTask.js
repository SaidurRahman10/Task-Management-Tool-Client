import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [value, onChange] = useState(new Date());
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()

console.log(value);
    const handelAddTask = data => {
        const img = data.image[0];
    const formData = new FormData();
    formData.append("image", img);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const task = {
            name: data.name,
            description:data.description ,
            img: imgData.data.url,
            date:data.date
         
          };
        console.log(task);

          //save task

          fetch("http://localhost:5000/alltask", {
            method: "POST",
            headers: {
              "content-type": "application/json",
             
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
                toast.success(`${data.name} is added successfully`);
                navigate("/mytask");
            });
      
        }
      });
  };
    return (
        <div className='w-[33rem] mx-auto mt-16 shadow-2xl p-10 bg-slate-100 bg-opacity-25 rounded-lg '>
            <h1 className='text-3xl font-bold my-7 text-white'>ADD YOUR TASK</h1>
           <form onSubmit={handleSubmit(handelAddTask)}>
            <div className="form-control w-full max-w-xs mb-2">
                <label className="label"> <span className="label-text font-semibold text-white">Task Name</span></label>
                <input placeholder='Task Name' type="text" {...register("name", {
                    required: "Name is Required"
                })} className="border-primary text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-96 rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] my-2 shadow-lg" />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div>
              <input {...register("date")}   type="text" defaultValue={value} />
            <DateTimePicker  className=" bg-white p-2 rounded-lg"   onChange={onChange} value={value} />
            </div>
        <div className="">
         <label className="mb-3 block text-base font-medium text-white">
         Description
         </label>
         <textarea
         type="text" {...register("description", {
            required: "Description is Required"
        })}
            rows="3"
            placeholder="Description"
            className="border-form-stroke text-gray-800 placeholder-body-color focus:border-primary active:border-primary w-96 rounded-lg border-[1.5px] py-2 px-3 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] shadow-lg"
            ></textarea>
             {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>
           
            <div className="form-control w-full max-w-xs mt-1">
                <label className="label"> <span className="label-text text-base font-medium text-white">Photo</span></label>
                <input type="file" {...register("image", {
                    required: "Photo is Required"
                })} className="block w-96 mb-5 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none  shadow-lg" />
                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
            </div>
           
            <input className='bg-slate-500 text-white  px-5 py-2 rounded-xl hover:border hover:bg-transparent hover:text-slate-500 hover:border-slate-600 hover:font-semibold duration-300 transform  mt-4' value="Create Task" type="submit" />
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </form>
        </div>
    );
};

export default AddTask;