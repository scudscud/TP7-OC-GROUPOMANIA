<template>
    
  <div class="overlay">
    <div>
        <TermOfUse v-show="termofuse" @close-modal-use="termofuse = false" />
      </div>
    <v-col class="d-flex justify-center align-center overlaybis">
      <v-col class="form-sign">
        <v-card id="logo-form" class="logo py-4 d-flex justify-center"
          ><h1><span id="form-span1">Vous inscrire </span></h1></v-card
        >
        <v-card class="cont-card">
          <v-col id="logo-form2" cols="12" sm="12" md="12">
            <v-card-text>
              <form class="form-container" method="post">
                <label for="avatar">
                  <h2 class="titleh2">Votre photo / avatar</h2>
                </label>
                <img class="form-avatar-dl" src="../logo/avatar1.png" />
                <input
                  class="form-avatar"
                  type="file"
                  value="test"
                  name="avatar"
                  placeholder="votre photo/avatar"
                />
                <v-spacer />
                <label for="nom">
                  <h2 class="titleh2">Nom</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                  value=""
                  name="nom"
                  placeholder="nom"
                  required
                />
                <v-spacer />
                <label for="prenom">
                  <h2 class="titleh2">Prénom</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                  placeholder="prenom"
                  name="prenom"
                  required
                />
                <v-spacer />
                <label for="email">
                  <h2 class="titleh2">Votre mail Groupomania</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                  value="@groupomania.fr"
                  name="email"
                  required
                />

                <v-spacer />
                <label for="badge">
                  <h2 class="titleh2 ">Numéro de badge</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                  placeholder="N° de badge"
                  name="badge"
                  required
                />
                <v-spacer />
                <label for="psw">
                  <h2 class="titleh2">
                    Mot de passe Groupomania-socialnetwork
                  </h2>
                </label>
                <v-spacer />
                <input v-model="psw"
                 @change="testpsw"
                  class="form-input "
                  type="password"
                  placeholder="Votre mot de passe"
                  name="psw"
                  required
                />
                <v-spacer />
                <label for="psw-com">
                  <h2 class="titleh2">Comfirmer votre mot de passe</h2>
                </label>
                <v-spacer />
                <input   v-model="pswcom"  @change="testpsw"
            
                  class="form-input "
                  type="password"
                  placeholder="Comfirmer votre mot de passe"
                  name="pswcom"
                  required
                />
                <v-spacer />
                  
                <div class="check-box">
                <label for="condition">
                    <p
                    @click.stop=" termofuse=true"
                    class="titleh2-check">Veuillez accepter nos condition d'utilisation
                    </p>
                </label>
                <input
                  class="form-input-check"
                  type="checkbox"
                  name="condition"
                  required
                /> 
              </div>
                <v-spacer />
                <button  type="submit" class="btn" >
                  <h2 class="h2-form">Inscritpion</h2>
                </button>
                &nbsp
                <button href="./index.vue" class="btn cancel">
                  <h2 class="h2-form">Annuler</h2>
                </button>
              </form>
                      
              <button id="form-span2">
                <button
                  class="btn"
                  id="link-sign"
                  @click="$emit('close-modal')"
                >
                  retour a l'acceuil &nbsp<v-icon>mdi-arrow-left-circle</v-icon>
                </button>
              </button>
              <!-- </div> -->
            </v-card-text>
          </v-col>
        </v-card>
      </v-col>
    </v-col>
  </div>
</template>

<script>

import TermOfUse from "./term-of-use.vue";

export default {
 
  name: "IndexPage",
  components: { TermOfUse},
  data() {
    return {
      testpsw: true,
      termofuse: false,
      psw: '',
      pswcom:'',
    

    methods : {

       testpsw: function(){
        console.log(this.psw);
        console.log(this.pswcom);
        if (this.psw != this.pswcom){
       alert('erreur'); 
        }else{
          alert('ok')
         
        }
      }
    

  //   testpsw(){
  //  a = document.getElementById(psw-1).value;
  //   b = document.getElementById(psw-2).value;
  //   if( a != b){
  //   alert('erreur')

  //   }else{
  //     alert('ok ')
  //   }
  //   }


    },
  }

}
}




</script>

<style lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  visibility: visible;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.4s;
  z-index: 100;
}

div.overlaybis {
  // height: 100%;
  // width: 50%;
  padding-left: 10%;
  padding-right: 10%;
}

.cont-card {
  display: flex;
  height: 100%;
  width: 100%;
}

.form-sign {
  height: 95%;
  width: 50%;
  border: solid 5px $secondary;
  border-radius: 10%;
  padding: 0;
  // background-color:$tertiary;
  overflow: hidden;
  // background-color: #fff;
}

input {
  width: 50%;
  height: 2.5rem;
}

button {
  padding-right: 1rem;
  padding-left: 1rem;
}

h1 {
  color: $secondary;
  display: flex;
  width: 100%;
  justify-content: center;
}
// check box \\

.check-box {
  display: flex;
  justify-content: center;
align-items: baseline;
  background-color: $tertiary;
  padding-top: 1%;
}

.form-input-check {
  justify-content: center;
  align-items: center;
  padding-left: 1%;
  border: solid 1px $secondary;
  font-size: 1em;
  color: $secondary;
  width: 10%;
  height: 50%;
}

.titleh2-check {
  color: $secondary;
  // padding-bottom: 0.5rem;
//  margin-top: 1rem;
  color: $secondary;
}
.titleh2-check:hover{
  color: $primary;
  text-decoration: underline;
  // font-size: 1.001rem;
}

//______________________________\\
.titleh2 {
  color: $secondary;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  color: $secondary;
}

.btn {
  border: solid 2px $secondary;
  margin-top: 20px;
}
.btn:hover {
  background-color: $secondary;
  color: $tertiary;
}

div.logo {
  flex-direction: row;
  flex-wrap: nowrap;
  height: 75px;
}

#form-span2 {
  display: flex;
  font-size: 1em;
  padding-top: 1%;
  padding-bottom: 1%;
}

#link-sign {
  display: flex;
  text-decoration: none;
  color: white;
  border: solid 2px $secondary;
  border-radius: 30%;
}

#link-sign:hover {
  background-color: $secondary;
  color: $tertiary;
}

div.v-card__text {
  padding-top: 0;
}

input {
  color: black;
}

#logo-form {
  border-radius: 0%;
  background-color: $tertiary;
  border-bottom: solid 5px red;
}

#logo-form2 {
  border-radius: 0%;
  width: auto;
  height: 100%;
  background-color: $tertiary;
}

img.form-avatar-dl {
  display: flex;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
}

.form-input {
  justify-content: center;
  align-items: center;
  padding-left: 1%;
  border: solid 1px $secondary;
  font-size: 1em;
  color: $secondary;
  width: 70%;
  height: 80%;
}

.form-place {
  padding-left: 5%;
}
.h2-form {
  padding: 5px;
}
</style>
