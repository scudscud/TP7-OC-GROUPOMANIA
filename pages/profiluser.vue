<template>
  <v-card class="card">
    <v-card-text class="card-profil-title"
      ><h1 class="card-profil-title-h1">Mon profil</h1></v-card-text
    >

    <v-card-text class="card-profil-name">
      <!-- <div class="picture"> -->
        <div class="block-picture">
          <label class="lab-pic" for="avatar">
            <img class="form-avatar-dl" src="../logo/avatar1.png" />
            <v-icon class="lab-pic-custom" size="25px">mdi-camera-plus</v-icon>
            </label>
        <!-- </div> -->
        <input
          id="avatar"
          class="form-avatar-profil"
          type="file"
          value="test"
          name="avatar"
          placeholder="votre photo/avatar"
          @change="getImage"
        />
<!-- 
        <div id="display-image">{{ picutername }}</div> -->
      </div>
      <!-- <span class="lastname">lastname{{ lastname }}</span
      ><span class="firstname">firstname{{ firstname }}</span> -->
      <span class="fullname">{{fullname}}</span>
    </v-card-text>

    <v-card-text class="card-profil-biographie">
      <h2>Ma bio</h2>
      <p class="card-profil-biographie-p">{{ biographieP }}</p>
      <button class="btn-bio-mod" @click="(modifbio = !modifbio), deletebio()">
        modifier ma bio
      </button>
    </v-card-text>

    <v-card-text v-show="modifbio">
      <form method="post" @submit.prevent>
        <label for="biographie"><h2>Biographie :</h2></label>
        <textarea
          v-model="bio"
          name="biographie"
          class="card-profil-textarea"
          type="textarea"
          placeholder="votre biographie"
          maxlength="500"
        ></textarea>

        <div class="btn-bio">
          <button id="btn-bio-send" type="submit">Enregistrer</button>
          <button id="btn-bio-delete" @click="deletebio">Annuler</button>
          <button
            id="btn-bio-close"
            @click="deletebio(), (modifbio = !modifbio)"
          >
            Fermer
          </button>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      picutername: "",
      modifbio: false,
      bio: "",
      biographieP: "C'est vide, Vous n'avez rien à nous raconter ? 😪",
      lastname: "test",
      firstname: "test",
   
    };
  },
  computed:{
     fullname: {
    
      get() {
        return this.firstname + ' ' + this.lastname
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(' ')
      }
    }
  },
  

  methods: {
    deletebio() {
      console.log(this.bio);
      this.bio = "";
    },

    getImage(imagename) {
      let name = avatar.value;
      let namereg = name.replace(/^.*\\/, "");
      this.picutername = namereg;
    },
  },
};
</script>

<style lang="scss">
.lab-pic {
  display: flex;
  width: 100%;
}

.lab-pic-custom {
  position: relative;
  top: 80px;
  left: -30px;
  height: 38px;
  width: 38px;
  background-color: $tertiary;
  border-radius: 50%;
  border: solid 2px $primary;
  padding-bottom: 2%;
  padding-right: 2%;
  &:hover {
    cursor: pointer;
  }
}

.form-avatar-profil {
  padding-top: 2%;
  display: none;
  visibility: none;
  &:hover {
    cursor: pointer;
  }
}

.card-profil-picture-user {
  display: flex;
  width: 120px;
  height: 120px;

  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
}

img.form-avatar-dl {
  display: flex;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.card-profil-title {
  border-bottom: solid 2px $primary;
  background-color: $secondary;
}

.card-profil-title-h1 {
  padding-top: 2%;
  padding-bottom: 1%;
  font-size: 2.5rem;
  font-weight: bolder;
  font-style: italic;
  color: $primary;
}

div.v-card__text.card-profil-name {
  padding-top: 1%;
  display: flex;
  justify-content: center;
  background-color: $tertiary;
}

.lastname {
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  padding-top: 4%;
//   padding-left: 1%;
}

.fullname{
    padding-top: 1%;
  padding-left: 1%;
  font-size: 1.8rem;
  padding-top: 4%;
}
.firstname {
  padding-top: 1%;
  padding-left: 1%;
  font-size: 1.8rem;
  padding-top: 4%;
}

.picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-profil-biographie {
  border-bottom: solid 2px;
}

p.card-profil-biographie-p {
  margin: 0;
  padding-left: 1%;
  padding-bottom: 2%;
  border: 2px solid $primary;
  cursor: default;
}

.btn-bio {
  display: flex;
  flex-direction: row;
}

.card-profil-textarea {
  width: 100%;
  color: $secondary;
  border: solid 2px $tertiary;
  padding: 1%;
  &:focus {
    outline: none;
  }
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
  // flex-grow: 80%;
  // flex-shrink: 100%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}
.btn-bio-mod {
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
</style>
