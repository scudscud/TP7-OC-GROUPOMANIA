<template >

  <div>

    <div id="Book" :key="componentKey">

      <div id="fix-top">
        <div id="fix-top-bis" @click="showpost = !showpost">
          <img v-if="urlpic !=='' && urlpic !== undefined" class="picture-user-none-top" :src='urlpic' alt="phtot de l'utilisateur"  />
          <div v-else id="avatar-empty-book-top">{{avatarpicempty}}</div>
          <button class="new-top">
            <p class="new-top-span"> Envie de partager, {{firstname}} ? </p>
          </button>
        </div>
        <button class="post-option" @focusin="showsort = !showsort">
          <v-icon class="post-option-dot">mdi-dots-horizontal </v-icon>
        </button>
      </div>

      <div class="empty-sort" v-if="emptyfollower"> 😭 vous ne suivez personne de chez personne 😭 abonné à vous à quelqu'un </div>
      <div class="empty-sort" v-if="emptylike"> 😭 vous n'avais aimer aucune publication 😭 liker une publication </div>
      <div class="empty-sort" v-if="emptyownpost"> 😭 Vous n'avez rien publier 😭 Vous êtes trop timide lancer vous !! </div>
      <div class="empty-sort" v-if="emptyfollowing"> 😭 Essayer de vous faire des Amis 😭 likers des publications </div>

     
      <div class="center-main" v-if="this.posts[0] != undefined">
        
        <v-card class="card-post" v-for="(post,index) in posts" :key="post.id" :index="index">
          <div class="border-card"  >
            <div id="card-autor-book" v-if="post.posterId === userid " >
              <!-- <nuxt-link :to="{name: 'profilUsermain', params: { id : post.posterId} }" class="name-date-book"  > -->
              <div class="name-date-book"  >
                <nuxt-link class="link" :to="{name:'profiluser'}">
                <img v-if="post.posterpicture !=='' && post.posterpicture !== 'undefined' " class="picture-user"
                  :src='post.posterpicture' alt="photo de l'utilisateur"  /> 
                <div v-else id="avatar-empty-book" >{{avatarpicempty}}</div></nuxt-link>
                <span id="fullname-main">{{post.posterfullname}} à {{post.date}}</span>
                <!-- <p class="full-date">{{post.date}}</p> -->
              <!-- </nuxt-link> -->
              </div>
              <div class="btn-book-main">
                <button id="btn-post-modify" type="submit" @click=" showmodify = !showmodify,postIdDel(post._id)">
                  <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>Modifier
                </button>
                <button id="btn-post-delete" @click="showdel =!showdel,postIdDel(post._id)">
                  <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon>Supprimer
                </button>
              </div>
            </div>

            <div id="card-autor-book" v-else-if="role !== undefined">
              <div class="name-date-book" >
                <nuxt-link class="link" :to="{name:'profilUserAdmin-id', params : {id: `?id=${post.posterId}`}}" ><img v-if="post.posterpicture !=='' && post.posterpicture !== 'undefined'" class="picture-user-admin"
                  :src='post.posterpicture' alt="phtot de l'utilisateur" />
                <div v-else id="avatar-empty-book">{{post.posterlastname.split('')[0].toLocaleUpperCase()}}</div></nuxt-link>
                <span id="fullname-main">{{post.posterfullname}} à {{post.date}}</span>
                <!-- <p class="full-date">{{post.date}}</p> -->
              </div>
              <div class="btn-book-main">
                <!-- <modify :keyPost="post._id" v-show="showmodify" @close-modale-modify="showmodify = false" /> -->
                <button id="btn-post-modify" type="submit" @click=" showmodify = !showmodify,postIdDel(post._id)">
                  <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon> Bannir
                </button>
                <!-- <deletepost ref="post_id"  :tets="post._id,index"  v-show="showdel" @close-modale-delete="showdel = false" /> -->
                <button id="btn-post-delete" @click="showdel =!showdel,postIdDel(post._id)">
                  <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon>Supprimer
                </button>
              </div>
            </div>
            <div id="card-autor-book-none" v-else>
              <div class="user-book-main-none" >
               <nuxt-link class="link" :to="{name:'profilUsermain-id', params : {id: `?id=${post.posterId}`}}" ><img v-if="post.posterpicture !=='' && post.posterpicture !== 'undefined'" class="picture-user-none"
                  :src='post.posterpicture' alt="phtot de l'utilisateur"  />
                <div v-else id="avatar-empty-book-book">{{post.posterlastname.split('')[0].toLocaleUpperCase()}}</div></nuxt-link> 
                <p class="fullname-none">{{post.posterfullname}} à {{post.date}}</p>
              </div>
              <button v-if="post.posterId != userid && userFollowingId.includes(post.posterId) "
                @click="addUnFollow(post.posterId,index)" type="submit" class="btn-main-follow">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">abonné</p>
              </button>
              <button v-else @click="addFollow(post.posterId,index)" type="submit" class="btn-main-unfollow">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">S'abonner</p>
              </button>
             
            </div>
            <!-- <div id="card-autor-book-none" v-else>
        <div class="user-book-main-none">
              <img v-if="post.posterpicture !==''" class="picture-user-none" :src='post.posterpicture' />
              <div v-else id="avatar-empty-book-book">{{avatarpicemptyNone}}</div><span class="fullname-none">{{post.posterfullname}} à {{post.date}}</span>
              <button v-if="post.posterId != userid && userFollowingId.includes(post.posterId) " :class="userFollowingId.includes(post.posterId) ? 'btn-att-unfollow' : 'btn-att-follow'"  @click="clickFollow(post.posterId,index)" type="submit" class="classfollowbtn"><v-icon class="img-att"> mdi-account-group </v-icon><p class="text-att">Follow</p></button >
                <button v-else  @click="clickFollow(post.posterId,index)" type="submit" class="classfollowbtn"><v-icon class="img-att"> mdi-account-group </v-icon><p class="text-att">UnFollow</p></button > </div> </div>     -->
            <div v-if='post.picture !="" ' class="image-card">
              <img class="card-img " :src="post.picture" alt="photo" />
            </div>
            <div v-if="post.message != ''" class="message-main"> {{post.message}}</div>
            <div v-if="role !== undefined" class="btn-card" id="card-att">
              <button :class="userLikePostId.includes(post._id) ? 'class-btn-att-like' : 'class-btn-att-unlike'"
                @click="clickLike(post._id,index)" class="classlikebtn">
                <v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                <p class="text-att">Like</p>
                <div v-if="post.likers.length>0" class="buble-like"><span id="number-like">{{post.likers.length}}</span>
                </div>
              </button>
              <button id="btn-att">
                <v-icon class="img-att"> mdi-message-outline</v-icon>
                <p class="text-att">Commenter</p>
              </button>
              <button v-if="post.posterId != userid && userFollowingId.includes(post.posterId) "
                @click="addUnFollow(post.posterId,index)" type="submit" class="btn-att-follow">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">abonné</p>
              </button>
              <button v-else-if="post.posterId != userid && !userFollowingId.includes(post.posterId) "
                @click="addFollow(post.posterId,index)" type="submit" class="btn-att-unfollow">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">S'abonné</p>
              </button>
            </div>
            <div v-else class="btn-card" id="card-att">
              <button :class="userLikePostId.includes(post._id) ? 'class-btn-att-like' : 'class-btn-att-unlike'"
                @click="clickLike(post._id,index)" class="classlikebtn">
                <v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                <p class="text-att">Like</p>
                <div v-if="post.likers.length>0" class="buble-like"><span id="number-like">{{post.likers.length}}</span>
                </div>
              </button>
              <button id="btn-att">
                <v-icon class="img-att"> mdi-message-outline</v-icon>
                <p class="text-att">Commenter</p>
              </button>
              <!-- <button id="btn-att-flag" @click="showReport = !showReport"><v-icon class="img-att-flag">mdi-flag</v-icon><p class="text-att">Signaler</p></button> -->
              <button v-if="post.posterId !== userid " id="btn-att-flag" @click="showReport = !showReport"><v-icon class="img-att-flag">mdi-flag-outline</v-icon><p class="text-att">Signaler</p></button>
            </div>
          </div>
        </v-card>
  
      </div>
      <div class="center-main" v-else>
        <v-card class="card-post">
          <div class="border-card">
            <div id="card-autor-book-first">
              <span class="firstpost">le {{date}} à {{hour}} {{fullname}} va renter dans un zone inexplorée</span>
            </div>
            <div class="image-card">
              <img class="card-img " src="../client/public/uploads/posts/pexels-gabriela-palai-590029.jpg"
                alt="photo" />
            </div>
            <div class="message-main">
              <p>vous serez le 1 er à fouler cette terre inconnu</p>
              <p class="history">Ceci restera gravé dans la pierre </p>
              <p class="history">Ceci restera écrit dans les livres d'histoire</p>
              <!-- <p class="history">Ceci restera ecrit sur un disque dur</p> -->
              <p>Ceci restera stocké dans le cloud</p>
            </div>
          </div>

        </v-card>
      </div>
    </div>
    <report v-if="showReport" v-show="showReport" :idpsot="post._id" :iduserReport="post.posterId" :iduserOrigin="this.userid"  @close-modale-report="showReport = false" @close-modale-report-comfirm="showReport = false" />
    <sortPost v-if="showsort" v-show="showsort" @close-modale-sort="showsort = false"
      @close-modale-sort-following="showsort = false,getPostFollowing()"
      @close-modale-sort-follower="showsort = false,getPostFollower()"
      @close-modale-sort-mypost="showsort = false,getPostOwn()"
      @close-modale-sort-like="showsort = false,getPostIlike()"
      @close-modale-sort-all="showsort = false,getPosts()" />
    <deletepost v-if="showdel" :id="userid" :keyid="post._id" v-show="showdel"
      @close-modale-delete="showdel = false,getRefresh()" />
    <modify v-if="showmodify"  v-show="showmodify"
      @close-modale-modify=" showmodify=false,getRefresh()" />
    <Postcreate v-show="showpost" @close-modale-post="showpost = false,getRefresh()" />

  </div>
