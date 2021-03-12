<template>
    <div>
        <form @submit.prevent="onSearch" class="mb-2">
            <input type="text" name="search" class="search" placeholder="" autocomplete="off"
                   v-model="search" @focus="show=true" @blur="show=false">
            <button class="btn btn-outline-secondary mt-2" v-if="false">Search</button>
        </form>
        <b-list-group>
            <b-list-group-item class="bg-light font-weight-bold ">
                <div class="row">
                    <div class="col-3">#FOLIO</div>
                    <div class="col-5">DESC.</div>
                    <div class="col-4">FECHA</div>
                </div>
            </b-list-group-item>
            <b-list-group-item :to="`/incident/${item.id}`" v-for="(item, index) in rows" v-bind:key="index"
                               class="cpp">
                <div class="d-block d-sm-block d-md-none">
                    <div class="row">
                        <div class="col-5">{{item.reference}}</div>
                        <div class="col-7">{{item.created}}</div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-1 text-success">
                            <font-awesome-icon icon="check-circle" v-if="!!+item.checked"/>
                        </div>
                        <div class="col-9">{{item.customer}}</div>
                        <div class="col-1">
                            <font-awesome-icon icon="chevron-right"/>
                        </div>
                    </div>
                </div>
                <div class="d-none d-md-block">
                    <div class="row">
                        <div class="col-1 text-success">
                            <font-awesome-icon icon="check-circle" v-if="!!+item.checked"/>
                        </div>
                        <div class="col-2">{{item.reference}}</div>

                        <div class="col-5">{{item.customer}}</div>
                        <div class="col-3">{{item.created}}</div>
                        <div class="col-1">
                            <font-awesome-icon icon="chevron-right"/>
                        </div>
                    </div>
                </div>
            </b-list-group-item>
            <li class="list-group-item text-center" v-if="rows.length===0">Sin Registros</li>
        </b-list-group>
        <div class="fixed-bottom d-flex">
            <div class="mx-auto" v-if="totalPages>1">
                <b-pagination-nav :link-gen="linkGen" @change="pageChange" :number-of-pages="totalPages" use-router/>
            </div>
        </div>

        <div class="float new-incident">
            <button class="btn btn-primary float" @click.prevent="$router.push({ path: 'new-incident' })">
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
            // this.pageChange()
        },
        data() {
            return {
                show: false,
                search: '',
                limit: (window.innerWidth <= 425 ? 5 : 10),
                rows: [],
                total: 0,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.total / this.limit)
            }
        },
        methods: {
            onSearch() {
                this.pageChange();
            },
            pageChange(page = 1) {
                this.$emit('spinner', true);
                axios.get(`/incident?search=${this.search}&offset=${page === 1 ? 0 : (page * this.limit) - this.limit}&limit=${this.limit}`)
                    .then((result) => {
                        this.rows = result.data.rows;
                        this.total = result.data.total;
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
        background-image: url('~@/assets/searchicon.png');
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

    .float {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 25px;
        right: 25px;
        background-color: #007bff;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

</style>