<template>
  <v-app dark>
    <div>
      <sign-in id="modal-signin" v-show="show" @close-modale="show = false" />
      <post id="modal-post" v-show="showpost" @close-modale-post="showpost = false"/>
    </div>

    <v-navigation-drawer
    class="drawer-left"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list class="temp">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content> 
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn id="temp-menu" alt="menu"
      @click.stop="drawer = !drawer"
        ><v-icon>mdi-menu</v-icon> </v-btn>

             <router-link id="btn-post-router" to="/"> 
      <v-btn  id="btn-post-nav" alt="menu">
        <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
        </v-btn>  
        </router-link>
    
        <router-link  class="btn-post-router-plus"  to="/postpage"> 
      <v-btn id="btn-post-nav"  alt="menu"  >
        <v-icon>mdi-newspaper-plus </v-icon>
        </v-btn>  
        </router-link>

  <v-btn @click="showpost = !showpost" id="btn-post-nav" alt="menu">
        <v-icon>mdi-newspaper-plus </v-icon>
        </v-btn> 

<!-- 
         <router-link     to="/postpage"> 
       <button :class="hoverbtn ? 'btn-hover' : 'btn-post-router-plus' "  @click=" toggleClass" alt="menu" >
        <v-icon id="icon">mdi-newspaper-plus </v-icon>
        </button>  
         </router-link>  -->


      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant"> 
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn> -->

      <v-spacer />
      <img class="logo-white" src="../logo/logo.png" /><v-toolbar-title
        v-text="title"
        id="temp-title"
      />
      <v-spacer />

      <v-btn @click.stop="rightDrawer = !rightDrawer" id="temp-user">

        <img class="avatar" src="../logo/avatar1.png" />

        <!-- <span class="username" alt="menu-user">Mon compte</span>
         -->
        
        
        </v-btn>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer class="drawer-right" v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item
          v-for="(item, v) in itemsuser"
          :key="v"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; Groupomania socialNetwork res dev by scud </span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
// import disconnect from '../components/disconnect.vue';
import SignIn from "../components/sign-in.vue";
import Post from "../components/postcomponent.vue";

export default {
  components: { SignIn, Post},
  name: "DefaultLayout",

  methods:{

  },

  computed :{

  },
 

  data() {
    return {
      right: true,
      drawer: false,
      miniVariant:false,
      rightDrawer: false,
      clipped: false,
      fixed: false,
      show: true,
      showpost: false,
      showbtn:true,
      hoverbtn:false,
      itemsuser: [
         {
          icon: "mdi-account",
          title: "Mon profil",
          to: "/profiluser",
         
        },
        {
          icon: "mdi-chart-bubble",
          title: "Mes publications",
          to: "/profiluser",
        },
        // {
        //   icon: "mdi-thumb-up-outline ",
        //   title: "Mes likes",
        //   to: "/profiluser",
        // },
        {
          icon: " mdi-account-group  ",
          title: "Mes amis",
          to: "/profiluser",
        },
        {
          icon: " mdi-logout ",
          title: "Deconnexion",
          to: "/disconnect",
        },
      ],
      items: [
        {
          icon: " mdi-newspaper-variant-multiple-outline",
          title: "le Groupo-book",
          to: "/",
        },
          {
          icon: "mdi-newspaper-plus ",
          title: "creer votre post",
          to: "/postpage",
        },
        {
          icon: " mdi-chat",
          title: "le Groupo-chat",
        },  
      ],
    
      // icon: "../logo/logo.png",
      title: "Groupomania le réseau",
    };
  },
  mounted(){

    // axios.get(`http://localhost:5000/user/}`)
    // .then((data) => {

    //   console.log(data);

    // })
  
  },

}





</script>
<style lang="scss">

html {
  font-family: "Lato";
}

// .v-overlay__scrim{
//  margin-top: 55px;
// }


// .drawer-left{
//   margin-top: 55px;
// }
// .drawer-right{
// margin-top: 55px;
// }
.v-toolbar__content {
  background-color: $primary;
}


.avatar {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: solid 2px $secondary;
  border-radius: 50%;
  background-color: $tertiary;
  padding-left: 1%;
}

.username {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  padding-left: 2%;
}

#temp-user {
  display: flex;
  background-color: $tertiary;
  height: 50px;
  width: auto;
  border: solid $secondary;
  color: $secondary;
  border-radius: 30%;
  &:hover{
  background-color: $secondary;
  border: solid $tertiary;
  color: black;
  border-radius: 20%;
}
}

#temp-menu {
  background-color: $tertiary;
  height: 35px;
  width: auto;
  border: solid $secondary;
  color: $secondary;
  border-radius: 30%;
  &:hover{
  background-color: $secondary;
  border: solid $tertiary;
  color: black;
  border-radius: 20%;
  }
}

#btn-post-nav{
background-color: $tertiary;
  height: 35px;
  width: auto;
  border: solid $secondary;
  color: $secondary;
  border-radius: 30%;
  &:hover{
  background-color: $secondary;
  border: solid $tertiary;
  color:$tertiary;
  border-radius: 20%;
  }
}

#btn-post-router{
text-decoration: none;
color:$secondary;
font-weight: bold;
margin-left: 0.5%;
margin-right: 0.5%;
}

#btn-post-router-plus{
  text-decoration: none;
color:$secondary;
font-weight: bold;
margin-right: 0.5%;
}


#temp-title {
  font-family: Lato, sans-serif;
  font-size: 35px;
  letter-spacing: 2px;
  animation: textAnimated 30s linear infinite reverse;
  @keyframes textAnimated {
    0% {
      background: linear-gradient(
        70deg,
        darken($primary, 10%),
        $tertiary,
        $secondary
      );
      background-position: -16em 0;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    50% {
      background: linear-gradient(
        85deg,
        darken($primary, 10%),
        $tertiary,
        $secondary
      );
      background-position: 0 0;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    100% {
      background: linear-gradient(
        70deg,
        darken($primary, 10%),
        $tertiary,
        $secondary
      );
      background-position: -15em;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}

.logo-white {
  display: flex;
  margin-right: 10px;
  height: 30px;
  width: 30px;
}

.btn-disco {
  display: flex;
  justify-content: left;
  width: 100%;
  height: 48px;
}

.logo-disco {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1%;
  padding-top: 2%;
}

// .logo-disco::before{
//   display: flex;
//   align-items: center;
//  justify-content: center;
//   padding-left: 20%;
// }

.text-disco {
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-left: 30px;
}

.v-navigation-drawer__content {
  background-color: $tertiary;
}

.v-list-item__title {
  color: $secondary;
}

.v-list-item__action {
  color: $secondary;
}
</style>
