import React from 'react';
import { useForm } from 'react-hook-form';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelAddTask = data => {

    }
    return (
        <div className='w-72 mx-auto mt-16'>
            <h1 className='text-3xl font-bold'>ADD YOUR TASK</h1>
           <form onSubmit={handleSubmit(handelAddTask)}>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Name</span></label>
                <input type="text" {...register("name", {
                    required: "Name is Required"
                })} className="input input-bordered w-full max-w-xs" />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Email</span></label>
                <input type="email" {...register("email", {
                    required: true
                })} className="input input-bordered w-full max-w-xs" />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Specialty</span></label>
                <select 
                {...register('specialty')}
                className="select input-bordered w-full max-w-xs">
                    {/* {
                        specialties.map(specialty => <option
                            key={specialty._id}
                            value={specialty.name}
                        >{specialty.name}</option>)
                    } */}
                    
                    
                </select>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Photo</span></label>
                <input type="file" {...register("image", {
                    required: "Photo is Required"
                })} className="input input-bordered w-full max-w-xs" />
                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
            </div>
            <input className='btn btn-accent w-full mt-4' value="Add Task" type="submit" />
        </form>
        </div>
    );
};

export default AddTask;