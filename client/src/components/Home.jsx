import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch,  useSelector } from 'react-redux';
import { getAllVideogames, getAllGenres ,filterGenres,filterCreated, order, orderRaiting} from '../action';
import { Link } from 'react-router-dom';
import { Videogames } from "./Videogames";
import style from '../styles/Home.module.css'
import { Paginado } from "./Paginado";
import { SearchBar } from "./SearchBar.jsx";

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames= useSelector(state=>state.videogames)
    const allGenres= useSelector(state=>state.genres)
 
    const [orden, setOrden]=useState('')

    
    const [page, setPage]= useState(1);
    const [videogamexpage, setVideogamexpage]=useState(15);
    const indice= page*videogamexpage;//15
    const indiceFinal=indice-videogamexpage;
    const sigPage=allVideogames.slice(indiceFinal, indice);

    const paginado= (numPage)=>{
        setPage(numPage)
    }


    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
       
          },[dispatch])


function handleFilterGenres(event){
    
    dispatch(filterGenres(event.target.value)) 
   
  }

function handelFilterCreated(event){
  event.preventDefault();
  dispatch(filterCreated(event.target.value)) 
/*   setPage(1)
  setOrden(`Ordenado ${event.target.value}`) */
}

function handleOrder(event){
    event.preventDefault()
    dispatch(order(event.target.value))
    setPage(1)
    setOrden(`Ordenado ${event.target.value}`)
}

function handleOrderRating(event){
    event.preventDefault()
    dispatch(orderRaiting(event.target.value))
    setPage(1)
    setOrden(`Ordenado ${event.target.value}`)
}

 
return(
    <div key='home'>
        <div className={style.contain}>
         <div className={style.title}>
         <h1>VIDEOGAMES</h1>
         </div>
         <div className={style.input}>
         <Link to='/videogame'> <button className={style.create}>CREA TU VIDEOGAME</button></Link>
              <SearchBar />        
              <select className={style.select} key='genres' onChange={(e)=>handleFilterGenres(e)}>
                  <option key='all' value={'all'} >Generos</option>
                  {allGenres.map((e)=>{
                          return <option value={e.name}>{e.name}</option>
                      })}
              </select>
 
              <select className={style.select} key='selecFilter'onChange={(e)=>handelFilterCreated(e)}>
                  <option value={'all'}>Todos</option>
                  <option value={'existente'}>Existe en la Api</option>
                  <option value={'agregado'}>Creado en Base de datos</option>
              </select>

              <select className={style.select} key='selectOrder' onChange={(e)=>handleOrder(e)}>
                <option value={'all'}>Orden</option>
                <option value={'asc'}>Ascendentemente</option>
                <option value={'des'}>Descendentemente</option>
              </select>
              
              <select className={style.select} key='selectRating' onChange={(e)=>handleOrderRating(e)}>
                <option value={'alto'}>Raiting mas Alto</option> 
                <option value={'bajo'}>Raiting mas Bajo</option>               
              </select>
              </div>
              </div>

       

              <Paginado
              videogamexpage={videogamexpage}
               allVideogames={allVideogames.length} 
               paginado={paginado}
               />
        { sigPage?.map(e=>{
            return (  
                    <Fragment>
                <Link to={`/home/${e.id}`} >
            <Videogames 
                name= {e.name}
                img= {e.img}
                genres= {e.genres}
                rating={e.rating}
                id= {e.id}
                />
                </Link>
                </Fragment>
                
                )
        } )
        }
         
     
      




    </div>
)

}
      
 


 


 

 
 /* let dogsApi= (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data      //?api_key=${API_KEY}
    
    let reference_image = dogsApi.map(e=>e.reference_image_id)
    let img= (await axios('https://api.thedogapi.com/v1/breeds')).data;
   if(reference_image.length>1){
    let array=[];
    for (let i = 0; i < reference_image.length; i++) {
      const element = img.filter(e=>e.reference_image_id=== reference_image[i])
      array.push(element)
    }
    let filterimg=img.map(e=>e.reference_image_id===reference_image);
    let imagen=img.map(e=>e.image.url)
   

    let dogApiMap=dogsApi.map(e=>({
       id:e.id,
       name:e.name,
       image:undefined,
       temperament:e.temperament,
       weightMin:e.weight.metric.split('-')[0],
       weightMax:e.weight.metric.split('-')[1],
    }));
    dogApiMap.map(e=>e.image= imagen)
    return(dogApiMap)
   }
    let filterimg=img.map(e=>e.reference_image_id===reference_image);
    let imagen=img.map(e=>e.image.url)
    console.log(imagen)

    let dogApiMap=dogsApi.map(e=>({
       id:e.id,
       name:e.name,
       image:undefined,
       temperament:e.temperament,
       weightMin:e.weight.metric.split('-')[0],
       weightMax:e.weight.metric.split('-')[1],
    }));
    dogApiMap.map(e=>e.image= imagen)
    return(dogApiMap)
  }
    } catch (error) {
        console.log(error)
    }
}

module.exports=getAlldogsApi; 



//require('dotenv').config();
const axios =require ('axios');
//const {API_KEY}=process.env;



async function getAlldogsApi(name){
    
    try {
        if(!name){
            
    let dogsApi= (await axios(`https://api.thedogapi.com/v1/breeds`))//?api_key=${API_KEY}
    .data.map(e=>({
    id:e.id,
    name:e.name,
    image:e.image.url,
    temperament:e.temperament,
    weightMin:e.weight.metric.split('-')[0],
    weightMax:e.weight.metric.split('-')[1],
  }));
  return(dogsApi)
  }else{
    let dogsApi= (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data      //?api_key=${API_KEY}
    console.log('dogsApi' +dogsApi.flat())
    //let reference_image = dogsApi.filter(e=>e.reference_image_id)
    let img= (await axios('https://api.thedogapi.com/v1/breeds')).data;

   if(dogsApi.length > 1){
    let array=[];
    for (let i = 0; i < dogsApi.length; i++) {
      const element = img.filter(e=>e.reference_image_id === dogsApi[i].reference_image_id)
      array.push(element)
      console.log('element' +element)
    } 
    let imagen=array.filter(e=>({
      id:e.id,
      name:e.name,
      image:e.image.url,
      temperament:e.temperament,
      weightMin:e.weight.metric.split('-')[0],
      weightMax:e.weight.metric.split('-')[1],
      
   }));
   console.log('imagen' +imagen)
    return imagen;
    //let filterimg=array.map(e=>e.reference_image_id===reference_image);

    /* let dogApiMap=dogsApi.map(e=>({
       id:e.id,
       name:e.name,
       image:undefined,
       temperament:e.temperament,
       weightMin:e.weight.metric.split('-')[0],
       weightMax:e.weight.metric.split('-')[1],
       
    })); 
    //dogApiMap.map(e=>e.image= imagen)
    //return(dogApiMap)
  }else if(dogsApi){
    const element = img.filter(e=>e.reference_image_id === dogsApi[i].reference_image_id)
    let imagen=element.map(e=>({
      id:e.id,
      name:e.name,
      image:undefined,
      temperament:e.temperament,
      weightMin:e.weight.metric.split('-')[0],
      weightMax:e.weight.metric.split('-')[1],
   }))
   console.log( 'imagen2' +imagen)
   return imagen
   }
    
  }
    } catch (error) {
        console.log(error)
    }
}

module.exports=getAlldogsApi;




*/