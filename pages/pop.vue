<template>
<div class="form-popup" id="popup-Form">
 
    <h2>Voulez-vous vraiment vous deconnecter</h2>
    <label for="email">
      <strong>E-mail</strong>
    </label>
    <input type="text" placeholder="Votre Email" name="email" required />
    <label for="psw">
      <strong>Mot de passe</strong>
    </label>
    <input type="password" placeholder="Votre mot de passe" name="psw" required />
    <button type="submit" class="btn">Se connecter</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Annuler</button>

</div>


</template>
<script>
// //---------------------------------option a dev read URL --------------------------------\\

//   //       <!-- <router-link   to="/postpage"> 
//   //    <button  @click="log" v-if="log != `http://localhost:3000/postpage`" class="btn-post-router-plus"><v-icon id="icon">mdi-newspaper-plus </v-icon> </button>
//   //    <button  v-else  class="btn-hover"> <v-icon id="icon">mdi-newspaper-plus </v-icon></button>
//   //  </router-link>  -->


//     log(){
//       let base =this.$el.baseURI
//    let   page = base.split('/')[3]
//  console.log(page);
//      return page
   
//     }


// ===============================================================================================

// <!-- //------------------------option modale create post ---------------------------------------\\ -->
// <!--     
//       <v-btn @click="showpost = !showpost" id="btn-post-nav" alt="menu">
//         <v-icon>mdi-newspaper-plus </v-icon>
//         </v-btn>  
//        -->
// <!-- //================================================================================================\\ -->

//     <!-- //---------------------------------option switch class button ------------------------------\\ -->
//         <!-- <router-link     to="/postpage"> 
//       <button :class="hoverbtn ? 'btn-hover' : 'btn-post-router-plus' "  @click=" toggleClass" alt="menu" >
//         <v-icon id="icon">mdi-newspaper-plus </v-icon>
//         </button>  
//         </router-link> -->

//     toggleClass(event){
//        this.hoverbtn = !this.hoverbtn;
//     },
// <!-- //================================================================================================\\ -->

// .btn-hover{
//   margin-left: 10%;
// background-color: $secondary;
//   border: solid $tertiary;
//   color:$tertiary;
//   border-radius: 20%;
//   &.btn-hover>#icon{
//     color: black;
//   }
//   }


// <<============================ FORMAT date ======================================================================>>
//------------------------------------------format date---------------------------------------------------------\\
   // date() {
    //   let today = new Date();
    //   let dd = today.getDate();

    //   let mm = today.getMonth() + 1;
    //   let yyyy = today.getFullYear();
    //   if (dd < 10) {
    //     dd = "0" + dd;
    //   }
    //   if (mm < 10) {
    //     mm = "0" + mm;
    //   }
    //   // today = mm+'-'+dd+'-'+yyyy;
    //   // today = mm+'/'+dd+'/'+yyyy;
    //   // today = dd+'-'+mm+'-'+yyyy;
    //   today = dd + "/" + mm + "/" + yyyy;
    //   return today;
    // },
    // hour() {
    //   const d = new Date();
    //   let hours = d.getHours() + "h" + d.getMinutes();
    //   return hours;
    // },
    // fullname: {
    //   get(full) {
    //     // console.log(fullname);
    //     // [post.posterfirstname + " " + post.posterlastname] = test
    //     return post.posterfirstname + " " + post.posterlastname;
    //   },
    //   set(name) {
       
    //     [post.posterfirstname, post.posterlastname] = name.split(" ");
        
    //   },
    // },
   // date() {
    //   let today = new Date();
    //   let dd = today.getDate();

    //   let mm = today.getMonth() + 1;
    //   let yyyy = today.getFullYear();
    //   if (dd < 10) {
    //     dd = "0" + dd;
    //   }
    //   if (mm < 10) {
    //     mm = "0" + mm;
    //   }
    //   // today = mm+'-'+dd+'-'+yyyy;
    //   // today = mm+'/'+dd+'/'+yyyy;
    //   // today = dd+'-'+mm+'-'+yyyy;
    //   today = dd + "/" + mm + "/" + yyyy;
    //   return today;
    // },
    // hour() {
    //   const d = new Date();
    //   let hours = d.getHours() + "h" + d.getMinutes();
    //   return hours;
    // },
    // fullname: {
    //   get(full) {
    //     // console.log(fullname);
    //     // [post.posterfirstname + " " + post.posterlastname] = test
    //     return post.posterfirstname + " " + post.posterlastname;
    //   },
    //   set(name) {
       
    //     [post.posterfirstname, post.posterlastname] = name.split(" ");
        
    //   },
    // },
    //--------------------------------------------------------------------------------------\\
//====================================end format date ========================================================>>

</script>