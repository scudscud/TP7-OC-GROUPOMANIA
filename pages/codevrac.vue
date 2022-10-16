<template>
<div class="form-popup" id="popup-Form">
 
    <h2>Voulez-vous vraiment vous deconnecter</h2>
    <label for="email">
      <strong>E-mail</strong>
    </label>
    <input type="text" placeholder="Votre Email" name="email" required />
    <label for="psw">
      <strong>Mot de passe</strong>
    </label>
    <input type="password" placeholder="Votre mot de passe" name="psw" required />
    <button type="submit" class="btn">Se connecter</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Annuler</button>

</div>


</template>
<script>

// refresh ok without reload page \\
      // this.posts = []
      // axios.get("http://localhost:5000/api/post")
      //   .then((docs) => {
      //     docs.data.forEach((doc) => {
      //       this.userLikePostId.forEach((idlike) => {
      //         if (doc._id === idlike) {
      //           // this.postsILike = doc
      //           this.posts.push(doc)
      //         }
      //       })
      //     })
      //   }).then(() => {
      //     if (this.posts[0] == undefined) {
      //       axios.get("http://localhost:5000/api/post").then((docs) => {
      //         this.posts = docs.data
      //       })
      //       localStorage.removeItem('sort')
      //       this.emptylike = true
      //       setTimeout(() => {
      //         this.emptylike = false
      //       }, 5000);
      //     } 
      //     else {
      //       localStorage.setItem('sort', 'Like');
      //       return this.posts
      //     }
      //   })
      //   .catch((err) => { console.log(err); });

//================================================================================================\\

// test likes profilusermain sans refresh\\
// <v-card-text class="card-profil-post" v-if="pub[0] != undefined && this.mypost ">
//       <div class="card-profil-friend-pub">
//         <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
//         <h2 class="h2-post">Ces publications&nbsp</h2>
//       </div>
//       <div class="align-pub-user" v-for="(p, index) in pub">
//         <div class="profilusermain-post" v-if="p.posterId === id" >

//           <p   class="card-profil-post-p"> publication&nbsp:&nbsp{{p.date}}</p>
//           <div class="like-profilmain-user" v-if="p.likers.length != 0">
//             <v-icon class="img-like-profilmain">mdi-thumb-up-outline</v-icon><span>{{p.likers.length}}</span>
//           </div>
//           <div class="btn-post-profil">
//             <!-- <button class="btn-post-modify-profil" type="submit"
//                 @click=" showmodify = !showmodify,postIdDel(p._id)">Modifier </button> -->
//             <!-- <button class="btn-post-delete-profil" @click="showdel =!showdel,postIdDel(p._id)"> Like </button>  -->
//             <button :class="p.likers.includes(userjwtid) ? 'class-btn-like-userprofil' : 'class-btn-unlike-userprofil'"
//               @click="clickLike(p._id,index)" class="classlikebtn">
//               <v-icon class="img-att-userprofil">mdi-thumb-up-outline</v-icon>
//               <p class="text-att-userprofil">Like</p>
//               <!-- <div v-if="post.likers.length>0" class="buble-like"><span id="number-like">{{post.likers.length}}</span>
//                 </div> -->
//             </button>
//           </div>

//           <div v-if='p.picture !="" ' class="image-card-profil"><img class="card-img-profil" :src="p.picture"
//               alt="photo" /></div>
//           <div v-if="p.message != ''" class="message-profil"> {{p.message}}</div>
//         </div>
//       </div>
//     </v-card-text>
//     <v-card-text class="card-profilusermain-post" v-else>
//       <div class="card-profil-friend-pub">
//         <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
//         <h2 class="h2-post">Ces publications</h2>
//       </div>
//       <div class="card-profil-post-p">{{ publication }}</div>
//     </v-card-text>









// //---------------------------------option a dev read URL --------------------------------\\

//   //       <!-- <router-link   to="/postpage"> 
//   //    <button  @click="log" v-if="log != `http://localhost:3000/postpage`" class="btn-post-router-plus"><v-icon id="icon">mdi-newspaper-plus </v-icon> </button>
//   //    <button  v-else  class="btn-hover"> <v-icon id="icon">mdi-newspaper-plus </v-icon></button>
//   //  </router-link>  -->


//     log(){
//       let base =this.$el.baseURI
//    let   page = base.split('/')[3]
//  console.log(page);
//      return page
   
//     }


// ===============================================================================================

// <!-- //------------------------option modale create post ---------------------------------------\\ -->
// <!--     
//       <v-btn @click="showpost = !showpost" id="btn-post-nav" alt="menu">
//         <v-icon>mdi-newspaper-plus </v-icon>
//         </v-btn>  
//        -->
// <!-- //================================================================================================\\ -->

//     <!-- //---------------------------------option switch class button ------------------------------\\ -->
//         <!-- <router-link     to="/postpage"> 
//       <button :class="hoverbtn ? 'btn-hover' : 'btn-post-router-plus' "  @click=" toggleClass" alt="menu" >
//         <v-icon id="icon">mdi-newspaper-plus </v-icon>
//         </button>  
//         </router-link> -->

//     toggleClass(event){
//        this.hoverbtn = !this.hoverbtn;
//     },
// <!-- //================================================================================================\\ -->

// .btn-hover{
//   margin-left: 10%;
// background-color: $secondary;
//   border: solid $tertiary;
//   color:$tertiary;
//   border-radius: 20%;
//   &.btn-hover>#icon{
//     color: black;
//   }
//   }


