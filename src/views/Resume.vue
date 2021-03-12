<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 4">


            <h4>Resumen</h4>

            <b-button type="submit" variant="primary" class="float-right">
                <font-awesome-icon icon="save"/>
                Guardar
            </b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "Resume",
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