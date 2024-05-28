import { createContext, useContext, useReducer } from "react";


const IdContext = createContext({
    id:'',
    reducer: () => {}
})

export default function IdReducer({children}){

const [idState, dispatch] = useReducer(idReducer, {id:''})

function idReducer(id, action) {
    switch (action.type) {
        case 'change':
            {
                return (action.idState)
            }
    }
}

return <IdContext.Provider value={{ idState, dispatch }}>{children}</IdContext.Provider>
}

/**
 * 
 * this function gives an object ({idState, dispath}) where dispatch is a function that takes input ({type, idState})
 * the idState object has {id:''} in it 
 * @returns returns result of useContext(IdContext)
 */
export function useCurrentId(){
    return useContext(IdContext)
 }
