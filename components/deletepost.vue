<template>

<v-col class="overlay d-flex  justify-center align-center">
<v-card class="popup">
  <p>Vous-êtes sur de vouloir supprimer ce post ?</p>
   <p>cette action est irreversible </p>
   <button  id="btn-notdelete-comfirm" @click="$emit('close-modale-delete')" ><span >non j'ai changer d'avis</span></button>
  <p class="comfirm-span-delete">si tel est votre choix ...</p>
<v-btn @click="$emit('close-modale-delete')"  id="btn-delete-comfirm"  ><span>Supprimer le post</span></v-btn>
<!-- <p class="logo-disconnect"><img class="logo-white" src="../logo/logo.png" />La team GROUPOMANIA </p> -->
</v-card>
</v-col>
</template>


<script>

export default {
  name: 'IndexPage',

  data(){
return{




}
  },
  methods:{
    test(){
      console.log($emit);
    }
 

  }



}
</script>

<style lang="scss">
 .overlay {

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
