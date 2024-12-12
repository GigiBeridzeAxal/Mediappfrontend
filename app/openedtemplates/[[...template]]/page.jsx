'use client'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { NextRequest } from 'next/server'
import React, { useEffect, useRef, useState } from 'react'
import datas from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';  // Froala editor CSS
import 'froala-editor/css/froala_style.min.css';        // Froala theme styles
import 'froala-editor/css/froala_editor.pkgd.min.css';  
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Froala Editor JS
import 'froala-editor/js/plugins.pkgd.min.js';

export default  function page() {

const searchparams = useSearchParams()
const id = searchparams.get('id')

    const [data , setdata] = useState([])
    const [selectedchanels , setselectedchanels] = useState([''])
    const [selector , setselector] = useState(false)
    const [uploadedfiles , setuploadedfiles] = useState([undefined])
        const [renderedimages , setrenderedimages] = useState(0)
        const [rendering , setrendering] = useState(false)
        const [channels , setchannels] = useState([])
        const [message , setmessage] = useState()
        const [allpath , setpath ] = useState([])
        const [dateenablder , setdateenabled] = useState(true)
        const [date , setdate] = useState('')
        const [loading , setloading ] = useState(true)
        const [serverloading , setserverloading] = useState('Server Loading.')
        const [emojiopened , setemojiopened] = useState(false)
        const editorRef = useRef(null);
        const [selchannels , setselchannels] = useState([''])


           
        const options = {
          placeholderText: 'Edit Your Text Here!',
          charCounterCount: false,
          pluginsEnabled: ['emoji', 'bold', 'italic', 'underline'], // You can add other plugins too
          toolbarButtons:   [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript , fontSize', 'emoji'], ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']],
          fontSize: ['12px', '16px', '20px', '24px', '30px', '40px'],  // Custom font size options
          fontFamily: ['Arial', 'Courier', 'Times New Roman'],  // Custom font family options
          emojiButtons: ['emoji'],
        };
        const handlepaste = (emoji) => {
            const editor = editorRef.current.editor
            const cursorPosition = editor.selection.get();
    
            // Insert the emoji at the cursor position
            editor.html.insert(emoji.native);
        
            // Update the state with the new content
            setmessage(editor.html.get());
          }

        const back = () => {
            window.location = '/dashboard'
        }

        const [text, setText] = useState('');  // State for the input field content
        const inputRef = useRef(null);         // Ref for the input field
      
        // Function to handle pasting content at cursor position


        const insertTextAtCaret = (textToInsert) => {
            const input = document.getElementById('inputField');
            const caretPosition = input.selectionStart; // Get the current caret position
            const currentText = message; // Get the current text in the input
        
            // Insert the text at the caret position
            const newText =
              currentText.slice(0, caretPosition) + textToInsert + currentText.slice(caretPosition);
        
              setmessage(newText);
        
            // Update the caret position after inserting the text
            setTimeout(() => {
              input.selectionStart = input.selectionEnd = caretPosition + textToInsert.length;
            }, 0);
          };

       

        const deletetemplate = async(e) => {
            console.log(data[0]._id)
            const deleted = await axios.post("http://localhost:4000/deletetemplate" , {id:data[0]._id} )
            window.location = '/dashboard'
        }
        
        const handleEmojiSelect = (emojiData) => {
            // Append the selected emoji to the current text
            console.log(emojiData)
            insertTextAtCaret(emojiData.native);
          };
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
  
        const func = async() => {

            const send = await axios.post('http://localhost:4000/getuserbyid', {id})
            setdata(send.data)
            console.log(send.data[0])
            setuploadedfiles(send.data[0].uploadedfiles)
            send.data[0].selectedchanels.map(data => setselchannels([...selectedchanels , data[0]]))
            setselectedchanels(send.data[0].selectedchanels)
            setdate(send.data[0].date)
            setmessage(send.data[0].message)
            const mainfunc = async() => {
                const getinfo = await axios.get('http://localhost:4000/getchanel')
        
                console.log(getinfo.data)
                setchannels(getinfo.data)
        
                }
            if(send){
                mainfunc()
                setloading(false)
            }

            

        }
        func()


    },[])




    const savetemplate = async() => {
        const getinfo = await axios.post('http://localhost:4000/update' , {selectedchanels , message , uploadedfiles , allpath , date , id})

    }


        const sendmessage = async() => {

            console.log(selectedchanels)
            const getinfo = await axios.post('http://localhost:4000/sendmessages' , {selectedchanels , messagei:message , uploadedfiles , allpath , date})
        }
      

   



    const pathsaver = (e) => {

        console.log(e.target.value)

        setpath([...allpath , e.target.value])
        




     

 



    }
   

    const imageupload = async(e) => {

        if(rendering == true ){

        }else{

            setrendering(true)
            const files = e.target.files

            const fileslength = files.length
            let totalimages = []
            let rendered = 0
    
    
            
            const render = setInterval(() => {
                if(rendered == fileslength){

                    totalimages = [...uploadedfiles , ...totalimages]
                    clearInterval(render)
                    setuploadedfiles(totalimages)
     
                    setrendering(false)
                    rendered = 0
                   }
               if(window.FileReader && rendered < fileslength ){

                const reader = new FileReader()
    
                reader.onloadend = () => {
     
                    totalimages = [...totalimages , reader.result]
                    rendered++
                }
    
                reader.readAsDataURL(files[rendered])
    
    
    
    
               } 
              
            }, 500);
        }

       
        

  
        
       //  files.map(data => reader.readAsDataURL(data)) //





    }



    if(channels){
       
    }

    



    const Removeitem = (itemtoremove) =>{
        console.log(itemtoremove)
        console.log("Removing" , selectedchanels.filter(item => item[1] !== itemtoremove))

        setselectedchanels(selectedchanels.filter(item => item[1] !== itemtoremove))
        setselchannels(selchannels.filter(item => item !== itemtoremove))
        
    }

  return (
    <div className="dashboard p-[25px]">
    <div className="dashboardframe">
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
   

<form action="">


</form>

        <div className="maintittledash text-[26px]  flex items-center gap-[34px]">New Message but  <button onClick={() => deletetemplate()} className="delete"><img width={35} className=' flex p-[5px] bg-red-500 rounded-[25px]' src="TrashCan.png" alt=""  /></button> </div>

        <div className="selectchanel mt-[25px] mb-[25px]">
            <div className="selectittlechanel">SELECT CHANEL</div>
            <div className='flex flex-col  gap-[15px]'>
                <div className='relative w-[500px] flex flex-col gap-[10px]' >
                <button onClick={() => selector == true ? setselector(false) : setselector(true) } className="selectchanels relative w-[500px] mt-[15px] text-start bg-white p-[10px] flex items-center justify-between rounded-[5px]">Select Chanels {selector == true ? <img width={20} src="Up.png" alt="" /> :<img width={20} src="Down.png" alt="" /> }
            
          
            
            </button>

            {selector == true ?  <div className="selector absolute top-[70px] left-[0px] w-[100%] flex flex-col gap-[1px] p-[5px] rounded-[10px] bg-white">{channels.map(value => <button onClick={() =>console.log(value , selectedchanels) | selectedchanels.map(data => data[1]).includes(value[1]) ? Removeitem(value[1]) :  setselectedchanels([...selectedchanels , value]) }  className='bg-gray-200 index-[5] selbtn w-[100%] p-[10px] rounded-[10px] flex items-center justify-center flex items-center justify-between' key={value} >{value[0]} {selectedchanels.map(data => data[1]).includes(value[1]) ? <img width={25} src="Checkmark.png" alt="" /> : null}</button>)}</div> : null} 
                </div>
           




               
                <br />

            </div>
            <div className="navigationbtns flex items-center gap-[10px]">
            </div>




        </div>

        <div className="messagetittle">Message</div>

        <div className="textareadiv w-[500px] relative">
      <div id="froala-editor">
      <FroalaEditorComponent        ref={editorRef} model={message} className='w-[500px] mt-[10px] p-[10px]  h-[300px] rounded-[15px]'        tag='textarea'
 config={options} onModelChange={(e) => setmessage(e)} ></FroalaEditorComponent>
</div>

      
      <div className="smile absolute flex items-end "><button onClick={() => emojiopened == true ? setemojiopened(false) : setemojiopened(true)} ><img  width={30} src="Happy.png" alt="" /></button>

      {emojiopened ? <div className="pickerrelative relative"> <Picker data={datas}  onEmojiSelect={handlepaste} /> </div>: null}

     
      </div>
      </div>

    </div>
    <br />
    
    <label className='mb-[10px]' htmlFor="">ATTACH</label>


    <input  onChange={(e) => imageupload(e) | pathsaver(e)} accept="image/*"   type="file" className='newmsgfile mt-[10px]' id='Attach'  placeholder='Choose FIle' />
    <label htmlFor="Attach" className='flex pointer items-center bg-white p-[10px] gap-[10px] w-[300px] rounded-[10px]' ><img width={20} src="Attach.png" alt="" /> <p>Attach File</p> </label>
    {uploadedfiles.map((data, id) => <button key={id + 1} onClick={() => setuploadedfiles(uploadedfiles.filter(item => item != data))} ><img key={id} src={data} ></img></button>)}
    <br /><br />


     Date
     {dateenablder == true ? 
     <div className="date mb-[35px]">
    <input  defaultValue={date} onChange={(e) => setdate(e.target.value) | console.log(date)} className='p-[10px] ' type="datetime-local" name="" id="" />
     </div>
     : null}



    <div className="btns flex items-center gap-[25px]">
    <button className='p-[5px] bg-blue-500 text-white rounded-[3px] w-[200px]' onClick={(e) => sendmessage()} >Send Message</button>
    <button className='p-[5px] bg-indigo-500 text-white rounded-[3px] w-[200px]' onClick={(e) => savetemplate()} >Save Template</button>
    <button onClick={() => back()} name='back' className="back h-[33px] pointer text-center flex items-center justify-center ">Back</button>
    </div>


</div>
  )
}
