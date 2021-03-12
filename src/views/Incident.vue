<template>
    <div>
        <b-form @submit="onSubmit" v-if="currentStep == 1">
            <div>
                <b-form-group label="Descripción" label-for="txtDescription">
                    <b-form-textarea id="txtDescription" v-model="form.description" trim required></b-form-textarea>
                </b-form-group>
            </div>
            <div>
                <b-form-group label="Tipo" label-for="txtType">
                    <b-form-input id="txtType" v-model="form.type" trim></b-form-input>
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
        name: "Incident",
        props: ['currentStep'],
        data() {
            return {
                form: {
                    description: '',
                    type: '',
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