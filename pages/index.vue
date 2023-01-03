<template>
  <div>
    <div id="Book" :key="componentKey">
      <div id="fix-top">
        <div id="fix-top-bis" @click="PostCommentControleClear()" title="creer votre publication">
          <img v-if="urlpic !== '' && urlpic !== undefined" class="picture-user-none-top" :src="urlpic"
            alt="photo de l'utilisateur" />
          <div v-else id="avatar-empty-book-top">{{ avatarpicempty }}</div>
          <button class="new-top">
            <p class="new-top-span">Envie de partager, {{ firstname }} ?</p>
          </button>
        </div>
        <button class="post-option" @focusin="showsort = !showsort" title="trier les publications">
          <v-icon class="post-option-dot">mdi-dots-horizontal </v-icon>
        </button>
      </div>

      <div class="empty-sort" v-if="emptyfollower">
        😭 vous ne suivez personne de chez personne 😭 abonné à vous à quelqu'un
      </div>
      <div class="empty-sort" v-if="emptylike">
        😭 vous n'avais aimer aucune publication 😭 liker une publication
      </div>
      <div class="empty-sort" v-if="emptyownpost">
        😭 Vous n'avez rien publier 😭 Vous êtes trop timide lancer vous !!
      </div>
      <div class="empty-sort" v-if="emptyfollowing">
        😭 Soit vos abonné(e)(s) son timide 😭 soit vous êtes timide
      </div>
      <div class="empty-sort" v-if="emptysignal">
        aucune publications n'est signalés
      </div>

      <div class="center-main" v-if="this.posts[0] != undefined">
        <v-card class="card-post" v-for="(post, index) in posts" :key="post.id" :index="index">
          <div class="border-card">
            <div id="card-autor-book" v-if="post.posterId === userid">
              <!-- <nuxt-link :to="{name: 'profilUsermain', params: { id : post.posterId} }" class="name-date-book"  > -->
              <div class="name-date-book">
                <nuxt-link class="link" :to="{ name: 'profiluser' }" title="lien vers le profil de l'utilisateur">
                  <img v-if="
                          post.posterpicture !== '' &&
                          post.posterpicture !== 'undefined'
                        " class="picture-user" :src="post.posterpicture" alt="photo de l'utilisateur"
                    title="lien vers le profil de l'utilisateur" />
                  <div v-else id="avatar-empty-book" title="lien vers le profil de l'utilisateur">
                    {{ avatarpicempty }}
                  </div>
                </nuxt-link>
                <span id="fullname-main">{{ post.posterfullname }} à {{ post.date }}</span>
                <!-- <p class="full-date">{{post.date}}</p> -->
                <!-- </nuxt-link> -->
              </div>
              <div class="btn-book-main">
                <button id="btn-post-modify" type="submit" @click="(showmodify = !showmodify), postIdDel(post._id)"
                  title=" modifier votre publication ">
                  <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>Modifier
                </button>
                <button id="btn-post-delete" @click="(showdel = !showdel), postIdDel(post._id)"
                  title=" supprimer votre publication ">
                  <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon>Supprimer
                </button>
              </div>
            </div>

            <div id="card-autor-book" v-else-if="role !== undefined">
              <div class="name-date-book">
                <nuxt-link class="link" :to="{
                        name: 'profilUserAdmin-id',
                        params: { id: `?id=${post.posterId}` },
                      }" title="lien vers le profil de l'utilisateur"><img v-if="
                        post.posterpicture !== '' &&
                        post.posterpicture !== 'undefined'
                      " class="picture-user-admin" :src="post.posterpicture" alt="photo de l'utilisateur"
                    title="lien vers le profil de l'utilisateur" />
                  <div v-else id="avatar-empty-book" title="lien vers le profil de l'utilisateur">
                    {{ post.posterlastname.split("")[0].toLocaleUpperCase() }}
                  </div>
                </nuxt-link>
                <span id="fullname-main">{{ post.posterfullname }} à {{ post.date }}</span>
              </div>

              <div class="text-center">
    <v-menu
      open-on-hover
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="manage-btn-admin-post"
          v-bind="attrs"
          v-on="on"
        >
          gestion 
        </v-btn>
      </template>
      <v-list>
      <div class="btn-book-main">
                <button id="btn-post-modify" type="submit" @click="(showmodify = !showmodify), postIdDel(post._id)"
                  title="modifier votre publication">
                  <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>
                  Modifier
                </button>
                <button id="btn-post-delete" @click="(showdel = !showdel), postIdDel(post._id)"
                  title="supprimer votre publication">
                  <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon>Supprimer
                </button>
              </div>
            </v-list>
      <!-- <v-list>
        <v-list-item
          v-for="(action, index) in actions"
          :key="index"
        >
          <v-list-item-title>{{ action.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
    </v-menu>
  </div>


              <!-- <div class="btn-book-main">
                <button id="btn-post-modify" type="submit" @click="(showmodify = !showmodify), postIdDel(post._id)"
                  title="modifier votre publication">
                  <v-icon class="pen-icon-main" size="15px">mdi-lead-pencil</v-icon>
                  Modifier
                </button>
                <button id="btn-post-delete" @click="(showdel = !showdel), postIdDel(post._id)"
                  title="supprimer votre publication">
                  <v-icon class="delete-icon-main" size="20px">mdi-delete-circle</v-icon>Supprimer
                </button>
              </div> -->
            </div>
            <div id="card-autor-book-none" v-else>
              <div class="user-book-main-none">
                <nuxt-link class="link" :to="{
                      name: 'profilUsermain-id',
                      params: { id: `?id=${post.posterId}` },
                    }"><img v-if="
                      post.posterpicture !== '' &&
                      post.posterpicture !== 'undefined'
                    " class="picture-user-none" :src="post.posterpicture" alt="phtot de l'utilisateur"
                    title="lien vers le profil de l'utilisateur" />
                  <div v-else id="avatar-empty-book-book" title="lien vers le profil de l'utilisateur">
                    {{ post.posterlastname.split("")[0].toLocaleUpperCase() }}
                  </div>
                </nuxt-link>
                <p class="fullname-none">
                  {{ post.posterfullname }} à {{ post.date }}
                </p>
              </div>
              <button v-if="
                      post.posterId != userid &&
                      userFollowingId.includes(post.posterId)
                    " @click="addUnFollow(post.posterId, index)" type="submit" class="btn-main-follow"
                title="se désabonner">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">abonné</p>
              </button>
              <button v-else @click="addFollow(post.posterId, index)" type="submit" class="btn-main-unfollow"
                title="s'abonner">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">S'abonner</p>
              </button>
             </div>
             <div v-if="post.picture != ''" class="image-card">
              <img class="card-img" :src="post.picture" alt="photo" />
             </div>

               <div v-if="post.message != ''" class="message-main">
              {{ post.message }}
          </div>
            <div v-if="role !== undefined" class="btn-card" id="card-att">
              <button :class="
                    userLikePostId.includes(post._id)
                      ? 'class-btn-att-like'
                      : 'class-btn-att-unlike'
                  " @click="clickLike(post._id, index)" class="classlikebtn" title="liker la publication">
                <v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                <p class="text-att-like">Like</p>
                <div v-if="post.likers.length > 0" class="buble-like">
                  <span id="number-like">{{ post.likers.length }}</span>
                </div>
              </button>
              <button id="btn-att">
                <v-icon class="img-att"> mdi-message-outline</v-icon>
                <p class="text-att-comment" @click="PostCommentControle(post._id, index), saveOpen(index)"
                  :index="index" :postid="post._id">
                  Commenter
                </p>
              </button>
              <button v-if="post.posterId != userid && userFollowingId.includes(post.posterId) " @click="addUnFollow(post.posterId, index)" type="submit" class="btn-att-follow" title="se désabonner">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">abonné</p>
              </button>
              <button v-else-if="
                    post.posterId != userid &&
                    !userFollowingId.includes(post.posterId)
                  " @click="addFollow(post.posterId, index)" type="submit" class="btn-att-unfollow" title="s'abonner">
                <v-icon class="img-att"> mdi-account-group </v-icon>
                <p class="text-att">S'abonné</p>
              </button>
              <div v-if="post.signalBy.length > 0"  id="flag-admin-signal"><v-icon id="flag-admin-signal-icon">mdi-flag</v-icon> 
                <div v-if="post.signalBy.length > 0" class="buble-report">
                  <span id="number-report">{{ post.signalBy.length }}</span>
                </div>
              </div>
             
            </div>

            <div v-else class="btn-card" id="card-att">
              <button :class="
                        userLikePostId.includes(post._id)
                          ? 'class-btn-att-like'
                          : 'class-btn-att-unlike'
                      " @click="clickLike(post._id, index)" class="classlikebtn" title="liker la publication">
                <v-icon class="img-att">mdi-thumb-up-outline</v-icon>
                <p class="text-att-like">Like</p>
                <div v-if="post.likers.length > 0" class="buble-like">
                  <span id="number-like">{{ post.likers.length }}</span>
                </div>
              </button>
              <button id="btn-att">
                <v-icon class="img-att"> mdi-message-outline</v-icon>
                <p class="text-att-comment" @click="PostCommentControle(post._id, index), saveOpen(index)"
                  :index="index" :postid="post._id">
                  Commenter
                </p>
              </button>
              <!-- <button id="btn-att-flag" @click="showReport = !showReport"><v-icon class="img-att-flag">mdi-flag</v-icon><p class="text-att">Signaler</p></button> -->
              <button v-if="post.posterId !== userid" :class="
                      post.signalBy.includes(userid)
                        ? 'reportPost'
                        : 'notReportPost'
                    " class="btn-att-flag" @click="
                      (showReport = !showReport),
                      reportInfo(
                        post._id,
                        post.posterfullname,
                        post.posterId,
                        fullname,
                        userid
                      )
                    " title="signaler la publication">
                <v-icon class="img-att-flag">mdi-flag-outline</v-icon>
                <p class="text-att-report">Signaler</p>
                <!-- <div v-if="post.signalBy.length > 0" class="buble-report">
                  <span id="number-report">{{ post.signalBy.length }}</span>
                </div> -->
              </button>
            </div>
          </div>

          <div class="deploy-comment" :index="index" :postid="post._id">
            <v-card-text class="deploy-commentUser-card" v-show="writecomment">
              <form class="deploy-commentUser-form" method="post" @submit.prevent>
                <label for="comment">
                  <h2>Commentaire:</h2>
                </label>
                <textarea v-model="CommentMessage" name="comment" class="card-comment-area" type="textarea"
                  placeholder="votre commentaire" maxlength="200" :index="index"></textarea>
                <div class="btn-comment">
                  <button id="btn-comment-close" @click="ControleClose(index), saveClose(index)">
                    Fermer
                  </button>
                  <button id="btn-comment-delete" @click="deleteComment()">
                    Effacer
                  </button>
                  <button id="btn-comment-send" type="submit" @click="controlePostComment(post._id, index)">
                    Envoyer
                  </button>
                </div>
              </form>
            </v-card-text>
          </div>

          <button class="deploy-comment-button" v-if="post.comments.length > 0 && (seetest.index !== index || !seetest.see)" @click="selectPost(index)"  :index="index" >Voir les commentaires</button>
      <button class="deploy-comment-button" v-if="post.comments.length > 0 && seetest.index === index && seetest.see" @click="selectPost(index)" :index="index">Cacher les commentaires</button>

          <!-- <button class="deploy-comment-button" v-if="post.comments.length > 0 && seecomment[index] " @click="seecomment[index] = !seecomment[index], SeeComment(index)" :index="index">
            Voir les commentaires<v-icon class="arrow-comment">mdi-arrow-down</v-icon>
          </button>
          <button class="close-comment-button" v-if="post.comments.length > 0 && !seecomment[index]"
            @click=" seecomment[index] = !seecomment[index], CloseComment(index)" :index="index">
            Cacher les commentaires<v-icon class="arrow-comment">mdi-arrow-up</v-icon>
          </button> -->
          <!-- <button class="deploy-comment-button" v-if="post.comments.length > 0 && seecomment === false && index == !selectedPostIndexOpen" @click="DeployComment(index),seecomment = !seecomment" :index="index"  :class="seecomment == true ? 'open' : 'close'">Voir les commentaires</button> -->

          <v-card v-if="seetest.index === index && seetest.see"  v-for="(comment, indexcomment) in post.comments" :key="comment._id" :index="indexcomment" class="card-comment">

          <!-- <v-card v-if="!seecomment[index]" v-for="(comment, indexcomment) in post.comments" :key="comment._id"
            :index="indexcomment" class="card-comment"> -->
            <v-card-text class="card-comment-posted">
              <div class="title-card-comment-posted">
                <img v-if="
                              comment.commenterPicture !== '' &&
                              comment.commenterPicture != undefined
                            " class="picture-user-comment" :src="comment.commenterPicture" alt="photo de l'utilisateur" />
                                            <div v-else id="avatar-empty-card-comment">
                                              {{
                                comment.commenterFirstname.split("")[0].toLocaleUpperCase()
                            }}
                </div>
                <p id="fullname-comment">
                  {{ comment.commenterFullname }} à {{ comment.commentDate }}
                </p>
              </div>
              <p id="message-comment">{{ comment.comment }}</p>
            </v-card-text>
          </v-card>
        </v-card>
      </div>
      <div class="center-main" v-else>
        <v-card class="card-post">
          <div class="border-card">
            <div id="card-autor-book-first">
              <span class="firstpost">le {{ date }} à {{ hour }} {{ fullname }} va renter dans un
                zone inexplorée</span>
            </div>
            <div class="image-card">
              <img class="card-img" src="../client/public/uploads/posts/pexels-gabriela-palai-590029.jpg" alt="photo" />
            </div>
            <div class="message-main">
              <p>vous serez le 1 er à fouler cette terre inconnu</p>
              <p class="history">Ceci restera gravé dans la pierre</p>
              <p class="history">
                Ceci restera écrit dans les livres d'histoire
              </p>
              <!-- <p class="history">Ceci restera ecrit sur un disque dur</p> -->
              <p>Ceci restera stocké dans le cloud</p>
            </div>
          </div>
        </v-card>
      </div>
      <transition name="fade" bottom right fixed>
        <div id="pagetopscroll" v-show="scY > 300" @click="toTop">
          <svg id="arrowscroll" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
            fill="none" stroke="#4a5568" stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </div>
      </transition>
    </div>
    <Load v-show="showloader" @close-modale-loader="showloader = false" @open-modale-loader="true" />
    <report v-if="showReport" v-show="showReport" :idpostsignal="post._id" :useridsignal="post.posterId"
      :useridfrom="this.userid" :userfullnamesignal="post.posterfullname" :userfullnamefrom="this.fullname"
      @close-modale-report="showReport = false" @close-modale-report-comfirm="(showReport = false), getRefresh()" />
    <sortPost v-if="showsort" v-show="showsort" @close-modale-sort="showsort = false"
      @close-modale-sort-following="(showsort = false), getPostFollowing()"
      @close-modale-sort-follower="(showsort = false), getPostFollower()"
      @close-modale-sort-mypost="(showsort = false), getPostOwn()"
      @close-modale-sort-like="(showsort = false), getPostIlike()"
      @close-modale-sort-all="(showsort = false), getPosts()" 
      @close-modale-sort-signal="(showsort = false), getPostsSignal()" />
    <deletepost v-if="showdel" :id="userid" :keyid="post._id" v-show="showdel"
      @close-modale-delete="(showdel = false), getRefresh()" />
    <modify v-if="showmodify" v-show="showmodify" @close-modale-modify="(showmodify = false), getRefresh()" />
    <Postcreate v-show="showpost" @close-modale-post="(showpost = false), getPosts()" />
    <WarningRecordComment v-if="warningRecordComment" v-show="warningRecordComment"
      @close-modale-record-comment-confirm="
  (warningRecordComment = !warningRecordComment),
  PostCommentClose(indexpostClose)
" @close-modale-record-comment-confirm-delete="
  warningRecordComment = !warningRecordComment
" />
    <WarningRecordCommentEmpty v-if="warningRecordCommentEmpty" v-show="warningRecordCommentEmpty"
      @close-modale-comment-empty="
  warningRecordCommentEmpty = !warningRecordCommentEmpty
" />
    <WarningDoubleComment v-if="WarningDoubleComment" v-show="WarningDoubleComment"
      @close-modale-double-save="WarningDoubleComment = !WarningDoubleComment" @close-modale-double-delete-confirm="
  (WarningDoubleComment = !WarningDoubleComment),
  PostCommentOpenBis(indexpostOpen)
" />
    <WarningClearComment v-if="WarningClearComment" v-show="WarningClearComment"
      @close-modale-clear-delete="WarningClearComment = !WarningClearComment" @close-modale-clear-comfirm="
  (WarningClearComment = !WarningClearComment), clearComment()
      " />
      <report v-if="showReport" v-show="showReport" :idpostsignal="post._id" :useridsignal="post.posterId"
      :useridfrom="this.userid" :userfullnamesignal="post.posterfullname" :userfullnamefrom="this.fullname"
      @close-modale-report="showReport = false" @close-modale-report-comfirm="(showReport = false), getRefresh()" />
  </div>
</template>
<script>
import axios from "axios";
import Load from "../components/Waitload.vue";

  export default {
  name: "Book",

  components: {
    Load,
    WarningClearComment: () =>
      import(
        /* webpackChunkName:"WarningClearComment"*/ "../components/warningclearcomment.vue"
      ),
    WarningDoubleComment: () =>
      import(
        /* webpackChunkName:"WarningDoubleComment"*/ "../components/warningdoublecomment.vue"
      ),
    WarningRecordComment: () =>
      import(
        /* webpackChunkName:"WarningRecordComment"*/ "../components/warningrecordcomment.vue"
      ),
    WarningRecordCommentEmpty: () =>
      import(
        /* webpackChunkName:"WarningRecordCommentEmpty"*/ "../components/warningrecordcommentempty.vue"
      ),
    report: () =>
      import(
        /* webpackChunkName:"report"*/ "../components/warningReportPost.vue"
      ),
    sortPost: () => import( /* webpackChunkName:"sortPost"*/ "../components/sortpostby.vue"),
    Postcreate: () =>
      import(/* webpackChunkName:"Postcreate"*/ "./index/postcreate.vue"),
    modify: () => import("./index/modifytest.vue"),
    deletepost: () =>
      import(/* webpackChunkName:"deletepost"*/ "./index/deletetest.vue"),
   },
   props: {
    // keytest : ['post._id']
   },
   asyncData() {
    return {
      componentKey: 0,
      avatarpicempty: "",
      avatarpicemptyNone: "",
      log: false,
      showsort: false,
      showdelete: false,
      showmodify: false,
      showdel: false,
      showpost: false,
      like: false,
      userjwtid: "",
      userid: "",
      lastname: "",
      firstname: "",
      userpicture: "",
      posts: [],
      post: [],
      posterId: "",
      posterfirstname: "",
      posterlastname: "",
      signalPost: "",
      urlpic: "",
      image: "",
      CommentMessage: "",
      comdelpost: "",
      like: "",
      userLikePostId: [],
      userFollowingId: [],
      userFollowerId: [],
      follow: false,
      emptylike: false,
      emptyfollower: false,
      emptyfollowing: false,
      emptyownpost: false,
      emptysignal: false,
      postsfollow: false,
      postsILike: false,
      postsown: false,
      postall: false,
      sortPosts: "",
      showReport: false,
      Followers: false,
      seecomment: [],
      seetest: {
        index: null,
        see: false

      },
      seeok : false,
      writecomment: false,
      commentValid: false,
      Comment: "",
      commentary: [],
      warningRecordComment: false,
      warningRecordCommentEmpty: false,
      WarningDoubleComment: false,
      WarningClearComment: false,
      selectedPostIndex: null,
      selectedCommentIndexes: [],

      open: "",
      indexpostClose: "",
      indexpostOpen: "",
      showloader: true,
      scTimer: 0,
      scY: 0,


      actions: [
        { 
          title: 'Supprimer la publication',
        
      
      
      },
        { title: 'Modifier la publication' },
        { title: "Bannir l'utilisateur" },
      ],


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
      let hh = d.getHours();
      let mi = d.getMinutes();
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (mi < 10) {
        mi = "0" + mi;
      }
      let hours = hh + ":" + mi;
      return hours;
    },
    fullname: {
      get() {
        return this.firstname + " " + this.lastname;
      },
      set(newValue) {
        [this.firstname, this.lastname] = newValue.split(" ");
      },
    },
   },
   events: {},
   methods: {
    selectPost(index) {
    if (this.seetest.index === index) {
      this.seetest.see = !this.seetest.see
    } else { 
      this.seetest.index = index
      this.seetest.see = true
    }
  },

  //   openPostComment(index) {
  //   this.seetest.index = index;
  //   this.seetest.see = true;
  // },
  // closePostComment(index) {
  //   this.seetest.index = index;
  //   this.seetest.see = false;
  // },

 

    clearComment() {
      this.CommentMessage = "";
      this.showpost = true;
      const select = document.querySelectorAll(".deploy-commentUser-card");
      const selectAll = select.forEach((att) => {
        att.attributes[1].textContent = "display: none";
        console.log(att.attributes[1].textContent);
      });
    },

    PostCommentControleClear() {
      if (this.CommentMessage != "") {
        this.WarningClearComment = true;
      } else {
        this.showpost = true;
        const select = document.querySelectorAll(".deploy-commentUser-card");
        const selectAll = select.forEach((att) => {
          att.attributes[1].textContent = "display: none";
          console.log(att.attributes[1].textContent);
        });
      }
    },

    async PostCommentControle(postid, index) {
      const controle = document.querySelectorAll(".deploy-commentUser-card")[
        index
      ].attributes[1].textContent;
      const resetMessage = document.querySelectorAll(
        ".deploy-commentUser-card"
      )[index].firstElementChild[0].value;
      console.log(resetMessage);
      if (resetMessage !== "") {
        this.WarningDoubleComment = true;
      } else {
        if (controle == "v-show='writecomment'") {
          this.PostCommentClose(index);
          console.log("openpost");
        } else {
          this.PostCommentOpen(postid, index);
          console.log("closepost");
        }
      }
    },

    closeComment() {
      const closeCom = document.querySelectorAll(".deploy-commentUser-card");
      closeCom.forEach((att) => {
        att.attributes[1].textContent = "display: none";
      });
    },

    ControleClose(index) {
      const resetMessage = document.querySelectorAll(
        ".deploy-commentUser-card"
      )[index].firstElementChild[0].value;
      if (resetMessage !== "") {
        this.warningRecordComment = true;
      } else {
        this.PostCommentClose(index);
      }
    },

    saveClose(data) {
      this.indexpostClose = data;
    },
    saveOpen(data) {
      this.indexpostOpen = data;
    },
    PostCommentOpen(postid, index) {
      this.CommentMessage = "";
      const open = (document.querySelectorAll(".deploy-commentUser-card")[
        index
      ].attributes[1].textContent = "v-show='writecomment'");
    },
    PostCommentOpenBis(index) {
      this.CommentMessage = "";
      const open = (document.querySelectorAll(".deploy-commentUser-card")[
        index
      ].attributes[1].textContent = "v-show='writecomment'");
    },

    PostCommentClose(index) {
      this.CommentMessage = "";
      const close = (document.querySelectorAll(".deploy-commentUser-card")[
        index
      ].attributes[1].textContent = "display: none");
    },

    deleteComment() {
      this.CommentMessage = "";
    },
    controleComment() {
      let testRegex = this.CommentMessage.split(" ").join("");
      console.log(testRegex);
      if (testRegex != "") {
        console.log("pasok");
        this.commentValid = true;
        return true;
      } else {
        console.log("ok");
        this.commentValid = false;
        return false;
      }
    },
    controlePostComment(postid, index) {
      let testRegex = this.CommentMessage.split(" ").join("");
      if (testRegex != "") {
        console.log(testRegex);
        let data = {
          postCommentId: postid,
          commenterId: this.userid,
          commenterFirstname: this.firstname,
          commenterLastname: this.lastname,
          commenterFullname: this.fullname,
          commenterPicture: this.urlpic,
          comment: this.CommentMessage,
        };
        axios
          .patch(`http://localhost:5000/api/post/comment-post/${postid}`, data)
          .then(() => {
            this.CommentMessage = "";
            document.querySelectorAll(".deploy-commentUser-card")[
              index
            ].attributes[1].textContent = "display: none";
            this.getPostsRefresh();
          });
      } else {
        this.warningRecordCommentEmpty = true;
        setTimeout(() => {
          this.commentValid = true;
        }, 2000);
      }
    },

    reportInfo(postid, usfn, usid, uffn, ufid) {
      const info = {
        post: postid,
        userSfull: usfn,
        userSid: usid,
        userFfull: uffn,
        userFid: ufid,
      };
      console.log(info);
      localStorage.setItem("info-signal-post", JSON.stringify(info));
    },

    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    goProfilUser(id) {
      window.location.href = `./profilUsermain?id=${id}`;
    },

    goProfilUserOwn() {
      window.location.href = `./profiluser`;
    },

    getPostFollower() {
      axios
        .get(`http://localhost:5000/api/post/postfollowing/${this.userid}`)
        .then((docs) => {
          this.posts = docs.data;
          if (docs.data[0] === undefined) {
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data;
            });
            localStorage.removeItem("sort");
            this.emptyfollowing = true;
            this.showloader = true;
            setTimeout(() => {
              this.showloader = false;
            }, 1000);
            setTimeout(() => {
              this.emptyfollowing = false;
            }, 6000);
          } else {
            localStorage.setItem("sort", "Follower");
            return this.posts;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPostFollowing() {
      axios
        .get(`http://localhost:5000/api/post/postfollower/${this.userid}`)
        .then((docs) => {
          this.posts = docs.data;
          if (docs.data[0] === undefined) {
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data;
            });
            localStorage.removeItem("sort");
            this.emptyfollower = true;
            this.showloader = true;
            setTimeout(() => {
              this.showloader = false;
            }, 1000);
            setTimeout(() => {
              this.emptyfollower = false;
            }, 5000);
          } else {
            localStorage.setItem("sort", "Following");
            return this.posts;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPostsSignal() {
      axios
        .get(`http://localhost:5000/api/post/postsignaladmin/${this.userid}`)
        .then((docs) => {
          console.log(docs);
          this.posts = docs.data;
          console.log(this.posts);
          if (docs.data[0] === undefined) {
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data;
            });
            localStorage.removeItem("sort");
            this.emptysignal = true;
            this.showloader = true;
            setTimeout(() => {
              this.showloader = false;
            }, 1000);
            setTimeout(() => {
              this.emptysignal = false;
            }, 5000);
          } else {
            localStorage.setItem("sort", "Signal");
            return this.posts;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPostIlike() {
      axios
        .get(`http://localhost:5000/api/post/postlike/${this.userid}`)
        .then((doc) => {
          this.posts = doc.data;
          if (doc.data[0] === undefined) {
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data;
            });
            localStorage.removeItem("sort");
            this.emptylike = true;
            this.showloader = true;
            setTimeout(() => {
              this.showloader = false;
            }, 1000);
            setTimeout(() => {
              this.emptylike = false;
            }, 5000);
          } else {
            localStorage.setItem("sort", "Like");
            return this.posts;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPostOwn() {
      axios
        .get(`http://localhost:5000/api/post/postby/${this.userid}`)
        .then((doc) => {
          this.posts = doc.data;
          if (doc.data[0] === undefined) {
            axios.get("http://localhost:5000/api/post").then((docs) => {
              this.posts = docs.data;
            });
            localStorage.removeItem("sort");
            this.emptyownpost = true;
            this.showloader = true;
            setTimeout(() => {
              this.showloader = false;
            }, 1000);
            setTimeout(() => {
              this.emptyownpost = false;
            }, 5000);
          } else {
            localStorage.setItem("sort", "Own");
            return this.posts;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPosts() {
      localStorage.removeItem("sort");
      axios
        .get("http://localhost:5000/api/post")
        .then((docs) => {
          this.posts = docs.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPostsRefresh() {
      // localStorage.removeItem('sort')
      axios
        .get("http://localhost:5000/api/post")
        .then((docs) => {
          this.posts = docs.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRefresh() {
      this.sortPosts = localStorage.getItem("sort");
      // this.sortPosts = JSON.parse(localStorage.getItem('sort'))
      console.log(this.sortPosts);
      switch (this.sortPosts) {
        case "Own":
          this.getPostOwn();
          break;
        case "Following":
          this.getPostFollowing();
          break;
        case "Follower":
          this.getPostFollower();
          break;
        case "Like":
          this.getPostIlike();
          break;
        default:
          this.getPosts();
      }
    },

    clickLike(postId, index) {
      const likeBtn = document.querySelectorAll(".classlikebtn");
      if (likeBtn[index].classList.contains("class-btn-att-unlike")) {
        axios
          .patch(`http://localhost:5000/api/post/like-post/${postId}`, {
            id: this.userid,
          })
          .then(() => {
            axios
              .get(`http://localhost:5000/api/user/${this.userjwtid}`)
              .then((user) => {
                this.userLikePostId = user.data.likes;
              })
              .catch((err) => {
                console.log(err);
              });
            likeBtn[index].classList.replace(
              "class-btn-att-unlike",
              "class-btn-att-like"
            );
            this.getRefresh();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .patch(`http://localhost:5000/api/post/unlike-post/${postId}`, {
            id: this.userid,
          })
          .then(() => {
            axios
              .get(`http://localhost:5000/api/user/${this.userjwtid}`)
              .then((user) => {
                this.userLikePostId = user.data.likes;
              })
              .catch((err) => {
                console.log(err);
              });
            likeBtn[index].classList.replace(
              "class-btn-att-like",
              "class-btn-att-unlike"
            );
            this.getRefresh();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // this.getRefresh()
    },

    postIdDel(post) {
      const parse = JSON.stringify(post);
      localStorage.setItem("categories", parse);
    },

    postSort() {
      const parse = JSON.stringify(post);
      localStorage.setItem("categories", parse);
    },

    getUsers() {
      axios
        .get("http://localhost:5000/api/user")
        .then((docs) => { })
        .catch((err) => console.log(err));
    },

    async deletePost(postId) {
      await axios
        .delete(`http://localhost:5000/api/post/${postId}`)
        .then((post) => { })
        .catch((err) => console.log(err));
      // }
    },

    getcolor() {
      if (this.urlpic === "" || this.urlpic === undefined) {
        this.avatarpicempty = this.firstname.split("")[0].toLocaleUpperCase();
      }
    },

    addFollow(posterId, index) {
      axios
        .patch(`http://localhost:5000/api/user/follow/${this.userid}`, {
          idToFollow: posterId,
        })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.userFollowingId = docs.data.following;
              // console.log(this.userFollowingId);
            });
          this.getRefresh();
        })
        .catch((err) => {
          err.message;
        });
    },

    addUnFollow(posterId) {
      axios
        .patch(`http://localhost:5000/api/user/unfollow/${this.userid}`, {
          idToUnFollow: posterId,
        })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/user/${this.userjwtid}`)
            .then((docs) => {
              this.userFollowingId = docs.data.following;
              // console.log(this.userFollowingId);
            });
          this.getRefresh();
        })
        .catch((err) => {
          err.message;
        });
    },
   },

   async mounted() {
    axios.defaults.withCredentials = true;
    window.addEventListener("scroll", this.handleScroll);
    setTimeout(() => {
      this.showloader = false;
    }, 2500);
    this.userFollowerId = [];
    this.userFollowingId = [];

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
        this.role = docs.data.role;
        this.userid = docs.data._id;
        this.firstname = docs.data.firstname;
        this.lastname = docs.data.lastname;
        this.urlpic = docs.data.photo;
        this.userLikePostId = docs.data.likes;
        this.userFollowingId = docs.data.following;
        this.userFollowerId = docs.data.followers;
        // console.log(this.userFollowingId);
        // console.log(this.userFollowerId);
      })
      .then(() => {
        this.getRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
    this.getcolor();
  },
};
</script>

<style lang="scss">
#pagetopscroll {
  position: fixed;
  right: 3%;
  bottom: 5%;
  border: solid 1px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: rgb(13, 158, 158);
  background: rgb(13, 158, 158);
}

div.v-main__wrap {
  background-color: rgb(18, 7, 48);
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

    transform: scale(1.008);
    transition: ease 0.5s;
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

  &:hover {
    transform: scale(1.05);
  }
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

.post-option :hover {
  // position: relative;
  // left : 10%;
  // border: solid black 1px;
  translate: 4px;
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
    transition: ease 0.5s;
  }
}

.card-comment {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1%;
}

.deploy-comment {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.deploy-commentUser-card {
  display: flex;
  width: 100%;
}

.deploy-commentUser-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

textarea.card-comment-area{
  color : white;
  caret-color: red ;
  border: solid 1px $secondary;

}

.btn-comment {
  display: flex;
  flex-direction: row;
}

button#btn-comment-delete {
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

button#btn-comment-send {
  border: solid 2px $secondary;
  margin-top: 1%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: $secondary;
    color: $tertiary;
  }
}

button#btn-comment-close {
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

button.deploy-comment-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 215px;
  margin-top: 1%;
  padding-left: 2%;
  padding-right: 2%;
  border: dashed 1px $primary;
  border-radius: 10px;
}

button.close-comment-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 225px;
  margin-top: 1%;
  padding-left: 2%;
  padding-right: 2%;
  border: dashed 1px $primary;
  border-radius: 10px;
}

.arrow-comment {
  width: 15px;
  height: 7px;
  padding-left: 5%;
}

.title-card-comment-posted {
  display: flex;
  align-items: center;
}

#fullname-comment {
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  cursor: default;
}

#message-comment {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 40px;
  padding-left: 10px;
  font-size: small;
  border-style: dotted;
  border-color: $tertiary;
}

#avatar-empty-card-comment {
  font-size: 1.3rem;
  display: flex;
  margin-right: 1%;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-color: $primary;
  border-radius: 50%;
  margin-right: 1%;
  background-color: rgb(89, 165, 35);
}

.picture-user-comment {
  // margin-top: 1.5%;
  // margin-right: 1%;
  display: flex;
  width: 30px;
  height: 30px;
  margin-right: 1%;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  border-color: $primary;

  &:hover {
    transform: scale(1.05);
    transition: ease 0.5s;
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
  border-color: rgb(42, 168, 42);

  &:hover {
    // border-color:green;

    transform: scale(1.05);
    transition: ease 0.5s;
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
  color: aliceblue;

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
  color: aliceblue;

  &:hover {
    // border-color:green;
    border-color: $primary;
    transform: scale(1.05);
    transition: ease 0.5s;
  }
}

.link {
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
  cursor: default;
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
  border-radius: 15px;
  padding-left: 5px;
  padding-right: 5px;
  // padding-bottom: 5px;
  color: $secondary;

  &:hover {
    border-radius: 10px;
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
  border-radius: 15px;
  padding-left: 2px;
  padding-right: 5px;
  // padding-bottom: 5px;
  color: $secondary;

  &:hover {
    border-radius: 10px;
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
  border-radius: 2px;
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
  cursor: default;
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
  flex-direction: row;
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
  border-radius: 5px;
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

.notReportPost {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
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

    &.notReportPost>.img-att-flag:before {
      color: $secondary;
    }
  }
}

.reportPost {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 38px;
  margin-top: 2%;
  margin-right: 3%;
  background-color: #ae6a6a;
  color: $tertiary;
  width: auto;
  cursor: pointer;
  padding: 2%;

  &:hover {
    background-color: $tertiary;
    color: $secondary;
    translate: 3px;
    border: solid 1px $secondary;

    &.reportPost>.img-att-flag:before {
      color: $secondary;
    }
  }
}

#manage-btn-admin-post{
background-color: $secondary;


}

#flag-admin-signal-icon{
display: flex;
justify-content: center;
align-items: center;
margin-left: 10%;
color: red;
width: 20px;
height: 20px;
}

#flag-admin-signal{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $secondary;
  border-radius: 20px;
  margin-top: 2.5%;
  width: 55px;
  height: 38px;
}


.buble-report {
  background-color: $secondary;
  position: relative;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border: solid 2px $primary;
  border-radius: 50%;
}

#number-report {
  color: black;
  position: relative;
  top: -5px;
  right: -3px;
  font-size: 15px;
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

  &:hover {
    color: $secondary;
  }
}

.classfollowbtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
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
  border-radius: 5px;
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

    &.btn-att-follow>.img-att:before {
      color: $secondary;
    }
  }
}

.btn-main-follow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
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
  border-radius: 5px;
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
  border-radius: 5px;
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
  border-radius: 5px;
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
  border-radius: 5px;
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

p.text-att-comment {
  width: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  // padding-right: 20%;
}

p.text-att-like {
  width: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  // padding-right: 20%;
}

p.text-att-report {
  width: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  // padding-right: 20%;
}


</style>
