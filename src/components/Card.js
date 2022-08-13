import React, { Fragment, useState, useEffect, useRef } from 'react'
import { getPublics } from '../helpers/getPublics';
import { putPublics } from '../helpers/putPublics';
import { deletePublics } from '../helpers/deletePublics';
import './styles/Card.css'

import Modal from 'react-modal';
import { putAllproperty } from '../helpers/putAllproperty';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

export default function Card({newPublic}) {

    const modalRef = useRef();

    const [urlImage, setUrl] = useState('URL de la imagen');
    const [text, setText] = useState('Titulo de ejemplo');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');

    const [heartIcon, setHeartIcon] = useState('./icons/heart.svg');
    const [heartClickedClass, setHeartClass] = useState('');
    const [likes, setLikes] = useState(317);
    const [publics, setPublics] = useState([]);
    const [publicEdit, setPublicEdit] = useState(false);

    const publicCont = publics.length;

    useEffect(()=>{
        const checkIfClickedOutside = e => {
            if(modalIsOpen && modalRef.current && !modalRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }
        
        document.addEventListener("mousedown", checkIfClickedOutside);

        return() => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [modalIsOpen]);


    useEffect( () => {
        setIdUpdate(null);
        setText(null);
        setUrl(null);
        setIsOpen(false);
        setPublicEdit(false);
        const result = async() => {
            let resp = await getPublics();
            if(resp[0]) {
                setPublics(resp);
            }
            else setPublics([])
          }
          result();
    }, [])

    useEffect( () => {
        if(newPublic.uid){
            let array = [];
            array.push(newPublic)
            publics.map((e)=>{
                array.push(e);
            })
            setPublics(array);
        }
    },[newPublic])

    const changeHeart = async(id) =>{
        try {
            await putPublics(id);
            setPublics(publics.map((e)=>{
                if(e.uid === id){
                    e.likes = e.likes + 1
                }
                return e;
            }))
        } catch (error) {
            console.log(error);
        }
    }
    
    const closeModal = () =>{
        setIdUpdate(null);
        setText(null);
        setUrl(null);
        setIsOpen(false);
        setPublicEdit(false);
    }

    const openModal = async(uid, titulo, imagen, like) =>{
        setIdUpdate(uid);
        setText(titulo);
        setUrl(imagen);
        setIsOpen(true);
    }

    const afterOpen = () =>{
        console.log(idUpdate);
        console.log(text);
        console.log(urlImage);
        console.log(modalIsOpen);
    }

    const deletePublic = (uid) =>{
        const req = async() => await deletePublics(uid);
        req();
        setPublics(e=>{
            e = e.map(arrayElements => {
                if(arrayElements.uid != idUpdate ){
                    return arrayElements;
                }
            })
            e = e.filter(Boolean);
            return e;
        })
        setIsOpen(false);
    }

    const editPublic = () =>{
        setPublicEdit(true);
    }

    const photoUpdate = (id, urlImage, text) =>{
        setPublics(e=>{
            e = e.map(arrayElements => {
                if(arrayElements.uid != idUpdate ){
                    return arrayElements;
                }else{
                    return {
                        uid: idUpdate,
                        imagen: urlImage,
                        titulo: text,
                    }
                }
            })
            e = e.filter(Boolean);
            return e;
        })
        const req = async() => {
            try {
                await putAllproperty(idUpdate, urlImage, text);
                setIsOpen(false);
            } catch (error) {
                console.log(error);
            }

        }
        req();
    }

  return (
    <Fragment>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onAfterClose={closeModal}
            onAfterOpen={afterOpen}
            className="modal"
            ariaHideApp={false} 
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
        >
            {!publicEdit && 
            <div className='modal-container' ref={modalRef}>
                <div onClick={()=>deletePublic(idUpdate)} className='delete'>Eliminar publicación</div>
                <div onClick={editPublic}className='edit'>Editar publicación</div>
                <div onClick={closeModal}className='cancel'>Cancelar</div>
            </div>
            }{
                publicEdit &&
                <div className='modal-container' ref={modalRef}>
                    <div className='modal-header'>
                        <p>Editar publicación</p>
                    </div>
                    <div className='modal-body'>
                        <input onClick={()=>setUrl('')} onChange={(e)=>setUrl(e.target.value)} value={urlImage}></input>
                        <input onClick={()=>setText('')} onChange={(e)=>setText(e.target.value)} value={text}></input>
                        <button onClick={()=>photoUpdate(idUpdate ,urlImage, text, likes)}>Actualizar información</button>
                    </div>
                </div>

            }
            
            
        </Modal>


        {
            publics.map((e)=>{

                let res = '';
                let tituloCont = 0;
                for(let i=0; i<e.titulo.length; i++){
                    if(e.titulo[i] != ' '){
                        tituloCont ++;
                    }else{
                        tituloCont = 0;
                    }
                    res += e.titulo[i];
                    if(tituloCont == 30){
                        e.titulo = res + '...';
                        break;
                    }
                }
                
                return(
                    <div key={e.uid} className='card'>
                        <div className='profile-card'>
                            <div>
                                <img src='./icons/profile.svg'></img>
                                <p>username</p>
                            </div>
                            <div onClick={()=>openModal(e.uid, e.titulo, e.imagen, e.likes)} className='menu'>
                                <img src='./icons/menu.svg'></img>
                            </div>
                        </div>
                        <img src={e.imagen}></img>
                        <div className='buttons-card'>
                            <img onClick={()=>changeHeart(e.uid)} src={heartIcon} className={heartClickedClass}></img>
                        </div>
                        <div className='cont-likes'>
                            <p>{e.likes} Me gusta</p>
                        </div>
                        {(e.titulo !== '') &&
                            <div className='photo-index'>
                                <p className='comment-user'><a className='user'>username</a> {e.titulo}</p>
                            </div>
                        }
                    </div>
                )
            })
        }
    </Fragment>
  )
}
