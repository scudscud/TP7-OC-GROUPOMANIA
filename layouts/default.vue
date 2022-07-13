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
        
            <v-icon> {{ item.icon }}</v-icon>
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
    <v-btn id="temp_menu"  @click.stop="drawer = !drawer">MENU</v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
      
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
        <v-spacer />
      <v-toolbar-title v-text="title" id="temp-title" />
      <v-spacer />
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
        <v-list-item 
          v-for="(item, v) in itemsuser"
          :key="v"
          :to="item.to"
          router
          exact>
        <v-list-item-action>
        
            <v-icon> {{ item.icon }}</v-icon>
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
      <span>&copy; Groupomania le reseau dev by scud</span>
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
      title: 'se deconnecter',
      to: '/'
      } , 
        {
      icon: 'mdi-chart-bubble',
     title: 'mes publications',
     to: '/'
      } , 
      {
      icon: 'mdi-chart-bubble',
     title: 'mes likes',
     to: '/'
      } ,  
      {
      icon: 'mdi-chart-bubble',
     title: 'mon profil',
     to: '/'
      } , 
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'le Groupo-Chat',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'le Grou-Post',
          to: '/post'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Groupomania',
    
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
}

#temp_menu{
background-color:$tertiary ;
height:35px;
width: auto;
border: solid $secondary;
}
#temp-title{

  font-family: Lato, sans-serif;
  font-size: 35px;
  letter-spacing: 2px;
animation:textAnimated 30s linear infinite reverse;
@keyframes textAnimated {
	0% {background:linear-gradient(70deg, darken($primary,20%),$tertiary, $secondary); background-position:-12em 0; background-clip:text; -webkit-background-clip:text; color:transparent;}
	50% {background:linear-gradient(85deg, darken($primary,20%),$tertiary, $secondary); background-position:0 0; background-clip:text; -webkit-background-clip:text; color:transparent;}
	100% {background:linear-gradient(70deg, darken($primary,20%),$tertiary, $secondary); background-position:-12em; background-clip:text; -webkit-background-clip:text; color:transparent;}
};

};



</style>
