<template>
  <v-col justify="center" align="center">
    <v-col class="form-sign"  cols="10" sm="16" md="60">
      <v-card class="logo py-4 d-flex justify-center"><h1><span id="form-span1">vous inscrire</span></h1></v-card>
      <v-card >
       <v-col cols="12" sm="12" md="12">
        <v-card-text>
         <div class="form-popup" id="popup-Form">
  <form  class="form-container">
     <label for="avatar">
    <h2>Votre photo / avatar</h2>
    </label>
     <img class="form-avatar-dl card-img mb-5" src="../static/v.png"/>
      <input class="form-avatar" type="file" value="test" name="avatar" placeholder="votre photo/avatar" required />  
     <v-spacer />
    <label for="email">
    <h2 >Votre Groupo-Mail</h2>
    </label>
      <v-spacer />
    <input class="form-input" type="text"  value="@groupomania.fr"  name="email"  required />
        <v-spacer />
    <label for="psw">
      <h2>Votre mot de passe</h2>
    </label>
        <v-spacer />
    <input class="form-input" type="password" placeholder="Votre mot de passe" name="psw" required />
      <v-spacer />
    <button type="submit" class="btn"><h2 class="h2-form">Se connecter</h2></button> / <button href="./index.vue" class="btn cancel" > <h2 class="h2-form">Annuler</h2></button>
  </form>
  <button id="form-span2"><nuxt-link id="link-sign" @click="toggleMenu" to="/">retour a l'acceuil &nbsp<v-icon>mdi-arrow-left-circle</v-icon></nuxt-link></button>
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
<style lang="scss" >
input{
width: 50%;
height: 2.5rem;
};

button{
padding-right: 1rem;
padding-left: 1rem;
};

h1{
display: flex;
width: 100%;
justify-content: center;
}

h2{
padding-bottom: 1rem;
padding-top: 1rem;
};

.btn{

border: solid 2px $secondary;
margin-top: 20px
}
.btn:hover{
background-color: $secondary;
color:$tertiary;
}


.logo{
flex-direction: row;
flex-wrap: nowrap;
height: 75px;
}

#form-span2{
display: flex;
font-size:  1em;
padding-top: 2%;
};


#link-sign{
text-decoration: none;
color: white;
};


div.v-card__text{
padding-top: 0;
}

.form-sign{
border: solid 5px $secondary;
padding: 0;
};

input{
color: black;
}

.form-avatar{

// background:black;
border-color: red;


}

.form-avatar-dl{
display: flex;
justify-content: center;
align-items: center;
border: solid 2px $tertiary;
border-radius: 50%;
}

.form-input{
padding-left: 1%;
border: solid 2px $secondary;
font-size:  1.5em;
color: $secondary;
width: 70%;
};

.form-place{
    padding-left: 5%;
};
.h2-form{
padding: 5px;
};



</style>