</template>
<script>

import axios from "axios"
// import { trusted } from "mongoose";
// import { ref } from 'vue';
// const componentKey = ref(0);
// const forceRerender = () => {
//   componentKey.value += 1
// }

export default {
  name: "Book",

  components: {
    report:() => import(/* webpackChunkName:"report"*/"../components/warningReportPost.vue"),
    sortPost: () => import("../components/sortpostby.vue"),
    Postcreate: () => import( /* webpackChunkName:"Postcreate"*/ "./index/postcreate.vue"),
    modify: () => import("./index/modifytest.vue"),
    //  deletepost: () => import(/* webpackPrefetch: true */"./index/deletetest.vue")
    //  Modify: () => import(  /* webpackMode: "lazy" */"../components/modifypost.vue"),
    //  Modify: () => import(  /* webpackChunkName:"modify"*/"../components/modifypost.vue"),
    deletepost: () => import(  /* webpackChunkName:"deletepost"*/"./index/deletetest.vue"),
    //  Deletepost ,
    //  Modify

  },
  props: {
    // keytest : ['post._id']
  },
  asyncData() {
    return {
      componentKey: 0,
      avatarpicempty: '',
      avatarpicemptyNone: '',
      log: false,
      showsort: false,
      showdelete: false,
      showmodify: false,
      showdel: false,
      showpost: false,
      like: false,
      userjwtid: "",
      userid: '',
      lastname: "",
      firstname: "",
      userpicture: '',
      posts: [],
      post: [],
      posterId: '',
      posterfirstname: '',
      posterlastname: '',
      urlpic: '',
      image: '',
      message: '',
      comdelpost: "",
      like: "",
      userLikePostId: [],
      userFollowingId: [],
      userFollowerId:[],
      follow: false,
      emptylike: false,
      emptyfollower: false,
      emptyfollowing: false,
      emptyownpost: false,
      postsfollow: false,
      postsILike: false,
      postsown: false,
      postall: false,
      sortPosts : '',
      showReport : false,
      Followers : false,
      // userlike:[],
      // numberlike:[],
      // likeby:'',
      // postlikers:[],
      // liker : [],
      // photo:'',
      // userphoto:'',
      // match:[],
      // liked: "",
    };
  },
  computed: {

    date() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      // today = mm+'-'+dd+'-'+yyyy;
      // today = mm+'/'+dd+'/'+yyyy;
      // today = dd+'-'+mm+'-'+yyyy;
      today = dd + '/' + mm + '/' + yyyy;
      return today
    },

    hour() {
      const d = new Date();
      let hh = d.getHours();
      let mi = d.getMinutes();
      if (hh < 10) {
        hh = '0' + hh;
      }
      if (mi < 10) {
        mi = '0' + mi;
      }
      let hours = hh + ":" + mi;
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

    goProfilUser(id){
      window.location.href = `./profilUsermain?id=${id}`
    },

    goProfilUserOwn(){
      window.location.href = `./profiluser`
    },

  getPostFollower() {

   
            axios.get(`http://localhost:5000/api/post/postfollowing/${this.userid}`)
                 .then((docs)=>{
                  console.log(docs);
                 this.posts = docs.data
                 if(docs.data[0] === undefined){
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data
            })
            localStorage.removeItem('sort')
            this.emptyfollowing = true
            setTimeout(() => {
              this.emptyfollowing = false
            }, 5000);
          }else{
          localStorage.setItem('sort', 'Follower');
            return this.posts
          }
        }).catch((err) => { console.log(err); });

    },

    getPostFollowing() {
      axios.get(`http://localhost:5000/api/post/postfollower/${this.userid}`)
                 .then((docs)=>{
                  console.log(docs);
                 this.posts = docs.data
                 if(docs.data[0]=== undefined){
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data
            })
            localStorage.removeItem('sort')
            this.emptyfollower = true
            setTimeout(() => {
              this.emptyfollower = false
            }, 5000);
          }else{
          localStorage.setItem('sort', 'Following');
            return this.posts
          }
        }).catch((err) => { console.log(err); });
   
      },

    getPostIlike() {
      axios.get(`http://localhost:5000/api/post/postlike/${this.userid}`)
        .then((doc)=>{
          this.posts = doc.data
          console.log(doc.data);
          if(doc.data[0]=== undefined){
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data
            })
            localStorage.removeItem('sort')
            this.emptylike = true
            setTimeout(() => {
              this.emptylike = false
            }, 5000);
          }else{
          localStorage.setItem('sort', 'Like');
            return this.posts
          }
        }).catch((err) => { console.log(err); });
    },

    getPostOwn() {
      axios.get(`http://localhost:5000/api/post/postby/${this.userid}`)
        .then((doc)=>{
          this.posts = doc.data
          if(doc.data[0]=== undefined){
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data
            })
            localStorage.removeItem('sort')
            this.emptylike = true
            setTimeout(() => {
              this.emptylike = false
            }, 5000);
          }else{
          localStorage.setItem('sort', 'Own');
            return this.posts
          }
        }).catch((err) => { console.log(err); });

    },

    getPosts() {
      localStorage.removeItem('sort')
      axios.get("http://localhost:5000/api/post")
        .then((docs) => {
          this.posts = docs.data
        })
        .catch((err) => { console.log(err); });
    },
    getPostsRefresh() {
      // localStorage.removeItem('sort')
      axios.get("http://localhost:5000/api/post")
        .then((docs) => {
          this.posts = docs.data
        })
        .catch((err) => { console.log(err); });
    },

    getRefresh(){
      this.sortPosts = localStorage.getItem('sort')
      // this.sortPosts = JSON.parse(localStorage.getItem('sort'))
      console.log(this.sortPosts);
      switch (this.sortPosts){
        case 'Own': this.getPostOwn() ;
        break;
        case 'Following' : this.getPostFollowing();
        break;
        case 'Follower' : this.getPostFollower();
        break;
        case 'Like' : this.getPostIlike();
        break;
        default : this.getPosts()
      }
    },

    clickLike(postId, index) {
      const likeBtn = document.querySelectorAll('.classlikebtn')
      if (likeBtn[index].classList.contains('class-btn-att-unlike')) {
        axios.patch(`http://localhost:5000/api/post/like-post/${postId}`, { id: this.userid })
          .then(() => {
            axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
              .then((user) => {
                this.userLikePostId = user.data.likes
              }).catch((err) => { console.log(err) })
            likeBtn[index].classList.replace('class-btn-att-unlike', 'class-btn-att-like')
            this.getRefresh()
          }).catch((err) => { console.log(err) })

      } else {
        axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`, { id: this.userid })
          .then(() => {
            axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
              .then((user) => {
                this.userLikePostId = user.data.likes
              }).catch((err) => { console.log(err) })
            likeBtn[index].classList.replace('class-btn-att-like', 'class-btn-att-unlike')
            this.getRefresh()
          }).catch((err) => { console.log(err) })
      }
      // this.getRefresh()
    },

    postIdDel(post) {
      const parse = JSON.stringify(post);
      localStorage.setItem('categories', parse);
    },

    postSort() {
      const parse = JSON.stringify(post);
      localStorage.setItem('categories', parse);
    },

    getUsers() {
      axios
        .get("http://localhost:5000/api/user")
        .then((docs) => {
        }
        )
        .catch((err) => console.log(err));
    },

    async deletePost(postId) {
      await axios.delete(`http://localhost:5000/api/post/${postId}`)
        .then((post) => {
        })
        .catch((err) => console.log(err))
      // }
    },

    getcolor() {
      if (this.urlpic === '' || this.urlpic === undefined) {
        this.avatarpicempty = this.firstname.split('')[0].toLocaleUpperCase()
      }
    },

    addFollow(posterId, index) {
      axios.patch(`http://localhost:5000/api/user/follow/${this.userid}`, { idToFollow: posterId })
        .then(() => {
          axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.userFollowingId = docs.data.following
              // console.log(this.userFollowingId);
            })
         this.getRefresh()
        })
        .catch((err) => { err.message })
    },

    addUnFollow(posterId) {
      axios.patch(`http://localhost:5000/api/user/unfollow/${this.userid}`, { idToUnFollow: posterId })
        .then(() => {
          axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.userFollowingId = docs.data.following
              // console.log(this.userFollowingId);
            })
            this.getRefresh()
        })
        .catch((err) => { err.message })
    },
  },


  async mounted() {
    // this.userFollowerId = []
    // this.userFollowingId = []
    axios.defaults.withCredentials = true;
    await axios.get(`http://localhost:5000/jwtid`)
      .then((res) => {
        // console.log(this.userjwtid);
        this.userjwtid = res.data
        this.show = true
        this.log = true
        // TODO => Insert loader \\ 
      }).catch((error) => {
        console.log(error);
      })

    await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
      .then((docs) => {
        this.role = docs.data.role
        this.userid = docs.data._id
        this.firstname = docs.data.firstname
        this.lastname = docs.data.lastname
        this.urlpic = docs.data.photo
        this.userLikePostId = docs.data.likes
        this.userFollowingId = docs.data.following
        this.userFollowerId = docs.data.followers
        // console.log(this.userFollowingId);
        // console.log(this.userFollowerId);
      }).then(() => {
        this.getRefresh()
      }).catch((error) => {
        console.log(error);
      });
    this.getcolor()
  },
}

