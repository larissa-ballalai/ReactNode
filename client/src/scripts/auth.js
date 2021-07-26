import decode from "jwt-decode"
import { login } from "../scripts/isLoggedIn"
import { apiURL } from "../api"
import axios from "axios"

export const loginToken = async(jwtToken) => {
  
    //1. decoding the token
    const userToken = decode(jwtToken)

    if (userToken.exp < Date.now() / 1000) {
        return "Token expired!"
    }
             
    //2. reading information
    var user = {
        clientID: userToken.client_id,
        tenandID: userToken.TenantId,
        userID: userToken.UserId,
        userName: userToken.Username,
        role: userToken.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }

    //3. get the user in database (client_id)    
    try {
        const userConexia = await axios.post(apiURL() + 'users/middleware/getconexia', {id: user.userID})
        login(userConexia.data.login, userConexia.data.password)
    }
    catch(error) {
        return 'Authentication failed'        
    }
}