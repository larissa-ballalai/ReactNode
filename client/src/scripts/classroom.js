import axios from "axios"
import { apiURL } from "../api"
import { getUserSession } from "../scripts/isLoggedIn"

export const classroomAction = async(action, param, object) => {
    
    var user = getUserSession("userAdmin")
    switch(action) {
        case "GET":                    
            if(user.profile === "SCHOOL_ADMIN") {
                const get = await axios.get(apiURL() + 'classrooms/middleware/getBySchool/' + user.school._id);
                return get.data
            }
            else if (user.profile === "COACH") { 
                const get = await axios.post(apiURL() + 'classrooms/middleware/getBycoach/', { school: user.school._id, user: user._id}); 
                return get.data
            }
            else {
                const get = await axios.get(apiURL() + 'classrooms/middleware/get');
                return get.data
            }
        case "GETBYSCHOOL":
        const getBySchool = await axios.get(apiURL() + 'classrooms/middleware/getBySchool/' + param);            
        return getBySchool.data;

        case "GETCOMBO":  
            //chamado na dashboard.
            const combo = await axios.post(apiURL() + 'classrooms/middleware/getCombo', {user : { profile: user.profile, school: {_id: user.school._id}, user: user._id}});                        
            return combo.data;

        case "GETBYID": 
            const getID = await axios.get(apiURL() + 'classrooms/middleware/get/' + param);
            return getID.data;   
        
        case "GETBYUSER":
            const get = await axios.post(apiURL() + 'classrooms/middleware/getBycoach/', { school: param.school._id, user: param._id}); 
            return get.data

        case "UPDATE":
            const getupdate = await axios.post(apiURL() + 'classrooms/middleware/update/' + param, object);
            return getupdate.data;
        
        case "DELETE":
            const del = await axios.delete(apiURL() + 'classrooms/middleware/delete/' + param);
            return del.data;
        
        case "ADD":
            const add = await axios.post(apiURL() + 'classrooms/middleware/add', param)
            return add.data;
                    
        default:
            return;
    }
}


export const addClassroom = async(classroom, periods, school_id, user_ids, importID) => {
    
    console.log(classroom)
     
    var new_class = {
        name: classroom.name,
        period: "", //periods.length > 0 ?  periods.filter(f => f.id === classroom.class_period.id)[0].name : "",
        school: school_id,
        users: user_ids,
        year: classroom.schoolYear,
        id: classroom.id,
        importID: importID
    }
    
    const classroom_id = await axios.post(apiURL() + 'classrooms/middleware/add', new_class)
    return classroom_id.data    
}

export const getClassroom = async(id) => {
    const classroom = await axios.get(apiURL() + 'classrooms/middleware/get' + id)
    return classroom.data
}

export const getStudentClassroom = async(user) => {  


    ///// call 
    
    var classroom = await axios.get(apiURL() + 'classrooms/middleware/getBySchool/' + user.school._id);
         
    var classr = classroom.data.filter(f => {
        for(var i=0; i<f.users.length; i++) {
            if((f.users[i] === user._id))
                return f
        }       
    })

    
    console.log('hey')
    console.log(classroom)
    
    console.log(classr)

    if(classr.length > 0) 
       return classr[0]._id    
}
