import React, { useEffect, useState } from 'react'
import { Fade} from "react-awesome-reveal";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'



const Edit = () => {



  const {id} = useParams()


  const dataPut = data => axios.put(`http://localhost:5500/users/update/${id}`, data)
  .then(() =>{
    navigate('/')
  })
  .catch(() =>{
    console.log("Something went wrong")
  })



  
  const validationForm = yup.object().shape({
    name: yup.string().required().max(40, "Name is only supported up to 40 characters"),
    email: yup.string().required().max(254, "Email is only supported up to 254 characters"),
    phone: yup.string().required().matches(/^[0-9]+$/, "Must be only numbers").min(9,"The phone number must contain 9 digits").max(9,"The phone number must contain 9 digits")
  })





  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(validationForm)
  })

  let navigate = useNavigate()


  const [dataget, setData] = useState([])

    useEffect(() => {
        async function getData() 
        {
          const urlget = `http://localhost:5500/users/${id}`
          try {
            const response = await axios.get(urlget)
            setData(response.data)
          } catch (err) {
            console.log(err)
          }
        }
        getData()
      }, [])



  return (
    <Fade triggerOnce={true}>
    <div className='container mx-auto flex h-screen items-center justify-center '>

      <form onSubmit={handleSubmit(dataPut)} noValidate className='p-10 border border-black shadow-xl bg-white rounded-xl w-[60%] max-sm:p-5 max-sm:w-[80%]'>

        <h1 className='text-center text-5xl pb-10 font-semibold max-sm:text-4xl'>Edit register</h1>
        {dataget.map((x) => (
          <div>
            
            <div className='mb-6'>
              <label for='name' className='block mb-2 text-lg font-semibold'>Name</label>
              <input defaultValue={x.name}  name='name' {...register("name")} type='text'  id='name' placeholder='Davi Parma' className='block px-3 p-2.5 w-full  rounded-lg border border-black  hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
              <p className=' text-red-500 font-semibold'>{errors.name?.message}</p>
            </div>

            <div className='mb-6'> 
              <label for='email' className='block mb-2 text-lg font-semibold'>Email</label>
              <input defaultValue={x.email} name='email' {...register("email")} type='email'  id='email' placeholder='davi@gmail.com' className='block px-3  p-2.5 w-full  rounded-lg border border-black  hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
              <p className=' text-red-500 font-semibold'>{errors.email?.message}</p>
            </div>
        
            <div className='mb-6'>
              <label for='phone' className='block mb-2 text-lg font-semibold'>Phone</label>
              <input defaultValue={x.phone} name='phone' {...register("phone")} type='text'  id='phone' placeholder='912345678' className='block px-3   p-2.5 w-full  rounded-lg border border-black hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 hover:scale-105 duration-1000' />
              <p className=' text-red-500 font-semibold'>{errors.phone?.message}</p>
            </div>
            
            <div className='mt-12 '>
              <button type='submit' className='bg-[#14E229] w-full text-white text-2xl font-bold border border-black flex mx-auto items-center justify-center px-10 py-4 rounded-xl hover:scale-105 duration-700'>Edit</button>
            </div> 

          </div>    
        ))
        }
      </form>

    </div>
    </Fade>
  )
}

export default Edit