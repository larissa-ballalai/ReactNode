import axios from "axios"
import { apiURL } from "../api"
import { getUserSession } from "../scripts/isLoggedIn"

export const userAction = async(action, param, object) => {
    
    var user = getUserSession("userAdmin") 
    switch(action) {
        case "GET":                 
            const get = await axios.get(apiURL() + 'users/middleware/get');   
            return get.data;

        case "GETBYID": 
            const getID = await axios.get(apiURL() + 'users/middleware/get/' + param);
            return getID.data;
    
        case "GETBYSCHOOL": 
            const getBySchool = await axios.get(apiURL() + 'users/middleware/getBySchool/' + param);
            return getBySchool.data;

        case "GETPROFILE":
            const getprofile = await axios.post(apiURL() + 'users/middleware/getbyprofile', param);

            if(user.profile === "SCHOOL_ADMIN" || user.profile === "COACH")
                return getprofile.data.filter(f => f.school._id === user.school._id)
            else
                return getprofile.data;

        case "GETREPORT": 
            const report = await axios.get(apiURL() + 'report/getReportByUser/' +  param)
            return report.data;
        
        case "GETBYLOGIN":
            const login = await axios.post(apiURL() + 'users/middleware/getlogin', param)
            return login.data

        case "UPDATE":
            const getupdate = await axios.post(apiURL() + 'users/middleware/update/' + param, object);
            return getupdate.data;
        
        case "DELETE":
            const del = await axios.delete(apiURL() + 'users/middleware/delete/' + param);
            return del.data;
        
        case "ADD":
            const add = await axios.post(apiURL() + 'users/middleware/add', param)
            return add.data;

        default:
            return;
    }
}

export const addUser = async(user, profile, distributor_id, school_id, import_id) => {

    const new_user = {
        name: user.name,
        login: user.login,
        distributor: distributor_id,
        school: school_id,
        importID: import_id,
        email: user.email,
        id: user.id,
        profile: profile,
        password: "2021"
    }
    
    const user_id = await axios.post(apiURL() + 'users/middleware/add', new_user)
    return user_id.data
}

export const getUser = async(id) => {
    const user = await axios.get(apiURL() + 'users/middleware/get' + id)
    return user.data
}

