<template>
    <div id="app">
        <nav class="navbar navbar-light bg-dark justify-content-between fixed-top" v-if="isAuth">
            <a class="navbar-brand text-white">
                <button class="btn btn-dark" @click.prevent="$router.back()" v-if="$route.path!=='/incidents'">
                    <font-awesome-icon icon="chevron-left" class="text-white"/>
                </button>
                <img class="icon" :src="require(`@/assets/icons/${$route.meta.ico}.png`)"/>
                <span class="font-weight-bold small">{{$route.meta.title}}</span>
            </a>

            <b-button-group>
                <b-dropdown right text="JUAN" variant="dark"><!-- {{session.username}} -->
                    <b-dropdown-item tag="button" @click="false">Cerrar Sesi&oacute;n</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Ver.{{version}}</b-dropdown-item>
                </b-dropdown>
            </b-button-group>
        </nav>

        <div :class="{'container views': isAuth}">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        created() {
            // if (this.$workbox) this.$workbox.addEventListener("waiting", () => this.prompt = true);
            // this.$nextTick().then(() => this.isAuth = !!localStorage.getItem('idata'))
        },
        updated() {
            // this.$nextTick().then(() => this.isAuth = !!localStorage.getItem('idata'))
        },
        data() {
            return {
                prompt: false,
                show: false,
                isAuth: true,//!!localStorage.getItem('xdata'),
            };
        },
        computed: {
            // session() {
            //     return JSON.parse(localStorage.getItem('idata'));
            // },
            version() {
                return document.title.split('|')[1]
            }
        },
        methods: {
            async update() {
                this.prompt = false;
                await this.$workbox.messageSW({type: "SKIP_WAITING"});
            },
            changeSpinner(val) {
                this.show = val;
            },
            logout() {
                this.$bvToast.toast('Good Bye!', this.$toastSuccess);
                localStorage.removeItem('idata');
                this.$router.push({path: '/'});
                this.isAuth = !!localStorage.getItem('idata');
            },
        },
    }
</script>

<style>
    body {
        min-width: 320px !important;
    }

    #app {
        color: #4b4b4b;
        max-height: 100vh !important;
        line-height: 1 !important;
    }

    .navbar {
        height: 64px !important;
    }

    div.views {
        margin-top: 70px !important;
    }

    img.icon {
        height: 34px !important;
    }

    .navbar {
        padding: .5rem .5rem !important;
    }

    @media (max-width: 320px) {
        .navbar-brand {
            font-size: 1rem !important;
        }
        img.icon {
            height: 30px !important;
        }
    }

</style>
