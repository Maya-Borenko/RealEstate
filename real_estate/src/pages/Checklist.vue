<template>
  <div class="text-page">
    <TextArticle 
    v-bind:documents="article"
    @intenal-link="openArticle"
    @link-clicked="openArticle"/>
    <div class="sticky-templates">
    <DocumentTemplates v-bind:templates="templates" class="block" />
  </div>
  </div>
</template>

<script>
import TextArticle from '@/components/TextArticle.vue'
import DocumentTemplates from '@/components/DocumentTemplates.vue'
import { DocumentService } from '@/services/documentService'

export default {
  props:{
    topic:{
        type: String,
        required: true
    }
  },
  components: {
    TextArticle,
    DocumentTemplates
  },
  data(){
    return{
      documents: [],
      article: [],
      templates: [],
      loading: false,
      image: ''
    }
  },
  async created() {
    await this.loadDocument()
  },
  methods: {
    async loadDocument() {
      this.loading = true
      this.documents = await DocumentService.fetchDocumentsTopic(this.topic)
      this.article = this.documents.article
      this.templates = this.documents.templates
      this.loading = false
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-left:5rem;
  margin-top: 120px;
}

.sticky-templates{
  height: 95%;
  width:40%;
  margin-bottom: 700px;
}
.block {
  position: sticky;
  top:130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left:13%;
  gap: 2rem;
  z-index:8;
  width:30rem;
}

</style>