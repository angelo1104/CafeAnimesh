import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://radiant-bastion-41814.herokuapp.com/api/v1'
})

export default instance;

// http://ec2-18-236-100-251.us-west-2.compute.amazonaws.com:9000/api/v1