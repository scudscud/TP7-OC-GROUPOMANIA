<template>
  <div class="overlay">
    <v-col class="overlaybis" justify="center" align="center">
      <div>
        <SignUp v-show="showSignUp" @close-modal="showSignUp = false" />
      </div>

      <v-card
        id="header-index"
        class="logo py-4 d-flex justify-center align-center"
      >
        <h2 class="h2-sign-in">
          <button class="btn-login" @click.stop="$emit('close-modale')">
            connexion
          </button>
        </h2>
        <v-card-text class="sign-up-link">
          <span class="span-instruction"
            >Vous n'avez pas encore de compte ?</span
          >
          <span class="span-sign-up" @click.stop="showSignUp = true">
            Créer un compte
          </span>
        </v-card-text>
      </v-card>
      <v-card id="body-index">
        <v-col cols="12" sm="12" md="12">
          <v-card-text>
            <div class="form-popup" id="popup-Form">
              <form @submit.prevent class="form-container">
                <label for="email">
                  <h2>Votre mail Groupomania</h2>
                </label>
                <v-spacer />
                <input
                  v-model="email"
                  class="form-input"
                  type="text"
                  placeholder="Votre Email"
                  name="email"
                  required
                />
                <label for="badge">
                  <h2>Votre numéro de badge</h2>
                </label>
                <v-spacer />
                <input
                  v-model="badge"
                  class="form-input"
                  type="text"
                  placeholder="numéro de badge"
                  name="badge"
                  required
                />
                <v-spacer />
                <label for="psw">
                  <h2>Mot de passe Groupomania-socialnetwork</h2>
                </label>
                <v-spacer />
                <input
                  v-model="psw"
                  class="form-input"
                  type="password"
                  placeholder="Votre mot de passe"
                  name="psw"
                  required
                />
                <v-spacer />
                <div class="errormsg">{{ infomsg }}</div>
                <div v-if="successreg" class="successmsg">{{ successreg }}</div>
                <button
                  class="btn-valid"
                  @click="verifyUser"
                  :disabled="validatedForm"
                  type="submit"
                >
                  <h2 class="h2-form">Se connecter</h2>
                </button>
              </form>
            </div>
          </v-card-text>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";

import SignUp from "./sign-up.vue";

export default {

  name: "SignInPage",
  components: { SignUp },
  computed: {
    //     mailValidation(){
    //     // ====== si bug doublebackslash new regexp consum one bs =======\\
    //   let mail =  new RegExp('[a-z]+\.[a-z]@groupomania.fr')
    //   let testMail = mail.test(this.email)
    // if(testMail = true){
    //   return true
    //  }else{
    //   return false
    //  }
    // },

    validatedForm() {
      if (this.badge != "" && this.email != "" && this.psw != "") {
        this.formfull = "";
        return false;
      } else {
        this.formfull = "Veuillez completer le formulaire";
        return true;
      }
    },
  },

  methods: {
     
    async verifyUser() {
       axios.defaults.withCredentials = true;
      // axios.defaults.withCredentials = true;
      //      if(mailValidation = false){
      //    this.infomsg = "il y a une erreur, Réessayer";
      //     return false
      //  }

      await axios
        .post("http://localhost:5000/api/user/login", {
          email: this.email,
          password: this.psw,
          badge: this.badge,
        })
        .then((user) => {
          //  console.log(Cookie);
          //  this.$cookie.set('token',res.data.token);
          const userId = user.data.user;
          // window.prompt("entrer la clé reçu par mail (n'importe lequel)");
          // => *TODO capcha ou systeme de mail comfirmation register <= \\
          this.successreg = "Connexion reussit, Bienvenue";

          this.show = false;
          setTimeout(() => {
            this.$emit("close-modale", true);
               window.location.reload()  
          }, 1500);
          this.userid = userId;
        })
        .catch((error) => {
          this.infomsg = error.response.data.errors;
          setTimeout(() => {
            this.infomsg = "";
          }, 3000);
        });

      // await axios
      //   .get(
      //     `http://localhost:5000/api/user/${this.userid}`,
       
      //     // ,{'headers': { 'Authorization': this.$cookie.get('token')}}
      //   )
      //   .then((res, req) => {
     
      //     console.log(res.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // await axios
      //   .get(`http://localhost:5000/jwtid`,
 
      //       )
      //   .then((res) => {
      //     //   console.log(res.headers["Set-Cookie"]);
      //     // console.log(req);
      //     console.log(res);
      //   })
      //   .catch((err)=>{

      //     console.log(err);
      //   });

      //  axios.get(`http://localhost:5000/me`)
      // .then((res) => {
      //        console.log(res.headers["Set-Cookie"]);
      //   console.log(res.cookies.jwt);

      // }).catch((error)=>{
      //    error
      // })
    },
  },

  data() {
    return {
      show: true,
      showSignUp: false,
      email: "",
      psw: "",
      badge: "",
      successreg: "",
      infomsg: "",
      formfull: "",
      userid: "",
    };
  },
};
</script>

<style lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0px;
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

#header-index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow:ellipsis;
  border: solid 5px $secondary;
  margin-bottom: 2px;
  background: $tertiary;
}

h2.h2-sign-in {
  padding-bottom: 0.5%;
  padding-top: 0;
}

.sign-up-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
}

.span-instruction {
  display: flex;
  color: $primary;
  margin-right: 1%;
  margin-bottom: 0;
}

.span-sign-up {
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0;
}
#body-index {
  border: solid 5px $secondary;
  background: $tertiary;
}

.btn-valid:disabled {
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 30%;
  margin-top: 20px;
  border: solid 2px $secondary;
  background: #ccc;
  &:hover {
    cursor: none;
    background: #ccc;
    color: red;
  }
}

.btn-valid {
  height: 50px;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 30%;
  margin-top: 20px;
  border: solid 2px $secondary;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}
.btn-login {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-login:hover {
  background-color: $secondary;
  color: $tertiary;
}

h2 {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

// .h2-form:hover {
//   background-color: $secondary;
//   color: $tertiary;
// }

.form-input {
  border: solid 2px $secondary;
  font-size: 1.5em;
  color: $secondary;
}

input {
  width: 50%;
  height: 2.5rem;
}

.h2-form {
  padding: 5px;
}

// .btn-sign {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: solid 2px $secondary;
//   border-radius: 30%;
//   margin-left: 10px;
//   padding-left: 5px;
//   padding-right: 5px;
//   text-decoration: none;
//   color: white;
//   // white-space: nowrap;
//   // overflow: hidden;
//   // text-overflow: ellipsis;
//   cursor: pointer;
// }

// .btn-sign:hover {
//   background-color: $secondary;
//   color: $tertiary;
// }

// h1{
// display: flex;
// width: 100%;
// height: auto;
// flex-wrap: nowrap;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;

// }

// .logo{
//   display: flex;
//   width: 100%;
//   flex-direction: row;
//   flex-wrap:wrap;

// }
</style>
