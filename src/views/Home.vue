<template>
  <div class="home">
    <ul>
      <li v-for="cat in cats" :key="cat.id">{{ cat }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getCats } from '@/services/api';
import { ICat } from '@/models/Cat';

@Component({})
export default class Home extends Vue {
  private cats: Array<ICat> = getCats();
}
</script>
