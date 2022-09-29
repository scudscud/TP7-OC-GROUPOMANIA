<template>
  <v-card class="card">
    <v-card-text class="card-profil-title"
      ><h1 class="card-profil-title-h1">Mon profil</h1></v-card-text
    >

    <v-card-text v-if="url == '' && urlpic == ''" class="card-profil-name">
      <div class="block-picture">
        <label class="lab-pic" for="avatar">
          <div id="avatar-empty-profil">{{ avatarpicempty }}</div>
          <v-icon class="lab-pic-custom" size="25px">mdi-camera-plus</v-icon>
          <input
            id="avatar"
            class="form-avatar-profil"
            type="file"
            value=""
            name="avatar"
            placeholder="votre photo/avatar"
            @change="picPreview"
        /></label>
      </div>
      <span class="fullname">{{ fullname }}</span>
    </v-card-text>
    <v-card-text v-else-if="url == ''" class="card-profil-name">
      <div class="block-picture">
        <label class="lab-pic" for="avatar">
          <img id="form-picture-profil" :src="urlpic" />

          <v-icon class="lab-pic-custom" size="25px">mdi-camera-plus</v-icon>
          <button id="btn-del-pic-profil-bis" @click="profilUpdate">
            <v-icon id="btn-del-pic-profil-icon" size="25px"
              >mdi-camera-off</v-icon
            >
          </button>
          <input
            id="avatar"
            class="form-avatar-profil"
            type="file"
            value=""
            name="avatar"
            placeholder="votre photo/avatar"
            @change="picPreview"
        /></label>
      </div>
      <span class="fullname">{{ fullname }}</span>
    </v-card-text>

    <v-card-text v-else class="card-profil-name">
      <div class="block-picture-url">
        <label class="lab-pic-del" for="avatar">
          <v-icon class="lab-pic-custom-url" size="25px"
            >mdi-camera-plus</v-icon
          >
          <img class="form-avatar-dl" :src="url" />
          <input
            id="avatar"
            class="form-avatar-profil-url"
            type="file"
            value=""
            name="avatar"
            placeholder="votre photo/avatar"
            @change="picPreview"
          />
        </label>
        <div class="block-btn-pic-profil">
          <button id="btn-del-pic-profil" @click="delPicPreview">
            Annuler
          </button>
          <button
            v-if="!posted"
            id="btn-confirm-pic-profil"
            action="/upload"
            type="submit"
            method="post"
            enctype="multipart/form-data"
            @click="profilUpdate"
          >
            Valider
          </button>
          <button v-else id="btn-confirm-pic-profil-post">Valider</button>
        </div>
      </div>
      <span class="fullname-url">{{ fullname }}</span>
    </v-card-text>

    <v-card-text class="card-profil-biographie">
      <h2>Ma bio</h2>
      <p class="card-profil-biographie-p">{{ biographieP }}</p>
      <button class="btn-bio-mod" @click="(modifbio = !modifbio), deletebio()">
        <v-icon class="pen-icon" size="15px">mdi-lead-pencil</v-icon> modifier
        ma bio
      </button>
    </v-card-text>

    <v-card-text class="deploy-modidify" v-show="modifbio">
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
    <v-card-text v-if="follower[0] != undefined" class="card-profil-friend" >
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 class="h2-friend">Mes abonnés</h2>
      </div>
      <div v-for="(p, index) in info"  >
        <p  class="card-profil-friend-p">{{p[1].name}}
        <button v-if="!p[0].followers.includes(userid) "  class="btn-unfollow " @click="getFollowBack(p[0]._id)" > S'abonné</button>
        <!-- <button v-else class="btn-follow" @click="refresh(),getFollowBack(p[0]._id)" > S'abonné </button> -->
      </p>
      </div>
    </v-card-text>
    <v-card-text v-else class="card-profil-friend">
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 class="h2-friend">Mes abonnés</h2>
      </div>
      <p class="card-profil-friend-p">{{ friend }}</p>
    </v-card-text>
    <v-card-text v-if="following[0] != undefined" class="card-profil-friend" >
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 class="h2-friend">Mes abonnements</h2>
      </div>
      <div v-for="(p, index) in infoAbo"  >
        <p  class="card-profil-friend-p">{{p[1].name}}
        <button :key="followkey " v-if="p[0].followers.includes(userid) "  class="btn-unfollow " @click="getUnFollowBack(p[0]._id)" > Se désabonné </button>
        <!-- <button v-else class="btn-follow" @click="refresh(),getFollowBack(p[0]._id)" > S'abonné </button> -->
      </p>
      </div>
    </v-card-text>
    <v-card-text v-else class="card-profil-friend">
      <div class="card-profil-friend-t">
        <v-icon class="icon-friend">mdi-account-group</v-icon>
        <h2 class="h2-friend">Mes abonnés</h2>
      </div>
      <p class="card-profil-friend-p">{{ friend }}</p>
    </v-card-text>

    <v-card-text class="card-profil-post">
      <div class="card-profil-friend-t">
        <v-icon class="icon-post"
          >mdi-newspaper-variant-multiple-outline</v-icon
        >
        <h2 class="h2-post">Mes publications</h2>
      </div>
      <div v-if="pub[0] != undefined">
        <p class="card-profil-post-p" v-for="(p, index) in pub">
          publication : {{ p }}
        </p>
      </div>
      <div class="card-profil-post-p" v-else>{{ publication }}</div>

      <!-- <button class="btn-bio-mod" @click="(modifbio = !modifbio), deletebio()">
        modifier ma bio
      </button> -->
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import { ref } from 'vue';
const followkey = ref(0);
const forceRerender = () => {
  followkey.value += 1;
};

