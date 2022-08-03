<template>
  <div class="overlay">
    <v-col-term class="instruction-term" justify="center" align="center">
      
       <p><h1-term>Bienvenue sur le reseau social de groupomania</h1-term></p> 

        <p>
          Malgré le fait que ce réseau soit un endroit de détente, n'oublier
          pas qu'il reste dans le cadre de l'entreprise Groupomania. De ce fait
          le règlement de Groupomania s'applique ici aussi.
        </p>
        <p>
              Rappelons quelques règles a respecté pour le bien-être de tous :
            <ol>
          <li> Tous propos raciste, discriminant, homophobe, dénigrant ou diffamatoire sont interdits.</li>
          <li>Le colportage de rumeur ,potin ,bruit de couloir ,gossip , insulte ou tous autre forme de harcèlement sont interdits.</li> 
          <li>Les photos intimes, génantes , dégradantes, ou pornographiques sont interdite.</li> 
            </ol>
            <p>
         Toute infraction au règlement sera modéré et sanctionné d'un bannissement temporaire ou définitif du réseau ET de sanction pouvant aller au
          licenciement de Groupomania selon la gravité.
        </p>
        </p>
        <p>
        N'oubliez pas nous sommes ici pour apprendre à se connaitre, s'amuser et non pour se défouler.
        Nous le repetons n'oubliez pas que vous vous adressez à vos collègues de travail. 

         <p>Team work make dream work,</p>
        <p>La modération du réseau et La direction Groupomania.</p>
        </p>
        <button-e @click="$emit('close-modal-use')"> Retour à l'inscription </button-e>
 
    </v-col-term>
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
};

h1-term{
font-size: 1.3em;


}
v-col-term.instruction-term{
    width: 60%;
    height: 60%;
    border: solid 2px;
    border-radius: 10%;
    padding: 2%;
    background: $secondary;
    color: $tertiary;
  
};


button-e {
  display: flex;
  justify-content: center;
  align-items: center;
  color:$secondary;
  background-color: $tertiary;
  width: 250px;
  height: 30px;
  border-radius: 20%;
  margin-top: 3%;
};

button-e:hover {
 border: solid 2px $tertiary;
  background-color: $secondary;
  color: $tertiary;
  cursor: pointer;
};




</style>
