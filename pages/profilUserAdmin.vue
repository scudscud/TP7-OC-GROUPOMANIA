<template>
  <v-card class="card">
    <v-card-text class="card-profil-title-admin">
      <h1 class="card-profil-title-h1-admin">Profil Admin</h1>
      <button id="btn-flag-admin" v-if="this.userReport.length > 0 && this.userBan == false"  @click="(showBan = !showBan),banUserId(userid)"> Bannir
      <div   id="flag-admin-signal-profil"><v-icon id="flag-admin-signal-icon-profil">mdi-flag</v-icon> 
                <div  class="buble-report-profil">
                  <span id="number-report-profil">{{this.userReport.length}}</span>
                </div>
                </div>
              </button>
      <button id="btn-flag-admin-ban" v-else-if ="this.userReport.length > 0 && this.userBan == true"  @click="(showBan = !showBan),banUserId(userid)">      Banni
      <div   id="flag-admin-signal-profil"><v-icon id="flag-admin-signal-icon-profil" size="30px">mdi-check-underline-circle</v-icon> 
                </div>
              </button>
              <div v-else id="btn-flag-admin-bis" ></div>
    </v-card-text>

    <v-card-text v-if="url == '' && urlpic == '' || url == '' && urlpic === undefined" class="card-profil-name-admin">
      <div class="block-picture-admin-empty">
        <label class="lab-pic" for="avatar">
          <div id="avatar-empty-profil">{{ avatarpicempty }}</div>

        </label>
      </div>
      <span class="fullname">{{ fullname }}</span>
    </v-card-text>
    <v-card-text v-else-if=" urlpic !== '' " class="card-profil-name-admin">
      <button id="btn-del-pic-profil-bis" @click="warningDelPic = !warningDelPic">
        <v-icon id="btn-del-pic-profil-icon" size="25px">mdi-camera-off</v-icon>
      </button>
      <div class="block-picture-admin">
           <img id="form-picture-profil-admin" :src="urlpic" alt="photo de l'utilisateur" /> 
      </div>
      <span class="fullname">{{ fullname }}</span>
    </v-card-text>



    <v-card-text class="card-profil-biographie">
      <h2>La bio de {{ fullname }}</h2>
      <p v-if="this.bioUser == '' || this.bioUser == undefined" class="card-profil-biographie-p">{{ biographiePadmin }}</p>
      <p v-else class="card-profil-biographie-p">{{ bioUser }}</p>


      <button v-if="this.bioUser !== '' && !modifbio && this.bioUser !== undefined" class="btn-bio-mod" @click="getBio(),(warningDelete= !warningDelete)">
        <v-icon class="pen-icon" size="15px">mdi-delete</v-icon> supprimer la biographie </button>
    </v-card-text>

    <v-card-text class="card-profil-friend">
    <div v-if="following[0] != undefined"  class="card-profil-friend-t">
      <v-icon class="icon-friend">mdi-account-group</v-icon>
      <h2 class="h2-friend">Les abonnements de {{ fullname }}&nbsp({{infoAbo.length}})</h2>
    </div>
    <div  v-else class="card-profil-friend-t">
      <v-icon class="icon-friend">mdi-account-group</v-icon>
      <h2 class="h2-friend">Les abonnements de {{ fullname }}</h2>
    </div>
    <div v-for="(pi, index) in infoAbo" class="btn-profil-follow">
      <p v-if="pi._id.includes(userjwtid) " class="card-profilAdmin-friend">{{fullname}} est un(e) de vos abonné(e) </p>
      <p v-else class="card-profil-friend-p">{{pi.firstname +" "+pi.lastname}} </p>
      <button :key="followkey " v-if="pi._id.includes(userjwtid) && followBack == false && follower[0] !== undefined" class="btn-followback-profil-user " @click="getFollowBack(userid)"> S'abonner </button>       
    </div>   
    <p v-if="following[0] == undefined" class="card-profil-friend-p">{{fullname}} ne connait plus personne en Harley Davidson!!  </p>
  </v-card-text>

  <v-card-text v-if="follower[0] !== undefined"   class="card-profil-friend">
    <div class="card-profil-friend-t">
      <v-icon class="icon-friend">mdi-account-group</v-icon>
      <h2 class="h2-friend">Les abonné(e)s de {{ fullname }}&nbsp({{info.length}})</h2>
    </div>

    <div v-for="(p, index) in info" class="btn-profil-follow">
      <p v-if="p._id !== userjwtid " class="card-profil-friend-p">{{ p.firstname +" "+p.lastname }} </p>
      <p v-if="p._id == userjwtid " class="card-profilAdmin-friend">Vous êtes abonné(e) à {{fullname}} </p>
      <button v-if="p._id == userjwtid "  class="btn-unfollow-admin " @click="getUnFollowBack(userid)"> Se désabonner</button>
    </div>
    <div v-if="!following.includes(userjwtid) && newfollow && !followBack"   class="btn-profil-follow">
      <p  class="card-profilAdmin-friend-new">Faite le 1er pas Abonnez-vous à {{fullname}}</p>
      <button  class="btn-followback-profil-user " @click="getFollowBack(userid)"> S'abonner</button>
    </div>
    <div v-if="following.includes(userjwtid) && newfollow && !followBack"   class="btn-profil-follow">
      <p  class="card-profilAdmin-friend-new">Abonnez-vous à {{fullname}}</p>
      <button  class="btn-followback-profil-user " @click="getFollowBack(userid)"> S'abonner</button>
    </div>

  </v-card-text>
  <v-card-text v-else class="card-profil-friend">
    <div class="card-profil-friend-t">
      <v-icon class="icon-friend">mdi-account-group</v-icon>
      <h2 class="h2-friend">Les abonné(e)s de {{ fullname }}</h2>
    </div>
    <div class="btn-profil-follow">
      <p class="card-profilAdmin-friend-new">Soyez le 1er Abonné(e) de {{fullname}}</p>
      <button class="btn-followback-profil-user " @click="getFollowBack(userid)"> S abonner</button>
    </div>
  </v-card-text> 
   
    <v-card-text class="card-profil-post" v-if="pub[0] != undefined">
      <div class="card-profil-friend-pub">
        <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
        <h2 class="h2-post">Les publications de {{ fullname }}&nbsp({{pub.length}})</h2>
      </div>
      <div class="align-pub-user">
        <div class="btn-profil-post-del" v-for="(p, index) in pub">

          <p class="card-profil-post-p"> publication&nbsp:&nbsp{{p.date}}</p>
          <div v-if="p.likers.length > 0" class="like-profilmain-user"><v-icon class="img-like-profilmain">mdi-thumb-up-outline</v-icon><span id="span-img-like-profilmain">{{p.likers.length}}</span></div>
          <!-- <span class="like-profil-user">&nbspLIKE&nbsp:&nbsp {{p.likers.length}}</span> -->
          <div class="btn-post-profil-admin">
            <button class="btn-post-modify-profil" type="submit"
              @click=" showmodify = !showmodify,postIdDel(p._id)">Modifier </button>
            <button class="btn-post-delete-profil" @click="showdel =!showdel,postIdDel(p._id)">Supprimer</button>
          </div>
          <div v-if='p.picture !="" ' class="image-card-profil"><img class="card-img-profil" :src="p.picture"
              alt="photo" /></div>
          <div v-if="p.message != ''" class="message-profil-admin"> {{p.message}}</div>
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
    <Load v-show="showloader" @close-modale-loader="showloader = false" @open-modale-loader="true" />
    <WarningDeletePicture v-if="warningDelPic" v-show="warningDelPic" @close-modale-delpicuser=" warningDelPic = false" @close-modale-delpicuser-confirm="warningDelPic = false,deletePicUser()" />
    <WarningRecord v-if="warningRecord" v-show="warningRecord" @close-modale-record ="warningRecord=false" @close-modale-record-confirm="warningRecord=false,modifbio=false"/>
    <WarningEmpty v-if="warningEmpty" v-show="warningEmpty" @close-modale-empty ="warningEmpty=false" />
    <WarningDelete v-if="warningDelete" v-show="warningDelete" @close-modale-biodelete ="warningDelete=false" @close-modale-biodelete-confirm="warningDelete=false,deleteUserBio()" />
    <modify v-if="showmodify"  v-show="showmodify" @close-modale-modify=" showmodify=false,getPosts()" />
    <deletepost v-if="showdel" v-show="showdel" @close-modale-delete="showdel = false,getPosts()" />
    <WarningBanUser v-if="showBan" v-show="showBan" 
      @close-modale-ban-delete="(showBan = false),getRefresh()" @close-modale-ban-confirm="(showBan = false),getRefresh()" />
  </v-card>

