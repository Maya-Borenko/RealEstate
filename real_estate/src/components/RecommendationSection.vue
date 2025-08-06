<template>
  <section class="recommendation">
    <div class="recommendation-container">
    
      <div class="cards-grid">
      <RecommendationCard 
        v-for="document in documents"
        :title="document.title"
        :topic="document.topic"
        :type="document.documentType"
        :id="document.documentId"
        @item-selected="loadPage"
      />
      </div>
      </div>
    
  </section>
</template>

<script>
import RecommendationCard from './RecommendationCard.vue'
import { DocumentService } from '@/services/documentService'



export default {
  components: {
    RecommendationCard
  },
  data(){
    return{
      documents: [],
      loading: false
    }
  },
  async created() {
    await this.loadDocument()
  },
  methods: {
    async loadDocument() {
      this.loading = true
      this.documents = await DocumentService.fetchMultipleDocuments()
      this.documents = this.documents.filter(item => item.documentType !== 'template')
      this.loading = false
    },
    loadPage(itemTopic, itemType, itemId){
      this.$emit('page-load', itemTopic, itemType, itemId)
    }
  }
}
</script>

<style scoped>
.recommendation {
  border-top: 2px solid #FC9755;
  border-bottom: 2px solid #FC9755;
  /* margin: 0 25%;
  padding: 20px 0; */
  margin: 0 15%;
  padding: 20px 0;
}

.recommendation-container {
  position: relative;
  display: flex;
  justify-content: center;
  height: 330px; 
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px 0;
  gap: 20px;

  scrollbar-width: thin;
  scrollbar-color: #FC9755 #f8f8f8;
}

.recommendation-container::-webkit-scrollbar {
  width: 8px;
}

.recommendation-container::-webkit-scrollbar-track {
  background: #f8f8f8;
  border-radius: 4px;
}

.recommendation-container::-webkit-scrollbar-thumb {
  background-color: #FC9755;
  border-radius: 4px;
  border: 2px solid #f8f8f8;
}

.recommendation-container::-webkit-scrollbar-thumb:hover {
  background-color: #e0864a;
}

.cards-grid {
  width:100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding-bottom: 30rem;
}


.button-down{
  width:100%;
  position:fixed;
  bottom:0;
  background-color: #FC9755;
}


</style>