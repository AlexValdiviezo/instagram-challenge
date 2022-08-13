import React, {Fragment, useState} from 'react'
import './styles/Navbar.css'
import { useMediaQuery } from 'react-responsive'

import Modal from 'react-modal';
import {postPublics} from '../helpers/postPublics';
import { uploadFiles } from '../helpers/uploadFiles';

export default function Navbar({setNewPublic}) {

  const [file, setFile] = useState('');
  const [modalState, setModalState] = useState('none');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlImage, setUrl] = useState('URL de la imagen');
  const [text, setText] = useState('Texto opcional de la imagen')
  const [error, setError] = useState('error');

  const photoUpload = (url, text) =>{
      setModalState('loading');
      const result = async(url=url, text=text) => {
        let resp = await postPublics(url, text);
        if(resp.error){
          setError(resp.error);
          setModalState('error');
        }else{
          setModalState('success');
          setNewPublic(resp);
        }
      }
      const uploadFile = async() =>{
          await uploadFiles(file)
          .then(res => {
            url = res.url;
            result(url, text);
            setModalState('success');
          })
          .catch(error => setModalState('error'))
      }

      if(url=='URL de la imagen' && file==''){
        setModalState('error');
        return;
      }

      if(url!='URL de la imagen' && file!=''){
        setModalState('error');
        return;
      }

      if(url!='URL de la imagen'){
        result();
        return;
      }
      if(file!=''){
        uploadFile();
        return;
      }
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
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 710px)'
  })
  const isPhoneOrTablet = useMediaQuery({
    query: '(max-width: 710px)'
  })

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
            <input onChange={(e)=>{setFile(e.target.files); console.log(e.target.files)}} type="file" name="photo"></input>
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
        <a href='#'><img src='./icons/instagram.svg'></img></a>
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
