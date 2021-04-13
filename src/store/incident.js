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
        personas: {
            firstName: '',
            lastName: '',
            completed: false,
        },
        vehicles: {
            vin: '',
            brand: '',
            completed: false,
        },
    },

    mutations: {
        SET_INCIDENT_ID(state, id) {
            state.id = id;
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
            state.incident = description;
        },
        // SET_REFERENCE(state, reference) {
        //     state.reference = reference;
        // },
        // SET_CASH_AMOUNT(state, cash) {
        //     state.amounts.cash = cash;
        // },
        // SET_CARD_AMOUNT(state, card) {
        //     state.amounts.card = card;
        // },
        // SET_CHECK_AMOUNT(state, check) {
        //     state.amounts.check = check;
        // },
        // SET_VOUCHER_AMOUNT(state, voucher) {
        //     state.amounts.voucher = voucher;
        // },
        // SET_CART_STATUS(state, status) {
        //     state.status = status;
        // },
        // SET_CART_STEP(state, step) {
        //     state.step = step;
        // },
        // FETCH_CART(state) {
        //     return state.items;
        // },
        // PUSH_CART(state, item) {
        //     state.items.push(item);
        // },
        // INCREMENT_ITEM_QTY(state, cartItem) {
        //     cartItem.qty++;
        // },
        // EMPTY_CART(state) {
        //     state.items = [];
        // },
        // SET_CART(state, items) {
        //     state.items = items;
        // },
        // SET_MODIFIER_MULTIPLE(state, {idx, multiple}) {
        //     state.items[idx]['modifiers_selected'].multiple = multiple;
        // },
        // SET_MODIFIER_EXCEPTION(state, {idx, exception}) {
        //     state.items[idx]['modifiers_selected'].exception = exception;
        // },
        // SET_MODIFIER_UNIQUE(state, {idx, unique}) {
        //     state.items[idx]['modifiers_selected'].unique = unique;
        // },
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
        // getCustomerId: (state) => {
        //     return state.customer_id;
        // },
        // getItems: (state) => {
        //     return state.items;
        // },
        // getItemsLength: (state) => {
        //     return state.items.length;
        // },
        // getSubtotal: (state) => {
        //     return state.subtotal;
        // },
        // getDiscounts: (state) => {
        //     return state.discounts;
        // },
        // getTaxes: (state) => {
        //     return state.taxes_after_discount;
        // },
        // getTotal: (state) => {
        //     return state.total;
        // },
        // getserviceTypeId: (state) => {
        //     return state.service_type_id;
        // },
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
        setAddress(ctx, address) {
            ctx.commit('SET_INCIDENT_ADDRESS', address);
        },
        setDescription(ctx, address) {
            ctx.commit('SET_INCIDENT_DESCRIPTION', address);
        },
        // addItem(ctx, item) {
        //     // const cartItem = ctx.state.items.find((i) => i.menu_item_id === item.menu_item_id);
        //     // if (!cartItem) ctx.commit('PUSH_CART', item);
        //     // else ctx.commit('INCREMENT_ITEM_QTY', cartItem);
        //     ctx.commit('PUSH_CART', item);
        //     ctx.commit('CALCULATE_CART');
        // },
        // setItemModifierMulti(ctx, {idx, modifiers}) {
        //     ctx.commit('SET_MODIFIER_MULTIPLE', {idx: idx, multiple: modifiers});
        //     ctx.commit('CALCULATE_CART');
        // },
        // setItemModifierExcept(ctx, {idx, modifiers}) {
        //     ctx.commit('SET_MODIFIER_EXCEPTION', {idx: idx, exception: modifiers});
        //     ctx.commit('CALCULATE_CART');
        // },
        // setItemModifierUnique(ctx, {idx, modifiers}) {
        //     ctx.commit('SET_MODIFIER_UNIQUE', {idx: idx, unique: modifiers});
        //     ctx.commit('CALCULATE_CART');
        // },
        // setItemModifier(ctx, {idx, multi, except, unique}) {
        //     ctx.commit('SET_MODIFIER_MULTIPLE', {idx: idx, multiple: multi});
        //     ctx.commit('SET_MODIFIER_EXCEPTION', {idx: idx, exception: except});
        //     ctx.commit('SET_MODIFIER_UNIQUE', {idx: idx, unique: unique});
        //     ctx.commit('CALCULATE_CART');
        // },
        // fetchItems({commit}) {
        //     return commit('FETCH_CART');
        // },
        // calculateCart({commit}) {
        //     commit('CALCULATE_CART');
        // },
        // sendOrder: async (ctx, data) => {
        //     if (status !== 'pending') ctx.commit('SET_CART_STATUS', data.status);
        //     ctx.commit('SET_CART_STEP', data.step);
        //     return await apiCalls.pos.order({
        //         id: ctx.state.id,
        //         reference: ctx.state.reference,
        //         status: ctx.state.status,
        //         step: ctx.state.step,
        //         items: ctx.state.items,
        //         subtotal: ctx.state.subtotal,
        //         discounts: ctx.state.discounts,
        //         taxes: ctx.state.taxes,
        //         total: ctx.state.total,
        //         customer_id: ctx.state.customer_id,
        //         service_type_id: ctx.state.service_type_id,
        //     });
        // },
        save: async (ctx, data) => {
            return await resources.incident.save({data: data});
        },
        // cleanOrder(ctx) {
        //     ctx.commit('CLEAN_CART');
        // },
        // setCustomer(ctx, {name, id}) {
        //     ctx.commit('SET_CUSTOMER', name);
        //     ctx.commit('SET_CUSTOMER_ID', id);
        // },
        // setServiceTypeId(ctx, service_type_id) {
        //     ctx.commit('SET_SERVICE_TYPE_ID', service_type_id);
        // },
    },
};
export default incident;
