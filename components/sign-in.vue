<template>
  <div class="overlay">
    <v-col justify="center" align="center">
      <div>
        <SignUp v-show="showSignUp" @close-modal="showSignUp = false" />
    
      </div>
      <!-- <v-card class="instruction">
        <p class="span-instruction">
          !! vous devez vous inscrire, pour vous connecter la premiere fois >>
        </p>
        </v-card> -->
      <v-card
        id="header-index"
        class="logo py-4 d-flex justify-center align-center">
        <h2 class="h2-sign-in">
          <button @click.stop="$emit('close-modale')" class="btn-login">
            connexion
          </button>
        </h2>
        <v-card-text class="sign-up-link">
          <p class="span-instruction">
          Vous n'avez pas encore de compte ?</p><p class="span-sign-up" @click.stop="showSignUp = true ">Créer un compte </p>
      </v-card-text>
         <!-- <h2>
          <button class="btn-sign" @click.stop="showSignUp = true ">
            inscription
          </button> 
        </h2>  -->
        </v-card>
      <v-card id="body-index">
        <v-col cols="12" sm="12" md="12">
          <v-card-text>
            <div class="form-popup" id="popup-Form">
              <form class="form-container">
                <label for="email">
                  <h2>Votre Groupo-Mail</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                  placeholder="Votre Email"
                  value="@groupomania.fr"
                  name="email"
                  required
                />
                <label for="badge">
                  <h2>Votre numéro de badge</h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="text"
                    placeholder="numéro de badge"
                  name="badge"
                  required
                />
                <v-spacer />
                <label for="psw">
                  <h2>Mot de passe Groupomania-socialnetwork </h2>
                </label>
                <v-spacer />
                <input
                  class="form-input"
                  type="password"
                  placeholder="Votre mot de passe"
                  name="psw"
                  required
                />
                <v-spacer />
                <button class="btn">
                  <h2 class="h2-form">Se connecter</h2>
                </button>
                /
                <button type="submit" class="btn cancel">
                  <h2 class="h2-form">Annuler</h2>
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
import SignUp from "./sign-up.vue";
export default {
  name: "IndexPage",
  components: { SignUp },
  data() {
    return {
      showSignUp: false,
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
  border: solid 2px $secondary;
  margin-bottom: 2px;
  background: $tertiary;
}


h2.h2-sign-in{
  padding-bottom: 0.5%;
  padding-top: 0;
}

.sign-up-link{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  padding-bottom: 0;
}

p.span-instruction {
  display: flex;
  color: $primary;
  margin-right: 1%;
  margin-bottom: 0;
}

p.span-sign-up{
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0;
}


#body-index {
  border: solid 2px $secondary;
  background: $tertiary;
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

.btn-sign {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 30%;
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  color: white;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  cursor: pointer;
}

.btn-sign:hover {
  background-color: $secondary;
  color: $tertiary;
}

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

h2 {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.h2-form:hover {
  background-color: $secondary;
  color: $tertiary;
}

.form-input {
  border: solid 2px $secondary;
  font-size: 1.5em;
  color: $secondary;
}

input {
  width: 50%;
  height: 2.5rem;
}

button {
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 30%;
}

// .btn{
// border: solid 2px $secondary;
// margin-top: 20px
// }
// .btn:hover{
// background-color: $secondary;
// color:$tertiary;
// }

.h2-form {
  padding: 5px;
}


</style>
