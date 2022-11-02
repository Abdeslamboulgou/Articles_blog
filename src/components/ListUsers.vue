<template>
    <div class="hello">
        <BlogNavBar />

        <div class="container mt-5">
            <h3 class="text-center ">Liste des utilisateurs</h3><span class="add_user" @click="goToCreateUser"> Ajouter
                utilisateur <b-icon icon="plus-circle-fill" scale="1.2"></b-icon></span>
            <div class="row mt-5">
                <b-card v-for="user in users" :key="user.id" class="card_users">
                    <b-card-header class="cardheader text-center bg-black text-white">{{ user.title.toUpperCase() }} {{
                            user.firstName
                    }} {{ user.lastName.toUpperCase() }}</b-card-header>
                    <b-card class="card_image" :img-src="user.picture" img-alt="Image" img-height="250rem" img-top
                        tag="article"></b-card>
                    <b-card-footer>
                        <div>
                            <b-icon v-b-modal="'my-modal' + user.id" style="cursor:pointer;" icon="trash" scale="1">
                            </b-icon>
                            <router-link :to="{ name: 'update_user', params: { id: user.id } }" style="color:black;">
                                <b-icon style="cursor:pointer;" class="editIcon" icon="pencil" scale="1"></b-icon>
                            </router-link>
                        </div>
                    </b-card-footer>
                    <div>

                        <b-modal class="modal_user" :id="'my-modal' + user.id" hide-header cancel-title="NON"
                            ok-title="OUI"  @ok="deleteUser(user.id)">
                            <p class="my-4">Voulez vous supprimer {{ user.title.toUpperCase() }} {{
                                    user.lastName.toUpperCase()
                            }} dans la liste des utilisateurs ?</p>

                        </b-modal>
                    </div>
                </b-card>
            </div>
        </div>
    </div>

</template>
  
<script>
import axios from 'axios'
import BlogNavBar from './BlogNavBar.vue'

export default {
    name: 'ListUsers',
    components: {
        BlogNavBar
    },
    data() {
        return {
            users: {},
        }
    },
    mounted() {

        axios
            .get(`https://dummyapi.io/data/v1/user`, {
                headers: {
                    'app-id': '635bd2ac4c0fb34c55a2523b',
                }
            }).then((response) => {
                this.users = response.data.data;
            }).catch(erreur => console.log(erreur));
    },
    methods: {

        deleteUser(id) {
            axios
                .delete(`https://dummyapi.io/data/v1/user/${id}`, {
                    headers: {
                        'app-id': '635bd2ac4c0fb34c55a2523b',
                    }
                });
            let i = this.users.map((item) => item.id).indexOf(id);
            this.users.splice(i, 1);
            this.$router.push({ name: "users" });
        },
        goToCreateUser() {
            this.$router.push({ name: "create_user" });
        },

    },
}
</script>
  
<style scoped>
.editIcon {
    position: relative;
    left: 200px;
}

.card_users {
    max-width: 20rem;
    border: none;
}

.card_image,
.cardheader {
    box-shadow: 0 20px 10px 0 rgba(0, 0, 0, 0.2);
    border: none;
}

.add_user {
    position: relative;
    left: 20px;
    top: 15px;

}

.add_user:hover {
    border-bottom: 2px green solid;
    cursor: pointer;
    color: green;

}

.modal_user {
    position: fixed;
    top: 100%;
    left: 49%;
    width: 50%;
    animation: animationInsc 0.8s ease forwards;
    box-shadow: 0 20px 10px 10px rgba(0, 0, 0, 0.2);

}


@keyframes drop {

    0% {
        transform: translate(-50%, -100%);

        opacity: 0;

    }



    50% {

        transform: translateY(-50%, -70%);

        opacity: 0.5;

    }

    100% {

        transform: translate(-50%, -50%);
        opacity: 1;

    }

}
</style>
  