</script>

<style lang="scss">
div.v-main__wrap {
  background-color:  rgb(18, 7, 48);

}

#Book {
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // width: 100%;
}

.center-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: auto;
}

.card-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1%;
  margin-bottom: 2%;
  max-width: 700px;
  min-width: 350px;
  width: 100%;
  &:hover {
    // border-color:green;

    transform: scale(1.02);
    transition: ease 0.5s ;

  }
  // background-color: red;
}

.border-card {
  width: 100%;
  border: 5px solid $secondary;
}

#fix-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  height: 50px;
  border: solid 2px $secondary;
  border-radius: 10px/5px;
  margin-bottom: 2%;
  background-color: $secondary;
  // cursor: pointer;
}

#fix-top-bis {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //  max-width: 500px;
  //  margin-right: auto;
  padding-left: 8%;
  width: 100%;
  height: 50px;
 
  // border: solid 2px $secondary;
  // border-radius: 10px/5px;
  // margin-bottom: 2%;
  // background-color: $secondary;
  cursor: pointer;
  &:hover {transform: scale(1.05);}
}

.empty-sort {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  height: 50px;
  margin-bottom: 1%;
  border: solid 1px $primary;
  border-radius: 10px/5px;
}


.post-option :hover{
  // position: relative;
  // left : 10%;
  // border: solid black 1px;

 translate : 4px;


}

