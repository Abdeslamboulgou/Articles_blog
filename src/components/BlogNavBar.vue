<template>
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand class="rodeeo">Rodeeo</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">

    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="ms-2" @click="goToUsers">Utilisateurs</b-nav-item>
        <b-nav-item class="ms-2" @click="goToPosts">Articles</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'BlogNavBar',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    goToUsers() {
      this.$router.push({ name: "users" });
    },
    goToPosts() {
      this.$router.push({ name: "posts" });
    },
  },
}
</script>

<style scoped>
.rodeeo {
  position: relative;
  left: 10px;
  font-size: 30px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bolder;
}
</style>

