<template>

 <v-card id="card-post" >
      <v-card-text class="card-autor">
          <em>username le 'date'</em>
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
// export default{
// async fetch() {






// }
// }






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

.card-autor{
  border-radius: 20%;
display: flex;
flex-direction: row;
width: 100%;
padding-top: 2%;
};

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