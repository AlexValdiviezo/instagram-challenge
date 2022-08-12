import React, {Fragment, useState} from 'react'
import './styles/Navbar.css'
import { useMediaQuery } from 'react-responsive'

import Modal from 'react-modal';
import {postPublics} from '../helpers/postPublics';

export default function Navbar({setNewPublic}) {

  const [modalState, setModalState] = useState('none');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlImage, setUrl] = useState('URL de la imagen');
  const [text, setText] = useState('Texto opcional de la imagen')
  const [error, setError] = useState('error');

  const photoUpload = (url, text) =>{
      setModalState('loading');
      const result = async() => {
        let resp = await postPublics(url, text);
        if(resp.error){
          setError(resp.error);
          setModalState('error');
        }else{
          setModalState('success');
          setNewPublic(resp);
        }
      }
      result();
  }

  const openModal = () => {
      setIsOpen(true);
  }

  const afterOpenModal = () => {
      setUrl('URL de la imagen');
      setText('Texto opcional de la imagen');
  }

  const closeModal = () => {
      setModalState('none');
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
/*
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
*/

  return (
    <Fragment>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal-container"
        ariaHideApp={false}
      > 
      {(modalState == 'loading') &&
      <div className='loading'>
        <img src='./icons/loading.svg'></img>
        <p>Loading</p>
      </div>}
      {(modalState == 'none') && <>
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
        </>}
        {
          (modalState == 'success') && <>
          <div className='success'>
            <img src='./icons/success.svg'></img>
            <p>Success</p>
            <button onClick={closeModal}>Close</button>
          </div>
          </>
        }{
          (modalState == 'error') && <>
          <div className='error'>
            <img src='./icons/error.svg'></img>
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </div>
          </>
        }
      </Modal>
      <div className='container'>
        <img src='./icons/instagram.svg'></img>
        {/* //Buscador
          isDesktopOrLaptop &&
          <div className='search-container'>
            <img src='./icons/search.svg'></img>
            <input onBlur={isNotFocusSearch} onClick={searchInit} onChange={changeSearch} value={search}></input>
          </div>*/
        }
        <div className='icons-container'>
            <img src='./icons/home.svg'></img>
            {/* //No es necesario <img src='./icons/message.svg'></img>*/}
            <img onClick={()=>setIsOpen(true)} src='./icons/add.svg'></img>
            {/* //No es necesario <img src='./icons/search-icon.svg'></img>*/}
            {/* //No es necesario <img src='./icons/heart.svg'></img>*/}
            <img src='./icons/profile.svg'></img>
        </div>
      </div>
    </Fragment>
  )
}
