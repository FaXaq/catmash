<template>
  <div class="home">
    <img id="logo" src="../assets/img/cat.svg" />
    <div
      :class="{ pan: true, special: i % 2 === 0 }"
      v-for="(cat, i) in versusCats"
      :key="cat.id"
      @click="selectWinner(cat.id)"
    >
      <cat-profile :cat="cat" />
    </div>
    <router-link class="nav-link" to="/leadboard">Leadboard</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatProfile from '@/components/CatProfile.vue';
import { getCats } from '@/services/api';
import { ICat, CatModel } from '@/models/Cat';

@Component({
  components: {
    CatProfile,
  }
})
export default class Home extends Vue {
  private cats: ICat[] = [...getCats()];

  // return cats with versus props
  get versusCats(): ICat[] {
    return this.cats.filter((c) => c.versus);
  }

  // get a random cat index
  getRandomCatIndex(): number {
    return Math.floor(Math.random() * (this.cats.length));
  }

  // select to random cat for a versus
  selectVersus() {
    if (this.cats.length < 2) {
      alert('Not enough cats to play the catmash !');
    }

    // clean previous versus
    this.cleanVersus();
    
    // select two random cats index
    let randomCat1 = this.getRandomCatIndex(),
        randomCat2 = this.getRandomCatIndex();

    // hack to prevent choosing between the same cat
    while (randomCat2 == randomCat1) {
      randomCat2 = this.getRandomCatIndex();
    }
    
    // apply versus prop to them
    Vue.set(this.cats, randomCat1, Object.assign({}, this.cats[randomCat1], { versus: true }));
    Vue.set(this.cats, randomCat2, Object.assign({}, this.cats[randomCat2], { versus: true }));
  }

  // select winner, add it to firebase and launch a new versus !
  selectWinner(id: string) {
    CatModel.push(id);
    this.selectVersus();
  }

  // clean versus prop on cats
  cleanVersus() {
    this.versusCats.forEach((c) => {
      Vue.delete(c, 'versus');
    });
  }

  // clean scores if needed (when going back from leadboard)
  // this is pretty ugly
  // TODO: find a better way
  clearScores() {
    this.cats.forEach((c) => {
      delete c.score;
    })
  }

  // before mounting clear scores & select a new versus between cats
  created() {
    this.clearScores();
    this.selectVersus();
  }
}
</script>
