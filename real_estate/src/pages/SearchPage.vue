<template>
    <div class="search-result">
        <SearchDocumentBlock 
        v-for="item in documents"
        :document="item"
        @item-selected="openPage"
        />
        <div class="result-empty" v-if="documents.length === 0 && !loading">
            <h1>Ничего не найдено!</h1>
        </div>
        <div class="result-loading" v-if="documents.length === 0 && loading">
            <h1>Загрузка...</h1>
        </div>
    </div>
</template>

<script>
import { DocumentService } from '@/services/documentService'
import { getUrlByTopic } from '@/services/getUrl'
import { TemplateService } from '@/services/templateService'


export default{
    props:{
        query: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            documents: [],
            loading: false,
            url: ''
        }
    },
    async created() {
        await this.loadResults(this.query)
    },
    watch: {
      query(newQuery, oldQuery) {
        if (newQuery !== oldQuery) {
          this.loadResults(newQuery)
        }
      }
    },
    methods: {
      async loadResults(query) {
        this.loading = true
        this.documents = await DocumentService.fetchSearchDocument(query)
        console.log('Array lengh', this.documents.length)
        this.loading = false
      },
      async download(item){
        try {
            await TemplateService.downloadTemplate(item.documentId)
        } catch (error) {
        console.error('Ошибка загрузки:', error)
        alert('Не удалось скачать шаблон')
        }
      },
      openPage(item){
        if (item.documentType === 'template'){
            this.download(item)
            return
        }
        this.url = getUrlByTopic(item.topic, item.documentType)
        this.$router.push({
        path: this.url,
        query: { topic: item.topic, id: item.documentId }
      })
      }
    }
}
</script>

<style scoped>
.search-result{
    height:81%;
    margin: 150px 5rem 150px;
    background-color: #fffefd
}

.result-empty, .result-loading{
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1{
  width:fit-content;
  font-weight: 500;
  font-size: 30px;
  color: #7b4414;
}
</style>