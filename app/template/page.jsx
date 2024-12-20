'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {

    
    const [templates , setTempalte] = useState([])

    const [loading , setloading ] = useState(true)
    const [serverloading , setserverloading] = useState('Server Loading.')

    const back = () => {
        window.location = '/dashboard'
    }

    const deletetemplate = (data) => {
        console.log(data)
    }

    if(serverloading){
        setInterval(() => {
            if(serverloading == 'Server Loading.'){
                setserverloading("Server Loading..")
            }
            if(serverloading == 'Server Loading..'){
                setserverloading("Server Loading...")
            }
            if(serverloading == 'Server Loading...'){
                setserverloading("Server Loading.")
            }
        }, 500);
    }
  

    useEffect(() => {


        const get = async() => {


            const send = await axios.get('http://localhost:4000/gettemplates')
            setTempalte(send.data)
            console.log(send.data)
            if(send){
                setloading(false)
            }

        }
        get()

    },[])
  return (

    <div className='w-[100%] h-[100%] p-[30px]' >
          {loading == true ?    <div className="succesfulycreated">

<div className="msesage">
  <div className="messageframe">
    <div className="succesfuly text-[24px] text-black">Please Wait</div>
    <div className="loading flex items-center justify-center">
    <div className="loadingframe">{serverloading}</div>

    </div>


    <div className="okaybtnframe flex items-center">

    </div>

  </div>
</div>

<div className="blur"></div>

  </div> : null}
        <div>
            <h1 className='text-[24px] flex items-center gap-[5px]' >Templates     <button onClick={() => back()} name='back' className="back h-[33px] pointer text-center flex items-center justify-center ">Home</button></h1>
            <br />

            <div  className='flex flex-wrap gap-[10px] items-center' >
                {templates.map(data => <div key={data._id} >
                    <Link href={{
                        pathname:'/openedtemplates',
                        query:{id:data._id}
                    }}   className="maintemplate bg-gray-400 p-[10px] rounded-[10px] w-[300px] h-[200px] text-white flex flex-col justify-between ">

      
                     <div className="center flex items-center justify-center w-[100%]">
                     <img width={150} src={data.uploadedfiles[0]} alt="" />
                     </div>
                     <div dangerouslySetInnerHTML={{__html:data.message}} className="da"></div>




                    </Link>


                </div>)}
            </div>
            
        </div>
    </div>
  )
}