.post-option-dot:before {
  color: $primary;
  // position: relative;
  // left : 100%;
  // &:hover{
  // transform: 20px;



  // }
}

.new-top {
  // padding: 0;
  // padding-left: 1%;
  border: solid 2px black;
  border-radius: 30px / 30px;
  height: 35px;
}

.new-top-span {
  display: flex;
  flex-direction: row;

  width: auto;
  color: black;
}

#btn-post-top {
  // margin-left: 1%;
  background-color: $tertiary;
  height: 35px;
  width: auto;
  border: solid $primary;
  color: $secondary;
  border-radius: 30% / 30%;

  &:hover {
    background-color: $primary;
    border: solid $tertiary;
    color: $tertiary;
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
}

.btn-book-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // margin-left: auto;
  height: 80px;
  width: 100px;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}

.picture-user-none-top {
  display: flex;
  width: 40px;
  height: 40px;
  margin-right: 1%;
  justify-content: center;
  align-items: center;
  border: solid 2px;
  border-radius: 50%;
  border-color: $tertiary;
}

#avatar-empty-book-top {
  font-size: 1.8rem;
  display: flex;
  margin-right: 1%;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: solid 2px $tertiary;
  border-radius: 50%;
  margin-right: 1%;
  background-color: rgb(89, 165, 35);
}


