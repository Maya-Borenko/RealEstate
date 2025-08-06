<template>
  <div class="practice-blocks">
    <JudicialPractice :items="courtPractices" />
  </div>
</template>

<script>
import JudicialPractice from './JudicialPractice.vue'
import LinksBlock from './LinksBlock.vue'
export default {
  components: {
    JudicialPractice,
    LinksBlock
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

.practice-blocks {
  margin-top: 3rem;
  position: fixed;
  right: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  gap: 2rem;
}
</style>