</template>

<script>
import axios from "axios";
import Load from "../components/Waitload.vue";

export default {
  name: "Profil",
  components: {
    Load,
    WarningBanUser: () => import( /* webpackChunkName:"WarningBanUser"*/"../components/warningbanuser.vue"),
    WarningDeletePicture: () => import( /* webpackChunkName:"WarningDeletePicture"*/"../components/warningdeletepictureuser.vue"),
    WarningDelete: () => import ("../components/warnindelete.vue"),
    WarningEmpty: ()=> import ("../components/warningempty.vue"),
    WarningRecord: () => import("../components/warningrecord.vue"),
    modify: () => import("./index/modifytest.vue"),
    deletepost: () => import(  /* webpackChunkName:"deletepost"*/"./index/deletetest.vue"),
  
  },

  data() {
    return {
      id:'',
      url: "",
      urlpic: "",
      avatarpicempty: "",
      picutername: "",
      modifbio: false,
      deletebiouser: false,
      bio: "",
      bioUser: "",
      newBioUser: '',
      biographiePadmin: "C'est vide ,vous n'avez rien n'as modérer 😪",
      friend: "Aie c'est vide ",
      follower: [],
      followBack: false,
      followBackId: [],
      followInfo: [],
      newfollowInfo: [],
      info: [],
      followId: '',
      userjwtid:'',

      newfollow: true,
      following: [],
      followingBack: false,
      followingBackId: [],
      followingInfo: [],
      newfollowingInfo: [],
      followingId: '',
      infoAbo: [],
      publication: "Vous n'avez rien publier",
      publications: [],
      pub: [],

      lastname: "",
      firstname: "",
      photo: [],
      userid: "",
      posted: "",
      userReport : [],
      checkreport : false,
      userBan:false,

      followkey: 0,
      showBan:false,
      showdel: false,
      showmodify: false,
      warningRecord:false,
      warningEmpty: false,
      warningDelete :false,
      warningDelPic : false,

      bioValid:false,
      showloader:true,


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
  },

  methods: {

    banUserId(id){
      const info = { 
        idban : id,
      };
      localStorage.setItem("info-ban-user", JSON.stringify(info));
    
    },


    getRefresh(){
      this.userBan = false
       axios.get(`http://localhost:5000/api/user/${this.id}`)
      .then((docs) => {
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.bioUser = docs.data.bio
        this.follower = docs.data.followers;
        this.following = docs.data.following;
        this.userReport = docs.data.profilSignalBy
        if (docs.data.ban == true) this.userBan = true
      })
    },


    getBio(){
       axios
      .get(`http://localhost:5000/api/user/${this.userid}`)
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
      .get(`http://localhost:5000/api/user/${this.userid}`)
      .then((docs) => {
        this.bioUser = docs.data.bio
      })
      .catch((error) => {
        console.log(error);
      })
        })  
    },

    deletebio() {
      console.log(this.bio);
      this.newBioUser = this.bioUser;
    },

   

    delPicPreview() {
      this.url = "";
    },

    picPreview(e) {
      e.target.value[0].split(" ");
      const pic = e.target.files[0];
      this.photo = pic;
      this.url = URL.createObjectURL(pic);
      this.validPost = !this.validPost;
      window.location.reload();
    },

    getcolor() {
      if (this.urlpic === "" || this.url === ""  || this.urlpic=== undefined) {
        this.avatarpicempty = this.lastname.split("")[0].toLocaleUpperCase();
  
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
      this.pub = []
      axios.get(`http://localhost:5000/api/post`)
        .then((docs) => {
          docs.data.forEach((doc) => {
            if (doc.posterId === this.userid) {
              const id = [];
              id.push(doc._id);
              id.forEach((postid) => {
                axios
                  .get(`http://localhost:5000/api/post/${postid}`)
                  .then((doc) => {
                    console.log(doc.data._id);
                    this.pub.push(doc.data);
                    this.pub.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  });
                  });
              });
            }
          });
        }).catch((error) => {
          console.log(error);
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


    getFollowBack(id) {
      axios.patch(`http://localhost:5000/api/user/follow/${this.userjwtid}`, { idToFollow: id })
      .then(() => {
        axios
          .get(`http://localhost:5000/api/user/${this.id}`)
          .then((docs) => {
            this.follower = docs.data.followers;
            this.following = docs.data.following;

          })
          .catch((error) => {
            console.log(error); })
          .then(() => {
              axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
                .then((docs) => {
                  this.followId = docs.data._id
                  this.followLastname = docs.data.lastname;
                  this.followFirstname = docs.data.firstname;
                  this.followBackId = docs.data.followers;
                  this.followInfo = docs.data
                  this.info.push(this.followInfo)
                  if (this.follower.includes(this.userjwtid)) {
                    this.followBack = true
                    this.newfollow = false
                    console.log(  this.followBack );
                    console.log(   this.newfollow );
                  }
               
                });
            });
          }).catch((error) => {
            console.log(error);
          })
  },


  getUnFollowBack(id) {
    axios.patch(`http://localhost:5000/api/user/unfollow/${this.userjwtid}`, { idToUnFollow: id })
      .then(() => {
        axios
          .get(`http://localhost:5000/api/user/${this.id}`)
          .then((docs) => {
            this.follower = docs.data.followers;
            this.following = docs.data.following;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
              axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
                .then((docs) => {
                  // console.log(docs);
                  this.followId = docs.data._id
                  this.followLastname = docs.data.lastname;
                  this.followFirstname = docs.data.firstname;
                  this.followBackId = docs.data.followers;
                  this.followInfo = docs.data
                  const newarr  = this.info.filter(data=> data._id != this.followId)
                  this.info = newarr
                    if(!this.follower.includes(this.userjwtid)){
                    this.newfollow = true
                    this.followBack = false}
              
                  
                });
          }).catch((error) => {
            console.log(error);
          })
      })
   },
  },

  async mounted() {
    this.userReport = []
    setTimeout(() => {
    this.showloader = false
  }, 1500);
    axios.defaults.withCredentials = true;
   let params = window.location.toString()
   let idUserURL = params.split('=')[1]
    this.id = idUserURL

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
      .get(`http://localhost:5000/api/user/${this.id}`)
      .then((docs) => {
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.bioUser = docs.data.bio
        this.follower = docs.data.followers;
        this.following = docs.data.following;
        this.userReport = docs.data.profilSignalBy
     
        if (docs.data.ban == true) this.userBan = true
        console.log(this.userBan);

        
  
    
      
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
              this.followInfo = docs.data
              this.info.push(this.followInfo)
              if (this.followId === this.userjwtid) {
              this.followBack = true
              this.newfollow = false
            }
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
              this.followingInfo = docs.data
              this.infoAbo.push(this.followingInfo)
              if (this.followingId === this.userjwtid) { this.newfollow = false }
            })
        })
      }).catch((error) => {
        console.log(error);
      })

      axios.get(`http://localhost:5000/api/post/postby/${this.id}`)
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


