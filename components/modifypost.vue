<template>
<div class="overlay-modify">
    <v-card id="card-post-modify"  >
         <v-card-text class="card-profil-title-modify"
      ><h1 class="card-modify-title-h1">Modifier</h1></v-card-text>
 
      <v-card-text id="card-autor">
                <img class="picture-user" src="../logo/avatar1.png" alt="photo de profil"/>
                <p class="fullname">{{fullname}}</p>
                  <button id="btn-send-post" type="submit"><div id="div-btn-send"><v-icon id="icon-btn-send">mdi-check-circle</v-icon><span id="span-btn-send">Valider</span></div></button> 
                     <router-link to="/" id="back-book"> <button id="btn-back"  @click="deletebio(),$emit('close-modale-modify')" > <div id="div-btn-back"><v-icon id="icon-btn-delete"> mdi-arrow-left-circle</v-icon><span id="span-back">Retour</span> </div></button></router-link>

        </v-card-text>
        <div class="picture-create-post">
          <h3 id="card-create-picture">Votre photo</h3>
      <img  id="card-img"
        src="/v.png"
        alt="Vuetify.js">
          <div class="btn-picture">
          <button id="btn-picture-send" type="submit"><span class="span-btn-post">Enregistrer votre photo</span></button>
          <button id="btn-picture-delete"><span class="span-btn-post">Annuler</span></button>
          <!-- <button
            id="btn-bio-close"
            @click="deletebio(), (modifbio = !modifbio)"
          >
            Fermer
          </button> -->
        </div>
     </div>
         <v-card-text id="card-comment" >
      <form method="post" @submit.prevent>
        <label for="biographie"><h2 class="comment-title">Votre commentaire</h2></label>
        <textarea
          v-model="bio"
          name="biographie"
          class="card-create-comment"
          type="textarea"
          placeholder="Ecrivez ici votre commentaire"
          maxlength="300"
        ></textarea>

        <div class="btn-bio">
          <button id="btn-comment-send" type="submit"><span class="span-btn-post">Enregistrer le commentaire</span></button>
          <button id="btn-comment-delete" @click="deletebio() "><span class="span-btn-post">Annuler</span></button>
          <!-- <button
            id="btn-bio-close"
            @click="deletebio(), (modifbio = !modifbio)"
          >
            Fermer
          </button> -->
        </div>
      </form>
    </v-card-text>
  </v-card>
 
</div>
</template>
<script>


export default{

  data(){
    return {
      picutername: "",
      modifbio: false,
      bio: "",
      biographieP: "C'est vide, Vous n'avez rien à nous raconter ? 😪",
      lastname: "test",
      firstname: "test",
    }
    },
 methods: {
    deletebio() {
      console.log(this.bio);
      this.bio = "";
    },
 },
     computed:{
      date(){
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
// today = mm+'-'+dd+'-'+yyyy;
// today = mm+'/'+dd+'/'+yyyy;
// today = dd+'-'+mm+'-'+yyyy;
today = dd+'/'+mm+'/'+yyyy;
 return today
      },

    hour(){ 
    const d = new Date();

    let hh =  d.getHours();
    let mi = d.getMinutes();

    if(hh<10)
    {
      hh='0'+hh;
    }
    if(mi <10)
{
     mi='0'+mi;
    }
    let hours = hh+":" + mi;

    return hours
    },
     fullname: {
      get() {
        return this.firstname + ' ' + this.lastname
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(' ')
      }
    }
  },

}

</script>

<style lang="scss">

.overlay-modify {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: -160px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  visibility: visible;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.4s;
  z-index: 10;
}

#card-post-modify{
  width: 75vw;
align-items: center;
justify-content: center;
background-color: $tertiary;
border: solid 5px;
border-color: $secondary;
border-radius: 1%;
};

.card-profil-title-modify {
// border-radius: 5%;
  border-bottom: solid 2px $primary;
  background-color: $secondary;
}
.card-modify-title-h1 {
  padding-top: 2%;
  padding-bottom: 1%;
  font-size: 2.5rem;
  font-weight: bolder;
  font-style: italic;
  color: $primary;
}
#card-autor{
display: flex;
flex-direction: row;
width: 100%;
padding-top: 0.5%;
};

