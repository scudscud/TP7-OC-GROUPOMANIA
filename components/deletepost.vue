<template>
<div class="overlay-delete">
<v-col class=" d-flex  justify-center align-center">

<v-card class="popup-del-com ">
    <p class="logo-disconnect-delete"><img class="logo-white" src="../logo/logo.png" />
    <span>La team GROUPOMANIA </span>
    </p>
  <p>Vous-êtes sur de vouloir supprimer ce post ?</p>
   <p>cette action est irreversible </p>
   <v-btn id="btn-notdelete-comfirm" @click="$emit('close-modale-delete'),delDeletePost()" ><span >non j'ai changer d'avis</span></v-btn>
  <p class="comfirm-span-delete">si tel est votre choix ...</p>
  
<v-btn v-if="!deleteconfirm" @click="deletedPost"  id="btn-delete-comfirm"  ><span>Supprimer le post</span></v-btn>
<v-btn v-else id="btn-delete-comfirm"  ><span>c'est fait <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon ></span></v-btn>

</v-card>
</v-col>
</div>
</template>


<script>
import axios from "axios";
  axios.defaults.withCredentials = true;
// import { KeyObject } from "crypto";

export default {
  name: 'IndexPage',

  data(){
return{
deleteconfirm: false ,
userid:'',
userjwtid:'',



}
  },
  methods:{
    delDeletePost(){
      localStorage.removeItem('categories')
    },

      
    async deletedPost() {
       await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
  
    this.userjwtid = res.data
    console.log(userjwtid);

    }).catch((error)=>{
      console.log(error);
    })
  await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
    console.log(docs.data._id);
        this.userid = docs.data._id
    }).catch((error)=>{
      console.log(
       error
      );
    })
      if(localStorage.getItem('categories')) {
      try {
        this.postId = JSON.parse(localStorage.getItem('categories'))
      } catch(e) {
        localStorage.removeItem('categories')
      }
    }
      // await axios.delete(`http://localhost:5000/api/post/${this.postId}`,{ id: this.userid})
      // .then((deletedPost) => {
      //   console.log(deletedPost);
      //   // deletedPost.data.deletedPost.likers.forEach(userIdLikeToDelete => {
      //   //   axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{ id: userIdLikeToDelete })
      //   //   });
      //   //   this.getPosts()
      //   }).then(()=>{
      //      localStorage.removeItem('categories')
      //     this.deleteconfirm = true
      //        setTimeout(() => {
      //       this.$emit('close-modale-delete')
      //       window.location.reload()            
      //       }, 2500); 
      //   })
      //   .catch((err) => console.log(err)) 
        }
  },

async mounted(){
  

  },
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
  height: 320px;
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
