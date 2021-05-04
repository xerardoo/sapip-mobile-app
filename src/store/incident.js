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
            completed: false,
        },
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
        SET_INCIDENT_LOCATION(state, location) {
            state.location = location;
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
        // CLEAN_CART(state) {
        //     state.id = null;
        //     state.customer_id = null;
        //     state.customer = '';
        //     state.status = 'pending';
        //     state.step = 'in_line';
        //     state.items = [];
        //     state.taxes = 0;
        //     state.taxes_after_discount = 0;
        //     state.discounts = 0;
        //     state.subtotal = 0;
        //     state.total = 0;
        //     state.getserviceTypeId = null;
        // },
    },

    getters: {
        getId: (state) => {
            return state.id;
        },
        getLocation: (state) => {
            return state.location;
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
            ctx.commit('SET_INCIDENT_TYPE', data.type_id);
            ctx.commit('SET_INCIDENT_ADDRESS', data);
            ctx.commit('SET_INCIDENT_LOCATION', data.location);
            ctx.commit('SET_INCIDENT_DESCRIPTION', data.description);
            ctx.commit('SET_PERSONAS', data.personas);
            ctx.commit('SET_VEHICLES', data.vehicles);

        },
        setLocation(ctx, position) {
            ctx.commit('SET_INCIDENT_LOCATION', position);
        },
        setType(ctx, date) {
            ctx.commit('SET_INCIDENT_TYPE', date);
        },
        setDate(ctx, date) {
            ctx.commit('SET_INCIDENT_DATE', date);
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
        // cleanOrder(ctx) {
        //     ctx.commit('CLEAN_CART');
        // },
    },
};
export default incident;
