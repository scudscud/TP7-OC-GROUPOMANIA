<template>
  <v-card class="card">
    <v-card-text class="card-profil-title">
      <h1 class="card-profil-title-h1">Mon profil</h1>
    </v-card-text>
    <v-card-text v-if="url == '' && urlpic == '' || url == '' && urlpic === undefined  "  class="card-profil-name-empty">
      <div class="block-picture-empty">
        <div id="avatar-empty-profil">{{ avatarpicempty }}</div>
        <label class="lab-pic-empty" for="avatar">
          <v-icon class="lab-pic-custom-empty" size="25px">mdi-camera-plus</v-icon>
          <input id="avatar" class="form-avatar-profil" type="file" value="" name="avatar"
            placeholder="votre photo/avatar" @change="picPreview" />
        </label>
      </div>
      <span class="fullname">{{ fullname }}</span>
    </v-card-text>
    <v-card-text v-else-if=" urlpic !== '' && modifyPictureUserInprogress === false " class="card-profil-name-choice">
      <button id="btn-del-pic-profil-choice" @click="warningDelPic = !warningDelPic"><v-icon id="btn-del-pic-profil-icon" size="25px">mdi-camera-off</v-icon></button>
      <div class="block-picture-choice">
        <img id="form-picture-profil" :src="urlpic" alt="photo de l'utilisateur"/>
        <!-- <v-file-input :rules="rules" hide-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera"
          label="Avatar" class="camadd">test</v-file-input> -->
          <label class="lab-pic-choice" for="avatar"> 
            <v-icon class="lab-pic-custom-choice" size="25px">mdi-camera-plus</v-icon>
            <input id="avatar" class="form-avatar-profil" type="file" value="" name="avatar" placeholder="votre photo/avatar" @change="picPreview" /> 
          </label> 
        </div>
        <span class="fullname">{{ fullname }}</span>
    </v-card-text>

    <v-card-text v-else-if="modifyPictureUserInprogress === true" class="card-profil-name">
      <div class="block-picture-url">
        <label class="lab-pic-del" for="avatar">
          <v-icon class="lab-pic-custom-url" size="25px">mdi-camera-plus</v-icon>
          <img class="form-avatar-dl" :src="url" alt="photo de l'utilisateur"/>
          <input id="avatar" class="form-avatar-profil-url" type="file" value="" name="avatar"
            placeholder="votre photo/avatar" @change="picPreview" />
        </label>
        <div class="block-btn-pic-profil">
          <button id="btn-del-pic-profil" @click="delPicPreview()">
            Annuler
          </button>
          <button v-if="!posted" id="btn-confirm-pic-profil" action="/upload" type="submit" method="post"
            enctype="multipart/form-data" @click="profilUpdate()">
            Valider
          </button>
          <button v-else id="btn-confirm-pic-profil-post">Valider</button>
        </div>
      </div>
      <span class="fullname-url">{{ fullname }}</span>
    </v-card-text>

    <v-card-text class="card-profil-biographie">
      <h2>Ma bio</h2>
      <p v-if="this.bioUser == ''" class="card-profil-biographie-p">{{ biographieP }}</p>
      <p v-else class="card-profil-biographie-p">{{ bioUser }}</p>
      <button v-if='!modifbio' class="btn-bio-mod" @click="getBio(),(modifbio = !modifbio)">
        <v-icon class="pen-icon" size="15px">mdi-lead-pencil</v-icon> modifier ma bio </button>

      <button v-if="this.bioUser !== '' && !modifbio" class="btn-bio-mod" @click="getBio(),(warningDelete= !warningDelete)">
        <v-icon class="pen-icon" size="15px">mdi-delete</v-icon> supprimer ma bio </button>
    </v-card-text>

    <v-card-text class="deploy-modidify" v-show="modifbio" @change="controleBio()" >
      <form method="post" @submit.prevent @canplaythrough="controleBio"  >
        <label for="biographie"  >
          <h2>Biographie :</h2>
        </label>
        <textarea @change="controleBio()" v-model="newBioUser" name="biographie" class="card-profil-textarea" type="textarea"
          placeholder="votre biographie" maxlength="500" ></textarea>

        <div class="btn-bio"  >
          <button id="btn-bio-close" @click="(warningRecord = !warningRecord)">Fermer</button>
          <button id="btn-bio-delete" @click="deletebio">Annuler</button>
          <button id="btn-bio-send" type="submit" @click="controlePostBio">Enregistrer</button>
        </div>
      </form>
    </v-card-text>
    <v-card-text  class="card-profil-friend">
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 v-if="follower[0] !== undefined" class="h2-friend">Mes abonnés&nbsp({{info.length}})</h2>
        <h2 v-else class="h2-friend">Mes abonnés</h2>
      </div>
      <div v-for="(p, index) in info" class="btn-profil-follow">
        <p v-if="following.includes(p._id)" class="card-profil-friend-abo">{{ p.firstname +" "+p.lastname }} est un(e) de vos abonné(e)</p>
        <p v-else class="card-profil-friend-abo">{{ p.firstname +" "+p.lastname }} est un(e) de vos abonné(e)</p>
        <button v-if="!following.includes(p._id)" class="btn-followback-profil-user" @click="getFollowBack(p._id)">S'abonné</button>
      </div>
      <p v-if="follower[0] === undefined" class="card-profil-friend-p">{{ friend }}</p>
    </v-card-text>

    <v-card-text v-if="following[0] != undefined" class="card-profil-friend">
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 v-if="following[0] != undefined" class="h2-friend">Mes abonnements&nbsp({{infoAbo.length}})</h2>
        <h2 v-else class="h2-friend">Mes abonnements</h2>
      </div>
      <div v-for="(p, index) in infoAbo" class="btn-profil-follow">
        <p  class="card-profil-friend-p">{{ p.firstname +" "+p.lastname }} </p>
        <button  v-if="following.includes(p._id)" class="btn-unfollow " @click="getUnFollowBack(p._id)"> Se désabonné </button>
      </div>
    </v-card-text>
    <v-card-text  v-if="following[0] === undefined" class="card-profil-friend">
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 class="h2-friend">Mes abonnements</h2>
      </div>
      <div  class="btn-profil-follow">
      <p v-if="follower.length == 1 " class="card-profil-friend-solo">Ne faite votre timide {{ fullnamefollow}}  est abonné(e) n'hésitez pas à vous abonner en retour</p>
      <p v-if="follower.length == 0" class="card-profil-friend-solo">Ne faite le premier pas Abonnez-vous à quelqu'un</p>
      <p v-if=" follower.length > 1 " class="card-profil-friend-solo">Ne faite votre timide {{follower.length}} personnes sont abonné(e)s n'hésitez pas à vous abonner en retour</p>
   
    </div>
    </v-card-text>

    <v-card-text class="card-profil-post" v-if="pub[0] != undefined">
      <div class="card-profil-friend-pub">
        <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
        <h2 class="h2-post">Mes publications&nbsp({{pub.length}})</h2>
      </div>
      <div class="align-pub-user">
        <div class="profil-post" v-for="(p, index) in pub">

          <p class="card-profil-post-p"> publication&nbsp:&nbsp{{p.date}}</p>
          <div v-if="p.likers.length != 0" class="like-profilmain-user" >
            <v-icon class="img-like-profilmain">mdi-thumb-up-outline</v-icon><span>{{p.likers.length}}</span>
          </div>
          <div class="btn-post-profil-user">
            <button class="btn-post-modify-profil" type="submit"
              @click=" showmodify = !showmodify,postIdDel(p._id)">Modifier </button>
            <button class="btn-post-delete-profil" @click="showdel =!showdel,postIdDel(p._id)">supprimer</button>
          </div>
          <div v-if='p.picture !="" ' class="image-card-profil"><img class="card-img-profil" :src="p.picture"
              alt="photo" /></div>
          <div v-if="p.message != ''" class="message-profil-user"> {{p.message}}</div>
        </div>
      </div>
    </v-card-text>
    <v-card-text class="card-profil-post" v-else>
      <div class="card-profil-friend-pub">
        <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
        <h2 class="h2-post">Mes publications</h2>
      </div>
      <div class="card-profil-post-p">{{ publication }}</div>
    </v-card-text>
    <transition name="fade" bottom right  fixed >
    <div id="pagetopscroll" v-show="scY > 300" @click="toTop" >
      <svg id="arrowscroll" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
           stroke="#4a5568"
           stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </div>
  </transition>
    <Load v-show="showloader" @close-modale-loader="showloader = false" @open-modale-loader="true" />
    <WarningRecord v-if="warningRecord" v-show="warningRecord" @close-modale-record ="warningRecord=false" @close-modale-record-confirm="warningRecord=false,modifbio=false"/>
    <WarningEmpty v-if="warningEmpty" v-show="warningEmpty" @close-modale-empty ="warningEmpty=false" />
    <WarningDelete v-if="warningDelete" v-show="warningDelete" @close-modale-biodelete ="warningDelete=false" @close-modale-biodelete-confirm="warningDelete=false,deleteUserBio()" />
    <modify v-if="showmodify"  v-show="showmodify" @close-modale-modify=" showmodify=false,getPosts()" />
    <deletepost v-if="showdel" v-show="showdel" @close-modale-delete="showdel = false,getPosts()" />
    <WarningDeletePicture v-if="warningDelPic" v-show="warningDelPic" @close-modale-delpicuser=" warningDelPic = false" @close-modale-delpicuser-confirm="warningDelPic = false,deletePicUser()" />
  </v-card>