// <<============================ FORMAT date ======================================================================>>
//------------------------------------------format date---------------------------------------------------------\\
   // date() {
    //   let today = new Date();
    //   let dd = today.getDate();

    //   let mm = today.getMonth() + 1;
    //   let yyyy = today.getFullYear();
    //   if (dd < 10) {
    //     dd = "0" + dd;
    //   }
    //   if (mm < 10) {
    //     mm = "0" + mm;
    //   }
    //   // today = mm+'-'+dd+'-'+yyyy;
    //   // today = mm+'/'+dd+'/'+yyyy;
    //   // today = dd+'-'+mm+'-'+yyyy;
    //   today = dd + "/" + mm + "/" + yyyy;
    //   return today;
    // },
    // hour() {
    //   const d = new Date();
    //   let hours = d.getHours() + "h" + d.getMinutes();
    //   return hours;
    // },
    // fullname: {
    //   get(full) {
    //     // console.log(fullname);
    //     // [post.posterfirstname + " " + post.posterlastname] = test
    //     return post.posterfirstname + " " + post.posterlastname;
    //   },
    //   set(name) {
       
    //     [post.posterfirstname, post.posterlastname] = name.split(" ");
        
    //   },
    // },
   // date() {
    //   let today = new Date();
    //   let dd = today.getDate();

    //   let mm = today.getMonth() + 1;
    //   let yyyy = today.getFullYear();
    //   if (dd < 10) {
    //     dd = "0" + dd;
    //   }
    //   if (mm < 10) {
    //     mm = "0" + mm;
    //   }
    //   // today = mm+'-'+dd+'-'+yyyy;
    //   // today = mm+'/'+dd+'/'+yyyy;
    //   // today = dd+'-'+mm+'-'+yyyy;
    //   today = dd + "/" + mm + "/" + yyyy;
    //   return today;
    // },
    // hour() {
    //   const d = new Date();
    //   let hours = d.getHours() + "h" + d.getMinutes();
    //   return hours;
    // },
    // fullname: {
    //   get(full) {
    //     // console.log(fullname);
    //     // [post.posterfirstname + " " + post.posterlastname] = test
    //     return post.posterfirstname + " " + post.posterlastname;
    //   },
    //   set(name) {
       
    //     [post.posterfirstname, post.posterlastname] = name.split(" ");
        
    //   },
    // },
    //--------------------------------------------------------------------------------------\\
//====================================end format date ========================================================>>

// <template>
//     <v-card class="card">
//       <v-card-text class="card-profil-title">
//         <h1 class="card-profil-title-h1">Mon profil </h1>
//       </v-card-text>
  
//       <v-card-text v-if="url == '' && urlpic == ''" class="card-profil-name">
//         <div class="block-picture">
//           <label class="lab-pic" for="avatar">
//             <div id="avatar-empty-profil">{{ avatarpicempty }}</div>
//             <v-icon class="lab-pic-custom" size="25px">mdi-camera-plus</v-icon>
//             <input id="avatar" class="form-avatar-profil" type="file" value="" name="avatar"
//               placeholder="votre photo/avatar" @change="picPreview" />
//           </label>
//         </div>
//         <span class="fullname">{{ fullname }}</span>
//       </v-card-text>
//       <v-card-text v-else-if=" urlpic !== '' " class="card-profil-name">
//         <div class="block-picture">
//           <label class="lab-pic" for="avatar">
//             <img id="form-picture-profil" :src="urlpic" />
  
//             <v-icon class="lab-pic-custom" size="25px">mdi-camera-plus</v-icon>
//             <button id="btn-del-pic-profil-bis" @click="profilUpdate">
//               <v-icon id="btn-del-pic-profil-icon" size="25px">mdi-camera-off</v-icon>
//             </button>
//             <input id="avatar" class="form-avatar-profil" type="file" value="" name="avatar"
//               placeholder="votre photo/avatar" @change="picPreview" />
//           </label>
//         </div>
//         <span class="fullname">{{ fullname }}</span>
//       </v-card-text>
  
//       <v-card-text v-else class="card-profil-name">
//         <div class="block-picture-url">
//           <label class="lab-pic-del" for="avatar">
//             <v-icon class="lab-pic-custom-url" size="25px">mdi-camera-plus</v-icon>
//             <img class="form-avatar-dl" :src="url" />
//             <input id="avatar" class="form-avatar-profil-url" type="file" value="" name="avatar"
//               placeholder="votre photo/avatar" @change="picPreview" />
//           </label>
//           <div class="block-btn-pic-profil">
//             <button id="btn-del-pic-profil" @click="delPicPreview">
//               Annuler
//             </button>
//             <button v-if="!posted" id="btn-confirm-pic-profil" action="/upload" type="submit" method="post"
//               enctype="multipart/form-data" @click="profilUpdate">
//               Valider
//             </button>
//             <button v-else id="btn-confirm-pic-profil-post">Valider</button>
//           </div>
//         </div>
//         <span class="fullname-url">{{ fullname }}</span>
//       </v-card-text>
  
//       <v-card-text class="card-profil-biographie">
//         <h2>Ma bio</h2>
//         <p v-if="this.bioUser == ''" class="card-profil-biographie-p">{{ biographieP }}</p>
//         <p v-else class="card-profil-biographie-p">{{ bioUser }}</p>
//         <button v-if='!modifbio' class="btn-bio-mod" @click="getBio(),(modifbio = !modifbio)">
//           <v-icon class="pen-icon" size="15px">mdi-lead-pencil</v-icon> modifier ma bio </button>
  
