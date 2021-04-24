<template>
    <div id="app">
        <div class="update-dialog" v-if="prompt">
            <div class="update-dialog__content">
                A new version is found. Refresh to load it?
            </div>
            <div class="update-dialog__actions">
                <button class="update-dialog__button update-dialog__button--confirm btn btn-success"
                        @click="update"> Update
                </button>
                <button class="update-dialog__button update-dialog__button--cancel btn btn-secondary"
                        @click="prompt = false"> Cancel
                </button>
            </div>
        </div>
        <nav class="navbar navbar-light bg-dark justify-content-between fixed-top" v-if="isAuth">
            <a class="navbar-brand text-white">
                <button class="btn btn-dark" @click.prevent="$router.back()" v-if="$route.path!=='/incidents'">
                    <font-awesome-icon icon="chevron-left" class="text-white"/>
                </button>
                <img class="icon" :src="require(`@/assets/icons/${$route.meta.ico}.png`)"/>
                <span class="font-weight-bold small">{{$route.meta.title}} {{id}}</span>
            </a>

            <b-button-group>
                <b-dropdown right text="JUAN" variant="dark"><!-- {{session.username}} -->
                    <b-dropdown-item tag="button" @click="logout">Cerrar Sesi&oacute;n</b-dropdown-item>
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
            if (this.$workbox) this.$workbox.addEventListener("waiting", () => this.prompt = true);
            this.$nextTick().then(() => this.isAuth = !!localStorage.getItem('idadtaata'))
        },
        updated() {
            this.$nextTick().then(() => this.isAuth = !!localStorage.getItem('adta'))
        },
        data() {
            return {
                prompt: false,
                show: false,
                isAuth: !!localStorage.getItem('adta'),
            };
        },
        computed: {
            session() {
                return JSON.parse(localStorage.getItem('adta'));
            },
            version() {
                return document.title.split('|')[1]
            },
            id() {
                return this.$route.params['id'] ? `#${this.$route.params['id']}` : '';
            },
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
                this.$bvToast.toast('Adios!', this.$toastSuccess);
                localStorage.removeItem('adta');
                this.$router.push({path: '/'});
                this.isAuth = !!localStorage.getItem('adta');
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

    .update-dialog {
        position: fixed;
        left: 50%;
        bottom: 64px;
        transform: translateX(-50%);
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 12px;
        max-width: 576px;
        color: white;
        background-color: #2c3e50;
        text-align: left;
    }

    .update-dialog__actions {
        display: flex;
        margin-top: 8px;
    }

    .update-dialog__button {
        margin-right: 8px;
    }

    .update-dialog__button--confirm {
        margin-left: auto;
    }

</style>