</template>

<script>
import axios from "axios";
import Load from "../components/Waitload.vue";
// import { replace } from 'vue-router'

export default {
  name: "Profil",
  components: {
    Load,
    WarningDeletePicture: () => import( /* webpackChunkName:"WarningDeletePicture"*/"../components/warningdeletepictureuser.vue"),
    WarningDelete: () => import ("../components/warnindelete.vue"),
    WarningEmpty: ()=> import ("../components/warningempty.vue"),
    WarningRecord: () => import("../components/warningrecord.vue"),
    modify: () => import("./index/modifytest.vue"),
    deletepost: () => import(  /* webpackChunkName:"deletepost"*/"./index/deletetest.vue"),
 
  },

  data() {
    return {
      url: "",
      urlpic: "",
      avatarpicempty: "",
      picutername: "",
      modifbio: false,
      deletebiouser: false,
      bio: "",
      bioUser: "",
      newBioUser: '',
      biographieP: "C'est vide, Vous n'avez rien à nous raconter ? 😪",
      friend: "Aie c'est vide ",
      follower: [],
      following: [],
      followBack: false,
      followBackId: [],
      followInfo: [],
      followingInfo: [],
      newfollowInfo: [],
      info: [],
      followId: '',
      followingId: '',
      infoAbo: [],

      publication: "Vous n'avez rien publier",
      publications: [],
      pub: [],

      lastname: "",
      firstname: "",
      followLastname:"",
      followFirstname:"",
      followingLastname:"", 
      followingFirstname:"",
      photo: [],
      userid: "",
      posted: "",
      modifyPictureUserInprogress : false,

      // followkey: 0,

      showdel: false,
      showmodify: false,
      warningRecord:false,
      warningEmpty: false,
      warningDelete :false,
      warningDelPic : false,

      bioValid:false,
      showloader:true,

      scTimer: 0,
      scY: 0,

    


    };
  },
  computed: {
    fullname: {
      get() {
        return this.firstname + " " + this.lastname;
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(" ");
      },
    },

    fullnamefollow:{
      get() {
        return  this.followFirstname + " " + this.followLastname;
      },
      set(newValue) {
        [this.followFirstname,this.followLastname] = newValue.split(" ");
      },
    },
    fullnamefollowing:{
      get(){
       return this.followingLastname +" "+  this.followingFirstname
      },
      set(newValue) {
        [this.this.followingLastname, this.followingFirstname] = newValue.split(" ");
      },
    },
  },

  methods: {
    // reloadPage () {
    //     replace('/profiluser')
    //   },

    getBio(){
       axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        this.newBioUser = docs.data.bio
      })
      .catch((error) => {
        console.log(error);
      })
    },

    deleteUserBio(){
      let formData = new FormData();
      formData.append("bio", this.bio);
      axios.put(`http://localhost:5000/api/user/${this.userid}`, formData)
          .then(()=>{
            this.BioUser = ''
        }).then(()=>{
          axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        this.bioUser = docs.data.bio
      })
      .catch((error) => {
        console.log(error);
      })
        })  
    },

    controleBio(){
      let testRegex = this.newBioUser.split(' ').join('')
      if(testRegex !='' || this.bioUser !== ''){
          this.bioValid = true
          return true
        }
        else{
        this.bioValid = false
        return false
        }
    },

    controlePostBio(){
      let testRegex = this.newBioUser.split(' ').join('')
        if(testRegex !=''){
          this.bioValid = true
          this.newBioUser.trimStart('')
          let formData = new FormData();
      formData.append("bio", this.newBioUser);
      axios.put(`http://localhost:5000/api/user/${this.userid}`, formData)
          .then(()=>{
            this.newBioUser = ''
          this.modifbio = !this.modifbio
        }).then(()=>{
          axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        this.bioUser = docs.data.bio
      })
      .catch((error) => {
        console.log(error);
      })
        })  
        }
        else{
        this.bioValid = false
        this.warningEmpty = true
        setTimeout(()=>{
          this.bioValid = true
        },2000)
        return false
       
        }
    },

    deletebio() {
      console.log(this.bio);
      this.newBioUser = this.bioUser;
    },

    delPicPreview() {
      this.url = "";
      this.modifyPictureUserInprogress = false
    },

    delPic(){
      this.url = ""
      // this.urlpic = ""
    },

     profilUpdate() {
      this.showloader = true
      // window.location.reload();
      //    this.modifyPictureUserInprogress = false
      let formData = new FormData();
      formData.append("fullname", this.fullname);
      formData.append("photo", this.photo);

       axios
        .put(`http://localhost:5000/api/user/${this.userid}`, formData)
        .then(() => {
          axios.get(`http://localhost:5000/api/post`).then((post) => {
            post.data.forEach((doc) => {
              if (doc.posterId === this.userid) {
                const id = [];
                id.push(doc._id);
                id.forEach((postid) => {
                  // console.log(postid);
                  // console.log(this.photo);
                  let formData = new FormData();
                  formData.append("picture", this.photo);
                  axios.put(
                    `http://localhost:5000/api/post/photo/${postid}`,
                    formData
                  );
                });
              }
            });
          });
        })
        .catch((errors, test) => {
          this.maxsize = errors.response.data.errors.maxsize;
          this.format = errors.response.data.errors.format;
          setTimeout(() => {
            this.maxsize = "";
            this.format = "";
          }, 3000);
          console.log(errors.response.data.errors.maxsize);
          console.log(errors.response.data.errors.format);
        })
        .then(() => {
          setTimeout(() => {
            this.modifyPictureUserInprogress = false
            window.location.reload();
          },1500);
        })
      },

    deletePicUser(){
      this.showloader = true
       this.photo = ''
       this.url = ''
       this.urlpic =''
       let formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("posterId",this.userid)

       axios
        .put(`http://localhost:5000/api/user/${this.userid}`, formData)
        .then(() => {
          
            axios.get(`http://localhost:5000/api/post`).then((post) => {
            post.data.forEach((doc) => {
              if (doc.posterId === this.userid) {
                const id = [];
                id.push(doc._id);
                id.forEach((postid) => {
                  // console.log(postid);
                  // console.log(this.photo);
                  let formData = new FormData();
                  formData.append("picture", this.photo);
                  console.log(this.photo);
                  axios.put(
                    `http://localhost:5000/api/post/photo/${postid}`,
                    formData
                  );
                });
              }
            });
          })
        }).then(( )=>{
          setTimeout(() => {
            window.location.reload();
          },1500);
        })
    },

    picPreview(e) {
      this.modifyPictureUserInprogress = true
      console.log(e);
      console.log(this.modifyPictureUserInprogress);
      e.target.value[0].split(" ");
      const pic = e.target.files[0];
      this.photo = pic;
      this.url = URL.createObjectURL(pic);
      // this.validPost = !this.validPost;
    },

    getcolor() {
      if (this.urlpic === "" || this.urlpic === undefined ) {
        this.avatarpicempty = this.firstname.split("")[0].toLocaleUpperCase();
      }
    },

    getImage(imagename) {
      let name = avatar.value;
      let namereg = name.replace(/^.*\\/, "");
      this.picutername = namereg;
    },

    postIdDel(post) {
      const parse = JSON.stringify(post);
      localStorage.setItem('categories', parse);
    },


    getPosts() {
      
      axios.get(`http://localhost:5000/api/post/postby/${this.userjwtid}`)
        .then((doc)=>{
          this.pub= doc.data
          console.log(doc.data);
        })
    },

    

    getFollowBack(id) {
      axios.patch(`http://localhost:5000/api/user/follow/${this.userid}`, { idToFollow: id })
      .then(()=>{
        axios
            .get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.follower = docs.data.followers;
              this.following = docs.data.following;
           
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .then(() => {
            axios.get(`http://localhost:5000/api/user/${id}`)
            .then((docs)=>{
              this.followId = docs.data._id
              this.followLastname = docs.data.lastname;
              this.followFirstname = docs.data.firstname;
              this.followBackId = docs.data.followers;
              this.followInfo = docs.data
              this.infoAbo.push(this.followInfo)
            })
        })
    },

    getUnFollowBack(id) {
      axios.patch(`http://localhost:5000/api/user/unfollow/${this.userid}`, { idToUnFollow: id })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.follower = docs.data.followers;
              this.following = docs.data.following;
              // console.log(this.follower);
            }).catch((error) => {console.log(error);
            }).then(() => {
            axios.get(`http://localhost:5000/api/user/${id}`)
            .then((docs)=>{
              this.followId = docs.data._id
              this.followLastname = docs.data.lastname;
              this.followFirstname = docs.data.firstname;
              this.followBackId = docs.data.followers;
              this.followInfo = docs.data;
              const newarr  = this.infoAbo.filter(data=> data._id != this.followId)
              this.infoAbo = newarr
            })
            }).catch((error) => {
              console.log(error);
            })
        })
    },


    handleScroll () {
        if (this.scTimer) return;
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY;
          clearTimeout(this.scTimer);
          this.scTimer = 0;
        }, 100);
      },
      toTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },

    




  },

  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      this.showloader = false
    }, 1500);
    axios.defaults.withCredentials = true;

    await axios
      .get(`http://localhost:5000/jwtid`)
      .then((res) => {
        this.userjwtid = res.data;
        this.show = true;
        this.log = true;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.bioUser = docs.data.bio
        this.follower = docs.data.followers;
        this.following = docs.data.following;
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.follower.forEach((i, u, l) => {
          axios.get(`http://localhost:5000/api/user/${i}`)
            .then((docs) => {
              this.followId = docs.data._id
              this.followLastname = docs.data.lastname;
              this.followFirstname = docs.data.firstname;
              this.followBackId = docs.data.followers;
              let name = this.followFirstname + " " + this.followLastname;
              this.followInfo = docs.data
              this.info.push(this.followInfo)
            });
        });
      }).catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.following.forEach((i) => {
          axios.get(`http://localhost:5000/api/user/${i}`)
            .then((docs) => {
              console.log(docs);
              this.followingId = docs.data._id
              this.followingLastname = docs.data.lastname;
              this.followingFirstname = docs.data.firstname;
              this.followingBackId = docs.data.followers;
              let name = this.followingFirstname + " " + this.followingLastname;
              this.followingInfo = docs.data
              this.infoAbo.push(this.followingInfo)
            })
        })
      }).catch((error) => {
        console.log(error);
      })

      
      axios.get(`http://localhost:5000/api/post/postby/${this.userjwtid}`)
        .then((doc)=>{
          this.pub= doc.data
          console.log(doc.data);
        })
    this.getcolor();
  },
};
</script>

