<template>



 <v-card id="card-post" >
  <div>
      <Deletepost id="modal-delete" v-show="showdelete" @close-modale-delete="showdelete = false"/>
  
  <modify id="modal-modify" v-show="showmodify" @close-modale-modify="showmodify = false"/>

</div>
       <v-card-text id="card-autor-book">
              <div class="user-book-main">
                <div class="name-date-book"><img class="picture-user" src="../logo/avatar1.png" />
                <span class="fullname-book">{{fullname}}</span></div><p class="full-date"><span class="post-date"> posté le :</span><span class="date-now">{{date}}</span>
                <!-- <span class="hour-à"></span> -->
                <span class="hour-now"> à {{hour}}</span></p>
                </div>
                <div class="btn-book-main">
                 <button id="btn-post-modify" type="submit" @click="showmodify = !showmodify">Modifier</button>
          <button id="btn-post-delete" @click="showmdelete = !showdelete" >Supprimer</button></div>
        </v-card-text>
      <img class="card-img mb-5"
        src="/v.png"
        alt="Vuetify.js">
   
      <v-card-text class="blockquote" >
        &#8220;Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quis impedit magni alias quo quae, numquam eaqrepellendus minus similique soluta nulla pariatur cumque neque enim explicabo officia impedit? Dignissimos ipsa asperiores cum.&#8221;
      </v-card-text>
        <v-card-actions class="btn-card" id="card-att" >
      <v-btn  id="btn-att"  ><v-icon class="img-att"  >mdi-thumb-up-outline</v-icon><p class="text-att">Like</p></v-btn>
      <v-btn id="btn-att" ><v-icon  class="img-att"> mdi-message-outline</v-icon><p class="text-att">Commenter</p></v-btn>
      <v-btn  id="btn-att"><v-icon class="img-att" > mdi-account-group </v-icon><p class="text-att">Devenir&nbspamis</p></v-btn>
      </v-card-actions>
   
    </v-card>

</template>
<script>
import Modify from "../components/modifypost.vue";
// import DeleteCom from "../components/deletepost.vue";
import Deletepost from "../components/deletepost.vue";
export default{
    components: { Modify, Deletepost },
  data(){
    return {
  
      showmodify:false,
      showdelete:true,
       lastname: "test",
      firstname: "test",
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
// today = mm+'-'+dd+'-'+yyyy;
// today = mm+'/'+dd+'/'+yyyy;
// today = dd+'-'+mm+'-'+yyyy;
today = dd+'/'+mm+'/'+yyyy;
 return today
      },
    hour(){ 
    const d = new Date();
    let hours = d.getHours()+"h" + d.getMinutes();
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
}





</script>

<style lang="scss">

#card-post{
// display: flex;
// flex-direction: row;
// width: auto;
// max-height:auto;
// margin-top: 1%;
// margin-left: 3%;

align-items: center;
justify-content: center;
overflow:hidden;
background-color: $tertiary;
border-radius: 5%;
border: 5px solid;
border-color: $secondary;
overflow: ellipsis; 
};

#card-autor-book{
border-radius: 20%;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding-top: 2%;
};

.btn-book-main{
display: flex;
flex-direction: column;
justify-content: space-between;
height: 80px;
width: 100px;
padding-top: 2%;

}

#btn-post-modify{
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
  }
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
  padding-left: 5px;
  padding-right: 5px;
  // padding-bottom: 5px;
  color: $secondary;
  &:hover {
     border-radius: 20%;
    background-color: $secondary;
    color: $tertiary;
  }
}
.card-img{
display: flex;
justify-content: center;
align-items: center;
width: 100%;
max-height: 200px;
padding: 1%;
border-top: solid 2px $secondary;
border-bottom: solid 2px $secondary;
border-radius: 2%;
}
.name-date-book{
  display: flex;
  flex-direction: row;
  padding-bottom: 2%;
}

.fullname-book{
  padding-top: 10%;
  padding-left: 3%;
}

p.full-date{
  display: flex;
  margin-bottom: 0;
}

div.v-card__text.blockquote{
// margin-top: 10px;
// margin-right: 20px;
// overflow: "...";
text-align: center;
padding-right: 2%;
};

#card-att{
justify-content: center;
background-color: $tertiary;
width: 100%;
height: 20%;
padding-bottom: 2%;
padding-left: 3%;
};

#btn-att{
margin-top: 2%;
margin-right: 3%;
background-color: $secondary;
color:$tertiary ;
width: auto;
cursor: pointer;
padding: 2%;
};

#btn-att:hover{
background-color: $tertiary;
color:$secondary;
translate: 3px;
border: solid 1px $secondary ;
}

.img-att{
display: flex;
align-items: center;
justify-content: center;
width:auto;
padding-right: 10%; 
};

p.text-att{
width: auto;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
margin-bottom: 0px;
// padding-right: 20%;
};

</style>