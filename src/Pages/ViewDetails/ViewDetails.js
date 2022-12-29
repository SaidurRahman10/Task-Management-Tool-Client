import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ViewDetails = () => {
    const data = useLoaderData();
    const {_id,img,name,description} =  data;
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const { data: comment = [],
        isLoading,
        refetch
      
      } = useQuery({
        queryKey: ["comment"],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/allComment`);
          const data = await res.json();
          return data;
        },
      });
    
   if(isLoading){
    return <Loading></Loading>
   }
  





    const handelAddComment = data => {
        console.log(data);
          const comment = {
            oldId:_id,
            comment:data.comment
           
         
          };
        console.log(comment);

          //save task

          fetch("http://localhost:5000/allComment", {
            method: "POST",
            headers: {
              "content-type": "application/json",
             
            },
            body: JSON.stringify(comment),
          })
            .then((res) => res.json())
            .then((result) => {
                toast.success(`Comment Successfully`);
                refetch();
                
            });
      
        }
  
    return (
        <div className=' text-white '>
                    <h1 className='text-3xl font-bold my-7 text-white text-center uppercase underline'>Task Details</h1>
                    <div className='  mx-10 mt-10  grid grid-cols-2'>

                  
            <div >
            <div className="  overflow-hidden shadow-lg w-96 border-2 p-8 rounded-xl ">
  <img className="w-full" src={img} alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-black text-base">
     {description}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#task</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#Completed Task</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#{name}</span>
  </div>
</div>
            </div>
            <div>

            <form onSubmit={handleSubmit(handelAddComment)}>
            <div className='w-96 mx-auto mt-2'>
            <textarea
             {...register("comment", {
                required: "Comment is Required"
            })}
            rows="3"
            placeholder="Add Your Comment"
            className="border-form-stroke text-gray-800 placeholder-body-color focus:border-primary active:border-primary     w-96 rounded-lg border-[1.5px] py-2 px-3 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] shadow-lg" required
            ></textarea>

<input className='bg-teal-500 text-white  px-5 py-2 rounded-xl hover:bg-white hover:text-slate-800 hover:font-semibold duration-300 transform  mt-4' value="Comment" type="submit" />
<Toaster
  position="top-center"
  reverseOrder={false}
/>
       
          
            </div>
            </form>




            <div>
                {comment.map((com) => (
                  <div className="border rounded-xl  text-white-500 text-md font-bold p-6 my-5 hover:bg-white hover:text-black hover:p-8 transform duration-300">
{ _id == com.oldId  && 
                    <div className="inline-flex flex-col-reverse">
                  
                      <div className="text-center font-bolder my-2">
                        {com.comment}
                      </div>
                    </div>
                    }
                  </div>
                ))}
              </div>

            </div>
            </div>
 
        </div>
    );
}


export default ViewDetails;