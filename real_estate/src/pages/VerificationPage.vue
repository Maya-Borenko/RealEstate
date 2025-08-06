<template>
  <div class="text-page">
    <TextArticle
    v-bind:documents="article"
    @internal-link="openArticle" 
    @link-clicked="openArticle"/>
    <div class="practice-sticky">
      <JudicialPractice class="prac-block"
      :items="caseLaw" 
      @item-selected="handleItemSelect"/>
    </div>
  </div>
</template>

<script>
import TextArticle from '@/components/TextArticle.vue'
import PracticeBlocks from '@/components/PracticeBlocks.vue'
import { DocumentService } from '@/services/documentService'
import JudicialPractice from '@/components/JudicialPractice.vue'
import { getUrlByTopic } from '@/services/getUrl'

export default {
  props:{
    topic:{
        type: String,
        required: true
    }
  },
  components: {
    TextArticle,
    PracticeBlocks
  },
  data(){
    return{
      documents: [],
      article: [],
      caseLaw: [],
      loading: false,
      image: ''
    }
  },
  async created() {
    await this.loadDocument()
  },
  watch: {
    topic: {
      immediate: true,
      async handler(newTopic) {
        await this.loadDocument(newTopic)
      }
    }
  },
  methods: {
    async loadDocument() {
      try{
        this.loading = true
        this.documents = await DocumentService.fetchDocumentsTopic(this.topic)
        this.article = this.documents.article
        this.caseLaw = this.documents.caseLaw
        this.loading = false
      }catch{
      this.documents = []
      this.article = []
      this.caseLaw = []
      }
    },
    openArticle(params) {
      console.log('Opening article:', params);
      this.$router.push({
        path: params.path,
        query: { topic: params.topic }
      });},
    async handleItemSelect(selectedItem) {
      this.document = await DocumentService.fetchDocument(selectedItem.documentId)
      this.url = getUrlByTopic(this.document.topic, this.document.documentType)
      this.$router.push({
        path: this.url,
       query: { topic: this.document.topic, id: selectedItem.documentId}});
    }
  }
}
</script>

<style scoped>
.text-page {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-left:5rem;
  margin-top: 7rem;
}

.practice-sticky{
  height: 95%;
  width:40%;
  margin-bottom: 700px;
}
.prac-block {
  position: sticky;
  top:130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left:12%;
  gap: 2rem;
  z-index:8;
  width: 30rem;
}
</style>