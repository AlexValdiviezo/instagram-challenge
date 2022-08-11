import React, { Fragment, useState, useEffect } from 'react'
import { getPublics } from '../helpers/getPublics';
import './styles/Card.css'

export default function Card() {
    const [heartIcon, setHeartIcon] = useState('./icons/heart.svg');
    const [heartClickedClass, setHeartClass] = useState('');
    const [likes, setLikes] = useState(317);
    const [publicCont, setPublicCont] = useState(0);
    const [publics, setPublics] = useState([{
        _id: "62f57918730c33f36d041990",
        imagen: "https://i.imgur.com/9L45pJG.jpeg",
        titulo: "test-titulo",
        likes: 0,
        __v: 0
    }]);

    const changeHeart = () =>{

        if(heartClickedClass === ''){
            setHeartIcon('./icons/heart-clicked.svg');
            setHeartClass('heart-clicked');
            setLikes(e=>e+1);
        }else{
            setHeartIcon('./icons/heart.svg');
            setHeartClass('');
            setLikes(e=>e-1);
        }

    }

    useEffect( () => {
        const result = async() => {
            let resp = await getPublics();
            if(resp[0]) {
                setPublics(resp);
                setPublicCont(resp.length);
            }
            else setPublics([{
                _id: "62f57918730c33f36d041990",
                imagen: "https://i.imgur.com/9L45pJG.jpeg",
                titulo: "test-titulo",
                likes: 0,
                __v: 0
              }])
          }
          result();
    }, [publicCont])

    
    

  return (
    <Fragment>
        {
            publics.map((e)=>{
                return(
                    <div className='card'>
                        <div className='profile-card'>
                            <img src='./icons/profile.svg'></img>
                            <p>indirectasderock</p>
                            <div className='menu'>
                                <img src='./icons/menu.svg'></img>
                            </div>
                        </div>
                        <img src={e.imagen}></img>
                        <div className='buttons-card'>
                            <img onClick={changeHeart} src={heartIcon} className={heartClickedClass}></img>
                            <img src='./icons/comment.svg'></img>
                            <img src='./icons/share.svg'></img>
                        </div>
                        <div className='cont-likes'>
                            <p>{e.likes} Me gusta</p>
                        </div>
                        <div className='photo-index'>
                            <p className='user'>indirectasderock</p>
                            <p className='comment-user'>{e.titulo}</p>
                        </div>
                        <div className='comment-container'>
                            <div className='comment'>
                                <img src='./icons/emote.svg'></img>
                                <input value='Añade un comentario...'></input>
                            </div>
                            <img src='./icons/public-button.svg'></img>
                        </div>
                    </div>
                )
            })
        }
    </Fragment>
  )
}