#flag-admin-signal-icon-profil{
display: flex;
justify-content: center;
align-items: center;
color: $tertiary;
margin-bottom: 5%;
width: 20px;
height: 20px;
}

#flag-admin-signal-profil{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $primary;
  border-radius: 20px;
  border: solid 2px $primary;
  margin-top: 2.5%;
  height: 38px;
  width: 50px;
}


#number-report-profil {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 15px;
  margin-right: 10%;
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
  visibility: none;

  &:hover {
    cursor: pointer;
  }
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

#avatar-empty-profil {
  display: flex;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  font-size: 5rem;
  padding-bottom: 5%;
  background-color: rgb(6, 132, 6);
}

#form-picture-profil-admin {
  display: flex;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  font-size: 5rem;
  // padding-bottom: 5%;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.card-profil-title-admin {
  display: inline-flex;
  align-items: center;
  border-bottom: solid 2px $primary;
  background-color: $secondary;
  padding-bottom: 1%;
  

}

#btn-flag-admin{
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
height: 40px;
width: 130px;
background-color: $primary;
border-radius: 20px;
border: solid 2px $primary;
color:$tertiary;
font-weight: bold;
font-size: large;
font-style: italic;
}

#btn-flag-admin-ban{
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
height: 40px;
width: 130px;
background-color: $primary;
border-radius: 20px;
border: solid 2px $primary;
color:$tertiary;
font-weight: bold;
font-size: large;
font-style: italic;
}

