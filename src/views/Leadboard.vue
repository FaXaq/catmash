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
    CatProfile,
  },
})
export default class Leadboard extends Vue {
  private cats: ICat[] = [...getCats()];

  // order cats on sport
  get ordredCats(): ICat[] {
    return this.cats.sort((a: ICat, b: ICat) => {
      if ((a.score || 0) < (b.score || 0)) {
        return 1;
      }
      return -1;
    });
  }

  // get cat index within cats table
  public findCatIndex(catId: string): number {
    return this.cats.findIndex((cat) => {
      return cat.id === catId;
    });
  }

  public created() {
    // initialize all scores at 0
    this.cats.forEach((c) => {
      c.score = 0;
    });

    // retrieve scores from firebase
    CatModel.on('child_added', (v) => {
      const catId = (v as any).val();
      const catIndex = this.findCatIndex(catId);
      const catScore = this.cats[catIndex].score || 0;
      // get score for this added entry in firebase
      Vue.set(this.cats,
        catIndex,
        Object.assign({}, this.cats[catIndex], { score: catScore + 1 }));
    });
  }
}
</script>

<style lang="scss" scoped>

</style>