//         <button v-if="this.bioUser !== '' && !modifbio" class="btn-bio-mod" @click="getBio(),(warningDelete= !warningDelete)">
//           <v-icon class="pen-icon" size="15px">mdi-delete</v-icon> supprimer ma bio </button>
//       </v-card-text>
  
//       <v-card-text class="deploy-modidify" v-show="modifbio" @change="controleBio()" >
//         <form method="post" @submit.prevent @canplaythrough="controleBio"  >
//           <label for="biographie"  >
//             <h2>Biographie :</h2>
//           </label>
//           <textarea @change="controleBio()" v-model="newBioUser" name="biographie" class="card-profil-textarea" type="textarea"
//             placeholder="votre biographie" maxlength="500" ></textarea>
  
//           <div class="btn-bio"  >
//             <button id="btn-bio-send" type="submit" @click="controlePostBio">Enregistrer</button>
//             <!-- <button v-else id="btn-bio-send" type="submit" @click="controlePostBio">c'est Vide</button> -->
//             <button id="btn-bio-delete" @click="deletebio">Annuler</button>
//             <button id="btn-bio-close" @click="(warningRecord = !warningRecord)">
//               Fermer
//             </button>
//           </div>
//         </form>
//       </v-card-text>
//       <v-card-text v-if="follower[0] !== undefined" class="card-profil-friend">
//         <div class="card-profil-friend-t">
//           <v-icon class="icon-friend">mdi-account-group</v-icon>
//           <h2 class="h2-friend">Mes abonnés&nbsp({{info.length}})</h2>
//         </div>
//         <div v-for="(p, index) in info" class="btn-profil-follow">
//           <p class="card-profil-friend-p">{{p[1].name}}</p>
        
//           <button v-if="!p[0].followers.includes(userid)  " class="btn-unfollow " @click="getFollowBack(p[0]._id)">
//             S'abonné</button>
//           <!-- <button v-else class="btn-follow" @click="refresh(),getFollowBack(p[0]._id)" > S'abonné </button> -->
  
//         </div>
//       </v-card-text>
//       <v-card-text v-else class="card-profil-friend">
//         <div class="card-profil-friend-t">
//           <v-icon class="icon-friend">mdi-account-group</v-icon>
//           <h2 class="h2-friend">Mes abonnés</h2>
//         </div>
//         <p class="card-profil-friend-p">{{ friend }}</p>
//       </v-card-text>
//       <v-card-text v-if="following[0] != undefined" class="card-profil-friend">
//         <div class="card-profil-friend-t">
//           <v-icon class="icon-friend">mdi-account-group</v-icon>
//           <h2 class="h2-friend">Mes abonnements&nbsp({{infoAbo.length}})</h2>
//         </div>
//         <div v-for="(p, index) in infoAbo" class="btn-profil-follow">
//           <p class="card-profil-friend-p">{{p[1].name}} </p>
//           <button :key="followkey " v-if="p[0].followers.includes(userid) " class="btn-unfollow "
//             @click="getUnFollowBack(p[0]._id)"> Se désabonné </button>
//           <!-- <button v-else class="btn-follow" @click="refresh(),getFollowBack(p[0]._id)" > S'abonné </button> -->
  
//         </div>
//       </v-card-text>
//       <v-card-text v-else class="card-profil-friend">
//         <div class="card-profil-friend-t">
//           <v-icon class="icon-friend">mdi-account-group</v-icon>
//           <h2 class="h2-friend">Mes abonnements</h2>
//         </div>
//         <p class="card-profil-friend-p">{{ friend }}</p>
//       </v-card-text>
  
//       <v-card-text class="card-profil-post" v-if="pub[0] != undefined">
//         <div class="card-profil-friend-pub">
//           <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
//           <h2 class="h2-post">Mes publications&nbsp({{pub.length}})</h2>
//         </div>
//         <div class="align-pub-user">
//           <div class="btn-profil-post-del" v-for="(p, index) in pub">
  
//             <p class="card-profil-post-p"> publication&nbsp:&nbsp{{p.date}}</p>
//             <span class="like-profil-user">&nbspLIKE&nbsp:&nbsp {{p.likers.length}}</span>
//             <div class="btn-post-profil">
//               <button class="btn-post-modify-profil" type="submit"
//                 @click=" showmodify = !showmodify,postIdDel(p._id)">Modifier </button>
//               <button class="btn-post-delete-profil" @click="showdel =!showdel,postIdDel(p._id)">supprimer</button>
//             </div>
//             <div v-if='p.picture !="" ' class="image-card-profil"><img class="card-img-profil" :src="p.picture"
//                 alt="photo" /></div>
//             <div v-if="p.message != ''" class="message-profil"> {{p.message}}</div>
//           </div>
//         </div>
//       </v-card-text>
//       <v-card-text class="card-profil-post" v-else>
//         <div class="card-profil-friend-pub">
//           <v-icon class="icon-post">mdi-newspaper-variant-multiple-outline</v-icon>
//           <h2 class="h2-post">Mes publications</h2>
//         </div>
//         <div class="card-profil-post-p">{{ publication }}</div>
//       </v-card-text>
//       <!-- <WarningRecord v-if="warningRecord" v-show="warningRecord" @close-modale-record ="warningRecord=false" @close-modale-record-confirm="warningRecord=false,modifbio=false"/>
//       <WarningEmpty v-if="warningEmpty" v-show="warningEmpty" @close-modale-empty ="warningEmpty=false" />
//       <WarningDelete v-if="warningDelete" v-show="warningDelete" @close-modale-biodelete ="warningDelete=false" @close-modale-biodelete-confirm="warningDelete=false,deleteUserBio()" />
//       <modify v-if="showmodify"  v-show="showmodify" @close-modale-modify=" showmodify=false,getPosts()" />
//       <deletepost v-if="showdel" v-show="showdel" @close-modale-delete="showdel = false,getPosts()" /> -->
//     </v-card>
  
