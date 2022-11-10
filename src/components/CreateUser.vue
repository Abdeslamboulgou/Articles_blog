<template>
  <div>
    <BlogNavBar />
    <h3 class="text-center mt-5">ajouter utilisateur</h3>

    <b-container fluid>
      <form @submit.prevent="addUser" name="theform" class="form_create">
        <b-row class="mt-5 pt-5">
          <b-col class="user_infos" sm="4">
            <label for="civilite">Civilité:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input @change="validerForm" id="civilite" :state="StateTitle" name="title" class="user_champs"
              placeholder="Civilité" v-model="user.title">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="user_infos" sm="4">
            <label for="nom">Nom:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input @change="validerForm" id="nom" :state="StateName" name="firstName" class="user_champs"
              placeholder="Nom" v-model="user.firstName">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col class="user_infos" sm="4">
            <label for="prenom">Prénom:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input @change="validerForm" id="prenom" :state="StatelastName" name="lastName" class="user_champs"
              placeholder="Prénom" v-model="user.lastName">
            </b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col class="user_infos" sm="4">
            <label for="email">Email:</label>
          </b-col>
          <b-col sm="6" class="user_champs">
            <b-form-input @change="validerForm" id="email" name="email" :state="StateEmail" type="email"
              placeholder="Email" v-model="user.email"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col class="user_infos" sm="4">
            <label for="file-input">Image:</label>
          </b-col>
          <b-col sm="6" class="user_champs">
            <b-form-file @change="onSelectedImage($event)" ref="file" name="picture" id="file-input" accept="image/*"
              v-model="user['picture']"></b-form-file>

          </b-col>
        </b-row>
        <b-button class="btn-submit mb-5" type="submit">
          VALIDATE
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
      user: {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        picture: null,
      },

      StateTitle: null,
      StateName: null,
      StatelastName: null,
      StateEmail: null,
      StatePicture: null,

    }
  },

  methods: {

    validerForm() {

      if (!this.user['title']) {
        this.StateTitle = false;
      } if (!this.user['firstName']) {
        this.StateName = false;
      } if (!this.user["lastName"]) {
        this.StatelastName = false;
      } if (!this.user['email'] || !this.validEmail(this.user['email'])) {
        this.StateEmail = false;
      } if (this.user['title']) {
        this.StateTitle = true;
      } if (this.user['firstName']) {
        this.StateName = true;
      } if (this.user["lastName"]) {
        this.StatelastName = true;
      } if (this.user['email'] && this.validEmail(this.user['email'])) {
        this.StateEmail = true;
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },


    onSelectedImage() {
      this.user['picture'] = this.$refs.files[0];
      console.log(this.user['picture'])
    },

    addUser() {

      let data = new FormData();
      data.append('picture', this.user['picture']);
      data.append('title', this.user['title']);
      data.append('firstName', this.user['firstName']);
      data.append('lastName', this.user['lastName']);
      data.append('email', this.user['email']);
      axios.post('https://dummyapi.io/data/v1/user/create', this.user, {
        headers: {
          'app-id': '635bd2ac4c0fb34c55a2523b',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

        }
      })
      this.$router.push({ name: "users" });

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
  box-shadow: 10px 20px 30px 10px rgba(0, 0, 0, 0.2);
}
</style>