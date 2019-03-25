<template>
  <div id="leadboard">
    <cat-profile :cat="cat" v-for="cat in ordredCats" :key="cat.id" />
    <router-link to="/">Home</router-link>
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
  private cats: Array<ICat> = getCats();

  public async catScore(id: string) {
    let cats = await CatModel.orderByValue().equalTo(id).once('value');
    return await cats.numChildren() || 0;
  }

  get ordredCats(): ICat[] {
    return this.cats.sort(function(a: ICat, b: ICat) {
      return a.score || 0
    });
  }

  public findCatIndex(catId: string): number {
    return this.cats.findIndex((cat) => {
      return cat.id === catId;
    })
  }
  
  created() {
    this.cats.forEach((cat) => {
      this.catScore(cat.id).then((score) => {
        cat.score = score;
      });
    });

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