
import ReactS3 from 'react-s3';
import { adminConfig } from '../api';

export const uploadBackground = (props, dir) => {
    ReactS3.uploadFile(props.state.file.file, adminConfig(dir).config)
            .then( (data) => { "uploaded!" })
            .catch( (err) => { console.log(err) })  
}

export const uploadAudio = (file, dir) => {    
    ReactS3.uploadFile(file, adminConfig(dir).config)
            .then( (data) => { console.log(data) })
            .catch( (err) => { console.log(err) })  
}
