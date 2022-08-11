import React from 'react'
import './styles/Navbar.css'
import { useMediaQuery } from 'react-responsive'

export default function Navbar() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 710px)'
  })
  const isPhoneOrTablet = useMediaQuery({
    query: '(max-width: 710px)'
  })

  return (
    <div className='container'>
        <img src='./icons/instagram.svg'></img>
        {
          isDesktopOrLaptop &&
          <div className='search-container'>
            <img src='./icons/search.svg'></img>
            <input value='Busca'></input>
          </div>
        }
        <div className='icons-container'>
            <img src='./icons/home.svg'></img>
            <img src='./icons/message.svg'></img>
            <img src='./icons/add.svg'></img>
            <img src='./icons/search-icon.svg'></img>
            <img src='./icons/heart.svg'></img>
            <img src='./icons/profile.svg'></img>
        </div>
    </div>
  )
}