#btn-flag-admin-bis{
height: 40px;
width: 130px;
}




.card-profil-title-h1-admin {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2%;
  padding-bottom: 2%;
  font-size: 2.5rem;
  font-weight: bolder;
  font-style: italic;
  color: $primary;
  margin-left: 15%;
}

div.v-card__text.card-profil-name {
  padding-top: 1%;
  display: flex;
  justify-content: center;
  background-color: $tertiary;
}
.card-profil-name-admin {
  padding-top: 1%;
  display: flex;
  justify-content: center;
  background-color: $tertiary;
}

// .card-profil-name-url {
//   display: flex;
//   justify-content: center;
//   background-color: $tertiary;
// }

// .block-btn-pic-profil {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 175px;
//   margin-left: 30px;
// }

// button#btn-del-pic-profil {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-left: 0%;
//   border: solid 2px $secondary;
//   border-radius:15px;
//   color: $secondary;
//   &:hover {
//     border-radius: 10px;
//     background-color: $secondary;
//     color: $tertiary;
//   }
// }

button#btn-del-pic-profil-bis {
  position: relative;
  top: 100px;
  left: 50px;
  height: 38px;
  width: 38px;
  padding-bottom: 2%;
  padding-right: 2%;
  &:hover {
    cursor: pointer;
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
    border-radius:10px;
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
    border-radius: 10px;
    background-color: $secondary;
    color: green;
  }
}

