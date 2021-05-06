<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-l-50 p-r-50 p-t-40 p-b-30">
                <form class="login100-form validate-form" :class="{'was-validated':true}" ref="form"
                      @submit.prevent="submit">
					<span class="login100-form-title p-b-25">
                        <!--<img class="" src="@/assets/spindle.png" alt="">-->
                        <img class="logo" src="@/assets/sapip.png" alt="">
                        <br>
                        <br>
                        <!--<font-awesome-icon icon="fingerprint"/>     -->
                        Acceso Agente
					</span>

                    <div class="wrap-input100 validate-input m-b-16"
                         data-validate="Valid username is required">
                        <input class="input100" type="text" name="username" placeholder="Usuario"
                               autocomplete="username" v-model="form.username" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
							<span class="lnr lnr-envelope">
                                <font-awesome-icon icon="user"/>
                            </span>
						</span>
                    </div>

                    <div class="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                        <input class="input100" type="password" name="pass" placeholder="Contraseña"
                               autocomplete="current-password" v-model="form.password" ref="" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
							<span class="lnr lnr-lock">
                                <font-awesome-icon icon="asterisk"/>
                            </span>
						</span>
                    </div>

                    <div class="contact100-form-checkbox m-l-4">
                        <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                        <label class="label-checkbox100 pl-2" for="ckb1">
                            Recordarme
                        </label>
                    </div>

                    <div class="container-login100-form-btn p-t-25">
                        <button class="login100-form-btn">
                            <font-awesome-icon icon="sign-in-alt"/>&nbsp;&nbsp; Iniciar Sesi&oacute;n
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from "axios";
    import resource from '@/resources'

    export default {
        name: "Login",
        mounted() {
            if (localStorage.getItem('adta'))
                this.$router.push({path: '/incidents'});
        },
        data() {
            return {
                isValid: false,
                form: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            submit(e) {
                if (!this.$refs.form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.isValid = true;
                }
                this.$emit('spinner', true);

                resource.auth.signin(this.form)
                    .then((response) => {
                        this.$emit('spinner', false);
                        let user = response.data.user;
                        this.$bvToast.toast(`Bienvenido ${user.rank} ${user.first_name} ${user.last_name}`, this.$toastSuccess);
                        localStorage.setItem('adta', JSON.stringify(response.data));
                        this.$router.push({path: '/incidents'});
                    })
                    .catch(() => this.$emit('spinner', false));

                // this.$nextTick(() => {
                //     this.$emit('spinner', false);
                //     this.$bvToast.toast('Bienvenido', this.$toastSuccess);
                //     localStorage.setItem('adta', JSON.stringify({'hello': 'world'}));
                //     this.$router.push({path: '/incidents'});
                // });
            }
        },
    }
</script>

<style scoped>

    .logo {
        max-height: 125px;
    }

    /*//////////////////////////////////////////////////////////////////
    [ RESTYLE TAG ]*/
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        /*font-family: Poppins-Regular, sans-serif;*/
    }

    /*---------------------------------------------*/
    a {
        /*font-family: Poppins-Regular;*/
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0px;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
    }

    a:focus {
        outline: none !important;
    }

    a:hover {
        text-decoration: none;
        color: #b0b0b0;
    }

    /*---------------------------------------------*/
    h1, h2, h3, h4, h5, h6 {
        margin: 0px;
    }

    p {
        /*font-family: Poppins-Regular;*/
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0px;
    }

    ul, li {
        margin: 0px;
        list-style-type: none;
    }

    /*---------------------------------------------*/
    input {
        outline: none;
        border: none;
    }

    textarea {
        outline: none;
        border: none;
    }

    textarea:focus, input:focus {
        border-color: transparent !important;
    }

    input:focus::-webkit-input-placeholder {
        color: transparent;
    }

    input:focus:-moz-placeholder {
        color: transparent;
    }

    input:focus::-moz-placeholder {
        color: transparent;
    }

    input:focus:-ms-input-placeholder {
        color: transparent;
    }

    textarea:focus::-webkit-input-placeholder {
        color: transparent;
    }

    textarea:focus:-moz-placeholder {
        color: transparent;
    }

    textarea:focus::-moz-placeholder {
        color: transparent;
    }

    textarea:focus:-ms-input-placeholder {
        color: transparent;
    }

    input::-webkit-input-placeholder {
        color: #acacac;
    }

    input:-moz-placeholder {
        color: #acacac;
    }

    input::-moz-placeholder {
        color: #acacac;
    }

    input:-ms-input-placeholder {
        color: #acacac;
    }

    textarea::-webkit-input-placeholder {
        color: #acacac;
    }

    textarea:-moz-placeholder {
        color: #acacac;
    }

    textarea::-moz-placeholder {
        color: #acacac;
    }

    textarea:-ms-input-placeholder {
        color: #acacac;
    }

    /*---------------------------------------------*/
    button {
        outline: none !important;
        border: none;
        background: transparent;
    }

    button:hover {
        cursor: pointer;
    }

    iframe {
        border: none !important;
    }

    /*//////////////////////////////////////////////////////////////////
    [ Utility ]*/
    .txt1 {
        /*font-family: Raleway-Regular;*/
        font-size: 16px;
        color: #999999;
        line-height: 1.4;
    }

    .bo1 {
        border-bottom: 1px solid #999999;
    }

    .hov1:hover {
        /*border-color: #b0b0b0;*/
    }

    /*//////////////////////////////////////////////////////////////////
    [ login ]*/
    .limiter {
        width: 100%;
        margin: 0 auto;
    }

    .container-login100 {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        /*background: rgb(2,0,36);*/
        /*background: linear-gradient(to bottom, rgba(2,0,36,1) 0%, rgba(1,87,155,1) 40%, rgba(41,182,246,1) 100%);*/
        background: #343a40;
        background: -webkit-linear-gradient(bottom, #343a40, #b0b0b0);
        background: -o-linear-gradient(bottom, #343a40, #b0b0b0);
        background: -moz-linear-gradient(bottom, #343a40, #b0b0b0);
        background: linear-gradient(to bottom, #343a40, #b0b0b0);
        position: relative;
        z-index: 1;
    }

    .container-login100::before {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: url('../assets/img-01.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .wrap-login100 {
        width: 450px;
        background: #fff;
        border-radius: 3px;
        overflow: hidden;
    }

    /*------------------------------------------------------------------
    [  ]*/
    .login100-form {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .login100-form-title {
        /*font-family: Raleway-Black;*/
        font-size: 18px;
        color: #333333;
        line-height: 1.2;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        width: 100%;
        display: block;
    }

    /*---------------------------------------------*/
    .wrap-input100 {
        position: relative;
        width: 100%;
        z-index: 1;
    }

    .input100 {
        /*font-family: Raleway-SemiBold;*/
        font-size: 18px;
        line-height: 1.2;
        color: #686868;
        display: block;
        width: 100%;
        background: #e6e6e6;
        height: 62px;
        border-radius: 3px;
        padding: 0 30px 0 65px;
    }

    /*------------------------------------------------------------------
    [ Focus ]*/
    /*.focus-input100 {*/
    /*display: block;*/
    /*position: absolute;*/
    /*border-radius: 3px;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*z-index: -1;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*box-shadow: 0px 0px 0px 0px;*/
    /*!*color: rgba(1, 98, 199, 0.6);*!*/
    /*}*/

    /*.input100:focus + .focus-input100 {*/
    /*-webkit-animation: anim-shadow 0.5s ease-in-out forwards;*/
    /*animation: anim-shadow 0.5s ease-in-out forwards;*/
    /*}*/

    @-webkit-keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 60px 20px;
            opacity: 0;
        }
    }

    @keyframes anim-shadow {
        to {
            box-shadow: 0px 0px 60px 20px;
            opacity: 0;
        }
    }

    .symbol-input100 {
        font-size: 24px;
        color: #999999;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-left: 23px;
        padding-bottom: 5px;
        pointer-events: none;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    /*.input100:focus + .focus-input100 + .symbol-input100 {*/
    /*color: #b0b0b0;*/
    /*padding-left: 18px;*/
    /*}*/

    /*------------------------------------------------------------------
    [ Button ]*/
    .container-login100-form-btn {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .login100-form-btn {
        /*font-family: Raleway-Bold;*/
        font-size: 16px;
        line-height: 1.5;
        color: #fff;
        text-transform: uppercase;
        width: 100%;
        height: 62px;
        border-radius: 3px;
        background: #007bff;
        /*display: -webkit-box;*/
        /*display: -webkit-flex;*/
        /*display: -moz-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        justify-content: center;
        align-items: center;
        padding: 0 25px;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .login100-form-btn:hover {
        background: #333333;
    }

    /*------------------------------------------------------------------
    [ Alert validate ]*/
    .validate-input {
        position: relative;
    }

    .alert-validate::before {
        content: attr(data-validate);
        position: absolute;
        max-width: 70%;
        background-color: white;
        border: 1px solid #c80000;
        border-radius: 3px;
        padding: 4px 25px 4px 10px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 8px;
        pointer-events: none;
        font-family: Raleway-SemiBold;
        color: #c80000;
        font-size: 13px;
        line-height: 1.4;
        text-align: left;
        visibility: hidden;
        opacity: 0;
        -webkit-transition: opacity 0.4s;
        -o-transition: opacity 0.4s;
        -moz-transition: opacity 0.4s;
        transition: opacity 0.4s;
    }

    .alert-validate::after {
        content: "\f12a";
        font-family: FontAwesome;
        display: block;
        position: absolute;
        color: #c80000;
        font-size: 15px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 13px;
    }

    .alert-validate:hover:before {
        visibility: visible;
        opacity: 1;
    }

    @media (max-width: 992px) {
        .alert-validate::before {
            visibility: visible;
            opacity: 1;
        }
    }

    /*//////////////////////////////////////////////////////////////////
    [ responsive ]*/
    @media (max-width: 480px) {
        .wrap-login100 {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
</style>