<style lang="scss">
label.lab-pic {
  display: flex;
  // width: 130px;
}

.block-picture-empty{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 140px;
  margin-top: 5px;
}

label.lab-pic-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 0px;
  height: 0px;
}

.card-profil-name-empty {
  padding-bottom: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: $tertiary;
}

.lab-pic-custom-empty {
  position: relative;
  top: 45px;
  left: -20px;
  height: 40px;
  width: 40px;
  background-color: $tertiary;
  border-radius: 50%;
  border: solid 2px $primary;
  &:hover {
    cursor: pointer;
  }
}

#avatar-empty-profil {
  display: flex;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  font-size: 5rem;
  background-color: rgb(6, 132, 6);
}

label.lab-pic-choice{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 0px;
}

img#form-picture-profil {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border: solid 2px $secondary;
  border-radius: 50%;
  font-size: 5rem;

  // padding-bottom: 5%;
}
.block-picture-choice{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  margin-top: 5px;
}

.card-profil-name-choice {
  padding-top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: $tertiary;
}

.lab-pic-custom-choice {
  position: relative;
  top: 47px;
  left: -10px;
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

button#btn-del-pic-profil-choice {
  position: relative;
  top: 50px;
  left: +30px;
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

.lab-pic-del {
  display: flex;
  justify-content: center;

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
  // visibility: none;

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

.card-profil-name-url {
  display: flex;
  justify-content: center;
  background-color: $tertiary;
}

.block-btn-pic-profil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 175px;
  margin-left: 30px;
}



button#btn-del-pic-profil {
  display: flex;
  // height: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 0%;
  border: solid 2px $secondary;
  border-radius: 15px;
  color: $secondary;

  &:hover {
    border-radius: 10px;
    background-color: $secondary;
    color: $tertiary;
  }
}



