<template>

  <div class="hello">
    <BlogNavBar />

    <div class="container mt-5">
      <h3 class="text-center">Liste des articles</h3>
      <span class="add_post" @click="GoToCreatePost"> Ajouter Article <b-icon icon="plus-circle-fill" scale="1.2">
        </b-icon></span>
      <div class="row mt-5">
        <b-card class="card_posts mb-2" v-for="post in posts" :key="post.id" tag="article" style="max-width: 20rem;">
          <b-card-img v-b-modal="'my-modal-detail' + post.id" style="width:16rem;height: 16rem;"  :src="post.image" img-alt="Image" img-height="280rem"
            img-top></b-card-img>
          <b-card-title class="post_title"> {{ String(post.tags) }}</b-card-title>
          <router-link :to="{ name: 'update_post', params: { id: post.id } }" style="color:black;">
            <b-icon class="editIcon" icon="pencil" scale="1"></b-icon>
          </router-link>
          <b-card-text>
            {{ post.text }}
          </b-card-text>
          <div class="d-flex justify-content-between">
            <b-icon v-b-modal="'my-modal' + post.id" icon="trash" scale="1"></b-icon>
            <b-icon class="likes mt-1" icon="hand-thumbs-up" scale="1"></b-icon> <span>{{ post.likes }}</span>
          </div>
          <b-modal class="modal_user" :id="'my-modal' + post.id" hide-header cancel-title="NON" ok-title="OUI"
             @ok="deletePost(post.id)">
            <p class="my-4">Voulez vous supprimer {{ String(post.tags) }}
              dans la liste des articles ?</p>

          </b-modal>
          <b-modal class="modal_user" :id="'my-modal-detail' + post.id" hide-header hide-footer>
            <b-card :header="String(post.tags)" header-tag="header">
              <b-card-img v-b-modal="'my-modal-detail' + post.id" :src="post.image" img-alt="Image" img-top>
              </b-card-img>
              <PostComments :post="post.id" :likes="post.likes" />
            </b-card>

          </b-modal>
        </b-card>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import BlogNavBar from './BlogNavBar.vue'
import PostComments from './PostComments.vue'

export default {
  name: 'ListItems',
  props: ["post", "likes"],
  components: {
    BlogNavBar,
    PostComments,
  },
  data() {
    return {
      posts: {},
    }
  },

  mounted() {
    axios
      .get(`https://dummyapi.io/data/v1/post`, {
        headers: {
          'app-id': '635bd2ac4c0fb34c55a2523b',
        }
      }).then((response) => {
        this.posts = response.data.data;
      }).catch(erreur => console.log(erreur));


  },


  methods: {

    deletePost(id) {
      axios
        .delete(`https://dummyapi.io/data/v1/post/${id}`, {
          headers: {
            'app-id': '635bd2ac4c0fb34c55a2523b',
          }
        });
      let i = this.posts.map((item) => item.id).indexOf(id);
      this.posts.splice(i, 1);
      this.$router.push({ name: "posts" });
    },
    GoToCreatePost() {
      this.$router.push({ name: "create_post" });
    },

  },
}
</script>

<style scoped>
.likes {
  position: relative;
  left: 100px;
}

.card_posts {
  max-width: 20rem;
  border: none;
  box-shadow: 0 20px 10px 10px rgba(0, 0, 0, 0.2);
  column-gap: 20px;
}

.card_posts:hover {
  transform: scale(1.05);
  z-index: 1;
}

.editIcon {
  position: relative;
  left: 250px;
  bottom: 30px;
}

.add_post {
  position: relative;
  left: 20px;
  top: 15px;

}

.add_post:hover {
  border-bottom: 2px green solid;
  cursor: pointer;
  color: green;

}

.post_title {
  font-size: 15px;
}
</style>
