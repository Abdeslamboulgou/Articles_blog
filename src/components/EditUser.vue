<template>
  <div>
    <BlogNavBar />
    <h3 class="text-center mt-5 ">Modifier utilisateur</h3>

    <b-container fluid>
      <form name="theform" @submit.prevent="updateUser" class="form_update">
        <b-row class="mt-5 pt-5">
          <b-col class="user_infos" sm="4">
            <label for="civilite">Civilité:</label>
          </b-col>
          <b-col sm="5">
            <b-form-input id="civilite" class="user_champs" placeholder="Civilité" v-model="user.title"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="user_infos" sm="4">
            <label for="nom">Nom:</label>
          </b-col>
          <b-col sm="5">
            <b-form-input id="nom" class="user_champs" placeholder="Nom" v-model="user.firstName"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3 ">
          <b-col class="user_infos" sm="4">
            <label for="prenom">Prénom:</label>
          </b-col>
          <b-col sm="5">
            <b-form-input id="prenom" class="user_champs" placeholder="Prénom" v-model="user.lastName"></b-form-input>
          </b-col>
        </b-row>


        <b-button class="btn-submit mb-5 mt-5" type="submit">
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
  name: 'CreateUser',
  components: {
    BlogNavBar
  },
  data() {
    return {
      user: {},

    }
  },
  mounted() {
    axios
      .get(`https://dummyapi.io/data/v1/user/${this.$route.params.id}`, {
        headers: {
          'app-id': '635bd2ac4c0fb34c55a2523b',
        }
      }).then((response) => {
        this.user = response.data;
        // console.log(this.$route.params.id)
        // console.log(this.user)
      });
  },

  methods: {

    updateUser() {
      axios
        .put(
          `https://dummyapi.io/data/v1/user/${this.$route.params.id}`,
          this.user, {
          headers: {
            'app-id': '635bd2ac4c0fb34c55a2523b',
          }
        }).then((response) => {
          this.user = response.data.user;
          this.$router.push({ name: "users" });

        });

    }
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
  padding-bottom: 2%;
  margin: 5% 25%;
  box-shadow: 10px 20px 30px 10px rgba(0, 0, 0, 0.2);
}
</style>