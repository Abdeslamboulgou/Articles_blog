<template>

    <div class="hello">
        <div class="container mt-5">
            <div class="row mt-5">
                <b-card-text class="image-comments-form">
                    <div class="image_footer">
                        <span>
                            <b-icon icon="chat-text-fill" scale="0.9"></b-icon> {{ comments.length }}
                        </span>
                        <span @click="clickToAddComment" class="btn_comment">commenter</span>
                        <span class="likes">
                            <b-icon class=" mt-1" icon="hand-thumbs-up" scale="1"></b-icon> {{ likes }}
                        </span>
                    </div>
                    <div>
                        <div>
                            <div v-for="comment in comments" :key="comment.id" class="commentaires mt-2"> <img
                                    class="image_owner" :src="comment.owner['picture']">
                                <div class="owner_name">
                                    <div>{{ comment.owner['firstName'] }} {{ comment.owner['lastName'] }} </div>

                                    <span class="message_owner">{{ comment.message }}</span>
                                    <b-icon @click="deleteComment(comment.id)" class="delet_comment" icon="trash"
                                        scale="0.9"></b-icon>
                                </div>

                            </div>
                        </div>
                    </div>
                </b-card-text>
                <b-card-footer v-if="postComment">
                    <b-row class="">

                        <b-col sm="6">
                            <label for="civilite">Civilité*</label>
                            <b-form-input id="civilite" name="title" v-model="comment.owner['title']"
                                placeholder="Civilité"></b-form-input>
                        </b-col>

                        <b-col sm="6">
                            <label for="nom">Nom*</label>
                            <b-form-input id="nom" name="firstName" v-model="comment.owner['firstName']"
                                placeholder="Nom"></b-form-input>
                        </b-col>
                        <b-col sm="6">
                            <label for="prenom">Prénom*</label>
                            <b-form-input id="prenom" name="lastName" v-model="comment.owner['lastName']"
                                placeholder="Prénom"></b-form-input>
                        </b-col>
                        <b-col sm="12">
                            <label for="file-input">Image*</label>
                            <b-form-file v-model="comment.owner['picture']" accept="image/*" @change="onSelectedImage"
                                name="picture" id="file-input" class="mb-2"></b-form-file>

                        </b-col>
                        <b-col sm="12">
                            <label for="commentaire">Commentaire*</label>
                            <b-form-textarea v-model="comment.message" name="message" id="commentaire"
                                placeholder="Commentaire"></b-form-textarea>
                        </b-col>
                        <b-col sm="2" class="mt-3">
                            <b-button @click="createComment" type="submit" class="btn_replay">Répondre</b-button>
                        </b-col>
                    </b-row>
                </b-card-footer>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'PostComments',
    props: ["post", "likes"],
    components: {
    },
    data() {
        return {
            comments: {},
            comment: {
                message: '',
                post: '',
                owner: {
                    title: '',
                    fristName: '',
                    lastName: '',
                    picture: null,
                }
            },
            postComment: false,
        }
    },

    mounted() {

        axios
            .get(`https://dummyapi.io/data/v1/post/${this.$props["post"]}/comment`, {
                headers: {
                    'app-id': '635bd2ac4c0fb34c55a2523b',
                }
            }).then((response) => {
                this.comments = response.data.data;
            }).catch(erreur => console.log(erreur));

    },


    methods: {
        clickToAddComment() {
            if (!this.postComment) {
                this.postComment = true;
            } else this.postComment = false;
        },
        onSelectedImage(event) {
            this.comment.owner['picture'] = event.target.files[0];
            console.log(this.comment.owner['picture'])
        },
        createComment() {

            let data = new FormData();
            data.append('picture', this.comment.owner['picture'], this.comment.owner['picture'].name);
            data.append('message', this.comment['message']);
            data.append('post', this.$props["post"]);
            data.append('title', this.comment.owner['title']);
            data.append('firstName', this.comment.owner['firstName']);
            data.append('lastName', this.comment.owner['lastName']);
            axios.post('https://dummyapi.io/data/v1/comment/create', this.comment, {
                headers: {
                    'app-id': '635bd2ac4c0fb34c55a2523b',
                    'cache-control': "private",
                    'content-type': "application/json; charset=utf-8"
                }
            })

        },
        deleteComment(id) {
            axios
                .delete(`https://dummyapi.io/data/v1/comment/${id}`, {
                    headers: {
                        'app-id': '635bd2ac4c0fb34c55a2523b',
                    }
                });
            let i = this.comments.map((item) => item.id).indexOf(id);
            this.comments.splice(i, 1);
        },


    },
}
</script>
  
<style scoped>
.image-comments-form {
    position: relative;
    bottom: 40px;
}

.commentaires {
    display: flex;
    border-radius: 9px;
    padding: 10px;
    box-shadow: 10px 0px 50px 0px rgba(0, 0, 0, 0.2);
}

.owner_name {
    position: relative;
    left: 20px;
}

.delet_comment {
    color: red;
}

.image_owner {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    position: relative;
}

.message_owner {
    color: black;
    opacity: 0.8;
    width: 100px;
    font-size: 12px;
}

.likes {
    float: right;
}

.image_footer {
    display: flex;
    justify-content: space-between;
}

.btn_comment {
    cursor: pointer;
    color: rgb(65, 63, 63);
}

.btn_replay {

    font-size: 10px;
}

.btn_comment:hover {
    color: rgb(0, 0, 0);
}
</style>
  