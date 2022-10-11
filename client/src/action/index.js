import axios from 'axios';


export function getAllVideogames(){
    return async function(dispatch){
        var allvideogaame=await axios('http://localhost:3001/videogames');
        return dispatch({
            type:'GET_ALL_VIDEOGAMES',
            payload:allvideogaame.data
        })
    }
}


export function getAllGenres(){
    return async function(dispatch){
        var allgenres= await axios('http://localhost:3001/genres');
        
        return dispatch({
            type: 'GET_ALL_GENRES',
            payload:allgenres.data
        })
    }
}

export function getAllPlatform(){
  return async function(dispatch){
      var allgenres= await axios('http://localhost:3001/platforms');
      
      return dispatch({
          type: 'GET_ALL_PLATFORM',
          payload:allgenres.data
      })
  }
}

export function getVideogameDetail(id) {
    return async function (dispatch) {
       try {
        var json= await axios(`http://localhost:3001/videogame/${id}`);
        return dispatch( {
            type: 'GET_VIDEOGAME_DETAIL',
            payload:json.data
        }
        )
       } catch (error) {
        console.log(error)
       }
     
    };
  };

//POST

  export function createVideogame(payload) {
    return async function () {
        var videogamecreate= await axios.post(`http://localhost:3001/videogame`,payload);
        return videogamecreate
     }
     
  };

//----------FILTROS--------------//


  export function filterGenres(payload){
    return{
        type: 'FILTER_GENRES',
        payload
    }
  }
  

export function filterCreated(payload){
  return {
    type: 'FILTER_CREATED',
    payload,
}
}


export function filterName(payload) {

  return async function(dispatch){
    var name= await axios(`http://localhost:3001/videogames?name=${payload}`)
    return dispatch({
      type:'FILTER_NAME',
      payload:name.data
    })
  }

}

// --------ORDER------//

export function order(payload){
  return {
    type:'ORDER',
    payload
  }
}

export function orderRaiting(payload){
  return {
    type:'ORDER_RATING',
    payload
  }
}

export function deleteVideogames(payload){
  return {
    type:'DELETE_VIDEOGAMES',
    payload
  }
}