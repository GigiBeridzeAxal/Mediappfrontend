'use client'
import axios from 'axios';
import React, { useRef, useState } from 'react'

export default function page() {
  
  const formref = useRef()
  const [create , setcreated] = useState(false)




  const createnewchanel = (e) => {
    e.preventDefault();



    if(e.nativeEvent.submitter.name == 'addchannel'){
      
      const send = axios.post("http://localhost:4000/createchanel" , {chanelname:formref.current[0].value})

       if(send){
        setcreated(true)
       }

    }else{
      window.location = '/dashboard'
    }
 


  }

  return (
    <div className="create p-[15px]">
      {create == true ?    <div className="succesfulycreated">

<div className="msesage">
  <div className="messageframe">
    <div className="succesfuly text-[24px] text-black">Succesfully</div>
    <div className="maimessage">Channel "{formref.current[0].value}" Created.</div>
    <div className="okaybtnframe flex items-center">
    <button className='messageokay bg-blue-500 text-white' onClick={(e) => setcreated(false)} >Okay</button>
    </div>

  </div>
</div>

<div className="blur"></div>

  </div> : null}
   
    
        <div className="createframe flex flex-col gap-[15px] w-[20%]">
            <div className="createmaintittle text-black text-[26px]">Add Chanel</div>

            <form ref={formref} onSubmit={(e) => createnewchanel(e)} className='flex flex-col gap-[15px] w-[20%' > <label htmlFor="">NAME</label>
            <input required className='p-[10px] rounded-[5px]' type="text" placeholder='Chanel Name' />

            <label htmlFor="">CHANEL TYPE</label>
            <select className='p-[10px] rounded-[5px]' type="text" >
                <option value="Public">Public</option>
                <option value="Private">Private</option>


            </select>
            
            <div className="telegramlink flex items-center mt-[15px] bg-white p-[10px]">
                <div className="tag">t.me/</div><input className='w-[100%]' type="text" placeholder='chanel' />

            </div>            <br />
            <div className="createbtns flex gap-[25px]">
    
                <button name='addchannel' className=" bg-blue-500  w-[150px] p-[5px] text-center text-white">Add Chanel</button>
                <button name='back' className="back pointer text-center flex items-center justify-center ">Back</button>
                </div></form>

           

        </div>
    </div>
  )
}
