import axios from "axios"
import { apiURL } from "../api"
import { getUserSession } from "../scripts/isLoggedIn"

export const distributorAction = async(action, param, object) => {
    
    var user = getUserSession("userAdmin")
    switch(action) {
        case "GET":                     
            if(user.profile !== "ADMIN") {
                const getID = await axios.get(apiURL() + 'distributors/middleware/get/' + user.distributor._id);
                return getID.data;        
            }            
            else {
                const get = await axios.get(apiURL() + 'distributors/middleware/get');
                return get.data;
            }

        case "GETCOMBO":            
            if(user.profile !== "ADMIN") {
                const getCombo = await axios.get(apiURL() + 'distributors/middleware/getCombo/' + user.distributor._id);
                return getCombo.data;
            }                
            else {
                const getCombo = await axios.get(apiURL() + 'distributors/middleware/getCombo');
                return getCombo.data;
            }
                                
        case "GETBYID": 
            const getID = await axios.get(apiURL() + 'distributors/middleware/get/' + param);
            return getID.data;        

        case "UPDATE":
            const getupdate = await axios.post(apiURL() + 'distributors/middleware/update/' + param, object);
            return getupdate.data;
        
        case "DELETE":
            const del = await axios.delete(apiURL() + 'distributors/middleware/delete/' + param);
            return del.data;
        
        case "ADD":
            const add = await axios.post(apiURL() + 'distributors/middleware/add', param)
            return add.data;
        
        default:
            return;
    }
}
export const getDistributor = async() => {
    const distributor = await axios.get(apiURL() + 'distributors')
    return distributor.data
}