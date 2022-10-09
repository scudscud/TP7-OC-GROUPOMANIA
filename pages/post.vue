<template>

<v-card id="card-post-comp"  >
 
      <v-card-text id="card-autor">
                <img class="picture-user" src="../logo/avatar1.png" alt="logo" />
                <span class="fullname">{{fullname}}</span><span class="post-date"> à posté le :</span><span class="date-now">{{date}}</span><span class="hour-à"> à </span><span class="hour-now">{{hour}}</span>
        </v-card-text>
      <img class="card-img mb-5"
        src="/v.png"
        alt="Vuetify.js">
     
         <v-card-text >
      <form method="post" @submit.prevent>
        <label for="biographie"><h2>Votre commentaire</h2></label>
        <textarea
          v-model="bio"
          name="biographie"
          class="card-create-comment"
          type="textarea"
          placeholder="Ecrivez ici votre commentaire"
          maxlength="300"
        ></textarea>

        <div class="btn-bio">
          <button id="btn-bio-send" type="submit">Enregistrer</button>
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
    let hours = d.getHours()+":" + d.getMinutes();
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

#card-post-comp{
  
  margin-top: 80px;
  margin-left: 10%;
align-items: center;
justify-content: center;
background-color: $tertiary;
border: solid;
border-color: $secondary;
width: 80%
};
.poster-info{
flex-direction: row;
width: auto;
height: 20px;
}
.picture-user{
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
  padding-top: 1.5%;
font-weight: bold;
}
.date-now{
    padding-top: 1.5%;
  margin-left: 0.5%;
  font-style: italic;
}

.hour-now{
    padding-top: 1.5%;
  margin-left: 0.5%;
   font-style: italic;
}

.hour-à{
    padding-top: 1.5%;
  margin-left: 0.5%;
 
}
.post-date{
    padding-top: 1.5%;
  margin-left: 0.5%;
  
}
#card-autor{
display: flex;
flex-direction: row;
width: 100%;
padding-top: 0.5%;
};

.card-img{
display: flex;
justify-content: center;
align-items: center;
width: 100%;
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

</style>