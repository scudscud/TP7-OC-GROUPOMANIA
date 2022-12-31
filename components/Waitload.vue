<template>
   <div class="overlay-load">
    <img id="logo" src="../logo/logo.png" />
    <div id="groupo">Groupomania</div>
    <!-- <v-col class="overlaybis-load" justify="center" align="center"> test</v-col> -->
    <!-- <div id="nuxt-loading" aria-live="polite" role="status"><div>Loading...</div></div> -->
   </div>
   
   
</template>

<script>
export default {
name : "load",
// Window.addEventListener('error', function () {
//   var e = document.getElementById('nuxt-loading');
//   if (e) {
//     e.className += ' error';
//   }
// })
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

#logo {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  width: 50px;
  animation: logoanimat 2s ease-in-out infinite ;
  @keyframes logoanimat {
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }

    
  }
}



#groupo {
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

</style>



