import React from 'react'
import { useState } from 'react'
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Signup = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    // const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name === 'firstname') {
            setFirstName(e.target.value);
        } 
        else if (e.target.name === 'lastname') {
            setLastName(e.target.value);
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value);
         }
    }

    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = {firstname, lastname, email}
        const res =  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          let response = await res.json()
          console.log(response)
          if (response.status === 'success') {
            // Show success message
            toast.success(response.msg, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // Show error message from response
            toast.error(response.msg, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        // setPassword('')
        
    }
    
    
  return (
    <div>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colors"
        />
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                href={"/login"}
                className="font-medium text-pink-indigo hover:text-indigo-500 mx-2">
                 Login
              </Link>
            
            </p>
            </div>
        
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">
                    <input onChange={handleChange} value={firstname} id="firstname" name="firstname" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>
                <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">
                    <input onChange={handleChange} value={lastname} id="lastname" name="lastname" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                    <input onChange={handleChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>
        
                <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
