'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useInsertionEffect, useRef, useState } from 'react'

import EditorJS from '@editorjs/editorjs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';  // Froala editor CSS
import 'froala-editor/css/froala_style.min.css';        // Froala theme styles
import 'froala-editor/css/froala_editor.pkgd.min.css';  
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Froala Editor JS
import 'froala-editor/js/plugins.pkgd.min.js';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';



export default function Dashboard() {
  const [model, setModel] = useState('<p>Hello, Froala!</p>');
    const [selectedchanels , setselectedchanels] = useState([])
    const [selector , setselector] = useState(false)
    const [uploadedfiles , setuploadedfiles] = useState([])
        const [renderedimages , setrenderedimages] = useState(0)
        const [rendering , setrendering] = useState(false)
        const [channels , setchannels] = useState([])
        const [message , setmessage] = useState('')
        const [allpath , setpath ] = useState([])
        const [dateenablder , setdateenabled] = useState(true)
        const [date , setdate] = useState(undefined)
        const [notselected , setnotselected] = useState(false)
        const [create , setcreate] = useState(false)
        const [save , setsave] = useState(false)
        const [emojiopened , setemojiopened] = useState(false)
        
        const [editorContent, setEditorContent] = useState('');
        const [showEmojiPicker, setShowEmojiPicker] = useState(false);
        const editorRef = useRef(null);


        const insertEmoji = (emoji) => {
          const editor = editorRef.current;
          const cursorPosition = editor.element;
          console.log(cursorPosition)
      
          // Insert emoji at the cursor position in the editor content
          editor.selection.text(emoji.native);
          setmessage(editor.html.get());
        };




        
          // Handle the paste event
        
   
        const options = {
          placeholderText: 'Edit Your Text Here!',
          charCounterCount: false,
          pluginsEnabled: ['emoji', 'bold', 'italic', 'underline'], // You can add other plugins too
          toolbarButtons:   [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript , fontSize', 'emoji'], ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']],
          fontSize: ['12px', '16px', '20px', '24px', '30px', '40px'],  // Custom font size options
          fontFamily: ['Arial', 'Courier', 'Times New Roman'],  // Custom font family options
          emojiButtons: ['emoji'],
        };
     

        const handleEmojiSelect = (emoji) => {
            // Append the selected emoji to the current text

            insertTextAtCaret(emojiData.native)
          };

          const handlepaste = (emoji) => {
            const editor = editorRef.current.editor
            const cursorPosition = editor.selection.get();
    
            // Insert the emoji at the cursor position
            editor.html.insert(emoji.native);
        
            // Update the state with the new content
            setmessage(editor.html.get());
          }
        

     
        const savetemplate = async() => {


            const send = await axios.post("http://localhost:4000/savetemplate" , {selectedchanels , message , uploadedfiles , allpath , date})
            setsave(true)
            setTimeout(() => {
                setsave(false)
            }, 2500);

        }


        const sendmessage = async() => {

            if(selectedchanels.length == 0){
                setnotselected(true)
                setTimeout(() => {
                    setnotselected(false)
                }, 2500);
            }else{
             setnotselected(false)
             setcreate(true)
                const getinfo = await axios.post('http://localhost:4000/sendmessages' , {selectedchanels , message , uploadedfiles , allpath , date})
             
            }
            console.log(selectedchanels)
       
        }
      

    useEffect(() => {


        const mainfunc = async() => {
        const getinfo = await axios.get('http://localhost:4000/getchanel')

        console.log(getinfo.data)
        setchannels(getinfo.data)

        }
        mainfunc()



    },[])




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

    

    selectedchanels.map((data , id) => console.log(id))

    const Removeitem = (itemtoremove) =>{
        setselectedchanels(selectedchanels.filter(item => item !== itemtoremove))
    }



  return (
    <div className="dashboard p-[25px]">
        <div className="dashboardframe">
        {create == true ?    <div className="succesfulycreated">

<div className="msesage">
  <div className="messageframe">
    <div className="succesfuly text-[24px] text-black">Succesfully</div>
    <div className="maimessage">Send Message.</div>
    <div className="okaybtnframe flex items-center">
    <button className='messageokay bg-blue-500 text-white' onClick={(e) => setcreate(false)} >Okay</button>
    </div>

  </div>
</div>

<div className="blur"></div>

  </div> : null}
  {save == true ?    <div className="succesfulycreated">

<div className="msesage">
  <div className="messageframe">
    <div className="succesfuly text-[24px] text-black">Succesfully</div>
    <div className="maimessage">Save Template.</div>
    <div className="okaybtnframe flex items-center">
    <button className='messageokay bg-blue-500 text-white' onClick={(e) => setcreate(false)} >Okay</button>
    </div>

  </div>
</div>

<div className="blur"></div>

  </div> : null}

<form action="">

    
</form>
            <div className="maintittledash text-[26px] flex items-center gap-[34px]">New Message </div>

            <div className="selectchanel mt[-25px] mb-[25px]">
                <div className="selectittlechanel">SELECT CHANEL</div>
                {notselected == true ? <div className='text-red-500 mt-[5px]' >Please Select Cannel</div> : null}
                <div className='flex flex-col  gap-[15px]'>
                    <div className='relative w-[500px] flex flex-col gap-[10px]' >
                    <button onClick={() => selector == true ? setselector(false) : setselector(true) } className="selectchanels relative w-[500px] mt-[15px] text-start bg-white p-[10px] flex items-center justify-between rounded-[5px]">Select Chanels {selector == true ? <img width={20} src="Up.png" alt="" /> :<img width={20} src="Down.png" alt="" /> }
      
                </button>

                {selector == true ? <div className="selector absolute top-[70px] left-[0px] w-[100%] flex flex-col gap-[1px] p-[5px] rounded-[10px] bg-white">{channels.map(value => <button onClick={() => selectedchanels.includes(value) ? Removeitem(value) :  setselectedchanels([...selectedchanels , value]) }  className='bg-gray-200 index-[5] selbtn w-[100%] p-[10px] rounded-[10px] flex items-center justify-center flex items-center justify-between' key={value} >{value[0]} {selectedchanels.includes(value) ? <img width={25} src="Checkmark.png" alt="" /> : null}</button>)}</div> : null} 
                    </div>
               




                   
                    <br />
    
                </div>
                <div className="navigationbtns flex items-center gap-[10px]">
                <Link href={'/create'} className='bg-blue-500 text-white p-[5px] w-[200px] text-center'>Create New Chanel</Link>
                <Link href={'/template'} className="bg-indigo-500 text-white p-[5px] w-[150px] text-center">Templates</Link> 

                
                </div>




            </div>

            <div className="messagetittle">Message</div>



      <div>

      </div>
      <div className="textareadiv w-[500px] relative">
      <div id="froala-editor">
      <FroalaEditorComponent        ref={editorRef} model={message} className='w-[500px] mt-[10px] p-[10px]  h-[300px] rounded-[15px]'        tag='textarea'
 config={options} onModelChange={(e) => setmessage(e)} ></FroalaEditorComponent>
</div>

      
      <div className="smile absolute flex items-end "><button onClick={() => emojiopened == true ? setemojiopened(false) : setemojiopened(true)} ><img  width={30} src="Happy.png" alt="" /></button>

      {emojiopened ? <div className="pickerrelative relative"> <Picker data={data}  onEmojiSelect={handlepaste} /> </div>: null}

     
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
        </div>
        


    </div>
    
  )
}
