<template >

    
      <v-card id="card-post" cols="4"  md=""> 
      <img class="card-img"
        src="/v.png"
        alt="Vuetify.js">
      <v-card-text class="blockquote" >
        &#8220;Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quis impedit magni alias quo quae, numquam eaqrepellendus minus similique soluta nulla pariatur cumque neque enim explicabo officia impedit? Dignissimos ipsa asperiores cum.&#8221;
    
        <v-card-text    class="card-autor">
          <em>username le 'date'</em>
        </v-card-text>
        
        <v-card-action class="card-att">
      <v-button class="icon-att"><v-icon class="img-att"  >mdi-thumb-up-outline</v-icon>Like</v-button>
      <v-button class="icon-att" ><v-icon  class="img-att"> mdi-message-outline</v-icon>Répondre </v-button>
      <v-button class="icon-att" @focus=""><v-icon class="img-att" > mdi-account-group </v-icon>Devenir ami </v-button>
      </v-card-action>

        </v-card-text>
    
      
      
    </v-card>

</template>

<script>
export default {
  name: 'InspirePage'
}
</script>
<style lang="scss">
#card-post{
display: flex;
width: auto;
max-height:auto;
margin-top: 1%;
margin-left: 3%;
overflow:hidden;
background-color: $tertiary;
border: solid;
border-color: $secondary;
overflow: ellipsis; 
}

.card-autor{
padding-top: 2%;
}

.card-img{
max-height: 200px;
height: auto;
padding: 1%;
width: 80%;
}

.blockquote{
margin-top: 10px;
margin-right: 20px;
overflow: "...";
}


.card-att{
display: flex;
width: 100%;
margin-top: 2%;
justify-content: space-between;
}

.icon-att{
width: 30%;
height: auto;
cursor: pointer;
}

.img-att{
padding-right: 5%; 
}

</style>