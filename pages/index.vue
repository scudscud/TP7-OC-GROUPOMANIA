<template >

<div v-if="this.posts[0] != undefined" @change="refresh">     

              
  <v-card  v-for="(post,index) in posts" :key="post.id"  class="card-post"  >    
   <div class="border-card"> 
                                     
                                    
    <div id="card-autor-book" v-if="post.posterId === userid || post.posterrole !== ''" >
      <div class="user-book-main">
        <div class="name-date-book">
            <img class="picture-user" :src='post.posterpicture' />
            <!-- <span class="fullname-book">{{post.posterlastname}}</span>
            <span class="fullname-book">{{post.posterfirstname}}</span> -->
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
            <img class="picture-user-none" :src='post.posterpicture' />
            <span class="fullname-none">{{post.posterfullname}} à {{post.date}}</span>
      </div>
    </div>    

        <div v-if='post.picture !="" '  class="image-card">
          <img class="card-img " :src="post.picture" alt="photo" />
        </div>
              <div v-if="post.message != ''" class="message-main">
                {{post.message}}
              </div>
              <div class="btn-card" id="card-att">
                <v-btn  v-if="post.likers != userid"  id="btn-att-unlike" @click="likePost(post._id)" type="submit"
                  ><v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                  <p class="text-att">Like</p></v-btn >
                <v-btn v-else id="btn-att-like" @click="unLikePost(post._id)" type="submit"
                  ><v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                  <p class="text-att">Like</p></v-btn >





                <v-btn id="btn-att"
                  ><v-icon class="img-att"> mdi-message-outline</v-icon>
                  <p class="text-att">Commenter</p></v-btn
                >
                <v-btn id="btn-att"
                  ><v-icon class="img-att"> mdi-account-group </v-icon>
                  <p class="text-att">Devenir&nbspamis</p></v-btn
                >
              </div>
    </div>       
  </v-card>
   <modify v-if="showmodify" v-show="showmodify" @close-modale-modify="showmodify = false" />
    <deletepost v-if="showdel" :id="this.userid" :keyid="post._id"  v-show="showdel" @close-modale-delete="showdel = false" />
</div>
<div v-else>     
              
  <v-card  class="card-post"  >    
   <div class="border-card">                                       
    <div id="card-autor-book-first" >
    
        <!-- <div class="name-date-book">
            <img class="picture-user"/>
          <p class="fullname">c'est vous</p>
            
          </div> -->
          
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

</template>
<script>
import axios from "axios";
// import Modify from "../components/modifypost.vue";
// const modify = () => import("../components/modifypost.vue")
// import Deletepost from "./index/deletetest.vue";


export default {
  
  components: { 

 modify: () => import(/* webpackPrefetch: true */"./index/modifytest.vue"),
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
      // loadme: null,
      log:false,
      showdelete: false,
      showmodify: false,
      showdel: false,
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
      posterpic:'',
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
    refresh(){
    this.$nuxt.refresh()
    } ,

   likePost(postId){
  let postID = postId
   axios.patch(`http://localhost:5000/api/post/like-post/${postId}`,{id: this.userid})
     .then(()=>{
      this.like = true
     }).catch((err)=>{console.log(err);})
   },

   unLikePost(postId){
    axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{id: this.userid})
     .then(()=>{
      this.like = false
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
      axios
        .get("http://localhost:5000/api/post")
        .then((docs) => {
          // console.log(docs.data);
          // this.posts = post.data;
          // this.updateLike();
        })
        .catch((err) => console.log(err));
    },

      async  deletePost(postId) {
          // console.log(postId);
      //  this.showdel = true
      //  await this.comdelpost;
      //  if(this.comdelpost = true){
        axios.delete(`http://localhost:5000/api/post/${postId}`)
      .then((deletedPost) => {

        // deletedPost.data.deletedPost.likers.forEach(userIdLikeToDelete => {
        //   axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{ id: userIdLikeToDelete })
        //   });
          
          // this.getPosts()
        })
        .catch((err) => console.log(err))
      // }
    },
    
  },
  
  async mounted(){
  axios.defaults.withCredentials = true;
        // console.log($refs.deletepost.$el)

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
        this.userpicture = docs.data.pictureprofil
        console.log(docs.data);
            // console.log(this.role);
   
    }).catch((error)=>{
      console.log(
       error
      );
    })
 await axios.get("http://localhost:5000/api/post")
      .then((docs) => {
         this.posts = docs.data
      })
      .catch((err)=>{
        console.log(err);
      });
   
  




  },



}


</script>

<style lang="scss">

.test{
  width: 500px;
  height: 500px;
  background-color: #fff;
}

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
