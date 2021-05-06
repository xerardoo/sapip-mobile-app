import resources from '@/resources';

const incident = {
    namespaced: true,

    state: {
        id: null,
        location: {
            timestamp: 0,
            accuracy: 0,
            longitude: 0,
            latitude: 0
        },
        incident: {
            type_id: null,
            date: null,
            time: null,
            description: '',
            address: '',
            area: '',
            zipcode: '',
            patrol_number: '',
            completed: false,
        },
        user: {},
        personas: [
            // {
            //     first_name: '',
            //     middle_name: '',
            //     last_name: '',
            //     sex: '',
            //     alias: '',
            //     birth_date: '',
            //     nationality: '',
            //     hometown: '',
            //     occupation: '',
            //     photo_front: '',
            //     type_id: '',
            // }
        ],
        vehicles: [
            // {
            //     vin: '',
            //     brand: '',
            //     subbrand: '',
            //     modelo: '',
            //     color: '',
            //     plate: '',
            //     plate_state: '',
            //     origin: '',
            //     use: '',
            //     observations: '',
            //     photo: '',
            // }
        ],
    },

    mutations: {
        SET_INCIDENT_ID(state, id) {
            state.id = id;
        },
        SET_INCIDENT_DATE(state, date) {
            // let datetime = date.split(" ");
            state.incident.date = date;
            // state.incident.time = datetime[1];
        },
        SET_PATROL_NUMBER(state, number) {
            state.incident.patrol_number = number;
        },
        SET_INCIDENT_LOCATION(state, location) {
            state.location = location;
        },
        SET_INCIDENT_USER(state, user) {
            state.user = user;
        },
        SET_INCIDENT_ADDRESS(state, data) {
            state.incident.address = data.address;
            state.incident.area = data.area;
            state.incident.zipcode = data.zipcode;
        },
        SET_INCIDENT_TYPE(state, type_id) {
            state.incident.type_id = type_id;
        },
        SET_INCIDENT_DESCRIPTION(state, description) {
            state.incident.description = description;
        },
        SET_PERSONAS(state, personas) {
            state.personas = personas;
        },
        SET_VEHICLES(state, vehicles) {
            state.vehicles = vehicles;
        },
        CLEAN_INCIDENT(state) {
            state.id = null;
            state.location.timestamp = 0;
            state.location.accuracy = 0;
            state.location.longitude = 0;
            state.location.latitude = 0;

            state.incident.type_id = null;
            state.incident.date = null;
            state.incident.patrol_number = '';
            state.incident.time = null;
            state.incident.description = '';
            state.incident.address = '';
            state.incident.area = '';
            state.incident.zipcode = '';
            state.incident.completed = false;

            state.personas = [];
            state.vehicles = [];
            state.user = {};
        },
    },

    getters: {
        getId: (state) => {
            return state.id;
        },
        getLocation: (state) => {
            return state.location;
        },
        getUser: (state) => {
            return state.user;
        },
        getIncident: (state) => {
            return state.incident;
        },
        getPersonas: (state) => {
            return state.personas;
        },
        getVehicles: (state) => {
            return state.vehicles;
        },
    },

    actions: {
        loadIncident(ctx, data) {
            ctx.commit('SET_INCIDENT_ID', data.id);
            ctx.commit('SET_INCIDENT_DATE', data.date);
            ctx.commit('SET_PATROL_NUMBER', data.patrol_number);
            ctx.commit('SET_INCIDENT_TYPE', data.type_id);
            ctx.commit('SET_INCIDENT_ADDRESS', data);
            ctx.commit('SET_INCIDENT_LOCATION', data.location);
            ctx.commit('SET_INCIDENT_USER', data.user);
            ctx.commit('SET_INCIDENT_DESCRIPTION', data.description);
            ctx.commit('SET_PERSONAS', data.personas);
            ctx.commit('SET_VEHICLES', data.vehicles);

        },
        setLocation(ctx, position) {
            ctx.commit('SET_INCIDENT_LOCATION', position);
        },
        setUser(ctx, user) {
            ctx.commit('SET_INCIDENT_USER', user);
        },
        setType(ctx, date) {
            ctx.commit('SET_INCIDENT_TYPE', date);
        },
        setDate(ctx, date) {
            ctx.commit('SET_INCIDENT_DATE', date);
        },
        setPatrolNumber(ctx, number) {
            ctx.commit('SET_PATROL_NUMBER', number);
        },
        setAddress(ctx, address) {
            ctx.commit('SET_INCIDENT_ADDRESS', address);
        },
        setDescription(ctx, address) {
            ctx.commit('SET_INCIDENT_DESCRIPTION', address);
        },
        setPersonas(ctx, personas) {
            ctx.commit('SET_PERSONAS', personas);
        },
        setVehicles(ctx, vehicles) {
            ctx.commit('SET_VEHICLES', vehicles);
        },
        save: async (ctx) => {
            return await resources.incident.save({
                'date': ctx.state.incident.date,
                'time': ctx.state.incident.time,
                'patrol_number': ctx.state.incident.patrol_number,
                'description': ctx.state.incident.description,
                'address': ctx.state.incident.address,
                'area': ctx.state.incident.area,
                'zipcode': ctx.state.incident.zipcode,
                'type_id': ctx.state.incident.type_id,
                'personas': ctx.state.personas,
                'vehicles': ctx.state.vehicles,
                'location': ctx.state.location,
            });
        },
        cleanIncident(ctx) {
            ctx.commit('CLEAN_INCIDENT');
        },
    },
};
export default incident;
