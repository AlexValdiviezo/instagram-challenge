import React, { Fragment, useState, useEffect } from 'react'
import { getPublics } from '../helpers/getPublics';
import { putPublics } from '../helpers/putPublics';
import { deletePublics } from '../helpers/deletePublics';
import './styles/Card.css'

import Modal from 'react-modal';

export default function Card({newPublic}) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [idDelete, setIdDelete] = useState('');

    const [heartIcon, setHeartIcon] = useState('./icons/heart.svg');
    const [heartClickedClass, setHeartClass] = useState('');
    const [likes, setLikes] = useState(317);
    const [publicCont, setPublicCont] = useState(0);
    const [publics, setPublics] = useState([]);

        useEffect( () => {
        const result = async() => {
            let resp = await getPublics();
            if(resp[0]) {
                setPublics(resp);
                setPublicCont(resp.length);
            }
            else setPublics([])
          }
          result();
    }, [])

    useEffect( () => {
        if(newPublic.uid){
            let array = [];
            array.push(newPublic)
            console.log(array);
            publics.map((e)=>{
                array.push(e);
            })
            console.log(array);
            setPublics(array);
        }
    },[newPublic])

    const changeHeart = (id) =>{
        putPublics(id);
        setPublics(publics.map((e)=>{
            if(e.uid === id){
                e.likes = e.likes + 1
            }
            return e;
        }))
    }
    
    const closeModal = () =>{
        setIsOpen(false);
    }

    const openModal = (uid) =>{
        setIdDelete(uid);
        setIsOpen(true);
    }

    const deletePublic = (uid) =>{
        const req = async() => await deletePublics(uid);
        req();
        setPublics(e=>{
            e = e.map(arrayElements => {
                if(arrayElements.uid != idDelete ){
                    return arrayElements;
                }
            })
            e = e.filter(Boolean);
            return e;
        })
        setIsOpen(false);
    }

  return (
    <Fragment>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            ariaHideApp={false}
        >
            <div className='modal-container'>
                <div onClick={()=>deletePublic(idDelete)} className='delete'>Eliminar publicación</div>
                <div onClick={closeModal}className='cancel'>Cancelar</div>
            </div>
            
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
                            <div onClick={()=>openModal(e.uid)} className='menu'>
                                <img src='./icons/menu.svg'></img>
                            </div>
                        </div>
                        <img src={e.imagen}></img>
                        <div className='buttons-card'>
                            <img onClick={()=>changeHeart(e.uid)} src={heartIcon} className={heartClickedClass}></img>
                            <img src='./icons/comment.svg'></img>
                            <img src='./icons/share.svg'></img>
                        </div>
                        <div className='cont-likes'>
                            <p>{e.likes} Me gusta</p>
                        </div>
                        <div className='photo-index'>
                            <p className='comment-user'><a className='user'>username</a> {e.titulo}</p>
                        </div>
                        {/*
                        //Caja de comentarios
                        <div className='comment-container'>
                            <div className='comment'>
                                <img src='./icons/emote.svg'></img>
                                <input value='Añade un comentario...'></input>
                            </div>
                            <img src='./icons/public-button.svg'></img>
                        </div>*/}
                    </div>
                )
            })
        }
    </Fragment>
  )
}
