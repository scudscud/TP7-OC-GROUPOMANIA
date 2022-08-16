<!-- const axios = require('axios') -->

<template>
<!-- <div ></div> -->
<v-card id="card-post"  >
 
      <v-card-text id="card-autor">
                <img class="picture-user" src="../logo/avatar1.png" alt="photo de profil"/>
                <p class="fullname">{{fullname}} à posté le {{date}} à {{hour}}</p>
                  <button id="btn-send-post" type="submit">Envoyer votre post</button> 
                     <router-link to="/" id="back-book"> <button id="btn-delete-post"  @click="deletebio()" > retour Trend </button></router-link>

        </v-card-text>
        <div class="picture-create-post">
          <h3 id="card-create-picture">Votre photo</h3>
      <img  id="card-img"
        src="/v.png"
        alt="Vuetify.js">
          <div class="btn-picture">
          <button id="btn-picture-send" type="submit">Enregistrer votre photo</button>
          <button id="btn-picture-delete">Annuler</button>
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
          <button id="btn-bio-send" type="submit">Enregistrer le commentaire</button>
          <button id="btn-bio-delete" @click="deletebio">Annuler</button>
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

#card-post{
align-items: center;
justify-content: center;
background-color: $tertiary;
border: solid;
border-color: $secondary;
};

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
  align-items:center;
  justify-content: center;
  text-decoration: none;
color:$secondary;
   border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
} 

#btn-delete-post{
  width: 100%;
  margin-top: 1%;
  margin-right: 1%;
  padding-top: 15%;
  padding-left: 5px;
  padding-right: 5px;
  color: $secondary;
}

#btn-send-post{
  color:$secondary;
   border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
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

.blockquote{
margin-top: 10px;
margin-right: 20px;
overflow: hidden;
text-overflow: ellipsis;
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

.btn-bio {
  display: flex;
  flex-direction: row;
}
#btn-bio-delete {
  border: solid 2px $secondary;
  border-radius: 30%;
  margin-right: auto;
  margin-top: 1%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-bio-send {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-bio-close {
  border: solid 2px $secondary;
  margin-top: 1%;
  //   margin-left: 80%;
  flex-grow: 80%;
  flex-shrink: 100%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-picture-delete {
  border: solid 2px $secondary;
  border-radius: 30%;
  margin-right: auto;
  margin-top: 1%;
  padding-left: 5px;
  padding-right: 5px;
  color: $secondary;
  &:hover {
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
  color: $secondary;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

</style>