//   </template>
  
//   <script>
//   import axios from "axios";
  
//   export default {
//     name: "Profil",
//     components: {
//     //   WarningDelete: () => import ("../components/warnindelete.vue"),
//     //   WarningEmpty: ()=> import ("../components/warningempty.vue"),
//     //   WarningRecord: () => import("../components/warningrecord.vue"),
//     //   modify: () => import("./index/modifytest.vue"),
//     //   deletepost: () => import(  /* webpackChunkName:"deletepost"*/"./index/deletetest.vue"),
//     },
  
//     data() {
//       return {
//         id:'',
//         url: "",
//         urlpic: "",
//         avatarpicempty: "",
//         picutername: "",
//         modifbio: false,
//         deletebiouser: false,
//         bio: "",
//         bioUser: "",
//         newBioUser: '',
//         biographieP: "C'est vide, Vous n'avez rien à nous raconter ? 😪",
//         friend: "Aie c'est vide ",
//         follower: [],
//         followBack: false,
//         followBackId: [],
//         followInfo: [],
//         newfollowInfo: [],
//         info: [],
//         followId: '',
  
//         following: [],
//         followingBack: false,
//         followingBackId: [],
//         followingInfo: [],
//         newfollowingInfo: [],
//         followingId: '',
//         infoAbo: [],
  
//         publication: "Vous n'avez rien publier",
//         publications: [],
//         pub: [],
  
//         lastname: "",
//         firstname: "",
//         photo: [],
//         userid: "",
//         posted: "",
  
//         followkey: 0,
  
//         showdel: false,
//         showmodify: false,
//         warningRecord:false,
//         warningEmpty: false,
//         warningDelete :false,
  
//         bioValid:false,
  
  
//       };
//     },
//     computed: {
//       fullname: {
//         get() {
//           return this.firstname + " " + this.lastname;
//         },
//         set(newValue) {
//           [this.firstname, this.lastname] = newValue.split(" ");
//         },
//       },
//     },
  
//     methods: {
  
//       getBio(){
//          axios
//         .get(`http://localhost:5000/api/user/${this.userid}`)
//         .then((docs) => {
//           this.newBioUser = docs.data.bio
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//       },
  
//       // getRefreshBio(){
//       //   axios
//       //   .get(`http://localhost:5000/api/user/${this.userjwtid}`)
//       //   .then((docs) => {
//       //     this.bioUser = docs.data.bio
//       //   })
//       //   .catch((error) => {
//       //     console.log(error);
//       //   })
//       // },
  
//       // postBio(){
//       //   let formData = new FormData();
//       //   formData.append("bio", this.newBioUser);
//       //   axios
//       //     .put(`http://localhost:5000/api/user/${this.userid}`, formData)
//       //     .then(()=>{
//       //       this.newBioUser = ''
//       //     }).catch((err)=>{console.log(err);})
//       // },
//       deleteUserBio(){
//         let formData = new FormData();
//         formData.append("bio", this.bio);
//         axios.put(`http://localhost:5000/api/user/${this.userid}`, formData)
//             .then(()=>{
//               this.BioUser = ''
//           }).then(()=>{
//             axios
//         .get(`http://localhost:5000/api/user/${this.userid}`)
//         .then((docs) => {
//           this.bioUser = docs.data.bio
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//           })  
  
  
//       },
  
  
//       controleBio(){
//         let testRegex = this.newBioUser.split(' ').join('')
//         if(testRegex !='' || this.bioUser !== ''){
//             this.bioValid = true
//             return true
//           }
//           else{
//           this.bioValid = false
//           return false
//           }
//       },
  
  
//       controlePostBio(){
//         let testRegex = this.newBioUser.split(' ').join('')
//           if(testRegex !=''){
//             this.bioValid = true
//             this.newBioUser.trimStart('')
//             let formData = new FormData();
//         formData.append("bio", this.newBioUser);
//         axios.put(`http://localhost:5000/api/user/${this.userid}`, formData)
//             .then(()=>{
//               this.newBioUser = ''
//             this.modifbio = !this.modifbio
        
//           }).then(()=>{
//             axios
//         .get(`http://localhost:5000/api/user/${this.userid}`)
//         .then((docs) => {
//           this.bioUser = docs.data.bio
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//           })  
//           }
//           else{
//           this.bioValid = false
//           this.warningEmpty = true
//           setTimeout(()=>{
//             this.bioValid = true
//           },2000)
//           return false
         
//           }
//       },
  
//       deletebio() {
//         console.log(this.bio);
//         this.newBioUser = this.bioUser;
//       },
  
     
  
//       delPicPreview() {
//         this.url = "";
//       },
  
//       picPreview(e) {
//         e.target.value[0].split(" ");
//         const pic = e.target.files[0];
//         this.photo = pic;
//         this.url = URL.createObjectURL(pic);
//         this.validPost = !this.validPost;
//       },
  
