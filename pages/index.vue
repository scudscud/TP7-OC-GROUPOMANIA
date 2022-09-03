<template >

<div id="Book">

  <div id="fix-top" @click="showpost = !showpost" >
    <img v-if="urlpic !==''" class="picture-user-none-top" :src='urlpic'/>    
      <div v-else id="avatar-empty-book-top">{{avatarpicempty}}</div>
        <button class="new-top"  ><span class="new-top-span" > Envie de partager, {{firstname}} ? </span></button>
        <!-- <button @click="showpost = !showpost"  id="btn-post-top" alt="menu"> 
        <v-icon >mdi-newspaper-plus </v-icon>
        </button>   -->
  </div>

<div v-if="this.posts[0] != undefined" >     
  <v-card  v-for="(post,index) in posts" :key="post.id"  class="card-post"  >    
    <div class="border-card"> 
      <div id="card-autor-book" v-if="post.posterId === userid || post.posterrole == ''" >
        <div class="user-book-main">
          <div class="name-date-book">
            <img v-if="post.posterpicture  !== ''" class="picture-user" :src='post.posterpicture'/>
              <div v-else id="avatar-empty-book">{{avatarpicempty}}</div>
              <span class="fullname-main">{{post.posterfullname}}</span>
          </div>
              <span class="full-date"> {{post.date}}</span>
        </div>
        <!-- <span class="postId"> {{post._id}}</span>
        <span class="postId"> {{post.id}}</span>
        <span class="postId"> {{index}}</span> -->
            <div class="btn-book-main" >
            <!-- <modify :keyPost="post._id" v-show="showmodify" @close-modale-modify="showmodify = false" /> -->
                <button id="btn-post-modify" type="submit" @click=" showmodify = !showmodify,postIdDel(post._id)"> <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>Modifier </button>
                    <!-- <deletepost ref="post_id"  :tets="post._id,index"  v-show="showdel" @close-modale-delete="showdel = false" /> -->
                <button id="btn-post-delete" @click="showdel =!showdel,postIdDel(post._id)"><v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon >Supprimer </button>
            </div>
      </div>
        <div id="card-autor-book-none" v-else>
        <div class="user-book-main-none">
              <img v-if="post.posterpicture !==''" class="picture-user-none" :src='post.posterpicture' />
              <div v-else id="avatar-empty-book-book">{{avatarpicempty}}</div>
              <span class="fullname-none">{{post.posterfullname}} à {{post.date}}</span>
        </div>
      </div>    
          <div v-if='post.picture !="" '  class="image-card"  >
            <img class="card-img " :src="post.picture" alt="photo" />
          </div>
          <div v-if="post.message != ''" class="message-main"> {{post.message}}</div>
          <div class="btn-card" id="card-att">
              <v-btn  v-if="post.likers != userid"  id="btn-att-unlike" @click="likePost(post._id)" type="submit" ><v-icon class="img-att">mdi-thumb-up-outline</v-icon><p class="text-att">Like</p></v-btn >
              <v-btn v-else id="btn-att-like" @click="unLikePost(post._id)" type="submit"><v-icon class="img-att">mdi-thumb-up-outline</v-icon><p class="text-att">Like</p></v-btn >
              <v-btn id="btn-att"><v-icon class="img-att"> mdi-message-outline</v-icon><p class="text-att">Commenter</p></v-btn >
              <v-btn id="btn-att"><v-icon class="img-att"> mdi-account-group </v-icon><p class="text-att">Devenir&nbspamis</p></v-btn >
          </div>
    </div>       
  </v-card>
