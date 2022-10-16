<template>
  <div class="overlay">
    <div class="instruction-term" >
      <h2 class="title-term">Bienvenue sur le reseau social de groupomania</h2>

      <p>
        Malgré le fait que ce réseau soit un endroit de détente, n'oubliez pas
        qu'il reste dans le cadre de l'entreprise Groupomania. De ce fait le
        règlement de Groupomania s'applique ici aussi.
      </p>

      <h2 class="title-term">
        Rappelons quelques règles a respecté pour le bien-être de tous :
      </h2>
      <ol>
        <li>
          Tous propos raciste, discriminant, homophobe, dénigrant ou
          diffamatoire sont interdits.
        </li>
        <li>
          Le colportage de rumeur ,potin ,bruit de couloir ,gossip , insulte ou
          tous autre forme de harcèlement sont interdits.
        </li>
        <li>
          Les photos intimes, génantes , dégradantes, ou pornographiques sont
          interdite.
        </li>
      </ol>
      <p class="bold">
        Toute infraction au règlement sera modéré et sanctionné d'un
        bannissement temporaire ou définitif du réseau ET de sanction pouvant
        aller au licenciement de Groupomania selon la gravité.
      </p>

      <p>
        N'oubliez pas nous sommes ici pour apprendre à se connaitre, s'amuser et
        non pour se défouler. Nous le repetons n'oubliez pas que vous vous
        adressez à vos collègues de travail.
      </p>
      <p>Team work make dream work,</p>
      <p>La modération du réseau et La direction Groupomania.</p>

      <button class="btn-term" @click="$emit('close-modal-use')">
        Retour à l'inscription
      </button>
    </div>
  </div>
</template>

<style lang="scss">
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
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.4s;
  z-index: 10;
}

.title-term {
  font-size: 1.3em;
}

.instruction-term {
  margin-top: 100px;
  width: 60%;
  height: 65%;
  border: solid 2px;
  border-radius: 5%;
  padding: 2%;
  background: $secondary;
  color: $tertiary;
}

.btn-term {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $secondary;
  background-color: $tertiary;
  width: 250px;
  height: 30px;
  border-radius: 20%;
  margin-top: 3%;
}

.btn-term:hover {
  border: solid 2px $tertiary;
  background-color: $secondary;
  color: $tertiary;
  cursor: pointer;
}

.bold {
  margin-top: 1%;
  font-style: italic;
  font-size: large;
  font-weight: bold;
}
</style>
