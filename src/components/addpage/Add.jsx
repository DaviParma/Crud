import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'



const Add = () => {

  

  
  const validationForm = yup.object().shape({
    name: yup.string().required().max(40, "Name is only supported up to 40 characters"),
    email: yup.string().required().max(254, "Email is only supported up to 254 characters").email().test('unique', 'Email already exists', async value => {
      const response = await axios.get(`http://localhost:5500/users/check-email/${value}`);
      if(response.data.length > 0) {
        return false;
      }
      return true;
    }),
    phone: yup.string().required().matches(/^[0-9]+$/, "Must be only numbers").min(9,"The phone number must contain 9 digits").max(9,"The phone number must contain 9 digits")
  })

 

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(validationForm)  
  })


  let navigate = useNavigate()

  const datapost = data => axios.post(`http://localhost:5500/users`, data)
  .then(() =>{
    navigate('/')
  })
  .catch(() =>{
    console.log("Something went wrong")
  })




  return (
    <div className='container mx-auto flex h-screen items-center justify-center '>

      <form onSubmit={handleSubmit(datapost)} noValidate className='p-10 border border-black shadow-xl bg-white rounded-xl w-[60%] max-sm:p-5 max-sm:w-[80%]'>

        <h1 className='text-center text-5xl pb-10 font-semibold  max-sm:text-4xl'>New register</h1>
        <div className='mb-6 '>
          <label for='name' className='block mb-2 text-lg font-semibold '>Name</label>
          <input name='name' {...register("name")} type='text' placeholder='Davi Parma' id='name' className='block px-3 p-2.5 w-full  rounded-lg border border-black  hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
          <p className=' text-red-500 font-semibold'>{errors.name?.message}</p>
        </div>

        <div className='mb-6'> 
          <label for='email' className='block mb-2 text-lg font-semibold'>Email</label>
          <input name='email' {...register("email")} type='email' placeholder='davi@gmail.com' id='email' className='block px-3  p-2.5 w-full  rounded-lg border border-black  hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
          <p className=' text-red-500 font-semibold'>{errors.email?.message}</p>
        </div>
        
        <div className='mb-6'>
          <label for='phone' className='block mb-2 text-lg font-semibold'>Phone</label>
          <input name='phone' {...register("phone")} type='text' placeholder='912345678' id='phone' className='block px-3   p-2.5 w-full  rounded-lg border border-black hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
          <p className=' text-red-500 font-semibold'>{errors.phone?.message}</p>
        </div>

        <div className='mt-12 '>
          <button type='submit' className='bg-[#14E229] w-full text-white text-2xl font-bold border border-black flex mx-auto items-center justify-center px-10 py-4 rounded-xl hover:scale-105 duration-700'>Submit</button>
        </div>

      </form>
      
    </div>
  )
}

export default Add