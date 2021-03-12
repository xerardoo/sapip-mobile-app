import Vue from 'vue'
import VueRouter from 'vue-router'
import NewIncidentForm from '../views/NewIncidentForm'
import IncidentsList from '../views/IncidentsList'
import Login from '../views/Login'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
        title: '',
        ico: 'clipboard',
    }
},{
    path: '/incidents',
    name: 'Incidents',
    component: IncidentsList,
    meta: {
        title: 'Incidentes',
        ico: 'clipboard',
    }
}, {
    path: '/new-incident',
    name: 'NewIncident',
    component: NewIncidentForm,
    meta: {
        title: 'Crear Incidente',
        ico: 'clipboard',
    }
}];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
