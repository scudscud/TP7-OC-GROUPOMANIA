<template>
  <v-app dark >
    <v-navigation-drawer
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
        
            <v-icon > {{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>

            <v-list-item-title v-text="item.title" />
          
          </v-list-item-content>
        </v-list-item>
      
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    <v-btn id="temp-menu"  @click.stop="drawer = !drawer">MENU</v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
         <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    
      </v-btn>
        <v-spacer />
      <img class="logo-white" src="../logo/logo.png"/><v-toolbar-title v-text="title" id="temp-title" />
      <v-spacer />
    <!-- <v-btn  id="temp-user"><nuxt-link @click="toggleMenu" to="/"> connexion</nuxt-link></v-btn> -->
     <v-btn  @click="rightDrawer = !rightDrawer" id="temp-user">username</v-btn>
      <v-btn
        icon
        @click="rightDrawer = !rightDrawer"
      >
      
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
       
        <Nuxt />
  
      </v-container>
            
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    
      <v-list>
       <v-btn  id="temp-user"><nuxt-link @click="toggleMenu" to="/"> connexion</nuxt-link></v-btn>
        <v-list-item 
          v-for="(item, v) in itemsuser"
          :key="v"
          :to="item.to"
          router
          exact>
        <v-list-item-action>
        
            <v-icon > {{ item.icon }}</v-icon>
          </v-list-item-action>
            
          <v-list-item-content>
          
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy;   Groupomania le reseau dev by scud </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsuser:[
      
        {
      icon: 'mdi-chart-bubble',
     title: 'mes publications',
     to: '/'
      } , 
      {
      icon: 'mdi-thumb-up-outline ',
     title: 'mes likes',
     to: '/'
      } ,  
      {
      icon: 'mdi-account',
     title: 'mon profil',
     to: '/'
      } , 
      
            {
      icon: ' mdi-account-group  ',
      title: 'Amis',
      to: '/'
      } , 
           {
      icon: ' mdi-logout ',
      title: 'Deconnexion',
      to: '/'
      } , 
      ],
      items: [
        
        
        {
          icon: ' mdi-newspaper-variant-multiple-outline',
          title: 'le Groupo-book',
          to: '/chat'
        },
        {
          icon: ' mdi-chat',
          title: 'le Groupo-chat',
          to: '/chat'
        },
        {
          icon: 'mdi-newspaper-plus ',
          title: 'creer votre post',
          to: '/post'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Groupomania the social network',
    
    }
  }
}
</script>

<style lang="scss">



.v-toolbar__content { 
  background-color: $primary ;

}
#temp-user{
background-color:$tertiary ;
height:35px;
width: auto;
border: solid $secondary;
color: $secondary;
border-radius: 30%;
};

#temp-user:hover{
background-color:$secondary ;
border: solid $tertiary;
color: black;
border-radius: 20%;
}



#temp-menu{
background-color:$tertiary ;
height:35px;
width: auto;
border: solid $secondary;
color: $secondary;
border-radius: 30%;
};

#temp-menu:hover{
background-color:$secondary ;
border: solid $tertiary;
color: black;
border-radius: 20%;
}







#temp-title{
font-family: Lato, sans-serif;
font-size: 35px;
letter-spacing: 2px;
animation:textAnimated 30s linear infinite reverse;
@keyframes textAnimated {
0% {background:linear-gradient(70deg, darken($primary,10%),$tertiary, $secondary); background-position:-15em 0; background-clip:text; -webkit-background-clip:text; color:transparent;}
50% {background:linear-gradient(85deg, darken($primary,10%),$tertiary, $secondary); background-position:0 0; background-clip:text; -webkit-background-clip:text; color:transparent;}
100% {background:linear-gradient(70deg, darken($primary,10%),$tertiary, $secondary); background-position:-15em; background-clip:text; -webkit-background-clip:text; color:transparent;}
};
};

.logo-white{
margin-right: 1%;
height: 30px;
width: 30px;
}
.btn-disco{
  display: flex;
  justify-content: left;
  width: 100%;
  height: 48px;
  
}
.logo-disco{
  display: flex;
  align-items: center;
 justify-content: center;
  padding-left:1%;
  padding-top: 2%;
}
// .logo-disco::before{
//   display: flex;
//   align-items: center;
//  justify-content: center;
//   padding-left: 20%;
// }
.text-disco{
  display: flex;
align-items: center;
margin-top: 16px;
margin-left: 30px;
}
.v-navigation-drawer__content{
  background-color: $tertiary;

//   color: black;
}
.v-list-item__title{
  color: $secondary;
}
.v-list-item__action{
color:$secondary;


}

</style>
