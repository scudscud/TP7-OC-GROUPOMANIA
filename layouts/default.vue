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
    <span id="temp_menu">MENU</span>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
      
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" id="temp-title"/>
      <v-spacer />
       <span>username</span>
      
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
          :to="itemsuser.to"
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
      <span>&copy; Groupomania dev scud</span>
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
      } , 
      {
      icon: 'mdi-chart-bubble',
     title: 'mes likes',
      } ,  
      {
      icon: 'mdi-chart-bubble',
     title: 'mon profil',
      } , 
      {
      icon: 'mdi-chart-bubble',
     title: 'se deconnecter',
      } , 
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Groupom-Accueil',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'le Groupoma-Chat',
          to: '/inspire'
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







</style>