#btn-del-pic-profil-icon {
  position: relative;
  top: -2px;
  left: -18px;
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




.lab-pic-custom-url {
  position: relative;
  top: 70px;
  left: 140px;
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


button#btn-confirm-pic-profil {
  display: flex;
  // height: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 0%;
  border: solid 2px $secondary;
  border-radius: 15px;
  color: $secondary;

  &:hover {
    border-radius: 10px;
    background-color: $secondary;
    color: $tertiary;
  }
}

button#btn-confirm-pic-profil-post {
  display: flex;
  // height: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 0%;
  border: solid 2px $secondary;
  border-radius: 15px;
  color: green;

  &:hover {
    border-radius: 15px;
    background-color: $secondary;
    color: green;
  }
}

.form-avatar-profil-url {
  padding-top: 2%;
  display: none;
  // visibility: none;

  &:hover {
    cursor: pointer;
  }
}


.fullname-url {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1%;
  font-size: 1.8rem;
}

.block-picture-url {
  padding-top: 10px;
}

.lastname {
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  padding-top: 4%;
  //   padding-left: 1%;
}

.fullname {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2%;
  font-size: 1.8rem;
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
  border-bottom: 2px solid $secondary;
  border-top: 2px solid $secondary;
}

p.card-profil-biographie-p {
  margin: 0;
  padding-left: 1%;
  padding-bottom: 2%;
  // border: 2px solid $secondary;
  cursor: default;
}

