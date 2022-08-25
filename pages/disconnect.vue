<template>

<v-col class="overlay d-flex  justify-center align-center">
<v-card class="popup">
  <p> 😭 Vous-êtes sur de vouloir partir ?  😭 </p>
  <p>si tel est votre choix ...</p>
    <p>à bientôt ☺️ </p>
<p class="logo-disconnect"><img class="logo-white" src="../logo/logo.png" />La team GROUPOMANIA </p>
<v-btn id="btn-deco" @click="logOut" type=text href="./"><span>Deconnexion</span></v-btn>
</v-card>
</v-col>
</template>


<script>
import axios from "axios";
export default {
  name: 'IndexPage',
methods:{
  logOut(){
    axios.get('http://localhost:5000/api/user/logout')
  },
}

}
</script>

<style lang="scss">
 .overlay {
  /* display: flex;
  justify-content: center; */
  /* align-items: center; */
  width: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
position: fixed;
visibility: visible;
opacity: 1;
background-color: rgba(0, 0 ,0, 0.7);
transition: opacity 0.4s;
z-index: 1000;
 };

.popup{
  padding-bottom: 1%;
  padding-top: 1%;
  background-color: $secondary;
  max-width: 300px;
  min-width: 300px;
  width: 300px;
  max-height: 200px;
  min-height: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-disconnect{
display: flex;

}


#btn-deco{
 
background-color: $primary;
width: 100%;
justify-content: center;
align-items: center;
&:hover{
  background-color: $tertiary;
  color: $primary;
}
}
</style>