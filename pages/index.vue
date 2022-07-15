<template>
  <v-col justify="center" align="center">
    <v-col cols="10" sm="16" md="60">
      <v-card class="logo py-4 d-flex justify-center"><h1><v-bouton class="btn-login">connexion</v-bouton> / <nuxt-link class="btn-sign" @click="toggleMenu" to="/sign-up" >inscription</nuxt-link></h1></v-card>
      <v-card >
       <v-col cols="12" sm="12" md="12">
        <v-card-text>
         <div class="form-popup" id="popup-Form">
  <form  class="form-container">
    
    <label for="email">
    <h2>Votre Groupo-Mail</h2>
    </label>
      <v-spacer />
    <input class="form-input" type="text" placeholder="Votre Email" name="email" required />
        <v-spacer />
    <label for="psw">
      <h2>Votre mot de passe</h2>
    </label>
        <v-spacer />
    <input class="form-input" type="password" placeholder="Votre mot de passe" name="psw" required />
      <v-spacer />
    <button type="submit" class="btn"><h2 class="h2-form">Se connecter</h2></button> / <button type="submit" class="btn cancel" ><h2 class="h2-form">Annuler</h2></button>
  </form>
</div>
        </v-card-text>
        </v-col>
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
<style lang="scss">
h2{
padding-bottom: 1rem;
padding-top: 1rem;
}
.form-input{
 
  border: solid 2px $secondary;
 font-size:  1.5em;
 color: $secondary;
}
.btn-login{
display: flex;
justify-content: center;
align-items: center;
border: solid 2px $secondary;
padding-left: 5px;
padding-right: 5px;

text-decoration: none;
cursor: pointer;
}

.btn-login:hover{
background-color: $secondary;
color:$tertiary;
}
a.btn-sign{
display: flex;
justify-content: center;
align-items: center;
border: solid 2px $secondary;
padding-left: 5px;
padding-right: 5px;

text-decoration: none;
color:white;
cursor: pointer;
}
.btn-sign:hover{
background-color: $secondary;
color:$tertiary;
}


input{
width: 50%;
height: 2.5rem;

}
button{
  padding-right: 1rem;
  padding-left: 1rem;
}
.btn{

border: solid 2px $secondary;
margin-top: 20px
}
.btn:hover{
background-color: $secondary;
color:$tertiary;
}

.h2-form{
padding: 5px;




}




</style>