.btn-bio {
  display: flex;
  flex-direction: row;
}

.deploy-modidify {
  border-bottom: 2px solid $primary;
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
  border-radius: 10px;
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
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

#btn-bio-send:disabled {

  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color:  #ccc;
  color: $tertiary;

}

#btn-bio-close {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 10px;
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
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

    &.btn-bio-mod>.pen-icon {
      color: $tertiary;
    }
  }
}

.btn-follow {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

    &.btn-follow>.pen-icon {
      color: $tertiary;
    }
  }
}

.btn-unfollow {
  width: 100px;
  border: solid 2px $secondary;
  // margin-top: 1%;
  // margin-right: 1%;
  // margin-left: 1%;
  border-radius:10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

    &.btn-unfollow>.pen-icon {
      color: $tertiary;
    }
  }
}

.btn-followback-profil-user {
  width: 100px;
  border: solid 2px rgb(16, 148, 13);
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
    &.btn-unfollow>.pen-icon {
      color: $tertiary;
    }
  }
}


.pen-icon {
  padding-bottom: 2%;
}

.card-profil-friend {
  border-bottom: 2px solid $secondary;
}

.card-profil-friend-t {
  display: flex;
  flex-direction: row;

}

.card-profil-friend-pub {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.icon-friend {
  padding-right: 1%;
}

p.card-profil-friend-p {
  // display: flex;
  // justify-content:center;
  // align-items: center;
  margin: 0;
  // padding-left: 1%;
  // padding-bottom: 2%;
  // border: 2px solid $primary;
  cursor: default;
}
p.card-profil-friend-solo {

  margin: 0;
  color: $primary;

  cursor: default;
}



p.card-profil-friend-abo {
  // display: flex;
  // justify-content:center;
  // align-items: center;
  margin: 0;
  color: rgb(12, 164, 12);
  font-style: italic;
  font-weight:bold;
  // padding-left: 1%;
  // padding-bottom: 2%;
  // border: 2px solid $primary;
  cursor: default;
}

.btn-profil-follow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1%;
  // justify-content: center;
  align-items: center;
}

