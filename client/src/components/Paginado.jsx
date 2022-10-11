import React from 'react'
import style from '../styles/Paginado.module.css'


export function Paginado({videogamexpage, allVideogames, paginado}){
  const numPage=[]
  for (let i = 0; i < Math.ceil(allVideogames/videogamexpage); i++) {
    numPage.push(i+1)
      
  }
    return (
    <div className={style.contain}>
        
            {
                numPage?.map(e=>(
                    
                        <button onClick={()=>paginado(e)}className={style.btn} key={e}>{e}</button>
                  
                ))
            }
        
    </div>
  )
}
