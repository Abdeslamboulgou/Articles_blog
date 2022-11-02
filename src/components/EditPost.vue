<template>
  <div>
    <BlogNavBar />
    <h3 class="text-center mt-5 ">Modifier Article</h3>

    <b-container fluid>
      <form name="theform" @submit.prevent="updatePost" class="form_update">

        <b-card :img-src="post.image" style="max-width:50rem" img-alt="Card image" img-top>
          <b-card-text>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-default">link:</label>
              </b-col>
              <b-col sm="12">
                <b-form-input id="input-default" placeholder="Enter link" v-model="post.link"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="2">
                <label for="textarea-default">text:</label>
              </b-col>
              <b-col sm="12">
                <b-form-textarea id="textarea-default" placeholder="texte article" v-model="post.text">
                </b-form-textarea>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>

        <b-button class="btn-submit mb-5 mt-2" type="submit">
          UPDATE
        </b-button>
      </form>
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
      post: {},

    }
  },
  mounted() {
    axios
      .get(`https://dummyapi.io/data/v1/post/${this.$route.params.id}`, {
        headers: {
          'app-id': '635bd2ac4c0fb34c55a2523b',
        }
      }).then((response) => {
        this.post = response.data;
        // console.log(this.$route.params.id)
        // console.log(this.post)
      });
  },

  methods: {

    updatePost() {
      axios
        .put(
          `https://dummyapi.io/data/v1/post/${this.$route.params.id}`,
          this.post, {
          headers: {
            'app-id': '635bd2ac4c0fb34c55a2523b',
          }
        }).then((response) => {
          this.post = response.data.post;
          this.$router.push({ name: "posts" });

        });

    }
  },
}
</script>

<style scoped>
.post_infos {
  position: relative;
  left: 150px;
  top: 8px;
  font-weight: bolder;
}

.post_champs {
  position: relative;
  left: 30px;
}

.btn-submit {
  text-align: center;
  border: 1px green solid;
  border-radius: 8px;
  font-weight: bold;
  background-color: white;
  color: rgb(0, 0, 0);
  float: right;
  font-size: 14px;
}

.btn-submit:hover {
  background-color: green;
}

.form_update {
  border-radius: 10px;
  margin: 5% 25%;
  box-shadow: 10px 20px 30px 10px rgba(0, 0, 0, 0.2);
}
</style>