//       getcolor() {
//         if (this.urlpic === "" ) {
//           this.avatarpicempty = this.lastname.split("")[0].toLocaleUpperCase();
//           // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
//           // document.getElementById("avatar-empty-profil").style.backgroundColor =
//           //   "#" + randomColor;
//         }
//       },
  
  
  
  
//       getImage(imagename) {
//         let name = avatar.value;
//         let namereg = name.replace(/^.*\\/, "");
//         this.picutername = namereg;
//       },
  
//       postIdDel(post) {
//         const parse = JSON.stringify(post);
//         localStorage.setItem('categories', parse);
//       },
  
  
//       getPosts() {
//         this.pub = []
//         axios.get(`http://localhost:5000/api/post`)
//           .then((docs) => {
//             docs.data.forEach((doc) => {
//               if (doc.posterId === this.userid) {
//                 const id = [];
//                 id.push(doc._id);
//                 id.forEach((postid) => {
//                   axios
//                     .get(`http://localhost:5000/api/post/${postid}`)
//                     .then((doc) => {
//                       console.log(doc.data._id);
//                       this.pub.push(doc.data);
//                     });
//                 });
//               }
//             });
//           }).catch((error) => {
//             console.log(error);
//           })
//       },
  
//       async profilUpdate() {
//         // photoName = this.fullname.split(' ')
//         // console.log(photoName);
//         let formData = new FormData();
//         // formData.append('posterpicture', this.photo)
//         formData.append("fullname", this.fullname);
//         formData.append("photo", this.photo);
//         // formData.append("bio", this.bio);
//         // console.log(this.photo.filename);
//         // console.log(this.bio);
//         await axios
//           .put(`http://localhost:5000/api/user/${this.userid}`, formData)
//           .then(() => {
//             axios.get(`http://localhost:5000/api/post`).then((post) => {
//               post.data.forEach((doc) => {
//                 if (doc.posterId === this.userid) {
//                   const id = [];
//                   id.push(doc._id);
//                   id.forEach((postid) => {
//                     // console.log(postid);
//                     // console.log(this.photo);
//                     let formData = new FormData();
//                     formData.append("picture", this.photo);
//                     axios.put(
//                       `http://localhost:5000/api/post/photo/${postid}`,
//                       formData
//                     );
//                   });
//                 }
//               });
//             });
//           })
//           .then(() => {
//             this.posted = true;
//             setTimeout(() => {
//               this.posted = false;
//               window.location.reload();
//             }, 1000);
//           })
//           .catch((errors, test) => {
//             this.maxsize = errors.response.data.errors.maxsize;
//             this.format = errors.response.data.errors.format;
//             setTimeout(() => {
//               this.maxsize = "";
//               this.format = "";
//             }, 3000);
//             console.log(errors.response.data.errors.maxsize);
//             console.log(errors.response.data.errors.format);
//           });
//       },
  
//       getFollowBack(id) {
//         axios.patch(`http://localhost:5000/api/user/follow/${this.userid}`, { idToFollow: id })
//           .then(() => {
//             this.info = []
//             this.infoAbo = []
//             axios
//               .get(`http://localhost:5000/api/user/${this.userid}`)
//               .then((docs) => {
//                 // console.log(docs.data.photo);
//                 this.role = docs.data.role;
//                 this.userid = docs.data._id;
//                 this.firstname = docs.data.firstname;
//                 this.lastname = docs.data.lastname;
//                 this.urlpic = docs.data.photo;
//                 // this.userpicture = docs.data.pictureprofil;
//                 this.follower = docs.data.followers;
//                 this.following = docs.data.following;
//                 // console.log(this.follower);
//               })
//               .catch((error) => {
//                 console.log(error);
//               })
//               .then((test) => {
//                 this.follower.forEach((i, u, l) => {
//                   axios.get(`http://localhost:5000/api/user/${i}`)
//                     .then((docs) => {
//                       // console.log(docs);
//                       this.followId = docs.data._id
//                       this.followLastname = docs.data.lastname;
//                       this.followFirstname = docs.data.firstname;
//                       this.followBackId = docs.data.followers;
//                       let name = this.followFirstname + " " + this.followLastname;
//                       this.followInfo = [docs.data, { "name": name }]
//                       this.info.push(this.followInfo)
//                     });
//                 });
//               }).catch((error) => {
//                 console.log(error);
//               }).then(() => {
//                 this.following.forEach((i) => {
//                   axios.get(`http://localhost:5000/api/user/${i}`)
//                     .then((docs) => {
//                       console.log(docs);
//                       this.followingId = docs.data._id
//                       this.followingLastname = docs.data.lastname;
//                       this.followingFirstname = docs.data.firstname;
//                       this.followingBackId = docs.data.followers;
//                       let name = this.followingFirstname + " " + this.followingLastname;
//                       this.followingInfo = [docs.data, { "name": name }]
//                       this.infoAbo.push(this.followingInfo)
//                     })
//                 })
//               }).catch((error) => {
//                 console.log(error);
//               })
//           })
//       },
  
