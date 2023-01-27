import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const nonActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
  
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created')
  
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId)
    
    client.fetch( query )
      .then((data) => {
        setUser(data[0])
      })

  }, [userId]);

  useEffect(() => {
    if(text === 'Created'){
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text, userId]);

  const handleLogut = () => {
    localStorage.clear()
    navigate('/login')
  }

  if(!user){
    return <Spinner message="loading profile..."/>
  }
  
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
         <div className='relative flex flex-col mb-7'>
            <div className='flex flex-col justify-center items-center'>
              <img 
                src={randomImage}
                className="w-full h-370 2xl:h-510 shadow-lg object-cover"
                alt='banner-pic'
              />
              <img 
                className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                src={user.image}
                atl='user-pic'
              />
              <h1 className='font-bold text-3xl text-center mt-3'>
                {user.userName}
              </h1>
              <div className='absolute top-0 z-1 right-0 p-2'>
                { userId === user._id && (
                  <button
                    className='bg-white p-2 rounded-full curor-pointer outline-none shadow-md'
                  >
                    <AiOutlineLogout color='red' fontSize={21} onClick={handleLogut}/>
                  </button>
                )}
              </div>
            </div>
            <div className='text-center mb-7'>
              <button 
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('created')
                }}
                className={`${activeBtn === 'created' ? activeBtnStyles : nonActiveBtnStyles}`}
              >
                Created
              </button>
              <button 
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                }}
                className={`${activeBtn === 'saved' ? activeBtnStyles : nonActiveBtnStyles}`}
              >
                Saved
              </button>
            </div>
            {pins?.length ? (
              <div className='px-2'>
                  <MasonryLayout pins={pins}/>
              </div>
            ): (
              <div className='flex justify-center font-bold items-center w-full mt-2 text-xl'>
                No Pins found !
              </div>
            )}
         </div>
      </div>
    </div>
  )
}

export default UserProfile
