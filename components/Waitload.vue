<template>
   <div class="overlay-load">
    test
    <!-- <v-col class="overlaybis-load" justify="center" align="center"> test</v-col> -->
  
   </div>
   

</template>

<script>
export default {
name : "load",


}

</script>

<style lang ="scss">
.overlay-load {
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  width: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  visibility: visible;
  opacity: 1.5;
  background: linear-gradient(to left ,$primary,$secondary);
  transition: opacity 0.5s;
  z-index: 10;
}


.overlaybis-load {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding-left: 10%;
  padding-right: 10%;
}

// .nuxt-logo {
//   height: 180px;
// }
</style>
