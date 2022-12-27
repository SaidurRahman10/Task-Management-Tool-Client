import React, { useContext } from 'react';
import { useState, useEffect  } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import * as Scroll from 'react-scroll';
import {  Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { HomeIcon, UserCircleIcon, DocumentTextIcon, ServerStackIcon, IdentificationIcon,Square3Stack3DIcon  } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';










const HeaderForDetailPage = () => {
   

 
 

  
  return (
   <div className='grid md:grid-cols-12'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
   
     <Link to='/'  className="flex  hover:text-lg duration-300 transform  text-white p-8 rounded-md py-2 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  lg:mt-3">
      <HomeIcon className='w-5 h-6 mr-1'></HomeIcon>  Home
        </Link>
   </div>
  );
}

export default HeaderForDetailPage;