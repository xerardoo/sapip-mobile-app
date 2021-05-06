<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 2">
            <div class="card mb-3" v-for="(p, index) in personas" :key="index">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <h5 class="bg-secondary text-center text-white pt-1 pb-1">Persona 0{{index +1}}</h5>
                            <b-img thumbnail fluid center :src="p.photo_front" class="photo" blank-color="#777"
                                   :blank="!p.photo_front"></b-img>

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
                                    <b-form-select :options="types" v-model="p.type_id" required></b-form-select>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Sexo">
                                    <b-form-radio v-model="p.sex" value="M"> Masculino
                                    </b-form-radio>
                                    <b-form-radio v-model="p.sex" value="F"> Femenino
                                    </b-form-radio>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Nacionalidad">
                                    <b-form-radio v-model="p.nationality" value="M"> Mexicana
                                    </b-form-radio>
                                    <b-form-radio v-model="p.nationality" value="E"> Extranjera
                                    </b-form-radio>
                                </b-form-group>
                            </div>

                        </div>
                        <div class="ol-md-8 ccol-12 ">
                            <div>
                                <b-form-group label="Nombre(s)" label-for="txtFirstName">
                                    <b-form-input id="txtFirstName" v-model="p.first_name" trim required></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Primer Apellido" label-for="txtMiddleName">
                                    <b-form-input id="txtMiddleName" v-model="p.middle_name" trim
                                                  required></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Segundo Apellido" label-for="txtLastName">
                                    <b-form-input id="txtLastName" v-model="p.last_name" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Alias" label-for="txtAlias">
                                    <b-form-input id="txtAlias" v-model="p.alias" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Ocupación" label-for="txtOcupation">
                                    <b-form-input id="txtOcupation" v-model="p.occupation" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <div class="form-group col-8">
                                    <label for="birthdate">Fecha Nacimiento </label>
                                    <!--<input class="form-control" type="date" placeholder="DD-MM-AAAA" id="birthdate"-->
                                    <!--v-model="p.birth_date"-->
                                    <!--pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}">-->
                                    <date-picker id="birthdate" v-model="p.birth_date" valueType="format"
                                                 :editable="editable" format="DD-MM-YYYY" input-class="form-control"
                                                 placeholder="DD-MM-AAAA" lang="es"/>
                                </div>
                                <div class="form-group col-4">
                                    <label for="age">Edad</label>
                                    <input class="form-control" type="text" placeholder="-" id="age"
                                           :value="calculateAge(p.birth_date)" readonly>
                                </div>
                            </div>
                            <div>
                                <b-form-group label="Lugar de Origen" label-for="txtHomeTown">
                                    <b-form-input id="txtHomeTown" v-model="p.hometown" trim></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                    </div>
                    <b-button type="button" size="sm" variant="outline-secondary" @click.prevent="addPearson"
                              v-if="personas.length===index+1">
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
    import resource from '@/resources'
    import Compressor from 'compressorjs'

    export default {
        name: "Person",
        props: ['currentStep'],
        mounted() {
            this.loadIPersonTypes();
        },
        data() {
            return {
                editable: true,
                open: true,
                types: [],
                personas: [{
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    alias: '',
                    sex: '',
                    nationality: '',
                    birth_date: '',
                    hometown: '',
                    occupation: '',
                    photo_front: '',
                    type_id: '',
                }],
            }
        },
        computed: {},
        methods: {
            loadIPersonTypes() {
                resource.data.getPersonTypes()
                    .then(res => res.data.forEach(item => this.types.push({value: item.id, text: item.name})))
            },
            calculateAge(dob) {
                dob = new Date(dob);
                let diff_ms = Date.now() - dob.getTime();
                let age_dt = new Date(diff_ms);
                let age = Math.abs(age_dt.getUTCFullYear() - 1970);
                return age > 0 ? Math.abs(age_dt.getUTCFullYear() - 1970) : '';
            },
            cameraChange(ev, index) {
                let self = this;
                const file = ev.target.files[0];
                if (!file) return;

                new Compressor(file, {
                    strict: false,
                    drew(context, canvas) {
                        context.fillStyle = '#ffffff';
                        context.font = '2rem serif';
                        context.fillText('DSPM', (canvas.width / 2) - 20, canvas.height / 2);
                    },
                    quality: 0.2,
                    success(result) {
                        const reader = new FileReader();
                        reader.onloadstart = () => self.$emit('spinner', true);
                        reader.onload = e => self.save(index, e.target.result);
                        // reader.onloadend = () => this.$emit('spinner', false);
                        reader.readAsDataURL(result);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            },
            addPearson() {
                this.personas.push({
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    alias: '',
                    sex: '',
                    nationality: '',
                    birth_date: '',
                    hometown: '',
                    occupation: '',
                    photo_front: '',
                    type_id: '',
                });
            },
            save(index, data) {
                this.personas[index]['photo_front'] = data;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.personas);
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