<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 4|| currentStep == 0">
            <div class="card mb-4">
                <div class="card-body pt-0">
                    <h5 class="card-title text-center">
                        Informe de Incidente <br>
                        <small class="text-center">Fecha {{incident.date | moment("DD-MM-YYYY HH:mm:ss")}}</small>
                        <br>
                        <small class="text-muted" v-if="currentStep == 4">(Vista Preliminar)</small>
                    </h5>

                    <div class="card">
                        <div class="card-header bg-dark text-white" v-b-toggle.accordion-primer>
                            PRIMER RESPONDIENTE
                        </div>
                        <b-collapse id="accordion-primer" accordion="primer" role="tabpanel">
                            <div class="">
                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Grado/Cargo</th>
                                        <th>#Placa</th>
                                        <th>#Unidad</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td v-if="id">{{user.rank}}</td>
                                        <td v-else>{{session.user.rank}}</td>
                                        <td v-if="id">{{user.badge_number}}</td>
                                        <td v-else>{{session.user.badge_number}}</td>
                                        <td>{{incident.patrol_number}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Nombre</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td v-if="id">{{user.first_name}} {{user.last_name}}</td>
                                        <td v-else>{{session.user.first_name}} {{session.user.last_name}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </b-collapse>
                    </div>


                    <div class="card mt-1">
                        <div class="card-header bg-dark text-white" v-b-toggle.accordion-address>
                            LUGAR DE LA INTERVENCI&Oacute;N
                        </div>
                        <b-collapse id="accordion-address" accordion="address" role="tabpanel">
                            <div class="">

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Domicilio</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{incident.address}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Colonia</th>
                                        <th>C&oacute;digo Postal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{incident.area}}</td>
                                        <td>{{incident.zipcode}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Latitud</th>
                                        <th>Longitud</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{location.latitude | rounded(4)}}</td>
                                        <td>{{location.longitude | rounded(4)}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </b-collapse>
                    </div>


                    <div class="card mt-1">
                        <div class="card-header bg-dark text-white" v-b-toggle.accordion-description>
                            NARRATIVA DE LOS HECHOS
                        </div>
                        <b-collapse id="accordion-description" accordion="description" role="tabpanel">
                            <div class="card-body text-prewrap text-justify">
                                {{incident.description}}
                            </div>
                        </b-collapse>
                    </div>

                    <div class="card mt-1">
                        <div class="card-header bg-dark text-white" v-b-toggle.accordion-personas>
                            INVOLUCRADOS ({{personas.length}})
                        </div>
                        <b-collapse id="accordion-personas" accordion="personas" role="tabpanel">
                            <div class="" v-for="(p, index) in personas" :key="index">
                                <h6 class="bg-secondary text-center text-white pt-1 pb-1 mb-0">
                                    <!--Persona 0{{index +1}} - {{getType(p.type_id).name}}-->
                                </h6>

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Primer Apellido</th>
                                        <th>Segundo Apellido</th>
                                        <th>Nombre(s)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-capitalize">{{p.middle_name}}</td>
                                        <td class="text-capitalize">{{p.last_name}}</td>
                                        <td class="text-capitalize">{{p.first_name}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Alias</th>
                                        <th>Nacionalidad</th>
                                        <th>Sexo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-capitalize">{{p.alias}}</td>
                                        <td>{{getNationality(p.nationality)}}</td>
                                        <td>{{getSex(p.sex)}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div class="row">
                                    <div class="col-md-4 col-12 pr-md-0">
                                        <b-img thumbnail fluid center :src="p.photo_front" class="photo"
                                               blank-color="#777"
                                               :blank="!p.photo_front"></b-img>
                                    </div>
                                    <div class="col-md-8 col-12 pl-md-0">
                                        <table class="table table-bordered mb-0">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>Fecha Nacimiento (MM/DD/AAAA)</th>
                                                <th>Edad</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{{p.birth_date}}</td>
                                                <td>{{getAge(p.birth_date)}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table class="table table-bordered mb-0">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>Ocupaci&oacute;n</th>
                                                <th>Lugar de Origen</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-capitalize">{{p.occupation}}</td>
                                                <td class="text-capitalize">{{p.hometown}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        </b-collapse>
                    </div>


                    <div class="card mt-1">
                        <div class="card-header bg-dark text-white" v-b-toggle.accordion-vehicles>
                            VEH&Iacute;CULOS ({{vehicles.length}})
                        </div>
                        <b-collapse id="accordion-vehicles" accordion="vehicles" role="tabpanel">
                            <div class="" v-for="(v, index) in vehicles" :key="index">
                                <h6 class="bg-secondary text-center text-white pt-1 pb-1 mb-0">
                                    Veh&iacute;culo 0{{index +1}}
                                </h6>
                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>#Serie</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-uppercase">{{v.vin}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Marca</th>
                                        <th>SubMarca</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-capitalize">{{v.brand}}</td>
                                        <td class="text-capitalize">{{v.subbrand}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered mb-0">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Modelo</th>
                                        <th>Color</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-capitalize">{{v.modelo}}</td>
                                        <td class="text-capitalize">{{v.color}}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div class="row">
                                    <div class="col-md-4 col-12 pr-md-0">
                                        <b-img thumbnail fluid center :src="v.photo" class="photo" blank-color="#777"
                                               :blank="!v.photo"></b-img>
                                    </div>
                                    <div class="col-md-8 col-12 pl-md-0">
                                        <table class="table table-bordered mb-0">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>#Placa</th>
                                                <th>Estado</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{{v.plate}}</td>
                                                <td>{{v.plate_state}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table class="table table-bordered mb-0">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>Origen</th>
                                                <th>Uso</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{{getOrigin(v.origin)}}</td>
                                                <td>{{v.use_type}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table class="table table-bordered mb-0">
                                            <thead class="thead-light">
                                            <tr>
                                                <th>Observaciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-capitalize text-prewrap">{{v.observations}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>
                    </div>


                    <b-button type="submit" variant="primary" class="float-right mt-3 mb-3" v-if="currentStep == 4">
                        <font-awesome-icon icon="save"/>
                        Guardar
                    </b-button>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import resource from '@/resources'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Resume",
        props: ['currentStep'],
        created() {
            this.id = this.$route.params['id'];
            if (this.id)
                resource.incident.get(this.id)
                    .then(res => this.loadIncident(res.data));
        },
        mounted() {
            this.loadIPersonTypes();
        },
        computed: {
            session() {
                return JSON.parse(localStorage.getItem('adta'));
            },
            ...mapGetters({
                location: 'incident/getLocation',
                incident: 'incident/getIncident',
                personas: 'incident/getPersonas',
                vehicles: 'incident/getVehicles',
                user: 'incident/getUser',
            }),
        },
        data() {
            return {
                id: null,
                types: [],
            }
        },
        methods: {
            ...mapActions({
                loadIncident: 'incident/loadIncident',
                cleanIncident: 'incident/cleanIncident',
            }),
            loadIPersonTypes() {
                resource.data.getPersonTypes()
                    .then(res => this.types = res.data);
            },
            getType(id) {
                return this.types.find(x => x.id === id)
            },
            getAge(dob) {
                dob = new Date(dob);
                let diff_ms = Date.now() - dob.getTime();
                let age_dt = new Date(diff_ms);
                let age = Math.abs(age_dt.getUTCFullYear() - 1970);
                return age > 0 ? Math.abs(age_dt.getUTCFullYear() - 1970) : '';
            },
            getNationality(nationality) {
                switch (nationality) {
                    case 'M':
                        return 'Mexicana';
                    case 'E':
                        return 'Extranjera';
                }
            },
            getSex(sex) {
                switch (sex) {
                    case 'M':
                        return 'Masculino';
                    case 'F':
                        return 'Femenino';
                }
            },
            getOrigin(sex) {
                switch (sex) {
                    case 'N':
                        return 'Nacional';
                    case 'E':
                        return 'Extranjero';
                }
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit');
            },
        },
        destroyed() {
            this.id = null;
            this.cleanIncident();
        },
    }
</script>

<style scoped>
    .text-prewrap {
        white-space: pre-line;
    }

    img.photo {
        min-height: 170px;
        min-width: 170px;
        max-height: 200px;
        max-width: 200px;
    }

</style>