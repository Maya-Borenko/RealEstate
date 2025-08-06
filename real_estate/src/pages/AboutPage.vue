<template>
  <main class="about-page">
    <AboutSection />
    <RecommendationSection 
    @page-load="loadPage"/>
  </main>
</template>

<script>
import AboutSection from '@/components/AboutSection.vue';
import RecommendationSection from '@/components/RecommendationSection.vue';
import { getUrlByTopic } from '@/services/getUrl'

export default {
  props:{
    topic:{
      type: String,
      required: false
    }
  },
  data (){
    return{
      url: ''
    }
  },
  methods:{
    loadPage (itemTopic, itemType, itemId){
      this.url = getUrlByTopic(itemTopic, itemType)
      if (itemType === 'case_law'){
        this.$router.push({
        path: this.url,
        query: { topic:itemTopic, id: itemId}
      })
      return
      }
      this.$router.push({
        path: this.url,
        query: { topic:itemTopic}
      })
    }
  }
}
</script>

<style>
.about-page{
    background-color: #fffefd;
    height: 88%;
}
</style>