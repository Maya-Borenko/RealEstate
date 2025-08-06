<template>
  <div class="text-page">
    <TextArticle v-bind:documents="article"
    @link-clicked="openArticle"/>
    
    <PracticeBlocks 
    v-bind:caseLaw="caseLaw"
    v-bind:templates="templates"
    @open-page="loadPage"/>
  </div>
</template>

<script>
import TextArticle from '@/components/TextArticle.vue'
import PracticeBlocks from '@/components/PracticeBlocks.vue'
import { DocumentService } from '@/services/documentService'
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
      templates: [],
      url: '',
      document: {},
      loading: false,
      image: ''
    }
  },
  watch: {
    topic: {
      immediate: true,
      async handler(newTopic) {
        await this.loadDocument(newTopic)
      }
    }
  },
  async created() {
    await this.loadDocument()
  },
  methods: {
    async loadDocument() {
      try{
      this.loading = true
      this.documents = await DocumentService.fetchDocumentsTopic(this.topic)
      this.article = this.documents.article
      this.caseLaw = this.documents.caseLaw
      this.templates = this.documents.templates
      this.loading = false
    } catch{
      this.documents = []
      this.article = []
      this.caseLaw = []
      this.templates = []
    }
    },
    async loadPage(selectedItem){
      this.document = await DocumentService.fetchDocument(selectedItem.documentId)
      this.url = getUrlByTopic(this.document.topic, this.document.documentType)
      this.$router.push({
        path: this.url,
       query: { topic: this.document.topic, id: selectedItem.documentId}});
    },
    openArticle(params) {
      console.log('Opening article:', params);
      this.$router.push({
        path: params.path,
        query: { topic: params.topic }
      });}
  }
}
</script>

<style scoped>
.text-page {
  margin-top:7rem;
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-left:2rem;
}
</style>