.form-avatar-profil-url {
  padding-top: 2%;
  display: none;
  visibility: none;

  &:hover {
    cursor: pointer;
  }
}

// .lab-pic-custom-url {
//   position: relative;
//   top: 70px;
//   left: 140px;
//   height: 38px;
//   width: 38px;
//   background-color: $tertiary;
//   border-radius: 50%;
//   border: solid 2px $primary;
//   padding-bottom: 2%;
//   padding-right: 2%;

//   &:hover {
//     cursor: pointer;
//   }
// }

.fullname-url {
  padding-top: 1%;
  padding-left: 5%;
  font-size: 1.8rem;
  padding-top: 4%;
}

.block-picture-admin{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  margin-top: 5px;
}
.block-picture-admin-empty{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 140px;
  margin-top: 5px;
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
  padding-left: 1%;
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
  border-radius: 15px;
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
  border-radius: 15px;
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
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
  background-color:  #ccc;
  color: $tertiary;

}

#btn-bio-close {
  border: solid 2px $secondary;
  margin-top: 1%;
  //   margin-left: 80%;
  // flex-grow: 80%;
  // flex-shrink: 100%;
  border-radius: 15px;
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
  border-radius: 15px;
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


.btn-unfollow-admin {
  width: 120px;
  border: solid 2px $secondary;
  // margin-top: 1%;
  // margin-right: 1%;
  // margin-left: 1%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;

    
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

p.card-profilAdmin {
font-style: italic;
font-weight: bold;
margin: 0;
color: rgb(40, 207, 40);
cursor: default;
}


p.card-profilAdmin-friend {
font-style: italic;
font-weight: bold;
margin: 0;
color: rgb(40, 207, 40);
cursor: default;
}

p.card-profilAdmin-friend-new {
font-style: italic;
font-weight: bold;
margin: 0;
color: rgb(40, 207, 40);

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

.btn-post-profil-admin {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-bottom: 1%;
margin-top: 1%;

}

#span-img-like-profilmain{
  margin-left: 2px;
}

.btn-post-delete-profil {
  width: 100px;
  border: solid 2px $secondary;
  // margin-top: 1%;
  // margin-right: 1%;
  // margin-left: 1%;
  margin-bottom: 1%;
  border-radius: 10px;
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
  border-radius: 10px;
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
  border-radius: 2px;
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
  padding: 1% 1%;
  margin-top: 1%;
  border-top: solid 2px $secondary;
  justify-content: center;
  align-items: center;
}


.message-profil-admin {
padding: 2%;
text-align: center;
max-width: 450px;
width: 100%;
border-top: solid 2px white;
border-radius: 5px;

}

.btn-profil-post-del {
  display: flex;
  max-width: 480px;
  width: 100%;
  max-height: 500px;
  flex-direction: column;
  margin-bottom: 1%;
  border: solid 2px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
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
</style>
