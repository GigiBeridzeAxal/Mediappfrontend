import axios from "axios"
import { NextResponse } from "next/server"

export async function middleware(req){

    

    if(req.url == "http://localhost:3000/dashboard"){

        try{
            const send = await axios.get('https://mediaappbackend-thw6.onrender.com/checkclient')


        }catch{
    
          return NextResponse.redirect(new URL('/' , req.url))
    }


  

}
if(req.url == "http://localhost:3000/template"){

    try{
        const send = await axios.get('https://mediaappbackend-thw6.onrender.com/checkclient')


    }catch{

      return NextResponse.redirect(new URL('/' , req.url))
}




}
if(req.url == "http://localhost:3000/openedtemplates"){

    try{
        const send = await axios.get('https://mediaappbackend-thw6.onrender.com/checkclient')


    }catch{

      return NextResponse.redirect(new URL('/' , req.url))
}




}
if(req.url == "http://localhost:3000/create"){

    try{
        const send = await axios.get('https://mediaappbackend-thw6.onrender.com/checkclient')


    }catch{

      return NextResponse.redirect(new URL('/' , req.url))
}




}
if(req.url == "http://localhost:3000/"){

    try{
        const send = await axios.get('https://mediaappbackend-thw6.onrender.com/checkclient')
        if(send){
            return NextResponse.redirect(new URL('/dashboard' , req.url)) 
        }

    }catch(err){
        
   


    }
    
   

}

NextResponse.next()
  
}