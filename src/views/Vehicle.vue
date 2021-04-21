<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 3">
            <div class="card mb-3" v-for="(v, index) in vehicles" :key="index">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <h5 class="bg-secondary text-center text-white pt-1 pb-1">Veh&iacute;culo 0{{index +1}}</h5>
                            <b-img thumbnail fluid center :src="v.photo" class="photo" blank-color="#777"
                                   :blank="!v.photo"></b-img>
                            <div class="mt-1 text-center">
                                <label :for="'camera-'+index" class="btn btn-outline-secondary">
                                    <font-awesome-icon class="my-float" size="2x" icon="camera"/>
                                    Frontal
                                </label>
                                <input :ref="'camera-'+index" :id="'camera-'+index" class="camera" type="file"
                                       accept="image/*"
                                       capture="camera" @change="cameraChange($event ,index)">
                            </div>
                            <div>
                                <b-form-group label="Uso" label-for="txtUseType">
                                    <b-form-select :options="use_types" v-model="v.use_type" required></b-form-select>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Procedencia">
                                    <b-form-radio v-model="v.origin" value="N"> Nacional
                                    </b-form-radio>
                                    <b-form-radio v-model="v.origin" value="E"> Extranjero
                                    </b-form-radio>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="col-md-8 col-12">
                            <div>
                                <b-form-group label="#Serie" label-for="txtSerie">
                                    <b-form-input id="txtSerie" v-model="v.vin" max="18" trim required></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Marca" label-for="txtBrand">
                                    <b-form-input id="txtBrand" v-model="v.brand" trim required></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="SubMarca" label-for="txtSubBrand">
                                    <b-form-input id="txtSubBrand" v-model="v.subbrand" trim required></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <div class="form-group col-6">
                                    <b-form-group label="Modelo (año)" label-for="txtYear">
                                        <b-form-input type="number" min="1900" :max="maxYear" id="txtModel"
                                                      v-model="v.modelo" trim
                                                      required></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="form-group col-6">
                                    <b-form-group label="Color" label-for="txtColor">
                                        <b-form-input id="txtColor" v-model="v.color" trim required></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                            <div>
                                <b-form-group label="#Placa/Matrícula" label-for="txtPlate">
                                    <b-form-input id="txtPlate" v-model="v.plate" max="8" trim></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group label="Entidad Federativa/Estado" label-for="txtPlateState">
                                    <b-form-input id="txtOcupation" v-model="v.plate_state" trim></b-form-input>
                                </b-form-group>
                            </div>

                            <div>
                                <b-form-group label="Observaciones" label-for="txtObservations">
                                    <b-form-textarea id="txtObservations" v-model="v.observations" trim rows="5"
                                                     focus required></b-form-textarea>
                                </b-form-group>
                            </div>
                        </div>
                    </div>
                    <b-button type="button" size="sm" variant="outline-secondary" @click.prevent="addVehicle"
                              v-if="vehicles.length===index+1">
                        <font-awesome-icon icon="plus"/>
                        Veh&iacute;culo
                    </b-button>
                </div>
            </div>

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
    export default {
        name: "Vehicle",
        props: ['currentStep'],
        data() {
            return {
                use_types: ['Particular', 'Transporte Publico', 'Carga'],
                vehicles: [{
                    vin: '',
                    brand: '',
                    subbrand: '',
                    modelo: '',
                    color: '',
                    plate: '',
                    plate_state: '',
                    origin: '',
                    use_type: '',
                    observations: '',
                    photo: '',
                }],
            }
        },
        computed: {
            maxYear() {
                return new Date().getFullYear() + 1;
            },
        },
        methods: {
            addVehicle() {
                this.vehicles.push({
                    vin: '',
                    brand: '',
                    subbrand: '',
                    modelo: '',
                    color: '',
                    plate: '',
                    plate_state: '',
                    origin: '',
                    use: '',
                    observations: '',
                    photo: '',
                });
            },
            cameraChange(ev, index) {
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.onloadstart = () => this.$emit('spinner', true);
                reader.onload = e => this.save(index, e.target.result);
                // reader.onloadend = () => this.$emit('spinner', false);
                reader.readAsDataURL(file);
            },
            save(index, data) {
                this.vehicles[index]['photo'] = data;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.vehicles);
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