//       getUnFollowBack(id) {
//         axios.patch(`http://localhost:5000/api/user/unfollow/${this.userid}`, { idToUnFollow: id })
//           .then(() => {
//             this.info = []
//             this.infoAbo = []
//             axios
//               .get(`http://localhost:5000/api/user/${this.userid}`)
//               .then((docs) => {
//                 // console.log(docs.data.photo);
//                 // this.role = docs.data.role;
//                 // this.userid = docs.data._id;
//                 // this.firstname = docs.data.firstname;
//                 // this.lastname = docs.data.lastname;
//                 // this.urlpic = docs.data.photo;
//                 // this.userpicture = docs.data.pictureprofil;
//                 this.follower = docs.data.followers;
//                 this.following = docs.data.following;
//                 // console.log(this.follower);
//               })
//               .catch((error) => {
//                 console.log(error);
//               }).catch((error) => {
//                 console.log(error);
//               })
//               .then((test) => {
//                 this.follower.forEach((i, u, l) => {
//                   axios.get(`http://localhost:5000/api/user/${i}`)
//                     .then((docs) => {
//                       // console.log(docs);
//                       this.followId = docs.data._id
//                       this.followLastname = docs.data.lastname;
//                       this.followFirstname = docs.data.firstname;
//                       this.followBackId = docs.data.followers;
//                       let name = this.followFirstname + " " + this.followLastname;
//                       this.followInfo = [docs.data, { "name": name }]
//                       this.info.push(this.followInfo)
//                     });
//                 });
//               }).catch((error) => {
//                 console.log(error);
//               })
//               .then(() => {
//                 this.following.forEach((i) => {
//                   axios.get(`http://localhost:5000/api/user/${i}`)
//                     .then((docs) => {
//                       console.log(docs);
//                       this.followingId = docs.data._id
//                       this.followingLastname = docs.data.lastname;
//                       this.followingFirstname = docs.data.firstname;
//                       this.followingBackId = docs.data.followers;
//                       let name = this.followingFirstname + " " + this.followingLastname;
//                       this.followingInfo = [docs.data, { "name": name }]
//                       this.infoAbo.push(this.followingInfo)
//                     })
//                 })
//               }).catch((error) => {
//                 console.log(error);
//               })
//           })
//       },
//     },
  
//     async mounted() {
//       axios.defaults.withCredentials = true;
//       // console.log($refs.deletepost.$el)
//       const idUserURL = window.location.search.split('=')[1]
//       this.id = idUserURL
//       console.log(this.id);
  
//       // await axios
//       //   .get(`http://localhost:5000/jwtid`)
//       //   .then((res) => {
//       //     // console.log(this.userjwtid);
//       //     this.userjwtid = res.data;
//       //     this.show = true;
//       //     this.log = true;
//       //     // TODO => Insert loader \\
//       //   })
//       //   .catch((error) => {
//       //     console.log(error);
//       //   });
  
//       await axios
//         .get(`http://localhost:5000/api/user/${this.id}`)
//         .then((docs) => {
//           // console.log(docs.data.photo);
//           // this.role = docs.data.role;
//           this.userid = docs.data._id;
//           this.firstname = docs.data.firstname;
//           this.lastname = docs.data.lastname;
//           this.urlpic = docs.data.photo;
//           this.bioUser = docs.data.bio
//           // this.userpicture = docs.data.pictureprofil;
//           this.follower = docs.data.followers;
//           this.following = docs.data.following;
//           // console.log(this.follower);
//           // console.log(this.urlpic);
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//         .then(() => {
//           this.follower.forEach((i, u, l) => {
//             axios.get(`http://localhost:5000/api/user/${i}`)
//               .then((docs) => {
//                 // console.log(docs);
//                 this.followId = docs.data._id
//                 this.followLastname = docs.data.lastname;
//                 this.followFirstname = docs.data.firstname;
//                 this.followBackId = docs.data.followers;
//                 let name = this.followFirstname + " " + this.followLastname;
//                 this.followInfo = [docs.data, { "name": name }]
//                 this.info.push(this.followInfo)
//                 console.log(this.info);
//               });
//           });
//         }).catch((error) => {
//           console.log(error);
//         })
//         .then(() => {
//           this.following.forEach((i) => {
//             axios.get(`http://localhost:5000/api/user/${i}`)
//               .then((docs) => {
//                 console.log(docs);
//                 this.followingId = docs.data._id
//                 this.followingLastname = docs.data.lastname;
//                 this.followingFirstname = docs.data.firstname;
//                 this.followingBackId = docs.data.followers;
//                 let name = this.followingFirstname + " " + this.followingLastname;
//                 this.followingInfo = [docs.data, { "name": name }]
//                 this.infoAbo.push(this.followingInfo)
//                 // console.log(this.infoAbo);
//               })
//           })
//         }).catch((error) => {
//           console.log(error);
//         })
  
//       await axios.get(`http://localhost:5000/api/post`)
//         .then((docs) => {
//           docs.data.forEach((doc) => {
//             if (doc.posterId === this.userid) {
//               const id = [];
//               id.push(doc._id);
//               id.forEach((postid) => {
//                 axios
//                   .get(`http://localhost:5000/api/post/${postid}`)
//                   .then((doc) => {
//                     console.log(doc.data._id);
//                     this.pub.push(doc.data);
//                   }).catch((err) => { err })
//               });
//             }
//           });
//         }).catch((err) => { err })
  
//       this.getcolor();
//     },
//   };
//   </script>
  
//   <style lang="scss">
//   label.lab-pic {
//     display: flex;
//     // width: 130px;
//   }
  
//   .lab-pic-del {
//     display: flex;
//     justify-content: center;
//     // margin-right: 10%;
//     // width: 100%;
//     // width: 20%;
//     // flex-direction: column;
//   }
  
//   .lab-pic-custom {
//     position: relative;
//     top: 80px;
//     left: -30px;
//     height: 38px;
//     width: 38px;
//     background-color: $tertiary;
//     border-radius: 50%;
//     border: solid 2px $primary;
//     padding-bottom: 2%;
//     padding-right: 2%;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   .form-avatar-profil {
//     padding-top: 2%;
//     display: none;
//     visibility: none;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   .card-profil-picture-user {
//     display: flex;
//     width: 120px;
//     height: 120px;
  
