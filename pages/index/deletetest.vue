<template>
<div class="overlay-delete">
<v-col class=" d-flex  justify-center align-center">

<v-card class="popup-del-com ">
    <p class="logo-disconnect-delete"><img class="logo-white" src="../../logo/logo.png" alt="logo groupomania" />
    <span>La team GROUPOMANIA </span>
    </p>
  <p id="span-del-post">  ⚠️ Vous-êtes sur de vouloir supprimer cette publication?  ⚠️ </p>
   <!-- <p>cette action est irreversible </p> -->
   <v-btn v-if="click" id="btn-notdelete-comfirm" @click="$emit('close-modale-delete'),delDeletePost()" ><span >non j'ai changer d'avis</span></v-btn>
  <p class="comfirm-span-delete">si tel est votre choix ...</p>
  
<v-btn v-if="!deleteconfirm" @click="deletedPost(userid)"  id="btn-delete-comfirm"  ><span>Supprimer le post</span></v-btn>
<v-btn v-else id="btn-delete-comfirm"  ><span>c'est fait <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon ></span></v-btn>

</v-card>
</v-col>
</div>
</template>


<script>
import axios from "axios";

// import { KeyObject } from "crypto";

export default {
  name: 'Delete',

  data(){
return{
deleteconfirm: false ,
click: true,
// userid:'',
// userjwtid:'',
// postId:'',


}
  },
  methods:{
    delDeletePost(){
      localStorage.removeItem('categories')
    },


 deletedPost(id) {
      if(localStorage.getItem('categories')) {
      try {
        this.postId = JSON.parse(localStorage.getItem('categories'))
  
   let data = this.userid
   
     axios.delete(`http://localhost:5000/api/post/${this.postId}`,{data : {id : id}}  )
      .then((Post) => {
           
          Post.data.likers.forEach(userDeleteLike=> {
          axios.patch(`http://localhost:5000/api/post/unlike-post/${this.postId}`,{ id: userDeleteLike})
          });
        //   this.getPosts()
        })
        .then(()=>{
           localStorage.removeItem('categories')
           this.click = false
          this.deleteconfirm = true
            setTimeout(() => {
            this.$emit('close-modale-delete')
              
            }, 2500); 
        })
        .catch((err) => console.log(err)) 
      }catch(e) {
        localStorage.removeItem('categories')
      }
    }
  },
 },
 async mounted(){
     axios.defaults.withCredentials = true;
   await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
  
    this.userjwtid = res.data
    console.log(res.data);

    }).catch((error)=>{
      console.log(error);
    })

   await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
   
        this.userid = docs.data._id
     console.log(this.userid);
  
    }).catch((error)=>{
      console.log(
       error
      );
    })
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
  height: 280px;
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
