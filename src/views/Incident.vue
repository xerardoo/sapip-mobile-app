<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 1">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="">
                        <div class="text-right">
                            <span class="badge badge-secondary">FECHA HORA {{form.date | moment("DD-MM-YYYY HH:mm:ss")}}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-7">
                            <b-form-group label="Primer Respondiente">
                                <input type="text" class="form-control"
                                       :value="user.rank+' '+user.first_name+' '+user.last_name" readonly>
                            </b-form-group>
                        </div>
                        <div class="col-5">
                            <b-form-group label="#Unidad">
                                <b-form-input v-model="form.patrol_number" focus></b-form-input>
                            </b-form-group>
                        </div>
                    </div>

                    <div>
                        <b-form-group label="Tipo" label-for="txtType">
                            <b-form-select v-model="form.type_id" :options="types"></b-form-select>
                        </b-form-group>
                    </div>
                    <div>
                        <b-form-group label="Narrativa de los Hechos" label-for="txtDescription">
                            <b-form-textarea id="txtDescription" v-model="form.description" trim rows="5"
                                             focus required></b-form-textarea>
                        </b-form-group>
                    </div>

                    <b-form-group label="Domicilio" label-for="txtAddress">
                        <b-form-input id="txtAddress" v-model="form.address"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Colonia" label-for="txtColonia">
                        <b-form-input id="txtColonia" v-model="form.area"></b-form-input>
                    </b-form-group>
                    <b-form-group label="C.P." label-for="txtCP">
                        <b-form-input id="txtCP" v-model="form.zipcode"></b-form-input>
                    </b-form-group>

                    <!--<b-button type="submit" variant="primary" class="float-right">-->
                    <!--<font-awesome-icon icon="arrow-right"/>-->
                    <!--Siguiente-->
                    <!--</b-button>-->

                    <div class="float next">
                        <b-button type="submit" variant="primary" class="float">
                            <font-awesome-icon icon="arrow-right"/>
                            Sig.
                        </b-button>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import resource from '@/resources'
    import {mapGetters} from 'vuex'

    export default {
        name: "Incident",
        props: ['currentStep'],
        mounted() {
            this.form.date = new Date();
            this.loadIncidentTypes();
            resource.data.GetGeocodingR(this.getLocation)
                .then(res => {
                    if (res.data.length === 0) return;
                    let address = res.data[0]['address_components'];
                    this.form.address = address[1]['long_name'] + ' #' + address[0]['long_name'];
                    this.form.area = address[2]['long_name'];
                    this.form.zipcode = address[6]['long_name'];
                })
        },
        data() {
            return {
                types: [{value: null, text: 'Seleccione'}],
                form: {
                    type_id: null,
                    date: null,
                    patrol_number: '',
                    description: '',
                    address: '',
                    area: '',
                    zipcode: '',
                },
            }
        },
        computed: {
            user() {
                return JSON.parse(localStorage.getItem('adta'))['user'];
            },
            ...mapGetters({
                getLocation: 'incident/getLocation',
            }),
            getNow() {
                let today = new Date();
                let day = today.getDate();
                let month = today.getMonth() + 1;
                let hours = today.getHours();
                let minutes = today.getMinutes();
                let seconds = today.getSeconds();

                let date = (day < 10 ? '0' + day : day) + '-' +
                    (month < 10 ? '0' + month : month) + '-' +
                    today.getFullYear();
                let time = (hours < 10 ? '0' + hours : hours) + ":" +
                    (minutes < 10 ? '0' + minutes : minutes) + ":" +
                    (seconds < 10 ? '0' + seconds : seconds);
                return date + ' ' + time;
            },
        },
        methods: {
            loadIncidentTypes() {
                resource.data.getIncidentTypes()
                    .then(res => res.data.forEach(item => this.types.push({value: item.id, text: item.name})))
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.form);
            },
        }
    }
</script>

<style scoped>

    .my-float {
        /*margin-top: 15px;*/
        cursor: pointer;
    }
</style>