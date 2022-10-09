<template>

<v-col class="overlay d-flex  justify-center align-center">
  <v-card class="popup"  v-if="deleteconfirm = deleteconfirm">
    <p> 😭 Vous-êtes sur de vouloir partir ?  😭 </p>
  <nuxt-link class="cancel-disco-btn" to="./" ><v-btn id="btn-notdisco-comfirm" @click="" >non j'ai changer d'avis</v-btn></nuxt-link>
    <p>si tel est votre choix ...</p>   
    <p class="logo-disconnect"><img class="logo-white-disco" src="../logo/logo.png" alt="logo groupomania" />La team GROUPOMANIA </p>
    <v-btn id="btn-deco" @click.prevent="logOut" type=text ><span>Deconnexion</span></v-btn>
  </v-card>
  <v-card class="popup" v-else>
    <p >à bientôt ☺️ </p>
    <p class="logo-disconnect"><img class="logo-white" src="../logo/logo.png"  alt="logo groupomania" />La team GROUPOMANIA </p>
    <v-btn id="btn-deco-ok" type=text ><span id="btn-deco-ok-span">Deconnecté</span><v-icon class="img-att">mdi-thumb-up-outline</v-icon></v-btn>
  </v-card>
</v-col>

</template>


<script>
import axios from "axios";
export default {
  name: 'Disconnect',
  data(){
    return{
     deleteconfirm : true
    }
  },
methods:{
  logOut(){
    axios.get('http://localhost:5000/api/user/logout')
          this.deleteconfirm = false
          setTimeout(() => {
          window.location.href = "./";        
            }, 2500); 
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

div.popup{
  padding-bottom: 0;
  padding-top: 1%;
  background-color: $secondary;
  max-width: 300px;
  min-width: 300px;
  width: 300px;
  height: fit-content;
  max-height: 200px;
  // min-height: 200px;
  // height: 200px;
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
  font-style: italic;
  font-weight: bold;
  background-color: $tertiary;
  color: $primary;
}
}

#btn-deco-ok{
padding-right: 5%;
background-color:rgb(30, 145, 17);
width: 100%;
justify-content: center;
align-items: center;
color: black;
font-weight: bolder;
}

#btn-deco-ok-span{
  display: flex;
  padding-right: 5%;
}
.logo-white-disco{
display: flex;
flex-direction: row;
width: 30px;
padding-right: 2%;
text-decoration: none;
color: $secondary,
}

#btn-notdisco-comfirm{
background-color: $secondary;
width: 100%;
justify-content: center;
align-items: center;
color: green;
margin-bottom: 1%;
&:hover{
  // text-shadow: 15px 10px 2px;
  background-color: green;
  color: white;
  font-style: italic;
  font-weight: bold;
}
}

a.cancel-disco-btn{
  // display: flex;
  height: 100%;
  width: 100%;
text-decoration: none;
color: green;
text-shadow: 2px;
// &:hover{
//   color:white;
// }


}




</style>