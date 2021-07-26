import axios from "axios"
import { apiURL } from "../api"
import { getUserSession } from "../scripts/isLoggedIn"

export const schoolAction = async(action, param, object) => {
    
    var user = getUserSession("userAdmin")
    switch(action) {
        case "GET":
            let get = await axios.get(apiURL() + 'schools/middleware/get');            
            var school = get.data
            
            if(user.profile === "COACH" || user.profile === "SCHOOL_ADMIN")         
                school = school.filter(f => f._id === user.school._id)  

            return school;
        
        case "GETCOMBO":              
            if(user.profile !== "ADMIN") {
                const getCombo = await axios.get(apiURL() + 'schools/middleware/getCombo/' + user.school._id);
                return getCombo.data;
            }
            else {
                const getCombo = await axios.get(apiURL() + 'schools/middleware/getCombo');            
                return getCombo.data;
            }

        case "GETBYDISTRIBUTOR":
            const getComboDistribuidor = await axios.get(apiURL() + 'schools/middleware/getComboDistributor/' + param);            
            return getComboDistribuidor.data;

        case "GETBYID": 
            const getID = await axios.get(apiURL() + 'schools/middleware/get/' + param);
            return getID.data;        

        case "UPDATE":
            const getupdate = await axios.post(apiURL() + 'schools/middleware/update/' + param, object);
            return getupdate.data;
        
        case "DELETE":
            const del = await axios.delete(apiURL() + 'schools/middleware/delete/' + param);
            return del.data;
        
        case "ADD":
            const add = await axios.post(apiURL() + 'schools/middleware/add', param)
            return add.data;
        
        default:
            return;
    }
}

export const addSchool = async(school, distributor_id, import_id) => {
    const new_school = { 
        id: school.id,
        name: school.name,
        distributor: distributor_id,
        importID: import_id
    }       
    
    const school_id = await axios.post(apiURL() + 'schools/middleware/add', new_school)
    return school_id.data
}

 export const getSchool = async(id) => {
    const school = await axios.get(apiURL() + 'schools/middleware/get/' + id)
    return school.data
}
