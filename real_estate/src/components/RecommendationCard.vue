<template>
  <div class="recommendation-card" @click="loadPage(topic, type, id)">
    <div class="image-wrapper">
      <img :src="image" class="recommendation-image">
    </div>
    <div class="title-block"><p class="title">{{ title }}</p></div>
  </div>
</template>

<script>
import { DocumentService } from '@/services/documentService'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    id:{
      type: Number,
      required: true
    }
  },
  data(){
    return{
      image: '',
      document: {}
    }
  },
  async created() {
    this.document = await DocumentService.fetchDocument(this.id)
    this.image = this.document.imageUrl
  },
  methods: {
    loadPage(itemTopic, itemType, itemId){      
      this.$emit('item-selected', itemTopic, itemType, itemId)
    }
  }
}
</script>

<style scoped>
.recommendation-card {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height:100%;
  /* margin: 0 20px; */
  margin: 0 5px;
}

.image-wrapper {
  height: auto;
  width: 70%;
  border-radius: 18%;
  overflow: hidden;
  background: #f0f0f0;
  border: 2px solid #FC9755;
}

.recommendation-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recommendation-image:hover {
  transform: scale(1.05);
}

.title-block{
  position: relative;
  width:9rem;
}

.title {
  font-size: 18px;
  text-align: center;
  margin-top: 15px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  word-break: normal;
  z-index: 1;
}


.recommendation-card:hover .title {
  -webkit-line-clamp: unset;
  width:100%;
  text-align: center;
  position:absolute;
  left:0;
  margin:10px 0;
  background-color: #fffefd;
  border-radius: 0 0 5px 5px;
  overflow: visible;
  white-space: normal;
  z-index: 2;
}

p{
  text-indent: 0;
}
</style>