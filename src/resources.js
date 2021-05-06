import Vue from "vue";
import axios from 'axios';
import router from './router';
// import NProgress from 'nprogress/nprogress';
// import 'nprogress/nprogress.css';


// NProgress.configure({showSpinner: false});
//
axios.interceptors.request.use(function (config) {
    const session = localStorage.getItem('adta') ? JSON.parse(localStorage.getItem('adta')) : '';
    config.headers['X-Token'] = session ? `${session.token}` : '';
    // NProgress.start();
    return config;
});

axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // NProgress.done();
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log(error.response.data);
        // console.log(error.response.headers);
        // NProgress.done();
        console.log(error.response.status);

        const vm = new Vue();
        let status = error.response.status;
        switch (status) {
            case 401:
                // location.href = "/";
                localStorage.removeItem('adta');
                router.push('/');
                break;
            case 500:
                break;
        }
        if (status !== 404)
            vm.$bvToast.toast(`ERROR ${status}: ${error.response.data.msg}`, Vue.prototype.$toastError);

        return Promise.reject(error);
    }
);

export default {
    auth: {
        async signin(data) {
            return await axios.post(`/signin`, data);
        },
    },
    incident: {
        async save(data) {
            return await axios.post(`/incident`, JSON.stringify(data));
        },
        async get(id, config = {}) {
            return await axios.get(`/incident/${id}`, config);
        },
    },
    data: {
        GetGeocodingR(location) {
            return axios.post(`/data/geocodingr`, location);
        },
        getIncidentTypes() {
            return axios.get(`/data/incident-types`);
        },
        getPersonTypes() {
            return axios.get(`/data/persona-types`);
        },
    },
    audit: {
        session(id) {
            return axios.post(`/meta/session/${id}`);
        },
    },
};