.card-profil-post {
  border-bottom: solid 2px;
  border-bottom: 2px solid $secondary;
}

.card-profil-post-t {
  display: flex;
  flex-direction: row;
}

.icon-post {
  padding-right: 1%;
}

.btn-post-profil-user {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-bottom: 1%;
  margin-top: 1%;

}

.btn-post-delete-profil {
  width: 100px;
  border: solid 2px $secondary;
  // margin-top: 1%;
  // margin-right: 1%;
  // margin-left: 1%;
  margin-bottom: 1%;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

    &.btn-post-delete-profil>.pen-icon {
      color: $tertiary;
    }
  }
}

.btn-post-modify-profil {
  width: 100px;
  border: solid 2px $secondary;
  // margin-top: 1%;
  // margin-right: 1%;
  // margin-left: 1%;
  margin-bottom: 1%;
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

  }
}


.card-img-profil {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  object-fit: cover;
  // overflow: hidden;
  max-height: 300px;
  max-width: 500px;
  min-width: 300px;
  //  width: 100%;
  // padding: 1%;
  border: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-radius:2px;
}

.align-pub-user {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}

.image-card-profil {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 1%;
  padding: 1% 1%;
  border-top: solid 2px $secondary;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
}


.message-profil-user {
  padding: 2%;
  text-align: center;
  max-width: 450px;
  width: 100%;
  border-top: solid 2px white;
  border-radius: 5px;

}

.profil-post {
  display: flex;
  max-width: 480px;
  width: 100%;
  max-height: 500px;
  flex-direction: column;
  margin-bottom: 2%;
  border: solid 2px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  &:hover {
    // border-color:green;

    transform: scale(1.03);
    transition: ease 0.5s ;

  }
}

.like-profilmain-user {
  display: flex;
  flex-direction: row;
  margin-bottom: 1%;
  align-items: center;
  justify-content: center;
}

p.card-profil-post-p {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding-left: 1%;
  // padding-bottom: 2%;
  // border: 2px solid $primary;
  cursor: default;
}

.img-like-profilmain {
  margin-right: 10%;
}

</style>
