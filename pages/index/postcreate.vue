<template>
    <div class="overlay">
      <v-card id="card-post-modal"  >
         <v-card-text class="card-profil-title">
          <h1 class="card-profil-title-h1">Publier</h1></v-card-text>
          <form method="post" enctype="multipart/form-data" action="/upload" @submit.prevent @mousemove="postValid()">
            <v-card-text id="card-autor-test">
                 
                    <img v-if="urlpic !== '' && urlpic !== undefined" class="picture-user-create" alt="photo de profil" :src="urlpic"  />
                      <div v-else id="avatar-empty-post">{{avatarpicempty}}</div>
                    <p class="fullname-create">{{fullname}}</p>
                     <div class="header-btn">
                       <button v-if="!posted"  id="btn-send-post" :disabled ="!validPost"  action="/upload" method="post" enctype=" multipart/form-data"  @click="createPost()" type="submit"><div id="div-btn-send"><v-icon id="icon-btn-send">mdi-check-circle</v-icon><span id="span-btn-send">Envoyer</span></div></button> 
                      <button v-else id="btn-send-post-posted" ><div id="div-btn-send"><v-icon id="icon-btn-send">mdi-check-circle</v-icon><span id="span-btn-send">Poster!!</span></div></button> 
                         <router-link to="/" id="back-book"> <button id="btn-back"  @click="deletemess(),$emit('close-modale-post'),delPicPreview()" > <div id="div-btn-back"><v-icon id="icon-btn-delete"> mdi-arrow-left-circle</v-icon><span id="span-back">Retour</span> </div></button></router-link>
                         <div >{{vide}}</div>
                          </div>
            </v-card-text>
            <div class="pic-create-post">
              <div class="block-header"><h3 id="card-create-picture">Votre photo</h3>
                  <label v-if="!url" class="lab-pic-btn" for="picpost"  >
                    <v-icon  class="lab-pic-icon" size="25px">mdi-camera-plus</v-icon> <span>Ajouter une photo</span>
                    <input id="picpost" class="form-avatar-profil" type="file" value="" name="picpost" placeholder="votre photo"
                          @change="picPreview"/></label>
                  <label v-else class="lab-pic-btn" for="picpost"  >
                    <v-icon  class="lab-pic-icon" size="25px">mdi-camera-plus</v-icon> <span>Modifier une photo</span>
                    <input id="picpost" class="form-avatar-profil" type="file" value="" name="picpost" placeholder="votre photo"
                          @change="picPreview"/></label>
    
                             
              <div class="preview-pic-size"  @change="postValid()" > 
                <img id="pic-size"  v-if="url" :src="url" @change="postValid()" alt="photo de publication"  >
                <p v-else  id="pic-size"  @change="postValid()"> c'est vide .... vous n'avez rien à partager ?  😪 </p>
              </div>
              </div>
            
              <span class="error-style-span">{{maxsize}}</span><span class="error-style-span">{{format}}</span>
              <button v-if="url" id="btn-del-create-pic" @click="delPicPreview(),postValid()" >Annuler</button>
            </div>
          <v-card-text id="card-comment" >
            <label for="messagetext"><h2 class="comment-title">Votre commentaire</h2></label>
            <textarea
              id="messagetext-post"
              v-model="message"
              name="messagetext"
              class="card-create-comment"
              type="text"
              placeholder="Ecrivez ici votre commentaire"
              maxlength="300"
              @mousemove="postValid(),textValid()"
              @mouseleave="postValid(),textValid()"
              @mouseenter="postValid(),textValid()"
              @change="postValid(),textValid()"
            />
          
            <div class="btn-bio">
              <button id="btn-comment-delete" @click.stop="deletemess(),textValid()">Annuler</button>
            </div>
           </v-card-text>
        </form>
      </v-card>
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
      name: "postcreate",
      methods: {
      postValid(){
        let testRegex = this.message.split(' ').join('')
       if(testRegex !='' || this.url !=''  ){
        this.message.trimStart('')
        this.validPost = true
        return true
       } else {
        this.validPost = false
        return false
       }
      },
      textValid(){
        let testRegex = this.message.split(' ').join('')
        if(testRegex !=''){
          this.message.trimStart('')
          this.createText = true
        }
        else{
    
        this.createText = false
        }
      },
      picValid(){
        if(this.url !== null || this.url !== ''){
          this.createPic = true
        }else{
          this.createPic=false
        }
      },
        deletemess() {
          this.message = "";
          this.createText = false
        },
        delPicPreview(){
          this.url = ''
          this.file = ''
          this.createPic = false
        },
        
        picPreview(e){
          // console.log(e);
          // console.log(this.url);
          // console.log(this.file.value);
          e.target.value[0].split(" ")
          const pic = e.target.files[0];
          
          this.file = pic
    
    
    
          this.url = URL.createObjectURL(pic);
          this.validPost = !this.validPost
        },
    
      createPost(){
        if(this.message != '' || this.url != ''){
          let formData = new FormData()
              formData.append('posterId', this.userid)
              formData.append('posterfirstname', this.firstname)
              formData.append('posterlastname', this.lastname)
              formData.append('posterfullname', this.fullname)
              formData.append('posterpicture', this.urlpic)
              formData.append('message', this.message)
              formData.append('file', this.file)
              formData.append('role',this.role)
              formData.append('posterFollower',this.userFollowerId)
              formData.append('posterFollowing',this.userFollowingId)
              axios.post(`http://localhost:5000/api/post`,formData)
              .then(() => {
                this.posted= true
                this.validPost = false
                setTimeout(() => {
                let me = this
                me.$emit('close-modale-post')
                me.message = ''
                me.url = ''
                me.posted = false
                me.file = []
                localStorage.removeItem('sort')         
                }, 1500);         
              })
              .catch((errors,test)=>{
                 test = this.delPicPreview()
               console.log(this.maxsize);
                this.maxsize = errors.response.data.errors.maxsize
                this.format = errors.response.data.errors.format
                test
               setTimeout(() => {
                 this.maxsize = ''
                this.format =''
               }, 3000);
              }) 
        }else{
                 this.vide="aie c'est vide"
              }
      },
      getcolor(){
        if(this.urlpic === '' || this.urlpic === undefined  ){
       this.avatarpicempty = this.firstname.split('')[0].toLocaleUpperCase()
 
       }
      }
      
    },
    
      data(){
        return {
         
          avatarpicempty:'',
          urlpic:'',
          log:false,
          vide:'',
          lastname: '',
          firstname: '',
          posts:[],
          userjwtid:'',
          userid:'',
          lastname: '',
          firstname: '',
          userpicpro:'',
          posterId : '',
          posterfirstname : '',
          posterlastname: '',
          userlike:'',
          picutername: '',
          modifbio: false,
          message: '',
          url: '',
          validPost:false,
          createPic: false,
          createText:false,
          photoup:'',
          file:[],
          maxsize:'',
          format:'',
          posted: false,
          role:'',
          userFollowingId: [],
          userFollowerId : [],
    
        }
        },
    
    computed:{
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

    today = dd+'/'+mm+'/'+yyyy;
     return today
          },
        hour(){ 
        const d = new Date();
        let hh =  d.getHours();
        let mi = d.getMinutes();
        if(hh<10)
        {hh='0'+hh;}
        if(mi <10)
        {mi='0'+mi;}
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
    
      async mounted(){
       axios.defaults.withCredentials = true;
       this.file = []
    
       await axios.get(`http://localhost:5000/jwtid`)
        .then((res) => {
        this.userjwtid = res.data
        this.show = false
        this.log = true
        }).catch((error)=>{
          console.log(error);
        })
    
       await axios.get(`http://localhost:5000/api/user/${this.userjwtid}`)
        .then((docs) => {
         
          this.role = docs.data.role
            this.userid = docs.data._id
            this.firstname = docs.data.firstname
            this.lastname = docs.data.lastname
            this.urlpic = docs.data.photo
            this.userFollowingId = docs.data.following
            this.userFollowerId = docs.data.followers
            console.log(this.userFollowingId);
           
        }).catch((error)=>{
          console.log(error);
        })
    
    
      this.getcolor()
    
      },
    }
    
    </script>
    
    <style lang="scss">
    .overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      top: -160px;
      bottom: 0;
      left: 0;
      right: 0;
      position: fixed;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.7);
      transition: opacity 0.4s;
      z-index: 10;
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
  
    
    #card-post-modal{
      width: 75%;
      margin-top: 100px;
      max-width: 950px;
      min-width: 350px;
      // height: 650px;
    align-items: center;
    justify-content: center;
    background-color: $tertiary;
    border: solid;
    border-color: $secondary;
    border-radius: 1%
    };
    
    #card-autor-test{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 2%;
    
    };
    
    .poster-info{
    flex-direction: row;
    width: auto;
    height: 20px;
    }
    
    .block-header{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: auto;
      height: auto;
    
    }
    
    .lab-pic-icon {
      padding-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    
    .lab-pic-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 190px;
      width: 190px;
      background-color:$tertiary;
      border-radius: 10%;
      border: solid 2px $secondary;
      padding-right: 1%;
      padding-left: 1%;
      &:hover {
      border-radius: 0%;
      background-color: $secondary;
      color:$tertiary;
        cursor: pointer;
      }
    }
    
    .preview-pic-size{
      display: flex;
      justify-content: center;
      align-items: center;
      max-height:350px ;
      max-width: 65vw;
      padding-top: 2%;
      padding-bottom: 2%;
    }
    
    #pic-size{
      display: flex;
      object-fit: cover;
      max-height:300px ;
     max-width: 65vw;
    }
    
    
    #btn-del-create-pic{
    border: solid 2px $secondary;
      border-radius: 15px;
      margin-top: 1%;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 4px;
      color: $secondary;
      &:hover {
         border-radius: 10px;
        background-color: $secondary;
        color: $tertiary;
      }
    
    }
    
    .form-avatar-profil {
      padding-top: 3%;
      display: none;
      &:hover {
        cursor: pointer;
      }
    }
    
    .picture-user-create{
      display: flex;
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;
      border: solid 2px $secondary;
      border-radius: 50%; 
    }
    #avatar-empty-post{
      font-size: 1.8rem;
      display: flex;
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;
      border: solid 2px $secondary;
      border-radius: 50%; 
      background-color: rgb(89, 165, 35);
    }
    p.fullname-create{
      margin-left: 1%;
      margin-right: auto;
      margin-bottom: 0%;
      font-weight: bold;
    }
    
  
    #back-book{
      display: flex;
      height: 40px;
      align-items:center;
      justify-content: center;
      text-decoration: none;
    color:$secondary;
       border: solid 2px $secondary;
      margin-top: 1%;
      margin-right: 1%;
      border-radius: 15px;
      padding-top: 0%;
      padding-left: 1%;
      padding-right: 1%;
      &:hover {
        background-color: $secondary;
          border-radius: 10px;
       &#back-book>#btn-back{
        color:$tertiary;
        &#btn-back>#div-btn-back>#icon-btn-delete{
          color:$tertiary;
        }
       }
      }
    } 
    #icon-btn-delete{
      padding-left: 5%;
    }
    #div-btn-back{
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    #btn-back{
      padding-left: 0;
      padding-right: 0;
    }
    
    #span-back{
      padding-left: 10%;
      padding-right: 10%;
    }
    
    .error-style-span{
     color:$primary;
     text-decoration: underline;
    
    }
   
    
    #btn-send-post{
      color:$secondary;
       border: solid 2px $secondary;
       height: 40px;
       width:85px ;
      margin-right: 1%;
      border-radius: 15px;
      padding-left: 1%;
      padding-right: 1%;
      &:hover {
        border-radius: 10px;
        background-color: $secondary;
        color: $tertiary;
        &#btn-send-post>#div-btn-send>#icon-btn-send{
            color:$tertiary;
        }
      }
    }
    #btn-send-post-posted{
      color:$secondary;
       border: solid 2px green;
       background-color: rgb(38, 145, 49);
       height: 40px;
       width:100px ;

      margin-right: 1%;
      border-radius: 15px;
      padding-left: 1%;
      padding-right: 1%;
    
    }
    
    #btn-send-post:disabled{
    
      padding-right: 1rem;
      padding-left: 1rem;
      border-radius: 15px;
      // margin-top: 20px;
      border: solid 2px $secondary;
      background: #ccc;
      &:hover {
        background: #ccc;
        color: red;
      }
    }
    
    
    #div-btn-send{
      display: flex;
     justify-content: center;
     align-items: center;
     
    }
    #icon-btn-send{
      padding-right: 7%;
    }
    
    
    .pic-create-post{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    border-top: solid 2px $secondary;
    border-bottom: solid 2px $secondary;
    border-radius: 5%;
    margin-bottom: 1%;
    padding: 1.5%;
    }
    
    #card-create-picture{
      display: flex;
      // margin-left: 1.5%;
      color: $secondary;
      padding-top: 1%;
      padding-bottom: 1%;
      justify-content: center;
  
    
      }
    
    #card-img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 200px;
    padding: 1%;
    };
    
  
    
    #messagetext-post {
      width: 100%;
      color: $secondary;
      word-break: break-word;
      white-space: pre;
      border: solid 2px $secondary;
      padding: 1%;
      &:focus {
        outline: none;
      }
    }
    
    #card-comment{
    border-top: solid 2px $secondary;
    border-bottom: solid 2px $secondary;
    border-radius: 10%;
    margin-bottom: 1%;
    }
    
    h2.comment-title{
      display: flex;
      justify-content: center;
      padding-top: 1%;
      padding-bottom: 1%;
      color: $secondary;
    }
    
    #btn-picture-delete {
      border: solid 2px $secondary;
      border-radius: 30%;
      margin-right: auto;
      margin-top: 1%;
      padding-left: 5px;
      padding-right: 5px;
      color: $secondary;
      &:hover {
         border-radius: 20%;
        background-color: $secondary;
        color: $tertiary;
      }
    }
    
    #btn-picture-send {
      border: solid 2px $secondary;
      margin-top: 1%;
      margin-right: 1%;
      border-radius: 30%;
      padding-left: 5px;
      padding-right: 5px;
      color: $secondary;
      &:hover {
         border-radius: 20%;
        background-color: $secondary;
        color: $tertiary;
      }
    }
    
    #btn-comment-send {
      border: solid 2px $secondary;
      margin-top: 1%;
      margin-right: 1%;
      border-radius: 30%;
      padding-left: 5px;
      padding-right: 5px;
      color: $secondary;
      &:hover {
         border-radius: 20%;
        background-color: $secondary;
        color: $tertiary;
      }
    }
    #btn-comment-send-icon {
      border: solid 2px $secondary;
      margin-top: 1%;
      margin-right: 1%;
      border-radius: 30%;
      padding-left: 5px;
      padding-right: 5px;
      color: $secondary;
      &:hover {
         border-radius: 20%;
        background-color: $secondary;
        color: $tertiary;
      }
    }
    
    #btn-comment-delete {
      border: solid 2px $secondary;
      margin-top: 1%;
      margin-right: 1%;
      border-radius: 30%;
      padding-left: 5px;
      padding-right: 5px;
      color: $secondary;
      &:hover {
         border-radius: 20%;
        background-color: $secondary;
        color: $tertiary;
      }
    }
    
    </style>
    