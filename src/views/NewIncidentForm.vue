<template>
    <div class="">
        <b-progress height="8px" :value="currentStep" max="4" class="mb-2"></b-progress>
        <div class="d-flex justify-content-center mb-4">
            <b-button squared size="sm" @click.prevent="goToStep(1)" :pressed="currentStep == 1">
                <b-badge pill variant="light">1</b-badge>
                Datos
            </b-button>
            <b-button squared size="sm" @click.prevent="goToStep(2)" :pressed="currentStep == 2">
                <b-badge pill variant="light">2</b-badge>
                Involucrados
            </b-button>
            <b-button squared size="sm" @click.prevent="goToStep(3)" :pressed="currentStep == 3">
                <b-badge pill variant="light">3</b-badge>
                Veh&iacute;culos
            </b-button>
            <b-button squared size="sm" @click.prevent="goToStep(4)" :pressed="currentStep == 4">
                <b-badge pill variant="light">4</b-badge>
                Resumen
            </b-button>
        </div>

        <incident @submit="stepOneSubmit" :current-step="currentStep" v-if="viewCreated"/>
        <person @submit="stepTwoSubmit" :current-step="currentStep" v-if="viewCreated"/>
        <vehicle @submit="stepThreeSubmit" :current-step="currentStep" v-if="viewCreated"/>
        <resume @submit="stepFourSubmit" :current-step="currentStep" v-if="viewCreated"/>
    </div>
</template>

<script>

    import Incident from './Incident'
    import Person from './Person'
    import Vehicle from './Vehicle'
    import Resume from './Resume'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'NewIncident',
        components: {
            Vehicle,
            Incident,
            Person,
            Resume,
        },
        created() {
            if (!("geolocation" in navigator))
                this.$bvToast.toast('Geolocalizacion no esta disponible', this.$toastError);

            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setLocation({
                        accuracy: position['coords'].accuracy,
                        longitude: position['coords'].longitude,
                        latitude: position['coords'].latitude,
                        timestamp: position['timestamp'],
                    });
                    this.viewCreated = true;
                }, err => this.$bvToast.toast(err.message, this.$toastError));
        },
        data() {
            return {
                viewCreated: false,
                currentStep: 1,
                incident: {
                    completed: false,
                },
                personas: {
                    completed: false,
                },
                vehicles: {
                    completed: false,
                },
            }
        },
        computed: {
            ...mapGetters({
                location: 'incident/getLocation',
            }),
            currentStepStyle() {
                switch (this.currentStep) {
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        return 'outline-dark';
                    default:
                        return 'dark';
                }
            }
        },
        methods: {
            ...mapActions({
                setLocation: 'incident/setLocation',
                setDate: 'incident/setDate',
                setPatrolNumber: 'incident/setPatrolNumber',
                setType: 'incident/setType',
                setDescription: 'incident/setDescription',
                setAddress: 'incident/setAddress',
                setPersonas: 'incident/setPersonas',
                setVehicles: 'incident/setVehicles',
                saveIncident: 'incident/save',
            }),
            goToStep: function (step) {
                this.currentStep = step;
            },
            stepOneSubmit(data) {
                this.setDate(this.$moment(data.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("DD-MM-YYYY HH:mm:ss"));
                this.setType(data.type_id);
                this.setPatrolNumber(data.patrol_number);
                this.setDescription(data.description);
                this.setAddress({
                    address: data.address,
                    area: data.area,
                    zipcode: data.zipcode,
                });
                this.goToStep(2);
                this.incident.completed = true;
            },
            stepTwoSubmit(personas) {
                this.setPersonas(personas);
                this.goToStep(3);
                this.personas.completed = true;
            },
            stepThreeSubmit(vehicles) {
                this.setVehicles(vehicles);
                this.goToStep(4);
                this.vehicles.completed = true;
            },
            stepFourSubmit() {
                if (!this.incident.completed) return this.goToStep(1);
                if (!this.personas.completed) return this.goToStep(2);
                // if (!this.vehicles.completed) return this.goToStep(3);
                if (!this.location.longitude && !this.location.latitude) return;

                this.saveIncident().then(() => this.$bvModal.msgBoxOk('Incidente Guardado'));
            },
        }
    }
</script>
