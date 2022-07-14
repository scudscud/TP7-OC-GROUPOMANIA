<template>
<div class="form-popup" id="popup-Form">
 
    <h2>Voulez-vous vraiment vous deconnecter</h2>
    <label for="email">
      <strong>E-mail</strong>
    </label>
    <input type="text" placeholder="Votre Email" name="email" required />
    <label for="psw">
      <strong>Mot de passe</strong>
    </label>
    <input type="password" placeholder="Votre mot de passe" name="psw" required />
    <button type="submit" class="btn">Se connecter</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Annuler</button>

</div>


</template>
<script>



</script>