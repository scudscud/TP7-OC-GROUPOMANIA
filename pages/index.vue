<template>

 <div>

  <div id="card-post"  v-for="(post,index) in posts" :key="post.id"  >
    <modify v-show="showmodify" @close-modale-modify="showmodify = false" />
    <deletepost v-show="showdel" @close-modale-delete="showdel = false" />

    
    <div id="card-autor-book"  >
      <div class="user-book-main">
        <div class="name-date-book">
          <img class="picture-user" src="post" />
          <span class="fullname-book">{{ fullname }}</span>
        </div>

        <!-- <p class="full-date"><span class="post-date"> posté le :</span><span class="date-now">{{date}}</span>
                <span class="hour-à"></span>
                <span class="hour-now"> à {{hour}}</span></p> -->

        <p class="full-date">posté le : {{ date }} à {{ hour }}</p>
      </div>
      <div class="btn-book-main">
        <button
          id="btn-post-modify"
          type="submit"
          @click="showmodify = !showmodify"
        >
          <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon
          >Modifier
        </button>
        <button id="btn-post-delete" @click="showdel = !showdel">
          <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon
          >Supprimer
        </button>
      </div>
    </div>
    <img class="card-img mb-5" src="/v.png" alt="Vuetify.js" />

    <div class="blockquote">
      &#8220;Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
      quis impedit magni alias quo quae, numquam eaqrepellendus minus similique
      soluta nulla pariatur cumque neque enim explicabo officia impedit?
      Dignissimos ipsa asperiores cum.&#8221;
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
      lastname: "",
      firstname: "",
      posts:[],
      userjwtid:"",
      userid:'',
      lastname: "",
      firstname: "",
      pictureprofil:'',
      posterId : '',
      posterfirstname : '',
      posterlastname: '',
      userlike:'',


    };
  },
  computed: {
    date() {
      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      // today = mm+'-'+dd+'-'+yyyy;
      // today = mm+'/'+dd+'/'+yyyy;
      // today = dd+'-'+mm+'-'+yyyy;
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    hour() {
      const d = new Date();
      let hours = d.getHours() + "h" + d.getMinutes();
      return hours;
    },
    fullname: {
      get() {
        return this.posterfirstname + " " + this.posterlastname;
      },
      set(newValue) {
        [this.posterfirstname, this.posterlastname] = newValue.split(" ");
      },
    },
  },
  methods: {
    getUsers() {
      axios
        .get("http://localhost:5000/api/user")
        .then((docs) => {
          this.posts = docs.data.allPosts
        console.log(docs);
      
    


        }
        )
        .catch((err) => console.log(err));
    },

    getPosts() {
      axios
        .get("http://localhost:5000/api/post")
        .then((docs) => {
          // console.log(docs.data);
          this.posts = post.data;
          this.updateLike();
        })
        .catch((err) => console.log(err));
    },
  },
  async mounted(){
  axios.defaults.withCredentials = true;

       
   await axios.get(`http://localhost:5000/jwtid`)
    .then((res) => {
      console.log(res.data);
    this.userjwtid = res.data
    this.show = false
    this.log = true
    // TODO => Insert loader \\ 
    }).catch((error)=>{
      console.log(error);
    })

   await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
    .then((docs) => {
        this.userid = docs.data._id
        this.firstname = docs.data.firstname
        this.lastname = docs.data.lastname
        this.posterpictureprofil = docs.data.pictureprofil
          console.log(this.firstname)
    }).catch((error)=>{
      console.log(
       error
      );
    })

  await axios.get("http://localhost:5000/api/post")
      .then((docs) => {
        console.log(docs);
             this.posterfirstname = docs.data.firstname
          this.posterlastname = docs.data.lastname
          this.posterpicture = docs.data.picture
          this.userlike = docs.data.likes;
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
#card-post {
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: $tertiary;
  border-radius: 5%;
  border: 5px solid;
  border-color: $secondary;
  overflow: ellipsis;
}

#card-autor-book {
  border-radius: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 2%;
}

.btn-book-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  width: 100px;
  padding-top: 2%;
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
.card-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  padding: 1%;
  border-top: solid 2px $secondary;
  border-bottom: solid 2px $secondary;
  border-radius: 2%;
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

p.full-date {
  display: flex;
  margin-bottom: 0;
}

div.v-card__text.blockquote {
  // margin-top: 10px;
  // margin-right: 20px;
  // overflow: "...";
  padding-bottom: 5%;
  text-align: center;
  padding-right: 2%;
}

#card-att {
  justify-content: center;
  border-top: solid 2px $secondary;
  border-radius: 10%;
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
