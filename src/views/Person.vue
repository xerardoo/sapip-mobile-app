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
                                    <b-form-input id="txtLastName" v-model="p.firstName" trim></b-form-input>
                                </b-form-group>
                            </div>

                        </div>
                        <div class="col-md-4 col-12">
                            <b-img thumbnail fluid center :src="p.photo" class="photo" blank-color="#777"
                                   :blank="!p.photo"></b-img>

                            <div class="mt-1 text-center">
                                <label for="camera" class="btn btn-outline-secondary">
                                    <font-awesome-icon class="my-float" size="2x" icon="camera"/>
                                    Frente
                                </label>
                                <input ref="camera" id="camera" type="file" accept="image/*" capture="camera"
                                       @change="cameraChange($event,index)">
                            </div>
                            {{index}}
                        </div>
                    </div>
                    <b-button type="button" size="sm" variant="outline-secondary" @click.prevent="addPearson"
                              v-if="persons.length===index+1">
                        <font-awesome-icon icon="plus"/>
                        Persona
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
                persons: [{
                    firstName: '',
                    lastName: '',
                    photo: '',
                }],
                form: {
                    firstName: '',
                    lastName: '',
                },
            }
        },
        methods: {
            addPearson() {
                this.persons.push({
                    firstName: '',
                    lastName: '',
                    photo: '',
                });
            },
            cameraChange(ev, index) {
                console.log("INDEX",index)
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.onloadstart = () => this.$emit('spinner', true);
                reader.onload = e => this.save(index, e.target.result);
                // reader.onloadend = () => this.$emit('spinner', false);
                reader.readAsDataURL(file);
            },
            save(index, data) {
                this.persons[index]['photo'] = data;
            },
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.form);
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

    input[type="file"]#camera {
        display: none;
    }

    .my-float {
        /*margin-top: 15px;*/
        cursor: pointer;
    }
</style>