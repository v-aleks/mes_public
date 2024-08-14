import axios from 'axios';

const getCSRFTokenFromCookie = () => {
    const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
    return cookieValue ? cookieValue[1] : null;
};

axios.interceptors.request.use(
    config => {
        const token = getCSRFTokenFromCookie();
        if (token) {
            config.headers['X-CSRFToken'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;