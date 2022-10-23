<template>
   <div class="overlay-signin">
    test
    <v-col class="overlaybis-signin" justify="center" align="center"> test</v-col>
  
   </div>
   

</template>

<script>
export default {
name : "Loadertest",


}

</script>

<style>
.overlay-sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  visibility: visible;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.4s;
  z-index: 300;
}

.overlaybis {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding-left: 10%;
  padding-right: 10%;
}

.nuxt-logo {
  height: 180px;
}
</style>
