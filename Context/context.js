import React,{createContext,useReducer} from 'react';
export const Context = createContext({});
function reducer(state, action) {
    switch (action.type) {
        case 'GET_MOVIES':
            return {...state,movies:action.payload};
        case 'FAVOURITE_MOVIE':
            return {...state,movies:action.payload};
        case 'SELECT_MOVIE':
            return {...state,movie:action.payload};
        case 'SEARCH_MOVIES':
            return {...state,search:action.payload.search,filteredMovies:action.payload.movies};
        case 'LOGIN':
            return {...state,isLoggedIn:true};
        case 'LOGOUT':
            return {...state,isLoggedIn:false};
        case 'PLAY_MOVIE':
            return {...state,movieToPlay:action.payload};
        default:
            return state;
    }
  }
export default provider = (props)=>{
    const [state, dispatch] = useReducer(reducer, {
        movies:[],
        search:"",
        filteredMovies:[],
        movie:{},
        isLoggedIn:false,
        movieToPlay:{}
    });
    
    return(
        <Context.Provider value={[state, dispatch]}>
            {props.children}
        </Context.Provider>
    )
}