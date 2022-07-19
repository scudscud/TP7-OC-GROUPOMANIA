<template>
<div class="overlay">
  <v-col class="d-flex justify-center align-center">
    <v-col  class="form-sign"  cols="10" sm="16" md="60">
      <v-card id="logo-form" class="logo py-4 d-flex justify-center "><h1><span id="form-span1">Vous inscrire </span></h1></v-card>
      <v-card >
       <v-col id="logo-form2"  cols="12" sm="12" md="12">
        <v-card-text>
        
  <form  class="form-container">
     <label for="avatar">
    <h2>Votre photo / avatar</h2>
    </label>
     <img class="form-avatar-dl " src="../logo/avatar1.png"/>
      <input class="form-avatar" type="file" value="test" name="avatar" placeholder="votre photo/avatar" required />  
     <v-spacer />
    <label for="email">
    <h2 >Votre mail Groupomania</h2>
    </label>
      <v-spacer />
    <input class="form-input" type="text"  value="@groupomania.fr"  name="email"  required />
        <v-spacer />
    <label for="psw">
      <h2>Votre mot de passe Groupomania</h2>
    </label>
        <v-spacer />
    <input class="form-input" type="password" placeholder="Votre mot de passe" name="psw" required />
      <v-spacer />
    <button type="submit" class="btn"><h2 class="h2-form">Inscritpion</h2></button>&nbsp<button href="./index.vue" class="btn cancel" > <h2 class="h2-form">Annuler</h2></button>
  </form>
  <button id="form-span2"><button class="btn" id="link-sign" @click="$emit('close-modal')">retour a l'acceuil &nbsp<v-icon>mdi-arrow-left-circle</v-icon></button></button>
<!-- </div> -->
        </v-card-text>
        </v-col>
      </v-card>
    </v-col>
   
  </v-col>
</div>
</template>

<script>

export default {
  name: 'IndexPage'
}
</script>


<style lang="scss" >

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
z-index:100;
 } 

input{
width: 50%;
height: 2.5rem;
};

button{
padding-right: 1rem;
padding-left: 1rem;
};

h1{
  color : $secondary;
display: flex;
width: 100%;
justify-content: center;
};

h2{
  color : $secondary;
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


div.logo{
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
  display: flex;
text-decoration: none;
color: white;
border: solid 2px $secondary;
border-radius: 30%;
};

#link-sign:hover{
background-color: $secondary;
color:$tertiary;
};

div.v-card__text{
padding-top: 0;
}

div.form-sign{
border: solid 5px $secondary;
border-radius: 10%;
padding: 0;
// background-color:$tertiary;
overflow: hidden;
// background-color: #fff;
};

input{
color: black;
}


#logo-form{
border-radius: 0%;
background-color: $tertiary;
border-bottom: solid 5px  red ;
}

#logo-form2{
border-radius: 0%;
background-color: $tertiary;
}


img.form-avatar-dl{
display: flex;
width: 75px;
height: 75px;
justify-content: center;
align-items: center;
border: solid 2px $secondary;
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