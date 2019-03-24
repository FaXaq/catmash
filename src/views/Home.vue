<template>
  <div class="home">
    <cat-profile :cat="cat" v-for="cat in versusCats" :key="cat.id" />
    <button @click="selectVersus">New Versus</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CatProfile from '@/components/CatProfile.vue';
import { getCats } from '@/services/api';
import { ICat } from '@/models/Cat';

@Component({
  components: {
    CatProfile,
  }
})
export default class Home extends Vue {
  private cats: ICat[] = getCats();

  get versusCats(): ICat[] {
    return this.cats.filter((c) => c.versus);
  }

  getRandomCatIndex(): number {
    return Math.floor(Math.random() * (this.cats.length));
  }

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

  selectWinner(id: string) {
    // TODO Commit winner
    this.selectVersus();
  }

  // clean versus state
  cleanVersus() {
    this.versusCats.forEach((c) => {
      Vue.delete(c, 'versus');
    });
  }

  created() {
    this.selectVersus();
  }
}
</script>
