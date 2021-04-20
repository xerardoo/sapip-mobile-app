<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 2">
            <div class="card mb-1" v-for="(p, index) in persons" :key="index">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8 col-12">
                            <div>
                                <b-form-group label="Nombre" label-for="txtFirstName">
                                    <b-form-input id="txtFirstName" v-model="p.firstName" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Apellido" label-for="txtLastName">
                                    <b-form-input id="txtLastName" v-model="p.lastName" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <div class="form-group col-8">
                                    <label for="birthdate">Fecha Nacimiento (Mes-D&iacute;a-Año)</label>
                                    <input class="form-control" type="date" placeholder="DD-MM-AAAA" id="birthdate"
                                           v-model="p.birthDate"
                                           pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}">
                                </div>
                                <div class="form-group col-4">
                                    <label for="age">Edad</label>
                                    <input class="form-control" type="text" placeholder="-" id="age"
                                           :value="calculateAge(p.birthDate)" readonly>
                                </div>
                            </div>
                            <div>
                                <b-form-group label="Lugar de Origen" label-for="txtHomeTown">
                                    <b-form-input id="txtHomeTown" v-model="p.homeTown" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Ocupación" label-for="txtOcupation">
                                    <b-form-input id="txtOcupation" v-model="p.occupation" trim></b-form-input>
                                </b-form-group>
                            </div>

                        </div>
                        <div class="col-md-4 col-12">
                            <b-img thumbnail fluid center :src="p.photo" class="photo" blank-color="#777"
                                   :blank="!p.photo"></b-img>

                            <div class="mt-1 text-center">
                                <label :for="'camera-'+index" class="btn btn-outline-secondary">
                                    <font-awesome-icon class="my-float" size="2x" icon="camera"/>
                                    Frente
                                </label>
                                <input :ref="'camera-'+index" :id="'camera-'+index" class="camera" type="file"
                                       accept="image/*"
                                       capture="camera" @change="cameraChange($event ,index)">
                            </div>

                            <div>
                                <b-form-group label="Tipo" label-for="txtType">
                                    <b-form-select :options="types"></b-form-select>
                                </b-form-group>
                            </div>
                        </div>
                    </div>
                    <b-button type="button" size="sm" variant="outline-secondary" @click.prevent="addPearson"
                              v-if="persons.length===index+1">
                        <font-awesome-icon icon="plus"/>
                        Involucrado
                    </b-button>
                </div>
            </div>

            <!--<b-button type="submit" variant="primary" class="float-right mt-2">-->
            <!--<font-awesome-icon icon="arrow-right"/>-->
            <!--Siguiente-->
            <!--</b-button>-->

            <div class="float next">
                <b-button type="submit" variant="primary" class="float">
                    <font-awesome-icon icon="arrow-right"/>
                    Sig.
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    //require(`@/assets/icons/camera-96.png`)
    export default {
        name: "Person",
        props: ['currentStep'],
        data() {
            return {
                types:[],
                persons: [{
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    homeTown: '',
                    occupation: '',
                    photo: '',
                }],
                // form: {
                //     firstName: '',
                //     lastName: '',
                // },
            }
        },
        computed: {},
        methods: {
            calculateAge(dob) {
                dob = new Date(dob);
                let diff_ms = Date.now() - dob.getTime();
                let age_dt = new Date(diff_ms);
                let age = Math.abs(age_dt.getUTCFullYear() - 1970);
                return age > 0 ? Math.abs(age_dt.getUTCFullYear() - 1970) : '';
            },
            cameraChange(ev, index) {
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.onloadstart = () => this.$emit('spinner', true);
                reader.onload = e => this.save(index, e.target.result);
                // reader.onloadend = () => this.$emit('spinner', false);
                reader.readAsDataURL(file);
            },
            addPearson() {
                this.persons.push({
                    firstName: '',
                    lastName: '',
                    photo: '',
                });
            },
            save(index, data) {
                this.persons[index]['photo'] = data;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.persons);
            },
        }
    }
</script>

<style scoped>

    img.photo {
        min-height: 150px;
        min-width: 150px;
        max-height: 150px;
        max-width: 150px;
    }

    input[type="file"].camera {
        display: none;
    }

    .my-float {
        /*margin-top: 15px;*/
        cursor: pointer;
    }
</style>