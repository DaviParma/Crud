import React, { useState, useEffect } from 'react'
import { useSearchParams} from 'react-router-dom';
import { Link } from "react-router-dom";
import { Fade} from "react-awesome-reveal";
import axios from 'axios'
import {BsFillTrashFill, BsPencilSquare} from 'react-icons/bs'



const Table = () => {

    const [searchParams] = useSearchParams()

    const query = searchParams.get("q")

    const [dataget, setData] = useState(null)


    useEffect(() => {
        async function getData() {
          const urlget = `http://localhost:5500/users/search/${query}`
          try {
            const response = await axios.get(urlget)
            setData(response.data)
          } catch (err) {
            console.log(err)
          }
        }
        getData()
      }, [])

      function deleteData(id){
        if (window.confirm("Are you sure you want to delete this record?")) 
        {
        axios.delete(`http://localhost:5500/users/delete/${id}`)
        window.location.reload(false);
        }
      } 

    
      if (!dataget) {
        return(
        <Fade triggerOnce={true}>
          <div className='container mx-auto flex items-center justify-center h-screen '>
            <div className="shadow-lg rounded-xl p-5 bg-slate-50">
              <h1 className='text-center text-red-500 text-5xl font-medium max-msm:text-4xl'>Database not connected or offline</h1>
            </div>
          </div>
        </Fade>
    
        )
      }
      
      else if (dataget.length === 0) {
        return (
          <Fade triggerOnce={true}>
            <div className='container mx-auto flex items-center justify-center h-screen '>
              <div className="shadow-lg rounded-xl p-5 bg-slate-50 ">
                <div>
                  <h1 className='text-red-500 text-center text-5xl font-medium py-5 max-msm:text-4xl'>No record was found in the database: <span className='font-bold'>"{query}"</span></h1>
                  <Link to='/add'><button className='flex flex-col items-center mx-auto bg-[#1467E2]  text-white text-3xl font-semibold p-2 rounded-xl hover:scale-110 duration-1000 max-msm:text-2xl'>New register</button></Link>
                </div>
              </div>
            </div>
          </Fade>
        )
      } else {
        return(
          <Fade triggerOnce={true}>
          <div className='container mx-auto flex h-screen items-center justify-center'>
              <table class="table-auto border-collapse w-full text-center rounded-lg shadow-xl max-sm:hidden">
                  <thead className='bg-gray-200 border-b-2 border-gray-300'>
                      <tr>
                          <th className='text-lg border-r-2 border-slate-300'>ID</th>
                          <th className='text-lg border-r-2 border-slate-300'>Name</th>
                          <th className='text-lg border-r-2 border-slate-300'>Email</th>
                          <th className='text-lg border-r-2 border-slate-300'>Phone</th>
                          <th className='text-lg border-l-2 border-slate-300'>Date</th>
                          <th className='text-lg border-l-2 border-slate-300'>Operations</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                      {dataget.map((x) => 
                          (
                              <tr className='bg-white'>
                                  <td className=' text-blue-700 border-b-2 border-r-2 border-slate-200 py-5 font-semibold'>{x.id}</td>
                                  <td className='border-b-2 border-r-2 border-slate-200 py-5 '>{x.name}</td>
                                  <td className='border-b-2 border-r-2 border-slate-200 py-5'>{x.email}</td>
                                  <td className='border-b-2 border-r-2 border-slate-200 py-5'>{x.phone}</td>
                                  <td className='border-b-2 border-r-2 border-slate-200 py-5'>{x.date.slice(0, 10).split("-").reverse().join("-")}</td>
                                  <td className='border-b-2 border-r2  border-slate-200 py-5'>
                                  <div className='flex justify-evenly items-center'>
                                    <button onClick={ () => deleteData(x.id)} className='text-red-500 hover:scale-125 duration-500'><BsFillTrashFill size={24}/></button>
                                    <Link to={{pathname: `/edit/${x.id}`}}><button className='text-green-600 hover:scale-125 duration-500 my-2'><BsPencilSquare size={24}/></button></Link>
                                  </div>
                                  </td> 
                              </tr>       
                          ))
                      }
                  </tbody>
              </table>

              
              <div className='sm:hidden h-[700px]'>
                {dataget.map((x) => 
                (

                <div class="grid grid-flow-col-dense py-5 ">
                  
                  <div className='bg-gray-200 text-center font-bold'>
                    <p className='border-slate-300 border-b-2 border-r-2 py-5 px-5 max-msm:px-0'>ID</p>
                    <p className='border-slate-300 border-b-2 border-r-2 py-5 px-5 max-msm:px-0'>Name</p>
                    <p className='border-slate-300 border-b-2 border-r-2 py-5 px-5 max-msm:px-0'>Email</p>
                    <p className='border-slate-300 border-b-2 border-r-2 py-5 px-5 max-msm:px-0'>Phone</p>
                    <p className='border-slate-300 border-b-2 border-r-2 py-5 px-5 max-msm:px-0'>Date</p>
                    <p className='border-slate-300 border-r-2 py-7 px-5'>Operations</p>
                  </div>


              
                  <div className='bg-white text-center'>
                    <p className='text-blue-700 border-b-2 border-slate-200 font-semibold py-5 px-5 max-msm:px-0'>{x.id}</p>
                    <p className='border-b-2 border-slate-200   py-5 px-5 max-msm:px-0'>{x.name}</p>
                    <p className='border-b-2 border-slate-200  py-5 px-5 max-msm:px-0'>{x.email}</p>
                    <p className='border-b-2 border-slate-200  py-5 px-5 max-msm:px-0'>{x.phone}</p>
                    <p className='border-b-2 border-slate-200 py-5 px-5 max-msm:px-0'>{x.date.slice(0, 10).split("-").reverse().join("-")}</p>
                    <div className='flex items-center justify-evenly py-5 px-5'>
                      <button onClick={ () => deleteData(x.id)} className='text-red-500 hover:scale-125 duration-500'><BsFillTrashFill size={24}/></button>
                      <Link to={{pathname: `/edit/${x.id}`}}><button className='text-green-600 hover:scale-125 duration-500 my-2'><BsPencilSquare size={24}/></button></Link>
                    </div>
                  </div> 

                </div>
                ))
                } 
              </div>
    
          </div>
          </Fade>
        )
      }
      
}

export default Table