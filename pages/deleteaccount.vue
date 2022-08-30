<template>

<v-col class="overlay-delacc d-flex  justify-center align-center">
<v-card class="popup-delacc">
  <p> 😭 Vous-êtes sur de vouloir partir ?  😭 </p>
  <p>si tel est votre choix ...</p>
    
<p class="logo-delacc"><img class="logo-white-delacc" src="../logo/logo.png" />La team GROUPOMANIA </p>
<p  id="del-acc-con" v-if="deleteconfirm = !deleteconfirm" >
<span>Compte supprimer avec succée</span>
<span>à bientôt peut etre ☺️</span>
</p>
<v-btn id="btn-deco-delacc-denied" type=text href="./index.vue" ><span>Non j'ai changer d'avis</span></v-btn>
<v-btn id="btn-deco-delacc" @click="delAccount" type=text ><span>Supprimer</span></v-btn>
</v-card>
</v-col>
</template>


<script>

import axios from "axios"

export default {
  name: 'DelAcc',
    data(){
return{
deleteconfirm: false,



}
  },
methods:{
  delAccount(){
    axios.delete(`http://localhost:5000/api/user/${this.userid}`)
   .then(()=>{
        
          this.deleteconfirm = true
             setTimeout(() => {
            this.deleteconfirm = true
            window.location.reload()            
            }, 2500); 
        })
        .catch((err) => console.log(err)) 
        }


},
async mounted(){
  axios.defaults.withCredentials = true;
        // console.log($refs.deletepost.$el)

   await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
    //   console.log(this.userjwtid);
    this.userjwtid = res.data
    this.show = true
    this.log = true
    // TODO => Insert loader \\ 
    }).catch((error)=>{
      console.log(error);
    })

   await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
   
        this.userid = docs.data._id
        this.firstname = docs.data.firstname
        this.lastname = docs.data.lastname
        this.userpicture = docs.data.pictureprofil
           console.log(this.userid)
        // console.log(this.firstname)
    }).catch((error)=>{
      console.log(
       error
      );
    })

}




}
</script>

<style lang="scss">
 .overlay-delacc {
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

.popup-delacc{
  padding-bottom: 1%;
  padding-top: 1%;
  background-color: $secondary;
  max-width: 500px;
  min-width: 300px;
  width: 300px;
  max-height: 300px;
  min-height: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-delacc{
display: flex;

}
.logo-white-delacc{
display: flex;
flex-direction: row;
width: 30px;
padding-right: 2%;
}

#btn-deco-delacc-denied{
background-color: green;
margin-bottom: 2%;
width: 100%;
justify-content: center;
align-items: center;
&:hover{
  background-color: greenyellow;
  color: black;
}
}


#btn-deco-delacc{
 
background-color: $primary;
width: 100%;
justify-content: center;
align-items: center;
&:hover{
  background-color: $tertiary;
  color: $primary;
}
}

p#del-acc-con{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 2%;
  
}
</style>