export default {
  name: "Profil",
  data() {
    return {
      url: "",
      urlpic: "",
      avatarpicempty: "",
      picutername: "",
      modifbio: false,
      bio: "",
      biographieP: "C'est vide, Vous n'avez rien à nous raconter ? 😪",
      friend: "Aie c'est vide ",
      follower: [],
      followBack: false,
      followBackId: [],
      followInfo:[],
      newfollowInfo: [],
      info:[],
      followId:'',


      following:[],
      followingBack: false,
      followingBackId: [],
      followingInfo:[],
      newfollowingInfo:[],
      followingId:'',
      infoAbo: [],
    
  

      publication: "Vous n'avez rien publier",
      publications: [],
      pub: [],

      lastname: "",
      firstname: "",
      photo: [],
      userid: "",
      posted: "",

    followkey: 0,

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
    // fullnameFollowComputed: {
    //   get() {
    //     // let name = this.followFirstname + " " + this.followLastname;
    //     return this.followFirstname + " " + this.followLastname;
    //   },
    //   set(newValue) {
    //     [this.followFirstname, this.followLastname] = newValue.split(" ");
    //   },
    // },
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    refresh(){
    this.$forceUpdate() 
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
    },

    getcolor() {
      if (this.urlpic === "") {
        this.avatarpicempty = this.lastname.split("")[0].toLocaleUpperCase();
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.getElementById("avatar-empty-profil").style.backgroundColor =
          "#" + randomColor;
      }
    },
    deletebio() {
      console.log(this.bio);
      this.bio = "";
    },

    getImage(imagename) {
      let name = avatar.value;
      let namereg = name.replace(/^.*\\/, "");
      this.picutername = namereg;
    },

    async profilUpdate() {
      // photoName = this.fullname.split(' ')
      // console.log(photoName);
      let formData = new FormData();
      // formData.append('posterpicture', this.photo)
      formData.append("fullname", this.fullname);
      formData.append("photo", this.photo);
      formData.append("bio", this.bio);
      console.log(this.photo.filename);
      // console.log(this.bio);
      await axios
        .put(`http://localhost:5000/api/user/${this.userid}`, formData)
        .then(() => {
          axios.get(`http://localhost:5000/api/post`).then((test) => {
            test.data.forEach((doc) => {
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
        .then(() => {
          this.posted = true;
          setTimeout(() => {
            this.posted = false;
            window.location.reload();
          }, 1000);
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
        });
    },
    getFollowBack(id){
      axios.patch(`http://localhost:5000/api/user/follow/${this.userid}`,{idToFollow :id})
      .then(()=>{
        this.info = []
        this.infoAbo = []
        axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        // console.log(docs.data.photo);
        this.role = docs.data.role;
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.userpicture = docs.data.pictureprofil;
        this.follower = docs.data.followers;
        this.following = docs.data.following;
        // console.log(this.follower);
      })
      .catch((error) => {
        console.log(error);
      })
      .then((test) => {
        this.follower.forEach((i,u,l) => {
        axios.get(`http://localhost:5000/api/user/${i}`)
        .then((docs) => {
          // console.log(docs);
            this.followId = docs.data._id
            this.followLastname = docs.data.lastname;
            this.followFirstname = docs.data.firstname;
            this.followBackId = docs.data.followers;
            let name = this.followFirstname + " " + this.followLastname;
            this.followInfo = [docs.data,{"name":name}]
            
            this.info.push(this.followInfo)                    
          });
        });      
      }).then(()=>{
        this.following.forEach((i)=>{
          axios.get(`http://localhost:5000/api/user/${i}`)
          .then((docs)=>{
            console.log(docs);
            this.followingId = docs.data._id
            this.followingLastname = docs.data.lastname;
            this.followingFirstname = docs.data.firstname;
            this.followingBackId = docs.data.followers;
            let name = this.followingFirstname + " " + this.followingLastname;
            this.followingInfo = [docs.data,{"name":name}]
            this.infoAbo.push(this.followingInfo)
          })
        })
      })
      })
  
    },

    getUnFollowBack(id){
      axios.patch(`http://localhost:5000/api/user/unfollow/${this.userid}`,{idToUnFollow :id})
      .then(()=>{
        this.info = []
        this.infoAbo = []
        axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        // console.log(docs.data.photo);
        this.role = docs.data.role;
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.userpicture = docs.data.pictureprofil;
        this.follower = docs.data.followers;
        this.following = docs.data.following;
        // console.log(this.follower);
      })
      .catch((error) => {
        console.log(error);
      })
      .then((test) => {
        this.follower.forEach((i,u,l) => {
        axios.get(`http://localhost:5000/api/user/${i}`)
        .then((docs) => {
          // console.log(docs);
            this.followId = docs.data._id
            this.followLastname = docs.data.lastname;
            this.followFirstname = docs.data.firstname;
            this.followBackId = docs.data.followers;
            let name = this.followFirstname + " " + this.followLastname;
            this.followInfo = [docs.data,{"name":name}]
            this.info.push(this.followInfo)                    
          });
        });      
      }).then(()=>{
        this.following.forEach((i)=>{
          axios.get(`http://localhost:5000/api/user/${i}`)
          .then((docs)=>{
            console.log(docs);
            this.followingId = docs.data._id
            this.followingLastname = docs.data.lastname;
            this.followingFirstname = docs.data.firstname;
            this.followingBackId = docs.data.followers;
            let name = this.followingFirstname + " " + this.followingLastname;
            this.followingInfo = [docs.data,{"name":name}]
            this.infoAbo.push(this.followingInfo)
          })
        })
      })
        console.log('oj');
      })
    
    },
  },

  async mounted() {
    axios.defaults.withCredentials = true;
    // console.log($refs.deletepost.$el)

    await axios
      .get(`http://localhost:5000/jwtid`)
      .then((res) => {
        // console.log(this.userjwtid);
        this.userjwtid = res.data;
        this.show = true;
        this.log = true;
        // TODO => Insert loader \\
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        // console.log(docs.data.photo);
        this.role = docs.data.role;
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.userpicture = docs.data.pictureprofil;
        this.follower = docs.data.followers;
        this.following = docs.data.following;
        // console.log(this.follower);
      })
      .catch((error) => {
        console.log(error);
      })
      .then((test) => {
        this.follower.forEach((i,u,l) => {
        axios.get(`http://localhost:5000/api/user/${i}`)
        .then((docs) => {
          // console.log(docs);
            this.followId = docs.data._id
            this.followLastname = docs.data.lastname;
            this.followFirstname = docs.data.firstname;
            this.followBackId = docs.data.followers;
            let name = this.followFirstname + " " + this.followLastname;
            this.followInfo = [docs.data,{"name":name}]
            this.info.push(this.followInfo)                    
          });
        });      
      }).then(()=>{
        this.following.forEach((i)=>{
          axios.get(`http://localhost:5000/api/user/${i}`)
          .then((docs)=>{
            console.log(docs);
            this.followingId = docs.data._id
            this.followingLastname = docs.data.lastname;
            this.followingFirstname = docs.data.firstname;
            this.followingBackId = docs.data.followers;
            let name = this.followingFirstname + " " + this.followingLastname;
            this.followingInfo = [docs.data,{"name":name}]
            this.infoAbo.push(this.followingInfo)
          })
        })
      })

    await axios.get(`http://localhost:5000/api/post`)
    .then((test) => {
      test.data.forEach((doc) => {
        if (doc.posterId === this.userid) {
          const id = [];
          id.push(doc._id);
          id.forEach((postid) => {
            axios
              .get(`http://localhost:5000/api/post/${postid}`)
              .then((doc) => {
                this.pub.push(doc.data.date);
              });
          });
        }
      });
    });
    this.getcolor();
  },
};
</script>

<style lang="scss">
label.lab-pic {
  display: flex;
  // width: 130px;
}
.lab-pic-del {
  display: flex;
  justify-content: center;
  // margin-right: 10%;
  // width: 100%;
  // width: 20%;
  // flex-direction: column;
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
}
img#form-picture-profil {
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
  border-radius: 30%;
  color: $secondary;
  &:hover {
    border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}
button#btn-del-pic-profil-bis {
  position: relative;
  top: 80px;
  left: -170px;
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
  border-radius: 30%;
  color: $secondary;
  &:hover {
    border-radius: 20%;
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
  border-radius: 30%;
  color: green;
  &:hover {
    border-radius: 20%;
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

.fullname-url {
  padding-top: 1%;
  padding-left: 5%;
  font-size: 1.8rem;
  padding-top: 4%;
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
    &.btn-bio-mod > .pen-icon {
      color: $tertiary;
    }
  }
}
.btn-follow {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
    &.btn-follow > .pen-icon {
      color: $tertiary;
    }
  }
}
.btn-unfollow {
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: $secondary;
    color: $tertiary;
    &.btn-unfollow > .pen-icon {
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

.icon-friend {
  padding-right: 1%;
}

p.card-profil-friend-p {
  margin: 0;
  padding-left: 1%;
  padding-bottom: 2%;
  // border: 2px solid $primary;
  cursor: default;
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

p.card-profil-post-p {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding-left: 1%;
  padding-bottom: 2%;
  // border: 2px solid $primary;
  cursor: default;
}
</style>