</div>
<div v-else>     
  <v-card  class="card-post"  >    
   <div class="border-card">                                       
    <div id="card-autor-book-first" >
          <span class="firstpost" >le {{date}} à {{hour}} {{fullname}} va renter dans un zone inexplorée</span>
    </div>
        <div class="image-card">
          <img class="card-img "  src="../client/public/uploads/posts/pexels-gabriela-palai-590029.jpg" alt="photo" />
        </div>
              <div  class="message-main">
                <p>vous serez le 1 er à fouler cette terre inconnu</p>
                <p class="history">Ceci restera gravé dans la pierre </p>
                <p class="history">Ceci restera écrit dans les livres d'histoire</p>
                <!-- <p class="history">Ceci restera ecrit sur un disque dur</p> -->
                <p>Ceci restera stocké dans le cloud</p>
              </div>
   </div>       
  
  </v-card>
</div>
<deletepost v-if="showdel" :id="userid" :keyid="post._id"  v-show="showdel" @close-modale-delete="showdel = false,getPosts()" />
  <modify v-if="showmodify" v-show="showmodify" @close-modale-modify="getPosts(),showmodify = false" :msg="post.message" :pic="post.picture"  :id="userid" :test1="posts" :idpost="post._id"/>
  <Postcreate  v-show="showpost" @close-modale-post="showpost = false,getPosts()"/>
</div>

</template>
<script>

import axios from "axios"
import { ref } from 'vue';
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1
}

export default {
  name: "Book",
  
  components: { 
 
 Postcreate:() => import( /* webpackChunkName:"Postcreate"*/"./index/postcreate.vue"),
 modify: () => import("./index/modifytest.vue"),
//  deletepost: () => import(/* webpackPrefetch: true */"./index/deletetest.vue")
//  Modify: () => import(  /* webpackMode: "lazy" */"../components/modifypost.vue"),
//  Modify: () => import(  /* webpackChunkName:"modify"*/"../components/modifypost.vue"),
 deletepost: () => import(  /* webpackChunkName:"deletepost"*/"./index/deletetest.vue"),
//  Deletepost ,
//  Modify

  },
  props:{
    // keytest : ['post._id']
  },
  asyncData() {
    return {
      componentKey:0,
      avatarpicempty:'',
      // loadme: null,
      log:false,
      showdelete: false,
      showmodify: false,
      showdel: false,
      showpost:false,
      like: false,
      
      userjwtid:"",
      userid:'',
      lastname: "",
      firstname: "",
      userpicture:'',
      // role:'',
      liker : [],
      posts:[],
      post:[],
      posterId : '',
      // fullname:'',
      posterfirstname : '',
      posterlastname: '',
      urlpic:'',
      image:'',
      userlike:[],
      // date:'',
      message:'',
      comdelpost:"",
      // today:'',


    };
  },
  computed: {
            date(){
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
// today = mm+'-'+dd+'-'+yyyy;
// today = mm+'/'+dd+'/'+yyyy;
// today = dd+'-'+mm+'-'+yyyy;
today = dd+'/'+mm+'/'+yyyy;
 return today
      },

    hour(){ 
    const d = new Date();

    let hh =  d.getHours();
    let mi = d.getMinutes();

    if(hh<10)
    {
      hh='0'+hh;
    }
    if(mi <10)
{
     mi='0'+mi;
    }
    let hours = hh+":" + mi;

    return hours
    },
    fullname: {
      get() {
        return this.firstname + ' ' + this.lastname
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(' ')
      }
    }
 
  },
  events: {
},
  methods: {
    updateparent(uppost) {
       this.posts = uppost
    },
    forceRerender() {
      this.componentKey += 1;
    },

   async refresh(){
   
   console.log('ok');
    } ,

   likePost(postId){
  let postID = postId
   axios.patch(`http://localhost:5000/api/post/like-post/${postId}`,{id: this.userid})
     .then(()=>{
      this.like = false
      this.getPosts()
     }).catch((err)=>{console.log(err);})
   },

   unLikePost(postId){
    axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{id: this.userid})
    .then(()=>{ this.like =  true 
      this.getPosts()
     }).catch((err)=>{console.log(err);})
   },

    postIdDel(post){
        const parse= JSON.stringify(post);
        localStorage.setItem('categories', parse);
      
},
  
    getUsers() {
      axios
        .get("http://localhost:5000/api/user")
        .then((docs) => {
        
          // this.posts = docs.data.allPosts
        // console.log(docs);
        }
        )
        .catch((err) => console.log(err));
    },
    getPosts() {
      axios.get("http://localhost:5000/api/post")
      .then((docs) => { console.log(docs.data); this.posts = docs.data})
      .catch((err)=>{console.log(err);});
    },

      async deletePost(postId) {
      // console.log(postId);
      //  this.showdel = true
      //  await this.comdelpost;
      //  if(this.comdelpost = true){
      await axios.delete(`http://localhost:5000/api/post/${postId}`)
      .then((post) => {
        // post.data.deletedPost.likers.forEach(userIdLikeToDelete => {
        //   console.log('ok');
        //   // axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{ id: userIdLikeToDelete })
        //   });
          // this.getPosts()
        })
        .catch((err) => console.log(err))
      // }
    },

    getcolor(){
      if(this.urlpic === ''  ){
    this.avatarpicempty = this.lastname.split('')[0].toLocaleUpperCase()
    let randomColor = Math.floor(Math.random()*16777215).toString(16)
  //   document.getElementById('avatar-empty-book-book').style.backgroundColor = '#' + randomColor
   document.getElementById('avatar-empty-book-top').style.backgroundColor = '#' + randomColor
  //  document.getElementById('avatar-empty-book').style.backgroundColor = '#' + randomColor
  }
  } 
  },
  
  async mounted(){
  axios.defaults.withCredentials = true;
    await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
      // console.log(this.userjwtid);
    this.userjwtid = res.data
    this.show = true
    this.log = true
    // TODO => Insert loader \\ 
    }).catch((error)=>{
      console.log(error);
    })

  await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
        this.role = docs.data.role
        this.userid = docs.data._id
        this.firstname = docs.data.firstname
        this.lastname = docs.data.lastname
        this.urlpic  = docs.data.photo
        console.log(docs.data);
            // console.log(this.role);
    }).catch((error)=>{ console.log(error);
    })
  await axios.get("http://localhost:5000/api/post")
      .then((docs) => {
        console.log(docs.data);
        this.posts = docs.data
      })
      .catch((err)=>{
        console.log(err);
      });
  this.getcolor()
  },
}


