<template>
  <v-app dark>
    <div class="main-page-error">
    <h1 class="title-error" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 class="title-error" v-else>
      {{ otherError }}
    </h1>
    <NuxtLink class="errorlink" to="/">
      retour à la page d'acceuil
    </NuxtLink>
    <img class="card-img-error " src="../client\public\uploads\posts\pexels-ekaterina-bolovtsova-4049788.jpg"
                alt="photo" />
 
  </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'OUPSS 404 il n\'y a rien ici',
      otherError: 'AIE on a un probleme si cela persiste contatez un administrateur GROUPOMANIA'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>

.main-page-error{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center ;
  background-color: rgb(124, 16, 16);
  border-radius: 5%;
}

.card-img-error{

  max-width: 500px;
  height: 700px;
  object-fit: cover;




}
.errorlink{
  text-decoration: none;
  color: whitesmoke;
  height:  35px;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 1%;
  font-size: x-large;
}
.errorlink:hover {
    color:black;
  }



.title-error{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 40px;
}
</style>
