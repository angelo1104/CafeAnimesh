import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-18-236-100-251.us-west-2.compute.amazonaws.com:9000/api/v1'
})

export default instance;

// http://ec2-18-236-100-251.us-west-2.compute.amazonaws.com:9000/api/v1