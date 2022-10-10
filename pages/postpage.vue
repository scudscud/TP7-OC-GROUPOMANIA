
<template>
<!-- <div ></div> -->
<v-card id="card-post"  >

  
   <v-card-text class="card-profil-title"><h1 class="card-profil-title-h1">work in progress</h1></v-card-text>
 
      <v-card-text id="card-chat">
        <img class="card-img-chat-perso " src="../client\public\uploads\posts\pexels-ekaterina-bolovtsova-4049788.jpg"
                alt="photo" />
        
              <h2 class="h2-chat">Le chat arrive un peu de patience !!! </h2>
              <img class="card-img-chat " src="../client/public/uploads/posts/chat3.jpg"
                alt="photo" />
               
        </v-card-text>
     
    </v-card>
 

</template>
<script>


export default{
  name: "IndexPage",

  data(){
    return {
    
    }
    },
 methods: {
  
 },
     computed:{

 
  },

}

</script>

<style lang="scss">

#card-post{
align-items: center;
justify-content: center;
background-color: $tertiary;
border: solid;
border-color: $secondary;
};

.card-profil-title {
// border-radius: 5%;
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
#card-chat{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding-top: 0.5%;
};

.card-img-chat {
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
.card-img-chat-perso {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  object-fit: contain;
  // overflow: hidden;
  max-height: 300px;
  max-width: 200px;
  width: 100%;
  // padding: 1%;
  border: solid 2px $secondary;
  // border-bottom: solid 2px $secondary;
  border-radius: 2%;
}









</style>