.picture-user {
  margin-top: 1.5%;
  margin-right: 1%;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  border-color: $primary;
  &:hover {
    // border-color:green;

    transform: scale(1.05);
    transition: ease 0.5s ;

  }
}
.picture-user-admin {
  margin-top: 1.5%;
  margin-right: 1%;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px rgb(42, 168, 42);
  border-radius: 50%;
  border-color:  rgb(42, 168, 42);
  &:hover {
    // border-color:green;

    transform: scale(1.05);
    transition: ease 0.5s ;

  }
}

#avatar-empty-book {
  // margin-top: 5%;
  font-size: 1.8rem;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  border-color: $primary;
  margin-right: 1%;
  background-color: rgb(89, 165, 35);
  color:aliceblue;
  // color:$primary;
  &:hover {
    transform: scale(1.05);
    // transition: ease 0.5s ;

  }
}
.picture-user-none {
  display: flex;
  margin-right: 1%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  border-color: aliceblue;
  &:hover {
    border-color: $primary;
    // border-color:green;
    // border-color: $secondary;
    transform: scale(1.05);
    // transition: ease 0.5s ;

  }
}

#avatar-empty-book-book {
  font-size: 1.8rem;
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  border-color: $secondary;
  margin-right: 1%;
  background-color: rgb(89, 165, 35);
  // color:$primary;
  color:aliceblue;
  &:hover {
    // border-color:green;
    border-color: $primary;
    transform: scale(1.05);
    transition: ease 0.5s ;

  }
}

