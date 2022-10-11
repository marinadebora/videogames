import React from 'react'
import { useEffect} from "react";
import { useDispatch,  useSelector } from 'react-redux';
import {getVideogameDetail} from '../action/index';
import { Link , useParams} from 'react-router-dom';
import style from '../styles/videogameDetail.module.css'

export default function VideogamesDetail (){
  const dispatch= useDispatch();
  const {id}= useParams()

  const mydetail= useSelector((state)=>state.detail)
  console.log(mydetail)

 useEffect(()=>{
  dispatch(getVideogameDetail(id))
 },[dispatch, id])



  return( 
    
     
      <div className={style.container}>
      
        
        <div>
       
            <div>
            <h1>{mydetail.name}</h1>
            </div>
            <div>
            <img src={mydetail.img}  className={style.img} alt=''/>
            </div>
            <Link to='/home'>
            <button>VOLVER</button>
          </Link>
          <div className={style.detail}>
          <h3>Descripcion del juego: </h3>
          
            <p>{mydetail.description}</p>
            
          {mydetail.genres?.map((e)=><p>Genero: {e.name}</p>)}
          
          <h3>fecha de creacion:  </h3>
            <p>{mydetail.Release_date}</p>
            
            <h3>Raiting: </h3>
            <p>{mydetail.rating}</p>
            
            <h3>Plataformas disponibles: </h3>
            <p>{mydetail.platform + '  '}</p>
            </div>
          </div>
     
          
    </div>
   
    )
  
} 
/* [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas */