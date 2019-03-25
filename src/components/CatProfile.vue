<template>
  <div class="cat">
    <img :src="cat.url" :alt="cat.id">
    <p>{{ cat.id }}</p>
    <p v-if="cat.score !== undefined" class="score">{{ cat.score }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICat } from '@/models/Cat';

@Component({})
export default class CatProfile extends Vue {
  @Prop({
    required: true
  })
  cat!: ICat;
}
</script>

<style lang="scss" scoped>

</style>