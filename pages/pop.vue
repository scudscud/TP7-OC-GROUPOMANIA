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

</script>