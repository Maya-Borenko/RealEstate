<template>
  <div class="sticky-block">
    <div class="practice-blocks">
      <div class="content-wrapper">
        <JudicialPractice :items="caseLaw" @item-selected="handleItemSelect" />
        <DocumentTemplates :templates="templates" />
        <div class="bottom-padding"></div>
      </div>
    </div>
  </div>
</template>

<script>
import JudicialPractice from './JudicialPractice.vue'
import DocumentTemplates from './DocumentTemplates.vue'

export default {
  props:{
    caseLaw:{
      type: Array,
      require: true
    },
    templates:{
      type: Array,
      require: true
    }
  },
  components: {
    JudicialPractice,
    DocumentTemplates
  },
  data() {
    return {
      url: ''
    }
  },
  methods:{
    handleItemSelect(selectedItem) {
      this.$emit('open-page', selectedItem)
    }
  }
}
</script>

<style scoped>

.sticky-block {
  height: 97%;
  width: 40%;
  margin-bottom: 100px;
}

.practice-blocks {
  position: sticky;
  top: 130px;
  margin-left: 15%;
  z-index: 8;
  width: 30rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 90vh;
  scrollbar-width: none;
}

.practice-blocks::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100%;
  padding-bottom: 50px;
}

.bottom-padding {
  height: 50px;
  width: 100%;
}


</style>