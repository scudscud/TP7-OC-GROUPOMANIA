<template>

<div id="popup" class="overlay">
<div class="popup">
  <p>test deco</p>
<v-link ><v-btn type=text href="./">test</v-btn></v-link>


</div>
</div>
</template>


<script type='text/javascript'>

</script>

<style>
 .overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
position: fixed;
visibility: visible;
opacity: 1;
background-color: rgba(0, 0 ,0, 0.7);
transition: opacity 0.4s;
z-index: 1000;
 };

</style>