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
        <v-card-action  class="card-att">
      <v-button  class="btn-att"><v-icon class="img-att"  >mdi-thumb-up-outline</v-icon><p class="text-att">Like</p></v-button>
      <v-button class="btn-att" ><v-icon  class="img-att"> mdi-message-outline</v-icon><p class="text-att">Commenter</p></v-button>
      <v-button   class="btn-att"><v-icon class="img-att" > mdi-account-group </v-icon><p class="text-att">Devenir&nbspamis</p></v-button>
      </v-card-action>
        </v-card-text>
    </v-card>

</template>
<script>
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
border: solid;
border-color: $secondary;
overflow: ellipsis; 
}

.card-autor{
display: flex;
flex-direction: row;
width: 100%;
padding-top: 2%;
}

.card-img{
display: flex;
justify-content: center;
align-items: center;
width: 100%;
max-height: 200px;
padding: 1%;

}

.blockquote{
margin-top: 10px;
margin-right: 20px;
overflow: "...";
}
.card-att{
display: flex;
// flex-direction: row;
flex-wrap: nowrap;
width: 100%;
margin-top: 2%;
padding-right: 3%;
justify-content: space-between;
}
v-button.btn-att{
display: flex;
flex-direction: row;
flex-wrap: nowrap;
width: auto;
justify-content: center;
align-items: center;
padding-top: 2%;
cursor: pointer;
}

.img-att{
display: flex;
align-items: center;
justify-content: center;
width:auto;

padding-right: 10%; 
}
p.text-att{
width: auto;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
margin-bottom: 0px;
// padding-right: 20%;



}
</style>