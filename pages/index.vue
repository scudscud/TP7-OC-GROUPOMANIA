<template>
  <v-col justify="center" align="center">
    <v-col cols="10" sm="16" md="60">
      <v-card class="logo py-4 d-flex justify-center"><h1>Veuillez vous connecter</h1></v-card>
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
       
    <button type="submit" class="btn"><h2>Se connecter</h2></button> /
    <button type="submit" class="btn cancel" ><h2>Annuler</h2></button>
  </form>
</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          
        </v-card-actions>
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
}
input{
width: 50%;
height: 2.5rem;

}
button{
  padding-right: 1rem;
  padding-left: 1rem;
}








</style>