</script>

<style lang="scss">



.card-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1%;
  margin-bottom: 2%;
  // background-color: red;
}
.border-card{
 width: 100%;
border: 5px solid $secondary;
}

#fix-top{
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 50px;
 border: solid 2px $secondary;
border-radius:  10px/5px;
margin-bottom: 2%;
background-color: $secondary;
cursor: pointer;
}
.picture-user-none-top{
  display: flex;
  width: 40px;
  height: 40px;
  margin-right: 1%;
  justify-content: center;
  align-items: center;
  border: solid 2px ;
  border-radius: 50%; 
}

#avatar-empty-book-top{
  font-size: 1.8rem;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: solid 2px $tertiary;
  border-radius: 50%; 
}

.new-top{
 padding-left: 1%;
 border: solid 2px black;
 border-radius: 30px / 30px;
 height: 35px;
}

.new-top-span{
color: black;
}

#btn-post-top{
  // margin-left: 1%;
background-color: $tertiary;
  height: 35px;
  width: auto;
  border: solid $primary;
  color: $secondary;
  border-radius: 30% / 30%;
  &:hover{
  background-color: $primary;
  border: solid $tertiary;
  color:$tertiary;
  border-radius: 20% / 20%;
  }
}

#card-autor-book {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: $tertiary;
  padding: 1%;
  border-bottom: solid 2px $secondary;
  // margin-bottom: 1%;
  // padding-top: 2%;
  // border-bottom-left-radius: -5%;
  // border-bottom-right-radius: -5%;
  
}
.btn-book-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  width: 100px;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}
.picture-user{
  margin-top: 1.5%;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%; 
}

#avatar-empty-book{
  // margin-top: 5%;
  font-size: 1.8rem;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%; 
}

