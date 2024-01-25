import axios from "axios";

const AUTH_URL = `${import.meta.env.VITE_SERVER_URL}/auth`;

const AuthService = {
    register: function(username, password){
        const res = axios.post(AUTH_URL + '/register', JSON.stringify({username, password}), {headers: { 'Content-Type': 'application/json' }});
        return res;
    },
    login: function(username, password){
        const res = axios.post(AUTH_URL + '/login', JSON.stringify({username, password}), {headers: { 'Content-Type': 'application/json' }});
        return res;
    },
    verify: function(accessToken){
        const res = axios.post(AUTH_URL + '/verify', JSON.stringify({ accessToken: accessToken }), {headers: { 'Content-Type': 'application/json' }});
        return res;
    }
};

export default AuthService;