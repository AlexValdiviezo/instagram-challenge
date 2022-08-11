import React, { Fragment } from 'react'
import './styles/Card.css'

export default function Card() {
  return (
    <Fragment>
        <div className='card'>
            <div className='profile-card'>
                <img src='./icons/profile.svg'></img>
                <p>indirectasderock</p>
            </div>
            <img src='./icons/image-test.svg'></img>
            <div className='buttons-card'>
                <img src='./icons/heart.svg'></img>
                <img src='./icons/comment.svg'></img>
                <img src='./icons/share.svg'></img>
            </div>
            <div className='cont-likes'>
                <p>317 Me gusta</p>
            </div>
            <div className='photo-index'>
                <p className='user'>indirectasderock</p>
                <p className='comment-user'>Indice de perfil</p>
            </div>
            <div className='comment-container'>
                <div className='comment'>
                    <img src='./icons/emote.svg'></img>
                    <input value='Añade un comentario...'></input>
                </div>
                <img src='./icons/public-button.svg'></img>
            </div>
        </div>
        <div className='card'>
            <div className='profile-card'>
                <img src='./icons/profile.svg'></img>
                <p>indirectasderock</p>
            </div>
            <img src='./icons/image-test.svg'></img>
            <div className='buttons-card'>
                <img src='./icons/heart.svg'></img>
                <img src='./icons/comment.svg'></img>
                <img src='./icons/share.svg'></img>
            </div>
            <div className='cont-likes'>
                <p>317 Me gusta</p>
            </div>
            <div className='photo-index'>
                <p className='user'>indirectasderock</p>
                <p className='comment-user'>Indice de perfil</p>
            </div>
            <div className='comment-container'>
                <div className='comment'>
                    <img src='./icons/emote.svg'></img>
                    <input value='Añade un comentario...'></input>
                </div>
                <img src='./icons/public-button.svg'></img>
            </div>
        </div>
    </Fragment>
  )
}
