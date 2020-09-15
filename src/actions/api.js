import axios from "axios";

const baseUrl = "https://localhost:44314/api/";

// Export JSON DATA from WEB API (CORS 
// enabled) consume from React using Axios 
export default {
    shipper(url = baseUrl + 'shippers/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: shipperId => axios.get(url + shipperId),
            create: newRecord => axios.post(url, newRecord),
            update: (shipperId, updateRecord) => axios.put(url + shipperId, updateRecord),
            delete: shipperId => axios.delete(url + shipperId)
        }
    }
}