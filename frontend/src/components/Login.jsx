import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  const createOrGetUser = ( response ) => {
    localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)));
    const { sub, name, picture} = jwt_decode(response.credential)
    
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/' , {replace: true})
      })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
        <h1 class="flex flex-col gap-2 text-center text-6xl font-black md:flex-row lg:tracking-tight xl:text-9xl">
          <span class="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]" data-text="Develop."><span class="animate-gradient-1 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">Share</span> </span>

          <span class="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]" data-text="Preview."><span class="animate-gradient-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> great</span> </span>

          <span class="before:absolute before:-z-10 before:text-black before:content-[attr(data-text)]" data-text="Ship."><span class="animate-gradient-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">moments.</span> </span>
        </h1>
          <div className="p-5">
            <img src={logo} width="130px" />
        </div>

          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={response => {
                createOrGetUser(response)
              }}
            
              onError={() => {
                console.log('Login Failed');
              }}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login