'use client'
import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {
    const [phonenumber , setphonenumber] = useState()
    const [code , setcode] = useState()
    const [codeopened , setcodeopened] = useState(false)
    const [sessionid , setses] = useState()
    const countiniuesession = async(e) => {
        e.preventDefault();


         const send = await axios.post('http://localhost:4000/', {phone:phonenumber , countiniue:true}) 
         const data = send.data.sessionId
         console.log(send.data)

          window.location = '/dashboard'

        


    }
   

    const Authtelegram = async(e) => {
        e.preventDefault();

       
        setcodeopened(true)
         const send = await axios.post('http://localhost:4000/', {phone:phonenumber}) 
         const data = send.data.sessionId
         console.log(send.data)
         if(send.status == 201){
          window.location = '/dashboard'
         }
        


    }
    const Authtelegram2 = async(e) => {
        e.preventDefault();

       
        const send = await axios.post('http://localhost:4000/code', {code:code}) 
        console.log(send.statusText)
        


    }
  return (
    <>
    <div className="login  p-[20px] flex w-[100%] h-[100%]">
        <div className="loginframe ">
            <div className="logintittle text-[26px] ">Login</div>
            <br />
            {codeopened == true ? <><form onSubmit={(e) => Authtelegram2(e)} className='flex flex-col justify-start gap-[10px]' >
            <label className='text-gray-500 ' >Code</label>
            <div className="codeaut">
                <input value={code} defaultValue={''}  onChange={(e) => setcode(e.target.value)} className='p-[10px] w-[300px] rounded-[5px]' type="text" placeholder='Code' />
            </div>
          
            <button className='bg-blue-500 p-[5px] text-white w-[150px] mt-[15px]' >Submit</button>
            </form></> : 
            <><form onSubmit={(e) => Authtelegram(e)} className='flex flex-col justify-start gap-[10px]' >
            <label className='text-gray-500 ' >PHONE NUMBER</label>
            <input  onChange={(e) => setphonenumber(e.target.value)} className='p-[10px] w-[300px] rounded-[5px]' type="text" placeholder='Phone' />
            <div className="logininbtns gap-[10px] flex">
            <button className='bg-blue-500 p-[5px] text-white w-[150px] mt-[15px]' >Submit</button>

            </div>

            </form>            <button onClick={(e) => countiniuesession(e)} className='bg-blue-500 p-[5px] text-white w-[200px] mt-[15px]' >Countiniuse Last Session</button></>}
            
        </div>
    </div>

    </>
  )
}