.poster-info{
flex-direction: row;
width: auto;
height: 20px;
}
.picture-user{
  margin-top: 1.5%;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%; 
}
.fullname{
  margin-left: 1%;
  margin-right: auto;
  // padding-right: auto;
  padding-top: 2.5%;
  font-weight: bold;
}

// .post-date-full{
//   display: flex;
//   width: 100%;
//   padding-top: 1.5% ;
// }
// .date-now{
//     padding-top: 1.5%;
//   margin-left: 0.5%;
//   font-style: italic;
// }

// .hour-now{
//     padding-top: 1.5%;
//   margin-left: 0.5%;
//    font-style: italic;
//    margin-right: auto;
// }

// .hour-à{
//     padding-top: 1.5%;
//   margin-left: 0.5%;
 
// }
// .post-date{
//     padding-top: 1.5%;
//   margin-left: 0.5%;
  
// }
#back-book{
  display: flex;

  // align-items:center;
  // justify-content: center;
  text-decoration: none;
color:$secondary;
   border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-top: 0%;
  padding-left: 1%;
  padding-right: 1%;
  &:hover {
    background-color: $secondary;
      border-radius: 20%;
   &#back-book>#btn-back{
    color:$tertiary;
    &#btn-back>#div-btn-back>#icon-btn-delete{
      color:$tertiary;
    }
   }
  }
} 

#icon-btn-delete{
  padding-left: 5%;
}

#div-btn-back{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
#btn-back{
  padding-left: 0;
  padding-right: 0;
}

#span-back{
  padding-left: 10%;
  padding-right: 10%;
}

// #btn-delete-post{
//   width: 100%;
//   margin-top: 10%;
//   margin-right: 1%;
//   padding-top: 10%;
//   padding-left: 5px;
//   padding-right: 5px;
//   color: $secondary;
//   :hover{
//     background-color: $secondary;
//     color: $tertiary;
//   }
// }

#btn-send-post{
  color:$secondary;
   border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 1%;
  padding-right: 1%;
  &:hover {
    border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
    &#btn-send-post>#div-btn-send>#icon-btn-send{
        color:$tertiary;
    }
  }
}

#div-btn-send{
  display: flex;
 justify-content: center;
 align-items: center;
}

#icon-btn-send{
  padding-right: 7%;
}

.picture-create-post{
border-top: solid 2px $secondary;
border-bottom: solid 2px $secondary;
border-radius: 10%;
margin-bottom: 1%;
padding: 1.5%;
}

#card-create-picture{
  display: flex;
  // margin-left: 1.5%;
  color: $secondary;
  padding-top: 1%;
  justify-content: center;
  // border-top:solid 2px $secondary;
  // border-radius: 30%;
  }

#card-img{
display: flex;
justify-content: center;
align-items: center;
width: 100%;
// border-top: solid 2px $secondary;
// border-bottom: solid 2px $secondary;
// border-radius: 10%;
max-height: 200px;
padding: 1%;
};

.card-create-comment {
  width: 100%;
  color: $secondary;
  border: solid 2px $tertiary;
  padding: 1%;
  &:focus {
    outline: none;
  }
}

#card-comment{
border-top: solid 2px $secondary;
border-bottom: solid 2px $secondary;
border-radius: 10%;
margin-bottom: 1%;
}

h2.comment-title{
  display: flex;
  justify-content: center;
  padding-top: 1%;
  padding-bottom: 1%;
  color: $secondary;
}

#btn-picture-delete {
  border: solid 2px $secondary;
  border-radius: 30%;
  margin-right: auto;
  margin-top: 1%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 4px;
  color: $secondary;
  &:hover {
     border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-picture-send {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  color: $secondary;
  &:hover {
     border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-comment-send {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  color: $secondary;
  &:hover {
     border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-comment-delete {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  color: $secondary;
  &:hover {
     border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}

.span-btn-post{
  padding-bottom: 5%;
}

</style>