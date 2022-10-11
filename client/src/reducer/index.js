const initialState = {
    videogames:[],
    allVideogames:[],
    detail:[],
    genres:[],
    platform:[]
    }
    
    function rootReducer(state = initialState, action){
        switch (action.type) {
            case 'GET_ALL_VIDEOGAMES':
                return {
                   ...state,
                   videogames: action.payload,
                   allVideogames: action.payload,
                }
    
    
            case 'GET_ALL_GENRES':
                return {
                    ...state,
                    genres:action.payload
                } 
    
            case 'GET_VIDEOGAME_DETAIL':
                return {
                    ...state,
                    detail: action.payload,
                }
    
            case 'GET_ALL_PLATFORM':
                return {
                    ...state,
                    platform:action.payload
                }
            
                  
            case 'CREATE_VIDEOGAME':
                return {
                    ...state
                }
                     
            
            case 'FILTER_GENRES':
                const allGenres= state.allVideogames;
                const filterGenres= action.payload === 'all'? allGenres : allGenres
                .filter(el=>  {for (let i = 0; i < el.genres.length; i++) {
                    if (el.genres[i].name === action.payload) {
                        return true
                       }
                    }
                     return undefined
                })
    
                return {
                    ...state,
                    videogames:filterGenres
                }
           
            case 'FILTER_CREATED':
             
               const filtercreated= action.payload ==='agregado'? state.allVideogames.filter(e=> e.createDB) : state.allVideogames.filter(e=> !e.createDB)  
                return {
                    ...state,
                    videogames:action.payload ==='all'? state.allVideogames:filtercreated
                }
     
            case 'FILTER_NAME':
                return {
                    ...state,
                    videogames: action.payload
                }
            case 'ORDER':
                const order= action.payload === 'asc'?
                state.videogames.sort(function(a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
                })
                : state.videogames.sort(function(a,b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    videogames: order
                }
    
            case 'ORDER_RATING':
                const orderRating =action.payload === 'alto'?
                state.videogames.sort(function(a,b){
                
                    if(a.rating > b.rating){
                        return -1
                    }
                    if(b.rating > a.rating){
                        return 1
                    }
                    return 0
                })
                : state.videogames.sort(function(a,b){ 
                    if(a.rating > b.rating){
                    return 1
                  }
                    if(b.rating > a.rating){
                    return -1
                 }
                return 0
            })
                
                return {
                    ...state,
                    videogames:orderRating
                }
            case 'DELETE_VIDEOGAMES':
                return{
                    ...state,
                   videogames:state.videogames.filter((e)=>e.id!==action.payload)
                }
            default:
                return state
       }   
    }
    export default rootReducer;