.link{
  text-decoration: none;
  color: aliceblue;
  margin-right: 1%;

  // margin-top: 1.5%;
  // margin-right: 1%;
  // display: flex;
  // width: 50px;
  // height: 50px;
  // justify-content: center;
  // align-items: center;
  // border: solid 2px $secondary;
  // border-radius: 50%;
}


.history {
  font-style: italic;
  text-decoration: line-through;
}

#card-autor-book-first {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: $tertiary;
  padding: 1%;
  border-bottom: solid 2px $secondary;
  // margin-bottom: 1%;
  // padding-top: 2%;
  // border-bottom-left-radius: -5%;
  // border-bottom-right-radius: -5%;

}

#card-autor-book-none {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: $tertiary;
  padding: 1%;
  border-bottom: solid 2px $secondary;
  // height: 75px;
  // margin-bottom: 1%;
  // padding-top: 2%;
  // border-bottom-left-radius: -5%;
  // border-bottom-right-radius: -5%;

}

.user-book-main-none {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  // padding-bottom: 2%;
}

p.fullname-none {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: auto;
  // margin-left: 1%;
  // padding-top: 2%;
  // padding-left: 3%;
  // padding-right: 2%;
  margin-bottom: 0;
  cursor:default;
}

// margin-top: 1.5%;
//   margin-right: 1%;
//   display: flex;
//   width: 50px;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
//   border: solid 2px $secondary;
//   border-radius: 50%; 



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

    &#btn-post-modify>.pen-icon-main {
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

    &#btn-post-delete>.delete-icon-main {
      color: $tertiary;
    }
  }
}

