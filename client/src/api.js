export const apiURL = (type) => {    
    //return "https://placementest-homolog.herokuapp.com/"
    return "http://localhost:5000/"
}

export const conexiaAPI = () => {
    return {
        clientID: "placement-test",
        clientSecret: "YzAxNzIwNGY2YzMxZjU0NDc3ODBkMTlkYWIwNGQ1YmU1ZDlhZTRmZTlhMWUyN2M5NDBhYjk0MjYzMzczMDhjYw==",
        token: "https://api.hub.conexia.com.br/prod/sso/v2/applicationlogin",
        tenant: "https://api.hub.conexia.com.br/prod/sync/v2/tenants",
        full: "https://api.hub.conexia.com.br/prod/sync/v2/full",
        status: "https://api.hub.conexia.com.br/prod/sync/v2/status"
    }
} 

export const adminConfig = (dir,param) => {
    var configAdmin = { 
        img:"/img/",
        audio:"/audio/",
        root:"https://placementest.s3.amazonaws.com/" , param,
        config: {
            bucketName: "placementest",
            dirName: dir,
            region: "us-east-1",
            accessKeyId: "AKIAJHDYH3PMR4DKMFFA",
            secretAccessKey: "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"
            
        }       
    }

    return configAdmin
}