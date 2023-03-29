import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {getRandomPrompt} from '../utils';
import { FormField } from "../Components";
import {Loader} from "../Components";
import preview from '../assets/preview.png'

const RenderCards = ({data, title}) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <Card key={post._id} {...post}/>)
        )
    }

    return (
        <h2 className="mt-5 font-bold text-xl text-center">{title}</h2>
    )
}


const  CreatePost =()=> {
    const [allPosts, setAllPosts] = useState(null);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt:randomPrompt});
    }
    
    
    const generateImage = async () => {
        if(form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({prompt: form.prompt}), 
                })

                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (error) {
                alert(error);
                console.log(error)
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Enter your prompt')
        };

    }
         
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/post',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                });

                await response.json();
                navigate('/');
            } catch (error) {
                alert(error)
            } finally  {
                setLoading(false)
            }
        } else {
            alert('Please generate an image')
        }
    
    }
    

    return ( 
    <section className="flex flex-col items-center justify-center  text-[white] h-[700px]">
        <div className="text-center pt-[10px]">
            <h1 className="font-bold text-4xl">CREATE</h1>
            <p className="text-lg py-2">Prompt your very own ai art.</p>
        </div>
        <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-5">
                <div >
                    <FormField
                        labelName="Your name"
                        type="text"
                        name="name"
                        placeholder="Pedro"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="type something"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                      
                    />
                </div>
                
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 md:w-[300px]  md:h-[300px] w-[200px] h-[200px] p-3
                flex justify-center items-center">
                    {form.photo ? (
                        <img 
                        src={form.photo} 
                        alt={form.prompt} 
                        className="w-full h-full object-contain"
                        />
                    ) : (
                        <img
                        src={preview}
                        alt="preview"
                        className="w-9/12 h-9/12 object-contain
                        opacity-40"
                        />
                    )}

                    {generatingImg && (
                        <div className="absolute inset-0 z-0
                        flex justify-center items-center 
                        bg-green-300 opacity-2">
                            <Loader/>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 flex justify-center gap-5">
                <button
                type="button"
                onClick={generateImage}
                className="p-2 bg-[#57C5B6] rounded-lg w-full mt-4
                hover:bg-green-200 duration-200 ease-in-out text-[#3A1078] font-bold"
                >
                {generatingImg ? 'Generating..' : 'Generate your AI image!'}
                </button>
            </div>

            <div className="mt-5 flex flex-col justify-center items-center ">
                <p className=" text-green-500">Share your prompt to others in the community!</p>
                <button type="submit"
                className="mt-3 text-black font-medium rounded-md w-[200px]
               bg-[#57C5B6] p-2 hover:bg-green-200 duration-200 ease-in-out ">
                    {loading ? 'Sharing...' : 'Share with Others'}
                </button>
            </div>
        </form>
    </section>
     );
}

export default CreatePost;