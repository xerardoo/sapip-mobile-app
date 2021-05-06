<template>
    <div>
        <div class="">
            <form @submit.prevent="onSearch" class="mb-2 row form-inline">
                <div class="form-group col-12 col-md-5">
                    <input type="text" name="search" class="form-control w-100" placeholder="Buscar"
                           autocomplete="off"
                           v-model="search">
                </div>
                <div class="col-8 col-md-4">
                    <date-picker v-model="start" format="DD-MM-YYYY" type="date" input-class="form-control"
                                 :editable="true" placeholder="DD-MM-AAAA" lang="es"/>
                </div>
                <div class="col-4 col-md-3">
                    <button class="btn btn-outline-secondary mt-1 float-right" type="submit">
                        <font-awesome-icon icon="filter"/>
                        Filtrar
                    </button>
                </div>
            </form>
        </div>

        <b-list-group>
            <b-list-group-item class="bg-light font-weight-bold ">
                <div class="row">
                    <div class="col-3">#FOLIO</div>
                    <div class="col-5">DESC.</div>
                    <div class="col-4">FECHA</div>
                </div>
            </b-list-group-item>
            <b-list-group-item :to="`/show-incident/${item.id}`" v-for="(item, index) in records" v-bind:key="index"
                               class="cpp">
                <div class="d-block d-sm-block d-md-none">
                    <div class="row">
                        <div class="col-2">{{item.id}}</div>
                        <div class="col-9 text-truncate">{{item.description}}</div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-5">
                            <div class="color-r10 d-inline-flex" :style="{backgroundColor: item.type.color}"></div>
                            {{item.type.name}}
                        </div>
                        <div class="col-5">{{item.date | moment("DD-MM-YYYY HH:mm:ss")}}</div>
                        <div class="col-1">
                            <font-awesome-icon icon="chevron-right"/>
                        </div>
                    </div>
                </div>
                <div class="d-none d-md-block">
                    <div class="row">
                        <div class="col-1">{{item.id}}</div>
                        <div class="col-7 text-truncate">
                            <div class="color-r15 d-inline-flex" :style="{backgroundColor: item.type.color}"></div>
                            {{item.type.name}} - {{item.description}}
                        </div>
                        <div class="col-3">{{item.date | moment("DD-MM-YYYY HH:mm:ss")}}</div>
                        <div class="col-1">
                            <font-awesome-icon icon="chevron-right"/>
                        </div>
                    </div>
                </div>
            </b-list-group-item>
            <li class="list-group-item text-center" v-if="records.length===0">Sin Registros</li>
        </b-list-group>
        <div class="fixed-bottom d-flex">
            <div class="mx-auto" v-if="totalPages>1">
                <b-pagination-nav :link-gen="linkGen" @change="pageChange" :number-of-pages="totalPages" use-router/>
            </div>
        </div>

        <div class="float new-incident">
            <button class="btn btn-primary float" @click.prevent="$router.push({ path: '/new-incident' })">
                <font-awesome-icon icon="clipboard" size="2x"/>
            </button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "IncidentsList",
        mounted() {
            this.pageChange()
        },
        data() {
            return {
                show: false,
                search: '',
                start: '',
                end: '',
                limit: (window.innerWidth <= 425 ? 5 : 10),
                records: [],
                total_record: 0,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.total_record / this.limit)
            }
        },
        methods: {
            onSearch() {
                this.pageChange();
            },
            pageChange(page = 1) {
                this.$emit('spinner', true);

                let end = this.start;
                if (this.start === null) this.start = '';
                if (end === null) end = '';

                const start = (this.start !== '' ? this.$moment(this.start).format("YYYY-MM-DD HH:mm:ss") : '');

                if (end !== '') {
                    end.setHours(23);
                    end.setMinutes(59);
                    end.setSeconds(59);
                }
                if (end !== '') end = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");

                axios.get(`/incident?search=${this.search}&start=${start}&end=${end}&offset=${page === 1 ? 0 : (page * this.limit) - this.limit}&limit=${this.limit}`)
                    .then((result) => {
                        this.records = result.data.records ? result.data.records : [];
                        this.total_record = result.data.total_record;
                        this.$emit('spinner', false);
                    })
                    .catch(() => this.$emit('spinner', false));
            },
            linkGen(pageNum) {
                return (pageNum === 1 ? '?' : `?page=${pageNum}`);
            }
        }
    }
</script>

<style scoped>
    input.search {
        width: 130px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 4px;
        /*font-size: 16px;*/
        background-color: white;
        /*background-image: url('~@/assets/searchicon.png');*/
        background-position: 10px 10px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
    }

    input.search:focus {
        width: 100%;
    }

    .cpp {
        padding: .5rem .5rem !important;
    }

</style>