.image-card {
  display: flex;

  width: 100%;
  height: 100%;
  padding: 1% 1%;
  // border-top: solid 2px $secondary;
  border-bottom: solid 2px $secondary;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  justify-content: center;
  align-items: center;
}

.card-img {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  object-fit: cover;
  // overflow: hidden;
  max-height: 300px;
  max-width: 500px;
  // width: 100%;
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
  max-height: 300px;
  max-width: 500px;
  width: 100%;
  // padding: 1%;
  border: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-radius: 2%;
}

.message-main {
  padding: 1%;
  text-align: center;
  max-width: 650px;
}

.name-date-book {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: 2%;
}

// .fullname-book{
//   padding-top: 10%;
//   padding-left: 3%;
// }

#fullname-main {
cursor:default;
}


p.full-date {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-bottom: 0;
  padding-left: 1%;
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
  display: flex;
  font-display: row;
  flex-wrap: wrap;
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

.img-att {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding-right: 10%;

  &:before {
    color: $tertiary;

  }
}


#btn-att {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;
  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;
    &#btn-att>.img-att:before {
      color: $secondary;
    }
  }
}
#btn-att-flag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;
  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;
    &#btn-att-flag>.img-att-flag:before {
      color: $secondary;
    }
  }
}

.img-att-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding-right: 10%;
  &:before {
    color: $tertiary;
  }
  &:hover{
    color: $secondary;
  }
}

.classfollowbtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.classfollowbtn.img-att:before {
      color: $secondary;
    }
  }
}

.btn-att-follow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.btn-att-follow.img-att:before {
      color: $secondary;
    }
  }
}

.btn-main-follow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 30px;
  // margin-top: 2%;
  margin-right: 1%;
  // margin-left: auto;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.btn-main-follow>.img-att:before {
      color: $secondary;
    }
  }
}

.btn-att-unfollow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $primary;
  color: $secondary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &.btn-att-unfollow>.img-att:before {
    color: $secondary;
  }

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.btn-att-unfollow>.img-att:before {
      color: $secondary;
    }
  }
}

.btn-main-unfollow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 30px;
  // margin-top: 2%;
  // margin-left: auto;
  margin-right: 3%;
  background-color: $primary;
  color: $secondary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &.btn-main-unfollow>.img-att:before {
    color: $secondary;
  }

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.btn-main-unfollow>.img-att:before {
      color: $secondary;
    }
  }
}


button.class-btn-att-unlike {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: $secondary;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.class-btn-att-unlike>.img-att:before {
      color: $secondary;
    }
  }
}


button.class-btn-att-like {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: rgb(27, 108, 17);
  color: $secondary;
  font-style: italic;
  font-weight: bold;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &.class-btn-att-like>.img-att:before {
    color: $secondary;
  }

  &:hover {
    background-color: rgb(27, 108, 17);
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;
  }
}

.buble-like {
  background-color: $primary;
  position: relative;
  top: -15px;
  left: 10px;
  width: 30px;
  height: 20px;
  border: solid 2px $primary;
  border-radius: 50%;
}

#number-like {
  color: $secondary;
  position: relative;
  top: -4px;


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
