<template>
  <div class="text-page">
    <TextArticle v-bind:documents="caseLaw" />
  </div>
</template>

<script>
import TextArticle from '@/components/TextArticle.vue'
import { DocumentService } from '@/services/documentService'

export default {
  props:{
    topic:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    }
  },
  components: {
    TextArticle
  },
  data(){
    return{
      document: {},
      documents: [],
      caseLaw: [],
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
        console.log('item id', this.id)
      this.loading = true
      this.document = await DocumentService.fetchDocument(this.id)
      this.documents.push(this.document)
      this.caseLaw = this.documents
      this.loading = false
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
</style>