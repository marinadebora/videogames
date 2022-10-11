import React from 'react'
//import { useDispatch } from 'react-redux';
//import { deleteVideogames } from '../action';
import style from '../styles/Videogames.module.css';


export const Videogames = ({name,img,genres,rating,id}) => {
 /*  const dispatch=useDispatch() */
  return (
    <div className={style.container}>
      
          <img src={img} alt={name}/> 
         
        <h3>{name}</h3>
        <br />
        {
            genres?.map(e =>
              <h4>{e.name}</h4>
              )
       }
       <br />
       <h5>★ {rating}</h5>
      {/*  <button type='rese' onClick={()=>dispatch(deleteVideogames(id))}>X</button> */}

    </div>
  )
}
