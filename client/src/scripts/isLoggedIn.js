import axios from "axios"
import { apiURL } from "../api"
import { userAction } from "./user"
import { classroomAction } from "./classroom"

export const setUserSession = (name, value) => {
    window.sessionStorage.setItem(name, value); 
}

export const getUserSession = (origin) => {  
    var user = window.sessionStorage.getItem(origin)
    
    if(user)
        return JSON.parse(window.sessionStorage.getItem(origin))     
    else
        return false   
}

export const isLoggedIn = () => {

    var userAdmin = getUserSession("userAdmin")
    var userPT = getUserSession("userPT")

    var isLoggedInAdmin = userAdmin ? userAdmin.isLoggedIn : false
    var isLoggedInPT    = userPT ? userPT.isLoggedIn : false
    var currentPage     = window.location.pathname
    var isAdminPage     = currentPage.split("/").filter(f=> f == "admin")

    if(currentPage == "/admin" || currentPage == "/" || currentPage == "/login") {
        //add flow
    } 
    else {
        if(isAdminPage.length > 0 && !isLoggedInAdmin) 
            window.location = "/admin"                        

        if(isAdminPage.length == 0 && !isLoggedInPT)   
            window.location = "/"
    }                    
}

export const clearSession = (origin) => {
    setUserSession(origin, null)

    if(origin === "userPT") 
        window.location = "../../login"
    else 
        window.location = "../../admin"
}

export const login = async (login, password) => {
  
    var redirect = ""
    var user = { login: login, password: password }
    user = await userAction("GETBYLOGIN", user)
    if(user) {
            user.isLoggedIn = true

            var classroom = await classroomAction("GETBYUSER", user)
                                                
            if(user.profile === "STUDENT") {                   
                if(classroom.length > 0)
                    user.classroom = classroom[0]._id
                else 
                    return  "User does not have a classroom."

                if(user.block === true) {
                    redirect ="../student-result/" + user._id
                }
                else {
                    const test = await axios.get(apiURL() + "test/user/" + user._id)
                  
                    if(test.data.length > 0) {
                        var test_weight = { positive: 0, negative: 0, positive_count: 0, negative_count: 0 }
                        user.test_weight = test_weight
                        user.testID = test.data[0]._id
                        redirect = "../resume/ "
                    }
                    else {  
                        user.testID = ""
                        user.test_weight = { positive: 0, negative: 0, positive_count: 0, negative_count: 0 } 
                        redirect = "../intro-video/"
                    }                        
                }
                
                setUserSession("userPT", JSON.stringify(user))
            }
            else {
                redirect = "../admin/dash"
                setUserSession("userAdmin", JSON.stringify(user))
            }
            
            window.location = redirect
    } 
    else
        return "Login failed."
}


