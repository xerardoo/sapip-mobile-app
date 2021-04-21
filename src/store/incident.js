import resources from '@/resources';

const incident = {
    namespaced: true,

    state: {
        id: null,
        geolocation: {
            timestamp: 0,
            accuracy: 0,
            longitude: 0,
            latitude: 0
        },
        incident: {
            type_id: null,
            date: null,
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
            {
                // vin: '',
                // brand: '',
                // subbrand: '',
                // modelo: '',
                // color: '',
                // plate: '',
                // plate_state: '',
                // origin: '',
                // use: '',
                // observations: '',
                // photo: '',
            }
        ],
    },

    mutations: {
        SET_INCIDENT_ID(state, id) {
            state.id = id;
        },
        SET_INCIDENT_DATE(state, date) {
            state.incident.date = date;
        },
        SET_LOCATION(state, position) {
            state.geolocation.accuracy = position['coords'].accuracy;
            state.geolocation.longitude = position['coords'].longitude;
            state.geolocation.latitude = position['coords'].latitude;
            state.geolocation.timestamp = position['timestamp'];
        },
        SET_INCIDENT_ADDRESS(state, data) {
            state.incident.address = data.address;
            state.incident.area = data.area;
            state.incident.zipcode = data.zipcode;
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
        getGeolocation: (state) => {
            return state.geolocation;
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
        // load(ctx, data) {
        //     ctx.commit('SET_CART_ID', data.id);
        //     ctx.commit('SET_REFERENCE', data.reference);
        //     ctx.commit('SET_CUSTOMER_ID', data.customer_id);
        //     ctx.commit(
        //         'SET_CUSTOMER',
        //         data.customer_id !== 0 ? data.customer.first_name + ' ' + data.customer.last_name : null
        //     );
        //     ctx.commit('SET_CART_STATUS', data.status);
        //     ctx.commit('SET_SERVICE_TYPE_ID', data.service_type_id);
        //     ctx.commit('SET_CART_STEP', data.order_step.name);
        //     data.items.forEach((item) => ctx.dispatch('addItem', item));
        //     // ctx.commit('CALCULATE_CART');
        // },
        setGeolocation(ctx, position) {
            ctx.commit('SET_LOCATION', position);
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
        save: async (ctx, data) => {
            return await resources.incident.save({data: data});
        },
        // cleanOrder(ctx) {
        //     ctx.commit('CLEAN_CART');
        // },
    },
};
export default incident;