#avatar-empty-book-book{
  font-size: 1.8rem;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%; 
}

.history{
  font-style: italic;
  text-decoration: line-through;
}

#card-autor-book-first {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: $tertiary;
  padding: 1% ;
  border-bottom: solid 2px $secondary;
  // margin-bottom: 1%;
  // padding-top: 2%;
  // border-bottom-left-radius: -5%;
  // border-bottom-right-radius: -5%;
  
}
#card-autor-book-none {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: $tertiary;
  padding: 1%;
  border-bottom: solid 2px $secondary;
  // margin-bottom: 1%;
  // padding-top: 2%;
  // border-bottom-left-radius: -5%;
  // border-bottom-right-radius: -5%;

}

.user-book-main-none{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.fullname-none {
  display: flex;
  flex-direction: row;
  height: 20px;
  // padding-top: 2%;
  padding-left: 3%;
  padding-right: 2%;
  margin: 0;
}

.picture-user-none{
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%; 
}

.pen-icon-main {
  padding-right: 5%;
}

#btn-post-modify {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 5px;
  padding-right: 5px;
  // padding-bottom: 5px;
  color: $secondary;
  &:hover {
    border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
    &#btn-post-modify > .pen-icon-main {
      color: $tertiary;
    }
  }
}

.delete-icon-main {
  padding-right: 2%;
}

#btn-post-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: solid 2px $secondary;
  margin-top: 1%;
  margin-right: 1%;
  border-radius: 30%;
  padding-left: 2px;
  padding-right: 5px;
  // padding-bottom: 5px;
  color: $secondary;
  &:hover {
    border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
    &#btn-post-delete > .delete-icon-main {
      color: $tertiary;
    }
  }
}

.image-card{
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1%  1% ;
  // border-top: solid 2px $secondary;
  border-bottom: solid 2px $secondary;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  justify-content: center;
  align-items:center;
}

.card-img {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  object-fit: cover;
// overflow: hidden;
  max-height:300px ;
 max-width: 500px;
 min-width: 300px;
  // padding: 1%;
  border: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-radius: 2%;
}

.card-img-default {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  object-fit: cover;
// overflow: hidden;
  max-height:300px ;
 max-width: 500px;
  // padding: 1%;
  border: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-radius: 2%;
}

.message-main {
  padding: 1%;
  text-align: center;
}

.name-date-book {
  display: flex;
  flex-direction: row;
  padding-bottom: 2%;
}

.fullname-book{
  padding-top: 10%;
  padding-left: 3%;
}

.fullname-main {
  display: flex;
  flex-direction: row;
  height: 20px;
  padding-top: 5%;
  padding-left: 3%;
  padding-right: 2%;
  margin: 0;
}

p.full-date {
  display: flex;
  flex-direction: row;
  width: auto;
  margin-left: 1%;
  margin-bottom: 0;
}
p.firstpost {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-left: 1%;
  margin-bottom: 0;
}

#card-att {
  justify-content: center;
  border-top: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  background-color: $tertiary;
  width: 100%;
  height: 20%;
  padding-top: 0;
  padding-bottom: 2%;
  padding-left: 3%;
}

#btn-att {
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;
}

#btn-att:hover {
  background-color: $tertiary;
  color: $secondary;
  translate: 3px;
  border: solid 1px $secondary;
}

#btn-att-unlike {
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;
  &:hover{
  background-color: $tertiary;
  color: $secondary;
  translate: 3px;
  border: solid 1px $secondary;
  }
}

#btn-att-like {
  margin-top: 2%;
  margin-right: 3%;
  background-color: rgb(27, 108, 17);
  color: $secondary;
  font-style: italic;
  font-weight: bold;
  width: auto;
  cursor: pointer;
  padding: 2%;
  &:hover {
  background-color: rgb(27, 108, 17);
  color: $secondary;
  translate: 3px;
  border: solid 1px $secondary;
  }
}

.img-att {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding-right: 10%;
}

p.text-att {
  width: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  // padding-right: 20%;
}
</style>
