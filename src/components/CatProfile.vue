<template>
  <div class="cat">
    <div class="cat-img" v-bg="cat.url">
    </div>
    <p>{{ cat.id }}</p>
    <p v-if="cat.score !== undefined" class="score">{{ cat.score }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICat } from '@/models/Cat';
import { bg } from '@/directives/bg';

@Component({
  directives: {
    bg
  }
})
export default class CatProfile extends Vue {
  @Prop({
    required: true
  })
  cat!: ICat;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/misc/vars";

.cat {
  .cat-img {
    border: .3em solid $light-blue;
    border-radius: 100%;
    width: 20vh;
    height: 20vh;
    
    @media screen and (min-width: $breakpoint-l) {
      width: 40vh;
      height: 40vh;
    }

    background-size: cover;
    background-position: center center;
    transition: all 0.3s;

    box-shadow: 0px 4px 20px rgba(0,0,0,0.3);
  }

  p {
    padding: $base-unit 0px;
  }
}
</style>