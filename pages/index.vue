<template>

<div>     
              
  <v-card  v-for="(post,index) in posts" :key="post.id"  class="card-post"  >    
   <div class="border-card">                                       
    <div id="card-autor-book" >
      <div class="user-book-main">
        <div class="name-date-book">
            <img class="picture-user" :src='post.posterpicture' />
            <!-- <span class="fullname-book">{{post.posterlastname}}</span>
            <span class="fullname-book">{{post.posterfirstname}}</span> -->
            <span class="fullname">{{post.posterfullname}}</span>
          </div>
            <span class="full-date"> {{post.date}}</span>
      </div>
          <div class="btn-book-main" v-if="(post.posterId = userid) &&  (post.posterId = userid)">
              <button id="btn-post-modify" type="submit" @click="showmodify = !showmodify" > <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>Modifier </button>
              <button id="btn-post-delete" @click="deletePost(post._id)"><v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon >Supprimer </button>
          </div>
    </div>
        <div class="image-card">
          <img class="card-img " :src="post.picture" alt="" />
        </div>

              <div class="message-main">
                {{post.message}}
              </div>
              <div class="btn-card" id="card-att">
                <v-btn id="btn-att"
                  ><v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                  <p class="text-att">Like</p></v-btn
                >
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
      <modify v-show="showmodify" @close-modale-modify="showmodify = false" />
      <deletepost v-show="showdel" @close-modale-delete="showdel = false" />
</div>

</template>
<script>
import axios from "axios";
import Modify from "../components/modifypost.vue";
// import DeleteCom from "../components/deletepost.vue";
import Deletepost from "../components/deletepost.vue";
// import { doc } from "prettier";
export default {
  components: { Modify, Deletepost },
  data() {
    return {
      
      log:false,
      showdelete: false,
      showmodify: false,
      showdel: false,
      
      userjwtid:"",
      userid:'',
      lastname: "",
      firstname: "",
      userpicture:'',

      posts:[],
      post:[],
      posterId : '',
      // fullname:'',
      posterfirstname : '',
      posterlastname: '',
      posterpic:'',
      image:'',
      userlike:[],
      date:'',
      message:'',
      comdelpost:"",


    };
  },
  computed: {
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
  },
  methods: {
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
          this.updateLike();
        })
        .catch((err) => console.log(err));
    },

      async  deletePost(postId) {
          // console.log(postId);
       this.showdel = true
       await this.comdelpost;
       if(this.comdelpost = true){
        axios.delete(`http://localhost:5000/api/post/${postId}`)
      .then((deletedPost) => {

        // deletedPost.data.deletedPost.likers.forEach(userIdLikeToDelete => {
        //   axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{ id: userIdLikeToDelete })
        //   });
          
          this.getPosts()
        })
        .catch((err) => console.log(err))
      }
    },
    
    














  },
  async mounted(){
  axios.defaults.withCredentials = true;

   await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
      console.log(this.userjwtid);
    this.userjwtid = res.data
    this.show = true
    this.log = true
    // TODO => Insert loader \\ 
    }).catch((error)=>{
      console.log(error);
    })

   await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
      console.log(docs);
        this.userid = docs.data._id
        this.firstname = docs.data.firstname
        this.lastname = docs.data.lastname
        this.userpicture = docs.data.pictureprofil
        // console.log(this.firstname)
    }).catch((error)=>{
      console.log(
       error
      );
    })
 await axios.get("http://localhost:5000/api/post")
      .then((docs) => {
         this.posts = docs.data
         this.posts.forEach((i,e,u)=> {
          console.log(i.picture);
          console.log(e);
          console.log(u);
          this.posterpic = i.picture
         });



        // console.log(this.posts[1]);
        // // console.log(this.image);
    
     
         
              // console.log(post.posterId);

          // this.posterId = docs.data.posterId
          // this.posterfirstname = docs.data.firstname
          // this.posterlastname = docs.data.lastname
          // this.fullname = docs.data.fullname
          // this.posterpic = docs.data.pictureprofil
          // this.message = docs.data.message
          // this.image = docs.data.picture
          // this.userlike = docs.data.likers
          // this.date = docs.data.date
            
      //  this.posts = docs
      //  console.log(docs.data[0].posterId);
        // let inputFile = document.querySelector('#picture')
        // let fileName = document.querySelector('#file-name')
        // inputFile.addEventListener('change', () => {
        //   fileName.textContent = inputFile.files[0].name
        // })
      })
      .catch((err)=>{
        console.log(err);
      });
  },

  // mounted(){
    // axios.get(`http://localhost:5000/jwtid`)
    // .then((data) => {

    //   console.log(data);
  //     // this.connectedUserId = user.data.data._id 
  //   //   axios.get(`http://localhost:5000/api/user/${user.data.data._id}`)
  //   //     .then((result) => {
  //   //       this.posterFirstname = result.data.firstname
  //   //       this.posterLastname = result.data.lastname
  //   //       this.posterProfil = result.data.picture
  //   //       this.userLikedPosts = result.data.likes;
  //   //     })
  //   //     .catch()
  //   //   this.logged = true;
  //   //   axios.get("http://localhost:5000/api/post/")
  //   //   .then((res) => {
  //   //     this.posts = res.data.allPosts
  //   //     let inputFile = document.querySelector('#picture')
  //   //     let fileName = document.querySelector('#file-name')
  //   //     inputFile.addEventListener('change', () => {
  //   //       fileName.textContent = inputFile.files[0].name
  //   //     })
  //   //   })
  //   //   .catch();
  //   // })
  //   // .catch((err) => {
  //   //   document.cookie = "jwt=;max-age=0";
  //   //   this.logged = false;
  //   //   const posts = document.querySelector('#p-not-connected')



  //   });
  // },


};
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
  // margin-bottom: 1%;
  // padding-top: 2%;
  
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
  border-top: solid 2px $secondary;
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
  padding: 1%;
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

.fullname-book {
  padding-top: 10%;
  padding-left: 3%;
}
.fullname {
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
