<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 2">
            <div>
                <b-form-group label="Nombre" label-for="txtFirstName">
                    <b-form-input id="txtFirstName" v-model="form.firstName" trim></b-form-input>
                </b-form-group>
            </div>
            <div>
                <b-form-group label="Apellido" label-for="txtLastName">
                    <b-form-input id="txtLastName" v-model="form.firstName" trim></b-form-input>
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
        name: "Person",
        props: ['currentStep'],
        data() {
            return {
                form: {
                    firstName: '',
                    lastName: '',
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