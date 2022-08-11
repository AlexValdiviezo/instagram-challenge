import React, {Fragment, useState} from 'react'
import './styles/Navbar.css'
import { useMediaQuery } from 'react-responsive'

import Modal from 'react-modal';
import {postPublics} from '../helpers/postPublics';

export default function Navbar() {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlImage, setUrl] = useState('URL de la imagen');
  const [text, setText] = useState('Texto opcional de la imagen')

  const photoUpload = (url, text) =>{
      const result = async() => {
        let resp = await postPublics(url, text);
        console.log(resp);
      }
      result();
      setIsOpen(false);
  }

  const openModal = () => {
      setIsOpen(true);
  }

  const afterOpenModal = () => {
      setUrl('URL de la imagen');
      setText('Texto opcional de la imagen');
  }

  const closeModal = () => {
      setIsOpen(false);
  }
  

// Media querys
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 710px)'
  })
  const isPhoneOrTablet = useMediaQuery({
    query: '(max-width: 710px)'
  })

// Algoritmo de busqueda input

  const searchInicial = 'Busca'

  const [search, setSearch] = useState(searchInicial);

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const searchInit = () =>{
    if(search === searchInicial) setSearch('')
  }

  const isNotFocusSearch = () =>{
    if(search === '') setSearch(searchInicial)
  }


  return (
    <Fragment>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal-container"
      > 
        <p onClick={closeModal} className='modal-close'>X</p>
        <div className='modal-card'>
          <div className='modal-header'>
            <p>Crear una nueva publicación</p>
          </div>
          <div className='modal-body'>
            <input onClick={()=>setUrl('')} onChange={(e)=>setUrl(e.target.value)} value={urlImage}></input>
            <input onClick={()=>setText('')} onChange={(e)=>setText(e.target.value)} value={text}></input>
            <button onClick={()=>photoUpload(urlImage, text)}>Subir Imagen</button>
          </div>
        </div>
      </Modal>
      <div className='container'>
        <img src='./icons/instagram.svg'></img>
        {
          isDesktopOrLaptop &&
          <div className='search-container'>
            <img src='./icons/search.svg'></img>
            <input onBlur={isNotFocusSearch} onClick={searchInit} onChange={changeSearch} value={search}></input>
          </div>
        }
        <div className='icons-container'>
            <img src='./icons/home.svg'></img>
            <img src='./icons/message.svg'></img>
            <img onClick={()=>setIsOpen(true)} src='./icons/add.svg'></img>
            <img src='./icons/search-icon.svg'></img>
            <img src='./icons/heart.svg'></img>
            <img src='./icons/profile.svg'></img>
        </div>
      </div>
    </Fragment>
  )
}
