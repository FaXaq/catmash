<template>
  <div class="leadboard">
    <img id="logo" src="../assets/img/cat.svg" />
    <transition-group name="flip-list" tag="ul">
      <li v-for="(cat, c) in ordredCats" :key="cat.id" :class="{ special: c % 2 === 1 }">
        <cat-profile :cat="cat" />
      </li>
    </transition-group>
    <router-link to="/" class="nav-link">Home</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICat, CatModel } from '@/models/Cat';
import CatProfile from '@/components/CatProfile.vue';
import { getCats } from '@/services/api';

@Component({
  components: {
    CatProfile
  }
})
export default class Leadboard extends Vue {
  private cats: Array<ICat> = [...getCats()];

  // order cats on sport
  get ordredCats(): ICat[] {
    return this.cats.sort(function(a: ICat, b: ICat) {
      if ((a.score || 0) < (b.score || 0)) return 1;
      return -1;
    });
  }

  // retrieve cat score from cat it
  public async catScore(id: string) {
    let cats = await CatModel.orderByValue().equalTo(id).once('value');
    return cats.numChildren();
  }

  // set default score to 0 for all cats
  public populateCatsScore() {
    this.cats.forEach((c) => {
      c.score = 0;
    })
  }

  // get cat index within cats table
  public findCatIndex(catId: string): number {
    return this.cats.findIndex((cat) => {
      return cat.id === catId;
    })
  }
  
  created() {
    this.populateCatsScore();

    // retrieve scores from firebase
    CatModel.on('child_added', (v) => {
      let catId = (v as any).val();
      let catIndex = this.findCatIndex(catId);
      this.catScore(catId).then((score) => {
        Vue.set(this.cats, catIndex, Object.assign({}, this.cats[catIndex], { score: score }))
      })
    });
  }
}
</script>

<style lang="scss" scoped>

</style>