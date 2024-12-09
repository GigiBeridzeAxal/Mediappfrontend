'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {

    
    const [templates , setTempalte] = useState([])

    const [loading , setloading ] = useState(true)
    const [serverloading , setserverloading] = useState('Server Loading.')

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

    useEffect(() => {


        const get = async() => {


            const send = await axios.get('https://mediaappbackend-thw6.onrender.com/gettemplates')
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
            <h1 className='text-[24px]' >Tempaltes</h1>
            <br />

            <div  className='flex flex-wrap gap-[10px] items-center' >
                {templates.map(data => <div>
                    <Link href={{
                        pathname:'/openedtemplates',
                        query:{id:data._id}
                    }} key={data._id}  className="maintemplate bg-gray-400 p-[10px] rounded-[10px] w-[300px] h-[200px] text-white flex flex-col justify-between ">

                    <div className="templatemessage flex">{data.message}</div>
                    <div className="tempaltedate">{data.createdAt}</div>


                    </Link>


                </div>)}
            </div>
            
        </div>
    </div>
  )
}
