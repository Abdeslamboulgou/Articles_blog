<template>
    <div>
        <BlogNavBar />
        <h3 class="text-center mt-5">ajouter article</h3>

        <b-container fluid>
            <form @submit.prevent="addPost" class="form_create">
                <b-row class="">


                    <b-col sm="5">
                        <label for="file-input">Image*</label>
                        <b-form-file @change="onSelectedImage" v-model="post.image" name="image" id="file-input"
                            accept="image/*">
                        </b-form-file>
                    </b-col>


                    <b-col sm="12" class="mt-2">
                        <label for="text">Text*</label>
                        <b-form-textarea v-model="post.text" name="text" id="text" placeholder="text">
                        </b-form-textarea>
                    </b-col>

                    <b-col sm="6" class="mt-2">
                        <label for="tag">Tags*</label>
                        <b-form-textarea v-model="post.tags" name="tag" id="tag" placeholder="tags">
                        </b-form-textarea>
                    </b-col>

                    <b-col sm="6" class="mt-2">
                        <label for="civilite">Civilité*</label>
                        <b-form-input id="civilite" name="title" v-model="post.user['title']" placeholder="Civilité">
                        </b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-2">
                        <label for="nom">Nom*</label>
                        <b-form-input id="nom" name="firstName" v-model="post.user['firstName']" placeholder="Nom">
                        </b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-2">
                        <label for="prenom">Prénom*</label>
                        <b-form-input id="prenom" name="lastName" v-model="post.user['lastName']" placeholder="Prénom">
                        </b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-2">
                        <label for="email">Email*</label>
                        <b-form-input @change="validerForm" id="email" name="email" :state="StateEmail" type="email"
                            placeholder="Email" v-model="post.user['email']"></b-form-input>
                    </b-col>



                    <b-col sm="5" class="mt-2">
                        <label for="file_input">Picture utilisateur*</label>
                        <b-form-file accept="image/*" @change="onSelectedImage" name="picture" id="file_input"
                            class="mb-2"></b-form-file>
                    </b-col>

                </b-row>
                
            </form>
            <b-button class="btn-submit mb-5 mt-2" type="submit">
                    UPDATE
                </b-button>
        </b-container>
    </div>

</template>
  
<script>
import axios from 'axios'
import BlogNavBar from './BlogNavBar.vue'

export default {
    name: 'CreatePost',
    components: {
        BlogNavBar
    },

    data() {
        return {
            post: {
                image: null,
                tags: null,
                text: '',
                user: {
                    title: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    picture: null,
                }
            },
            StateEmail: null,
        }
    },

    methods: {

        validerForm() {

            if (!this.post.user['email'] || !this.validEmail(this.post.user['email'])) {
                this.StateEmail = false;
            } if (this.post.user['email'] && this.validEmail(this.post.user['email'])) {
                this.StateEmail = true;
            }
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },


        onSelectedImage(event) {
            this.post.user['picture'] = event.target.files[0];
            this.post['image'] = event.target.files[0];
            console.log(this.user['picture'])
            console.log(this.user['image'])

        },

        addPost() {

            let data = new FormData();

            data.append('image', this.post['image']);
            data.append('tag', this.post['tags']);
            data.append('text', this.post['text']);
            data.append('picture', this.post.user['picture']);
            data.append('title', this.user['title']);
            data.append('firstName', this.user['firstName']);
            data.append('lastName', this.user['lastName']);
            data.append('email', this.user['email']);
            axios.post('https://dummyapi.io/data/v1/post/create', this.post, {
                headers: {
                    'app-id': '635bd2ac4c0fb34c55a2523b',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

                }
            })
            this.$router.push({ name: "posts" });

        },
    },
}
</script>
  
<style scoped>
.user_infos {
    position: relative;
    left: 150px;
    top: 8px;
    font-weight: bolder;
}

.user_champs {
    position: relative;
    left: 30px;
}

.btn-submit {
    border: 1px green solid;
    border-radius: 8px;
    font-weight: bold;
    background-color: white;
    color: rgb(0, 0, 0);
    position: relative;
    left: 38%;
    font-size: 14px;
}

.btn-submit:hover {
    background-color: green;
}

.form_create {
    border-radius: 10px;
    margin: 5% 25%;
    padding: 30px;
    box-shadow: 10px 20px 30px 10px rgba(0, 0, 0, 0.2);
}
</style>