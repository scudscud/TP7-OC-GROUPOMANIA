<template>
  <div id="test" class="overlay">
    <div>
      <TermOfUse v-show="termofuse" @close-modal-use="termofuse = false" />
    </div>
    <v-col class="main d-flex justify-center align-center overlaybis">
      <v-col class="form-sign">
        <v-card id="logo-form" class="logo py-4 d-flex justify-center"
          ><h1><span id="form-span1">Vous inscrire </span></h1></v-card
        >
        <v-card class="cont-card">
          <v-col id="logo-form2" cols="12" sm="12" md="12">
            <v-card-text>
              <form @submit.prevent class="form-container" ref="formsignup">
                <!-- <label for="avatar">
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
                <v-spacer /> -->

                <label for="nom">
                  <h2 class="titleh2">Nom</h2>
                </label>
                <v-spacer />
                <input
                  style="text-transform:lowercase"
                  v-model="lastname"
                  class="form-input"
                  type="text"
                 
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
                  style="text-transform:lowercase"
                  v-model="firstname"
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
                  style="text-transform:lowercase"
                  v-model="email"
                  class="form-input"
                  type="text"
                  placeholder="nom.prenom@groupomania.fr"
                  name="email"
                  required
                />

                <v-spacer />
                <label for="badge">
                  <h2 class="titleh2">Numéro de badge</h2>
                </label>
                <v-spacer />
                <input
                  v-model="badge"
                  class="form-input"
                  type="text"
                  placeholder="N° de badge"
                  name="badge"
                  required
                />
                <v-spacer />
                <label for="pass">
                  <h2 class="titleh2">
                    Mot de passe Groupomania-socialnetwork
                  </h2>
                </label>

                <input
                  id="pass"
                  v-model="psw"
                  name="pass"
                  class="form-input"
                  type="password"
                  placeholder="Votre mot de passe"
                 
                  required
                />
                <div class="rules">
                  <div
                    class="rulespan"
                    v-for="error in passwordValidation.errors"
                  >
                    {{ error }}
                  </div>
                </div>
                <v-spacer />
                <label for="passcom">
                  <h2 class="titleh2">Comfirmer votre mot de passe</h2>
                </label>
                <input
                  id="passcom"
                  v-model.lazy="pswcom"
                  :disabled="!passwordValidation.valid"
                  name="passcom"
                  class="form-input"
                  type="password"
                  placeholder="Comfirmer votre mot de passe"
                  
                  required
                />

                <v-spacer />

                <div class="check-box">
                  <label for="condition">
                    <span @click.stop="termofuse = true" class="titleh2-check">
                      Veuillez accepter nos condition d'utilisation
                    </span>
                  </label>
                  <input
                    v-model="check"
                    class="form-input-check"
                    type="checkbox"
                    name="condition"
                    required
                  />
                </div>
                <div class="errormsg" v-if="(validatesForm = true)">
                  <span>{{ formfull }}</span>
                </div>
                <div v-else>
                  <span>{{ formfull }}</span>
                </div>
                <div class="errormsg">{{ infomsg }}</div>
                <div class="successmsg">{{ successreg }}</div>

                <v-spacer />
                <button
                  @click="loginInfo"
                  :disabled="validatedForm"
                  type="submit"
                  class="btn-valid"
                >
                  <h2 class="h2-form">Inscritpion</h2>
                </button>
                <!-- &nbsp
                <button href="./index.vue" class="btn cancel">
                  <h2 class="h2-form">Annuler</h2>
                </button> -->
              </form>

              <button id="form-span2">
                <button
                  class="btn"
                  id="link-sign"
                  @click="$emit('close-modal'), reset()">
                  retour a l'acceuil &nbsp<v-icon>mdi-arrow-left-circle</v-icon>
                </button>
              </button>
            </v-card-text>
          </v-col>
        </v-card>
      </v-col>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
import TermOfUse from "../components/term-of-use.vue";

