<template>
    <div class="overlay-delete">
    <v-col class=" d-flex  justify-center align-center">
    
    <v-card class="popup-del-com ">
        <p class="logo-disconnect-delete"><img class="logo-white" src="../logo/logo.png" alt="logo" />
        <span>La team GROUPOMANIA </span>
        </p>
      <p id="span-del-post"> ⚠️ Vous avez un commentaire en attente, Avez vous oublier de l'envoyer ? ⚠️ </p>
      <p id="span-del-post"> ⚠️ Continuer effacera votre commentaire en attente  ⚠️ </p>
       <!-- <p>cette action est irreversible </p> -->
       <v-btn id="btn-notdelete-comfirm" @click="$emit('close-modale-clear-delete')" ><span >J'ai oublier</span></v-btn>
      <p class="comfirm-span-delete">si tel est votre choix ...</p>
    <v-btn  @click="$emit('close-modale-clear-comfirm')"   id="btn-delete-comfirm"  ><span>Continuer</span></v-btn>
    <!-- <v-btn v-else id="btn-delete-comfirm"  ><span>c'est fait <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon ></span></v-btn> -->
    
    </v-card>
    </v-col>
    </div>
    </template>
    
    
    <script>
   
    export default {
   
    
      data(){
    return{
   
    
    }
      },
      methods:{
  
    
      }
    }
    
    
    </script>
    
    <style lang="scss">
     .overlay-delete {
    
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
    
     .popup-del-com {
      padding-bottom: 1%;
      padding-top: 1%;
      background-color: $secondary;
      margin-top: 250px;
      // max-width: 300px;
      // min-width: 300px;
      width: 320px;
      // max-height: 200px;
      // min-height: 200px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     }
    
    .logo-disconnect-delete{
    display: flex;
    flex-direction: row;
    }
    
    .popup{
      padding-bottom: 1%;
      padding-top: 1%;
      background-color: $secondary;
      max-width: 350px;
      min-width: 350px;
      width: 350px;
    //   max-height: 400px;
    //   min-height: 400px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    #span-del-post{
      text-align: center;
    }
    
    .comfirm-span-delete{
      
        padding-top: 3%;
    }
    
    #btn-notdelete-comfirm{
    background-color: $secondary;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: green;
    &:hover{
      background-color: green;
      color: $secondary;
    }
    }
    
    #btn-delete-comfirm{
     color:red;
    background-color:$secondary;
    width: 100%;
    justify-content: center;
    align-items: center;
    
    &:hover{
      background-color: $primary;
      color: $secondary;
    }
    }
    
    
    </style>
    