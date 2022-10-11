import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createVideogame ,getAllPlatform } from '../action';
import style from '../styles/CreateVideogames.module.css'
import { getAllGenres } from '../action';
import { Link, useNavigate } from 'react-router-dom';

const validate=(form)=>{
   let errors={}
   if(!form.name){
      errors.name='El campo Nombre es requerido'
   }
   if(form.rating<1 || form.rating>5){
      errors.rating='raiting debe estar entre 1 y 5'
   }
  
   if(!form.description){
      errors.description= 'el campo Descripcion es requerido'
   }
   if(!form.platform){
      errors.platform= 'el campo Plataforma es requerido'
   }
 
   return errors
}

const CreateVideogames = () => {
   const dispatch= useDispatch();
   const [form,setForm]= useState({
      name: '',
      description: '',
      released: '',
      rating: 0,
      genres:[],
      platform:[],
     
   });
   const [errors, setErrors] = useState({})
   const genres= useSelector(state=>state.genres);
   const platform= useSelector(state=>state.platform);
   const history= useNavigate()

   useEffect(() => {
      dispatch(getAllGenres())
      dispatch(getAllPlatform())
       }, [dispatch])

     

   const handleChange =(event)=>{
      setForm({
         ...form,
         [event.target.name]:event.target.value
      })
      setErrors(validate({
         ...form,
         [event.target.name]:event.target.value
      }))  //valida cada una de las variables del formulario
         
      
   }
   const handleSubmit =(event)=>{
      event.preventDefault()
      if(!form.name||!form.description||form.platform.length<1){
         alert('campo requerido')
      }else{

         dispatch(createVideogame(form))
        alert('Videogame Creado con Exito');
         setForm({
         name: '',
         description: '',
         released: '',
         rating: 0,
         genres:[],
         platform:[]
         })
         history.push('/home')
      }
   }
 

   const handleGenre=(event)=>{
      setForm({
         ...form,
         genres:[...form.genres,event.target.value]
      })
     
   }

   const handlePlatform=(event)=>{
      setForm({
         ...form,
         platform:[...form.platform,event.target.value]
      })
      setErrors(validate({
         ...form,
         [event.target.name]:event.target.value
      }))
   }

   const handleDelete=(event)=>{
    /* setForm({
      ...form,
      genres:form.genres.filter(el=> el !== event),
      platform:[...form.platform, event.target.value.filter(el=> el !== event)]
    }) */
   }

  return (
   <div className={style.contain}>

   <Link to='/home'> <button>VOLVER</button></Link>

   <h1>Crea tu videogames</h1>

   <form onSubmit={handleSubmit} >
   <label>Name: </label>
         <input 
         type='text' 
         onChange={(e)=>handleChange(e)} 
         value={form.name} 
         name='name'
         className={style.input} 
         >
         </input>
         {errors.name&&<p>{errors.name}</p>}

         <label>Description: </label>
         <textarea 
         onChange={(e)=>handleChange(e)} 
         value={form.description} 
         name='description'
         className={style.text}>
         </textarea>
         {errors.description&&<p>{errors.description}</p>}
         <label>Fecha de creacion: </label>
         <input 
         type='text' 
         onChange={(e)=>handleChange(e)} 
         value={form.released}
         name='released'
         className={style.input}>
         </input>

         
         <label>Rating: </label>
         <input  
         onChange={(e)=>handleChange(e)} 
         type='number' 
         value={form.rating} 
         name='rating'
         className={style.input}>
         </input>
         {errors.rating&&<p>{errors.rating}</p>}
         <label>Genres: </label>
         <select 
         onChange={(e)=>handleGenre(e)}
         >
         {genres?.map((e)=>(
            <option value={e.name} name={e.name} key={e.name}>{e.name}</option>
            ))
             }
         </select>

         
         <label>Platforms: </label>
             <select key='platform' onChange={(e)=>handlePlatform(e)}  >
             <option key='all' value={'all'} >Todos</option>
             {platform?.map((e)=>(
                <option key={e}name={e} >{e}</option>
                ))}
            </select>
            {errors.platform && <p>{errors.platform}</p>}

            {form.genres.map(e=>
            <div>
            <h5>{e}</h5>
            <button onClick={handleDelete}>X</button>
            </div> 
            )}
            {form.platform.map(e=> <div>
            <h5>{e}</h5>
            <button onClick={handleDelete}>X</button>
            </div> )}

            <button  type ='submit'className={style.btn} >Create Videogame</button>
               {errors.botonActivo && <p>complete todos los campos</p>}



   </form>
      




    </div>
  )
}

export default CreateVideogames
