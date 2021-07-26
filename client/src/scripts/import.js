import axios from "axios"
import { apiURL, conexiaAPI } from "../api"
import { addSchool } from "../scripts/school"
import { addUser } from "../scripts/user"
import { addClassroom } from "../scripts/classroom"

export const importData = async(distributorID) => {
    
    const data = await connectToApi(distributorID)
    var importID = data.importID

    console.log(data)

    for(var t=0; t < data.response.length; t++) {

        var tenant = data.response[t]
        tenant.profiles.map(m => {
            m.type = (
                m.type === "teacher" ? "COACH" : 
                  (m.type === "student" ? "STUDENT" : 
                    (m.type === "manager" ? "SCHOOL_ADMIN" : m.type )))
        })
                        
        var users = tenant.users
        
        console.log('tenant' + tenant.tenantName)
            
        // 1. save schools
        for(var i=0; i < tenant.schools.length; i++) {
    
            var periods = tenant.schools[i].structures.filter(f=> f.type === "period")
            var segments = tenant.schools[i].structures.filter(f=> f.type === "segment")
            var classrooms = tenant.schools[i].groups.filter(f=> f.type === "class")
                     
            var school_id = await addSchool(tenant.schools[i] , distributorID, importID)
    
            console.log('school' + tenant.schools[i].name)

            //classrooms
            for(var c=0; c < classrooms.length; c++) {               
                var classroom = classrooms[c]
                var user_ids = [] 
                var classroom_ids = []
    
                console.log('users')

                //A. Insert Teachers + Get users
                for (var u=0; u < classroom.users.length; u++) {
                    var profile = tenant.profiles.filter(f=> f.id === classroom.users[u].profileId)[0].type
                    var user = users.filter(f=> f.id === classroom.users[u].userId)[0]                                 
                    const user_id = await addUser(user, profile, distributorID, school_id, importID)  
                    user_ids = user_ids.concat(user_id)                        
                    console.log(u + ' user ' + user.name)
                }
                
                //B. Insert class
                classroom.class_period = classroom.structures.filter(f => f.type === "period")[0]
                classroom.class_grade  = classroom.structures.filter(f => f.type === "grade")
                
                const classroom_id = await addClassroom(classroom, periods, school_id, user_ids, importID)
                classroom_ids = classroom_ids.concat(classroom_id)
                
                                        
                console.log(user_ids)
                console.log(classroom_ids)
            }        
        }
    }
}

const connectToApi = async (distributor_id) => {
    var api = conexiaAPI()

    var param = {
        token: "",
        sync: null,
        response: null,
        importID: "",
    }
    
    //1. token
    const dataConnection = { clientid: api.clientID, clientsecret: api.clientSecret }
    const token = await axios.post(api.token, dataConnection, {headers: {'content-type': 'text/json'}})
    param.token = token.data.token

    //2. tenant
    const tenantData = await axios.get(api.tenant, {headers: { 'Authorization': 'Bearer '+ param.token}})
    var tenants = tenantData.data.payload//[0].id   
    param.sync = tenantData.data.header

    //3. structure
    var listTenants = []
    for(var i = 0; i < tenants.length; i++) {
        const users = await axios.get(api.full + "?tenantId=" + tenants[i].id, {headers: { 'Authorization': 'Bearer '+ param.token}});
        listTenants = listTenants.concat(users.data.payload)  
        console.log(users.data.payload.tenantName)      
    }    
    
    param.response = listTenants
  
    //4. import save data
    const import_id = await addImport({listTenants}, distributor_id)
    param.importID = import_id

    return param
}

export const addImport = async(information, distributor_id) => {
    const imports = {
        distributor: distributor_id,        
        information: information,
        date: Date.now(),
        status: ""
    }

    const import_id = await axios.post(apiURL() + "imports/integration/add", imports)
    return import_id.data
}

export const closeAPI = async(token, syncId, status) =>  {    
    const param = {
        syncId: syncId,
        status: status
    }

    const object = await axios.put(conexiaAPI().status, param,  {headers: { 'Authorization': 'Bearer '+ token} });
    return object
}



