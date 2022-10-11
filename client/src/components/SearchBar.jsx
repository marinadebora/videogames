import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterName } from '../action';
import style from '../styles/SearchBar.module.css'

export const SearchBar = () => {
const dispatch= useDispatch();
const [name,setName]= useState('')


function handlefilterName(event){
  event.preventDefault()
setName(event.target.value)
}

function handleSubmit(event){
  event.preventDefault();
  dispatch(filterName(name)) 
}


  return (
    <div>
         <label className={style.label}>Buscar por Nombre: </label>
           <input  key='buscar' type='text' placeholder='Name...'onChange={(e)=>handlefilterName(e)}/> 
          <button type='submit' onClick={(e)=>handleSubmit(e)}>Buscar</button>
     
        </div>
  )
}
