<template>
<div class="overlay">
  <v-col justify="center" align="center" >
    <v-container>  <SignUp v-show="show" @close-modal="show=false"   /></v-container>
  <v-card class="instruction"><p class="span-instruction">  !! vous devez vous inscrire avec votre mail Groupomania, pour vous connecter la premiere fois >> </p></v-card>
      <v-card  id="header-index" class="logo py-4 d-flex justify-center align-center"><h2><button @click.stop="$emit('close-modale')" class="btn-login">connexion</button></h2> <h2><button class="btn-sign" @click.stop="show=true">inscription</button></h2></v-card>
      <v-card id="body-index" >
       <v-col cols="12" sm="12" md="12">
        <v-card-text>
         <div class="form-popup" id="popup-Form">
  <form  class="form-container">
    
    <label for="email">
    <h2>Votre Groupo-Mail</h2>
    </label>
      <v-spacer />
    <input class="form-input" type="text" placeholder="Votre Email" value="@groupomania.net" name="email" required />
        <v-spacer />
    <label for="psw">
      <h2>Votre mot de passe Groupomania</h2>
    </label>
        <v-spacer />
    <input class="form-input" type="password" placeholder="Votre mot de passe" name="psw" required />
      <v-spacer />
    <button  class="btn" ><h2 class="h2-form">Se connecter</h2></button> / <button type="submit" class="btn cancel" ><h2 class="h2-form">Annuler</h2></button>
  </form>
</div>
        </v-card-text>
        </v-col>
      </v-card>
 
  </v-col>
  </div>
</template>

<script>
import SignUp from './sign-up.vue'
export default {
  name: 'IndexPage',
  components :{SignUp},
  data() {
    return {
      show :false,
    }
  },
}
</script>

<style lang="scss">

 .overlay {
  display: flex;
  justify-content: center;
  align-items: center;
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
z-index:10;
 } 

#header-index{
// white-space: nowrap;
// overflow: hidden;
// text-overflow:ellipsis;
border: solid 2px $secondary;
margin-bottom: 2px;
background:$tertiary;
};

#body-index{
  border: solid 2px $secondary;
background:$tertiary;

};

.btn-login{
display: flex;
justify-content: center;
align-items: center;
border: solid 2px $secondary;
border-radius: 30%;
padding-left: 5px;
padding-right: 5px;
text-decoration: none;
cursor: pointer;
white-space: nowrap;
overflow: hidden;
text-overflow:ellipsis;
};

.btn-login:hover{
background-color: $secondary;
color:$tertiary;
};

.btn-sign{
display: flex;
justify-content: center;
align-items: center;
border: solid 2px $secondary;
border-radius: 30%;
margin-left: 10px;
padding-left: 5px;
padding-right: 5px;
text-decoration: none;
color:white;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;
cursor: pointer;
};

.btn-sign:hover{
background-color: $secondary;
color:$tertiary;

};

// h1{
// display: flex;
// width: 100%;
// height: auto;
// flex-wrap: nowrap;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;


// }

// .logo{
//   display: flex;
//   width: 100%;
//   flex-direction: row;
//   flex-wrap:wrap;

// }



h2{
padding-bottom: 1rem;
padding-top: 1rem;
};

.h2-form:hover{
  
background-color: $secondary;
color:$tertiary;
};


.form-input{
 
  border: solid 2px $secondary;
 font-size:  1.5em;
 color: $secondary;
};


input{
width: 50%;
height: 2.5rem;
};

button{
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 30%;
};

// .btn{
// border: solid 2px $secondary;
// margin-top: 20px
// }
// .btn:hover{
// background-color: $secondary;
// color:$tertiary;
// }

.h2-form{
padding: 5px;
};

.span-instruction{
  color:$primary;

  
}


</style>