export default {
  name: "IndexPage",
  components: { TermOfUse },
  // props:{
  //   psw:"",
  //   pswcom:""
  // },
  data() {
    return {
      rules: [
        { message: "le mot de passe doit contenir : 1 chiffre,",regex: /[0-9]+/,},
        { message: "1 miniscule,", regex: /[a-z]+/ },
        { message: "1 majuscule,", regex: /[A-Z]+/ },
        { message: "1 caractere speciale", regex: /[!@#$%^&]+/ },
        { message: "8 caracteres minimun", regex: /.{8,}/ },
      ],
      // testpsw:true,
      // passwordValidation.valid :false,
      termofuse: false,
      successreg: "",
      infomsg: "",
      formfull: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      psw: "",
      pswcom: "",
      badge: "",
      check: "",
      mailValid:false
    }
  },
  computed: {
       mailValidation(){
        // ====== si bug doublebackslash new regexp consum one bs =======\\
      let mail =  new RegExp('[a-z]+\.[a-z]@groupomania.fr')
      let testMail = mail.test(this.email)
    if(testMail = true){
      this.mailValid = true

     }
    },

    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.psw)) {
          errors.push(condition.message);
        }
      }
      if (errors.length != 0) {
        return { valid: false, errors };
      } else {
        return { valid: true, errors };
      }
    },

    validatedForm() {
      if (
        this.firstname != "" &&
        this.lastname != "" &&
        this.badge != "" &&
        this.email != "" &&
        this.psw != "" &&
        this.check != false
      ) {
        this.formfull = "";
        return false;
      } else {
        this.formfull = "Veuillez completer le formulaire";

        return true;
      }
    },
  },

  methods: {
    async loginInfo() {
      if (this.psw != this.pswcom) {
        this.infomsg = "Veuillez vérifier votre mot de passe";
        return false
      }
     if(this.mailValid = false){
       this.infomsg = "il y a une erreur, Réessayer";
        return false
     }
      
      await axios
        .post("http://localhost:5000/api/user/register", {
          firstname: this.firstname,
          lastname: this.lastname,
          badge: this.badge,
          email: this.email,
          password: this.psw,
        })
        .then(() => {
         
          this.successreg = "Compte creer avec succée, Bienvenue";
          window.prompt("entrer la clé reçu par mail ( n'importe quel touche)")
          setTimeout(() => {
            this.firstname=""
          this.lastname="",
          this.badge="",
          this.email="",
          this.psw="",
            window.location.href = "./";
          }, 2000);
        })
        .catch((error) => {
          this.firstname=""
          this.lastname="",
           this.badge="",
          this.email="",
         this.psw="",
          this.infomsg = error.response.data.error;
            setTimeout(() => {
            this.infomsg = "";
          }, 3000);
        });
    },
  
 reset(){
         this.firstname=""
          this.lastname=""
           this.badge=""
          this.email=""
         this.psw=""
         this.termofuse= false
         this.pswcom = ""
         this.password= ""

  },

  },

};
// console.log(this.psw);
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

.main{
  margin-top: 5%;
}

.rules {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 1%;
}

.rulespan {
  padding-right: 3px;
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

input.form-input {
  justify-content: center;
  align-items: center;
  padding-left: 1%;
  border-radius: 5%;
  border: solid 3px $secondary;
  background-color: rgb(35, 143, 172);
  font-size: 1em;
  width: 55%;
  height: 80%;
  color: black;
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
.titleh2-check:hover {
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

.h2-form {
  padding: 5px;
}

.btn-valid:disabled {
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 30%;
  margin-top: 20px;
  border: solid 2px $secondary;
  background: #ccc;
  &:hover {
    background: #ccc;
    color: red;
  }
}

.btn-valid {
  margin-top: 20px;
  border: solid 2px $secondary;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
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

.form-place {
  padding-left: 5%;
}
.h2-form {
  padding: 5px;
}

.errormsg {
  color: red;
}

.successmsg {
  color: green;
}

.disabled {
  color: red;
}
</style>
