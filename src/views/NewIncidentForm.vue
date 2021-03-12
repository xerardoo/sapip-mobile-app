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
                Personas
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

        <incident @submit="stepOneSubmit" :current-step="currentStep"/>
        <person @submit="stepTwoSubmit" :current-step="currentStep"/>
        <vehicle @submit="stepThreeSubmit" :current-step="currentStep"/>
        <resume @submit="stepFourSubmit" :current-step="currentStep"/>
    </div>
</template>

<script>

    import Incident from './Incident'
    import Person from './Person'
    import Vehicle from './Vehicle'
    import Resume from './Resume'

    export default {
        name: 'NewIncident',
        components: {
            Vehicle,
            Incident,
            Person,
            Resume,
        },
        data() {
            return {
                currentStep: 1,
                location: {
                    lat: 0,
                    long: 0
                },
                incident: {
                    description: '',
                    type: '',
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
            }
        },
        computed: {
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
            goToStep: function (step) {
                this.currentStep = step;
            },
            stepOneSubmit(data) {
                this.incident.description = data.description;
                this.goToStep(2);
                this.incident.completed = true;
            },
            stepTwoSubmit() {
                this.goToStep(3);
                this.personas.completed = true;
            },
            stepThreeSubmit() {
                this.goToStep(4);
                this.vehicles.completed = true;
            },
            stepFourSubmit() {
                if (!this.incident.completed) return this.goToStep(1);
                if (!this.personas.completed) return this.goToStep(2);
                if (!this.vehicles.completed) return this.goToStep(3);
                alert("Save")
            },
        }
    }
</script>
