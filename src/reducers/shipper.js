import {ACTION_TYPES} from "../actions/shipper";

const initialState = {
    list:[]
}

// Redux write logic reducer function signatures 
export const shipper = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.shipperId === action.payload.shipperId ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.shipperId !== action.payload)
            }
            
        default:
            return state
    }
}