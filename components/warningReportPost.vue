<template>
    <div class="overlay-delete">
    <v-col class=" d-flex  justify-center align-center">
    
    <v-card class="popup-report-com ">
        <p class="logo-disconnect-delete"><img class="logo-white" src="../logo/logo.png" alt="logo" /><span>La team GROUPOMANIA </span></p>
        <p v-if="!reportconfirm"  id="span-report-post"><v-icon class="img-flag">mdi-flag</v-icon>Signaler la publication<v-icon class="img-flag">mdi-flag</v-icon></p>
        <p v-else  id="span-report-post-titre"><v-icon class="img-flag">mdi-flag</v-icon>Signalement reçu<v-icon class="img-flag">mdi-flag</v-icon></p>
        <p  v-if="!reportconfirm" id="span-report-post-2" >cette publication vous offense signaler la ainsi que son auteur ou autrice</p>
        <div  v-if="reportconfirm" id="span-report-post-signal"><h4>La team GROUPOMANIA</h4><span id="span-report">vous remercie et va étudier le cas au plus vite,</span><span id="span-report">N'hésitez pas à contacter la direction ou l'administrateur de réseau SCUD poste 26 si le cas est grave.</span></div>
        <v-btn v-if="!reportconfirm" id="btn-notreport-comfirm" @click="$emit('close-modale-report')" ><span >Retour</span></v-btn>
        <p v-if="!reportconfirm" class="comfirm-span-delete">N'hésitez pas !!</p>
        <v-btn v-if="!reportconfirm"  @click="reportconfirm = !reportconfirm"   id="btn-report-comfirm"  ><span>Signaler</span></v-btn>
    <!-- <v-btn v-else id="btn-delete-comfirm"  ><span>c'est fait <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon ></span></v-btn> -->
<!-- <v-btn v-if="!deleteconfirm" @click="deletedPost(userid)"  id="btn-delete-comfirm"  ><span>Supprimer le post</span></v-btn>
<v-btn v-else id="btn-delete-comfirm"  ><span>c'est fait <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon ></span></v-btn> -->
 
    </v-card>
    </v-col>
    </div>
    </template>
    
    
    <script>
    // import axios from "axios";
    
    // import { KeyObject } from "crypto";
    
    export default {
      // name: 'Delete',
    
      data(){
    return{
    reportconfirm: false ,
    // deleteconfirm: false ,
    // userid:'',
    // userjwtid:'',
    // postId:'',
    
    
    }
      },
      methods:{
    //     closeRecord(){
    //       this.$emit('!this.modifbio')
       
    //      this.$emit('close-modale-record')
    // },
        // delDeletePost(){
        //   localStorage.removeItem('categories')
        // },
    
    
    //  deletedPost(id) {
    //       if(localStorage.getItem('categories')) {
    //       try {
    //         this.postId = JSON.parse(localStorage.getItem('categories'))
      
    //    let data = this.userid
       
    //      axios.delete(`http://localhost:5000/api/post/${this.postId}`,{data : {id : id}}  )
    //       .then((Post) => {
               
    //           Post.data.likers.forEach(userDeleteLike=> {
    //           axios.patch(`http://localhost:5000/api/post/unlike-post/${this.postId}`,{ id: userDeleteLike})
    //           });
    //         //   this.getPosts()
    //         })
    //         .then(()=>{
    //            localStorage.removeItem('categories')
    //           this.deleteconfirm = true
    //             setTimeout(() => {
    //             this.$emit('close-modale-delete')
                  
    //             }, 2500); 
    //         })
    //         .catch((err) => console.log(err)) 
    //       }catch(e) {
    //         localStorage.removeItem('categories')
    //       }
    //     }
    //   },
    //  },

    //  async mounted(){
    //      axios.defaults.withCredentials = true;
    //    await axios.get(`http://localhost:5000/jwtid`)
    //     .then((res) => {
      
    //     this.userjwtid = res.data
    //     console.log(res.data);
    
    //     }).catch((error)=>{
    //       console.log(error);
    //     })
    
    //    await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    //     .then((docs) => {
       
    //         this.userid = docs.data._id
    //      console.log(this.userid);
      
    //     }).catch((error)=>{
    //       console.log(
    //        error
    //       );
    //     })
    //   },
    
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
    
     .popup-report-com {
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

    .img-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding-right: 5%;
  padding-left: 5%;
  &:before {
    color: $primary;
  }
  &:hover{
    color: $secondary;
  }
}

    
    #span-report-post{
    width:100% ;
    text-align: center;
    }
    #span-report-post-titre{
    width:100% ;
    text-align: center;
    color: rgb(37, 177, 46);
    }
    #span-report-post-2{
    width:100% ;
    text-align: center;
    padding: 1%;
    font-style: italic;
    }
    
    #span-report-post-signal{
    width:100% ;
    text-align: center;
    padding: 1%;
    font-style: italic;
    margin-bottom: 0;
    }
    
    #span-report{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-left: 1%;
    padding-right: 1%;
    font-style: italic;
    padding-bottom: 1%;
    }

    .comfirm-span-delete{ 
        padding-top: 3%;
    }
    
    #btn-notreport-comfirm{
    background-color: $secondary;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: green;
    margin-bottom: 1%;
    &:hover{
    background-color: green;
    color: $secondary;
    }
    }
    
    #btn-report-comfirm{
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
    