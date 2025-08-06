<template>
  <div class="document-templates">
    <div class=template-header>
      <h2>Шаблоны документов</h2>
      <img src="/arrow.png">
    </div>
    <div class="template-items">
      <p v-for="template in templates" @click.prevent="download(template)" class="template-item">
        {{ template.title }}.docx
      </p>
    </div>
  </div>
</template>

<script>
import { DocumentService } from '@/services/documentService'
import { TemplateService } from '@/services/templateService'

export default {
  props: {
    templates: {
      type: Array
    }
  },
  data(){
    return {
      template: {}
    }
  },
  methods: {
    async loadTemplate() {
      this.template = this.templates[0]
      this.document = await DocumentService.fetchDocument(this.document.documentId)
    },
    async download(template){
      console.error('selected template:', template)
      try {
        await TemplateService.downloadTemplate(template.documentId)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
        alert('Не удалось скачать шаблон.')
      }
    }
  }
}
</script>

<style scoped>
.document-templates {
  width: 100%;
  z-index: 10;
}

.template-items {
  background-color: #fffefd;
  border: 2px solid #FC9755;
  border-radius: 30px;
  padding: 25px;
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: left;
}

.template-item {
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 18px;
  text-align: left;
}

.template-item:hover{
  text-decoration: underline;
}

h2 {
  font-size: 24px;
  text-align: center;
}
.template-header{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

img{
  margin-left:10px;
  margin-bottom:2px;
  height:25px;
  width:25px;
}
</style>