//     justify-content: center;
//     align-items: center;
//     border: solid 2px $secondary;
//     border-radius: 50%;
//   }
  
//   img.form-avatar-dl {
//     display: flex;
//     width: 120px;
//     height: 120px;
//     justify-content: center;
//     align-items: center;
//     border: solid 2px $secondary;
//     border-radius: 50%;
//   }
  
//   #avatar-empty-profil {
//     display: flex;
//     width: 120px;
//     height: 120px;
//     justify-content: center;
//     align-items: center;
//     border: solid 2px $secondary;
//     border-radius: 50%;
//     font-size: 5rem;
//     padding-bottom: 5%;
//     background-color: rgb(6, 132, 6);
//   }
  
//   #form-picture-profil {
//     display: flex;
//     width: 120px;
//     height: 120px;
//     justify-content: center;
//     align-items: center;
//     border: solid 2px $secondary;
//     border-radius: 50%;
//     font-size: 5rem;
//     // padding-bottom: 5%;
//   }
  
//   .card {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//   }
  
//   .card-profil-title {
//     border-bottom: solid 2px $primary;
//     background-color: $secondary;
//   }
  
//   .card-profil-title-h1 {
//     padding-top: 2%;
//     padding-bottom: 1%;
//     font-size: 2.5rem;
//     font-weight: bolder;
//     font-style: italic;
//     color: $primary;
//   }
  
//   div.v-card__text.card-profil-name {
//     padding-top: 1%;
//     display: flex;
//     justify-content: center;
//     background-color: $tertiary;
//   }
  
//   .card-profil-name-url {
//     display: flex;
//     justify-content: center;
//     background-color: $tertiary;
//   }
  
//   .block-btn-pic-profil {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     width: 175px;
//     margin-left: 30px;
//   }
  
//   button#btn-del-pic-profil {
//     display: flex;
//     // height: 20px;
//     justify-content: center;
//     align-items: center;
//     margin-left: 0%;
//     border: solid 2px $secondary;
//     border-radius: 30%;
//     color: $secondary;
  
//     &:hover {
//       border-radius: 20%;
//       background-color: $secondary;
//       color: $tertiary;
//     }
//   }
  
//   button#btn-del-pic-profil-bis {
//     position: relative;
//     top: 80px;
//     left: -170px;
//     height: 38px;
//     width: 38px;
//     background-color: $tertiary;
//     border-radius: 50%;
//     border: solid 2px $primary;
//     padding-bottom: 2%;
//     padding-right: 2%;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   #btn-del-pic-profil-icon {
//     position: relative;
//     top: -2px;
//     left: -18px;
//     height: 38px;
//     width: 38px;
//     background-color: $tertiary;
//     border-radius: 50%;
//     border: solid 2px $primary;
//     padding-bottom: 2%;
//     padding-right: 2%;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   .lab-pic-custom-url {
//     position: relative;
//     top: 70px;
//     left: 140px;
//     height: 38px;
//     width: 38px;
//     background-color: $tertiary;
//     border-radius: 50%;
//     border: solid 2px $primary;
//     padding-bottom: 2%;
//     padding-right: 2%;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   button#btn-confirm-pic-profil {
//     display: flex;
//     // height: 20px;
//     justify-content: center;
//     align-items: center;
//     margin-left: 0%;
//     border: solid 2px $secondary;
//     border-radius: 30%;
//     color: $secondary;
  
//     &:hover {
//       border-radius: 20%;
//       background-color: $secondary;
//       color: $tertiary;
//     }
//   }
  
//   button#btn-confirm-pic-profil-post {
//     display: flex;
//     // height: 20px;
//     justify-content: center;
//     align-items: center;
//     margin-left: 0%;
//     border: solid 2px $secondary;
//     border-radius: 30%;
//     color: green;
  
//     &:hover {
//       border-radius: 20%;
//       background-color: $secondary;
//       color: green;
//     }
//   }
  
//   .form-avatar-profil-url {
//     padding-top: 2%;
//     display: none;
//     visibility: none;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   .lab-pic-custom-url {
//     position: relative;
//     top: 70px;
//     left: 140px;
//     height: 38px;
//     width: 38px;
//     background-color: $tertiary;
//     border-radius: 50%;
//     border: solid 2px $primary;
//     padding-bottom: 2%;
//     padding-right: 2%;
  
//     &:hover {
//       cursor: pointer;
//     }
//   }
  
//   .fullname-url {
//     padding-top: 1%;
//     padding-left: 5%;
//     font-size: 1.8rem;
//     padding-top: 4%;
//   }
  
//   .block-picture-url {
//     padding-top: 10px;
//   }
  
//   .lastname {
//     align-items: center;
//     justify-content: center;
//     font-size: 1.8rem;
//     padding-top: 4%;
//     //   padding-left: 1%;
//   }
  
//   .fullname {
//     padding-top: 1%;
//     padding-left: 1%;
//     font-size: 1.8rem;
//     padding-top: 4%;
//   }
  
//   .firstname {
//     padding-top: 1%;
//     padding-left: 1%;
//     font-size: 1.8rem;
//     padding-top: 4%;
//   }
  
//   .picture {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
  
//   .card-profil-biographie {
//     border-bottom: solid 2px;
//     border-bottom: 2px solid $secondary;
//     border-top: 2px solid $secondary;
//   }
  
