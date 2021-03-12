<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 3">
            <div>
                <b-form-group label="#Serie" label-for="txtVin">
                    <b-form-textarea id="txtDescription" v-model="form.vin" trim></b-form-textarea>
                </b-form-group>
            </div>
            <div>
                <b-form-group label="Marca" label-for="txtMarca">
                    <b-form-input id="txtType" v-model="form.brand" trim></b-form-input>
                </b-form-group>
            </div>

            <b-button type="submit" variant="primary" class="float-right">
                <font-awesome-icon icon="arrow-right"/>
                Siguiente
            </b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "Vehicle",
        props: ['currentStep'],
        data() {
            return {
                form: {
                    vin: '',
                    brand: '',
                    modelo: '',
                    year: '',
                    olor: '',
                },
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
                this.$emit('submit', this.form);
            },
        }
    }
</script>

<style scoped>

</style>