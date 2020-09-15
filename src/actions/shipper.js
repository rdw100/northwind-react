import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

// Fetches data from the JSON API and
// dispatches an action retrieving 
// the fetched data as the payload
export const fetchAll = () => dispatch => {
    api.shipper().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    api.shipper().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (shipperId, data, onSuccess) => dispatch => {
    api.shipper().update(shipperId, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { shipperId, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (shipperId, onSuccess) => dispatch => {
    api.shipper().delete(shipperId)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: shipperId
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}