//   p.card-profil-biographie-p {
//     margin: 0;
//     padding-left: 1%;
//     padding-bottom: 2%;
//     // border: 2px solid $secondary;
//     cursor: default;
//   }
  
//   .btn-bio {
//     display: flex;
//     flex-direction: row;
//   }
  
//   .deploy-modidify {
//     border-bottom: 2px solid $primary;
//   }
  
//   .card-profil-textarea {
//     width: 100%;
//     color: $secondary;
//     border: solid 2px $tertiary;
//     padding: 1%;
  
//     &:focus {
//       outline: none;
//     }
//   }
  
//   #btn-bio-delete {
//     border: solid 2px $secondary;
//     border-radius: 30%;
//     margin-right: auto;
//     margin-top: 1%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
//     }
//   }
  
  
  
//   #btn-bio-send {
//     border: solid 2px $secondary;
//     margin-top: 1%;
//     margin-right: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
//     }
//   }
  
//   #btn-bio-send:disabled {
  
//     border: solid 2px $secondary;
//     margin-top: 1%;
//     margin-right: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
//     background-color:  #ccc;
//     color: $tertiary;
  
//   }
  
//   #btn-bio-close {
//     border: solid 2px $secondary;
//     margin-top: 1%;
//     //   margin-left: 80%;
//     // flex-grow: 80%;
//     // flex-shrink: 100%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
//     }
//   }
  
//   .btn-bio-mod {
//     border: solid 2px $secondary;
//     margin-top: 1%;
//     margin-right: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
  
//       &.btn-bio-mod>.pen-icon {
//         color: $tertiary;
//       }
//     }
//   }
  
//   .btn-follow {
//     border: solid 2px $secondary;
//     margin-top: 1%;
//     margin-right: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
  
//       &.btn-follow>.pen-icon {
//         color: $tertiary;
//       }
//     }
//   }
  
//   .btn-unfollow {
//     width: 100px;
//     border: solid 2px $secondary;
//     // margin-top: 1%;
//     // margin-right: 1%;
//     // margin-left: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
  
//       &.btn-unfollow>.pen-icon {
//         color: $tertiary;
//       }
//     }
//   }
  
//   .pen-icon {
//     padding-bottom: 2%;
//   }
  
//   .card-profil-friend {
//     border-bottom: 2px solid $secondary;
//   }
  
//   .card-profil-friend-t {
//     display: flex;
//     flex-direction: row;
  
//   }
  
//   .card-profil-friend-pub {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//   }
  
//   .icon-friend {
//     padding-right: 1%;
//   }
  
//   p.card-profil-friend-p {
//     // display: flex;
//     // justify-content:center;
//     // align-items: center;
//     margin: 0;
//     // padding-left: 1%;
//     // padding-bottom: 2%;
//     // border: 2px solid $primary;
//     cursor: default;
//   }
  
//   .btn-profil-follow {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     margin-bottom: 1%;
//     // justify-content: center;
//     align-items: center;
//   }
  
//   .card-profil-post {
//     border-bottom: solid 2px;
//     border-bottom: 2px solid $secondary;
//   }
  
//   .card-profil-post-t {
//     display: flex;
//     flex-direction: row;
//   }
  
//   .icon-post {
//     padding-right: 1%;
//   }
  
//   .btn-post-profil {
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     width: 50%;
  
  
  
//   }
  
//   .btn-post-delete-profil {
//     width: 100px;
//     border: solid 2px $secondary;
//     // margin-top: 1%;
//     // margin-right: 1%;
//     // margin-left: 1%;
//     margin-bottom: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
  
//       &.btn-post-delete-profil>.pen-icon {
//         color: $tertiary;
//       }
//     }
//   }
  
//   .btn-post-modify-profil {
//     width: 100px;
//     border: solid 2px $secondary;
//     // margin-top: 1%;
//     // margin-right: 1%;
//     // margin-left: 1%;
//     margin-bottom: 1%;
//     border-radius: 30%;
//     padding-left: 5px;
//     padding-right: 5px;
  
//     &:hover {
//       background-color: $secondary;
//       color: $tertiary;
  
//     }
//   }
  
  
//   .card-img-profil {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     display: flex;
//     object-fit: cover;
//     // overflow: hidden;
//     max-height: 300px;
//     max-width: 500px;
//     min-width: 300px;
//     //  width: 100%;
//     // padding: 1%;
//     border: solid 2px $secondary;
//     // border-bottom: solid 2px $secondary;
//     border-radius: 2%;
//   }
  
//   .align-pub-user {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
  
//   }
  
//   .image-card-profil {
//     display: flex;
//     width: 100%;
//     height: 100%;
//     padding: 1% 1%;
//     // border-top: solid 2px $secondary;
//     justify-content: center;
//     align-items: center;
//   }
  
  
//   .message-profil {
//     padding: 2%;
//     text-align: center;
//     max-width: 450px;
//     width: 100%;
  
//   }
  
//   .btn-profil-post-del {
//     display: flex;
//     max-width: 480px;
//     width: 100%;
//     max-height: 500px;
//     flex-direction: column;
//     margin-bottom: 1%;
//     border: solid 2px;
//     border-radius: 2%;
//     justify-content: center;
//     align-items: center;
//   }
  
//   p.card-profil-post-p {
//     display: flex;
//     flex-direction: row;
//     margin: 0;
//     padding-left: 1%;
//     // padding-bottom: 2%;
//     // border: 2px solid $primary;
//     cursor: default;
//   }
//   </style>
  
</script>