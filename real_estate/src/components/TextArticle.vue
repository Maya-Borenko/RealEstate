<template>
  <article class="text-article">
    <h1>{{ document.title }}</h1>
     
    <div class="text"
    v-html="processedHtml"
     @click="handleClick">
     </div>
  </article>
</template>

<script>
import { DocumentService } from '@/services/documentService'

export default {
  data() {
    return {
      document: {
        title: '',
        text: '',
      },
      rawHtml: 'Посмотрите <a data-href="/real-estate-verification" data-topic="Проверка недвижимости">документ по недвижимости</a>. Посмотрите <a data-href="/risks" data-topic="Риски при покупке недвижимости">документ по рискам</a>'
    }
  },
  props:{
    documents:{
      type: Array,
      required: true
    }
  },
  computed: {
    processedHtml() {
      console.log('Processing HTML...')
      const html = this.document.text
      try {
        return html.replace(
          /<a\s+([^>]+)>([^<]+)<\/a>/g,
          (match, attrs, text) => {
            const hasDataHref = /data-href="([^"]+)"/.test(attrs);
            const hasDataTopic = /data-topic="([^"]+)"/.test(attrs);
            
            if (hasDataHref && hasDataTopic) {
              const hrefMatch = attrs.match(/data-href="([^"]+)"/);
              const topicMatch = attrs.match(/data-topic="([^"]+)"/);
              const href = hrefMatch ? hrefMatch[1] : '';
              const topic = topicMatch ? topicMatch[1] : '';
              
              return `<a 
                href="#" 
                data-path="${href}" 
                data-topic="${topic}"
                class="dynamic-link"
              >${text}</a>`;
            }
            
            return `<a ${attrs}>${text}</a>`;
          }
        );
      }catch{
        return html
      }
    }
  },
  watch: {
    documents: {
      async handler(newVal) {
        if (newVal.length > 0) {
          await this.loadDocument(newVal[0].documentId)
        }
        else{
          this.document = {
            title: 'В разработке...',
            text: '',
        }
      immediate: true
      }
    }
    }
  },
  methods: {
    async loadDocument() {
      this.document = this.documents[0]
      this.document = await DocumentService.fetchDocument(this.document.documentId)
    },
    handleClick(event) {
      const link = event.target.closest('a');
      
      if (!link) return;
      
      if (link.classList.contains('dynamic-link')) {
        event.preventDefault();
        console.log('Dynamic link clicked!', link);
        console.log('Link clicked:', {
          path: link.dataset.path,
          topic: link.dataset.topic
        });
        
        this.$emit('link-clicked', {
          path: link.dataset.path,
          topic: link.dataset.topic
        });
      }
    },
  }
}
</script>

<style scoped>
.text-article {
  width: 60%;
  text-align: center;
}

.text{
  text-align: justify;
}

h1{
  font-weight: 500;
  margin: 30px;
  font-size: 30px;
  color: #7b4414;
}

.text ::v-deep h1 {
  font-weight: 500;
  margin: 15px;
  font-size: 28px;
  color: #e67e22;
  scroll-margin-top: 7rem;
}

.text ::v-deep p{
  font-size: 22px;
  text-align:justify;
  text-indent: 35px;
  margin: 1rem 0;
}

h2, .text ::v-deep h2 {
  text-indent: 35px;
  font-size: 26px;
  margin-top: 2rem;
  color: #e67e22;
  scroll-margin-top: 7rem;
}

.text ::v-deep h3 {
  text-indent: 35px;
  font-size: 24px;
  margin-top: 2rem;
  color: #e67e22;
  scroll-margin-top: 7rem;
}

.text ::v-deep strong{
  font-weight: 700;
  color: #e67e22;
  scroll-margin-top: 7rem;
}
    
.text ::v-deep ul, .text ::v-deep ol {
  margin-left: 4.5rem;
  font-size: 22px;
}


.text ::v-deep a{
  color: #703e13;
  scroll-margin-top: 7rem;
}
</style>