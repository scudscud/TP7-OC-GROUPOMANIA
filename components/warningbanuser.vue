<template>
    <div class="overlay-delete">
      <v-col 
      v-if="this.banned === false"
       class="d-flex justify-center align-center">
        <v-card class="popup-report-com">
          <p class="logo-disconnect-delete">
            <img class="logo-white" src="../logo/logo.png" alt="logo" />
            <span>La team GROUPOMANIA</span>
          </p>
          <p v-if="!reportconfirm" id="span-report-post-titre">
            <v-icon class="img-flag">mdi-flag</v-icon>
            ban inactif
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p v-else id="span-report-post-titre">
            <v-icon class="img-flag">mdi-flag</v-icon>
            ban actif
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p v-if="!reportconfirm && !banandpublication " id="span-report-post">
            <v-icon class="img-flag">mdi-flag</v-icon>
            Bannir {{ fullname }}
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p v-if="reportconfirm " id="span-report-post-titre">
            <v-icon class="img-flag">mdi-flag</v-icon>
              {{ fullname }} à été banni(e)
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p v-if="banandpublication  " id="span-ban-post-user">
            <v-icon class="img-flag">mdi-flag</v-icon>
              <span id="spanban1">{{ fullname }} à été banni(e),</span>
              <span id="spanban1">publication supprimer</span>
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <v-btn
            v-if="!reportconfirm && !banandpublication "
            @click="(reportconfirm = !reportconfirm),banSend()"
            id="btn-ban-confirm">
            <span>Bannir</span>
          </v-btn>
          <v-btn
            v-if="!reportconfirm && profilban === false && !banandpublication "
            @click="banSend(),deletedPostBan(iduserban)"
            id="btn-ban-and-del">
            <p id="pbandelpost" >
             <span>bannir</span>
             <span> et supprimer </span>
             <span>la publication</span>
           </p>
          </v-btn>
          <v-btn
            v-if="!reportconfirm && !banandpublication "
            id="btn-ban-delete"
            @click="$emit('close-modale-ban-delete')">
            <span>Retour</span>
          </v-btn>
        </v-card>
      </v-col>
      <v-col 
      v-else-if ="this.unban === true"
       class="d-flex justify-center align-center">
        <v-card class="popup-report-com">
          <p class="logo-disconnect-delete">
            <img class="logo-white" src="../logo/logo.png" alt="logo" />
            <span>La team GROUPOMANIA</span>
          </p>
          <p  id="span-report-post-titre">
            <v-icon class="img-flag">mdi-flag</v-icon>
            ban inactif
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p id="span-report-post">
            <v-icon class="img-flag">mdi-flag</v-icon>
             {{ fullname }} à été debanni(e)
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
        </v-card>
      </v-col>
      <v-col 
    v-else
      class="d-flex justify-center align-center unban-user">
        <v-card class="popup-report-com-unban">
          <p class="logo-disconnect-delete">
            <img class="logo-white" src="../logo/logo.png" alt="logo" />
            <span>La team GROUPOMANIA</span>
          </p>
          <p  id="span-report-post-titre">
            <v-icon class="img-flag">mdi-flag</v-icon>
            ban actif
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <p v-if="!reportconfirm" id="span-report-post-2">
            <v-icon class="img-flag">mdi-flag</v-icon>
            {{ fullname }} est banni(e)
            <v-icon class="img-flag">mdi-flag</v-icon>
          </p>
          <div id="span-report-post-signal">
            <v-btn
            v-if="!reportconfirm"
            @click="(reportconfirm = !reportconfirm),unbanSend()"
            id="btn-unban"
          >
            <span>Débannir</span>
          </v-btn>
          </div>
          <v-btn
            v-if="!reportconfirm"
            id="btn-unban-delete"
            @click="$emit('close-modale-ban-delete')"
          >
            <span>Retour</span>
          </v-btn>
         
          
        </v-card>
      </v-col>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    // name: 'Delete',
    async mounted(){
         const info = JSON.parse(localStorage.getItem("info-ban-user", JSON.stringify(info)));
         this.iduserban = info.idban
         this.idpostban = info.postidban 
           axios.get(`http://localhost:5000/api/user/${this.iduserban}`)
      .then((doc)=>{
        console.log(doc);
        localStorage.removeItem('info-ban-user')
        this.firstname = doc.data.firstname
        this.lastname = doc.data.lastname
         if(this.idpostban == undefined) this.profilban = true
        if (doc.data.ban === false) this.banned = false
        else this.banned = true
      })
    },
  
    data() {
      return {
        iduserban : '',
        idpostban : "",
        reportconfirm : false,
        bananddelpostconfirm: false,
        banned : false,
        unban:false,
        firstname :'',
        lastname: '',
        banandpublication : false,
        profilban: false,
      }
    },
    methods: {
      banSend() {
        axios.patch(`http://localhost:5000/api/user/banuser/${this.iduserban}`)
        .then((doc)=>{
            console.log('utilisateur banni');
        })
        setTimeout(() => {
          this.$emit('close-modale-ban-confirm')
        }, 2500)
      },
      unbanSend() {
        axios.patch(`http://localhost:5000/api/user/unbanuser/${this.iduserban}`)
        .then((doc)=>{
            this.unban = true
            console.log('utilisateur débanni');
        })
        setTimeout(() => { 
          this.$emit('close-modale-ban-confirm')
        }, 2500)
      },
      deletedPostBan(id) {
        this.banandpublication = true
     axios.delete(`http://localhost:5000/api/post/${this.idpostban}`,{data : {id : id}}  )
      .then((Post) => {
          Post.data.likers.forEach(userDeleteLike=> {
          axios.patch(`http://localhost:5000/api/post/unlike-post/${this.iduserban}`,{ id: userDeleteLike})
          });
        //   this.getPosts()
        })
    }
    },
    computed : {
        fullname: {
      get() {
        return this.firstname + " " + this.lastname;
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(" ");
      },
    },
    }
  }
  </script>
  
  <style lang="scss">
  .overlay-delete {
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
    z-index: 1000;
  }
  
  .popup-report-com {
    padding-bottom: 1%;
    padding-top: 1%;
    background-color: $secondary;
    margin-top: 250px;
    // max-width: 300px;
    // min-width: 300px;
    width: 320px;
    // max-height: 200px;
    // min-height: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .popup-report-com-unban {
    padding-bottom: 1%;
    padding-top: 1%;
    background-color: $secondary;
    margin-top: 250px;
    // max-width: 300px;
    // min-width: 300px;
    width: 320px;
    // max-height: 200px;
    // min-height: 200px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .logo-disconnect-delete {
    display: flex;
    flex-direction: row;
  }
  
  .popup {
    padding-bottom: 1%;
    padding-top: 1%;
    background-color: $secondary;
    max-width: 350px;
    min-width: 350px;
    width: 350px;
    //   max-height: 400px;
    //   min-height: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .img-flag {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    padding-right: 5%;
    padding-left: 5%;
    &:before {
      color: $primary;
    }
    &:hover {
      color: $secondary;
    }
  }
  
  #span-report-post {
    width: 100%;
    text-align: center;
  }
  #span-report-post-titre {
    width: 100%;
    text-align: center;
    color: rgb(37, 177, 46);
  }
  #span-ban-post-user{
     display: flex;
     flex-direction: column;
     width: 100%;
     color:green
  }

  #span-report-post-2 {
    width: 100%;
    text-align: center;
    padding: 1%;
    font-style: italic;
  }
  #spanban1{
    width: 100%;
    text-align: center;
    padding: 1%;
    font-style: italic;
  }
  
  #span-report-post-signal {
    width: 100%;
    text-align: center;
    padding: 1%;
    font-style: italic;
    margin-bottom: 0;
  }
  
  #span-report {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-left: 1%;
    padding-right: 1%;
    font-style: italic;
    padding-bottom: 1%;
  }
  
  .comfirm-span-delete {
    padding-top: 3%;
  }
  
  #btn-ban-confirm {
    font-weight: bold;
    background-color: $secondary;
    justify-content: center;
    align-items: center;
    color: green;
    width: 50%;
    margin-bottom: 1%;
    &:hover {
      background-color: green;
      color: $secondary;
    }
  }

  #btn-ban-and-del {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background-color: $secondary;
    color: green;
    width: 50%;
    height: auto;
    margin-bottom: 1%;
    &:hover {
      background-color: green;
      color: $secondary;
    }
  }

  #pbandelpost {
  display: flex;
  flex-direction: column;
  width: 160px;
  margin-top: 5%;
  margin-bottom: 5%;
  }

  #btn-ban-delete{
    font-weight: bold;
    color: red;
    background-color: $secondary;
    justify-content: center;
    align-items: center;
   width: 50%;
    &:hover {
      background-color: $primary;
      color: $secondary;
    }
  }
  #btn-unban-delete{
    color: red;
    background-color: $secondary;
    justify-content: center;
    align-items: center;
   width: 50%;
    &:hover {
      background-color: $primary;
      color: $secondary;
    }
  }

  #btn-unban {
    color: green;
    background-color: $secondary;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    width: 50%;
    &:hover {
      background-color: green;
      color: $secondary;
    }
  }
  </style>
  