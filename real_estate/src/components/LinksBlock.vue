<template>
  <div class="document-templates">
    <h2>Ссылки на реестры</h2>
    <div class="template-items">
      <p v-for="(link, index) in links_items" :key="index" class="template-item">
        Реестр {{ link.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    links_items:{
      type: Array
    }
  }
}
</script>

<style scoped>
.document-templates {
  width: 100%;
}

.template-items {
  background-color: #fffefd;
  border: 2px solid #FC9755;
  border-radius: 30px;
  padding: 1.5rem;
}

.template-item {
  cursor: pointer;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  text-align: left;
}

.template-item:last-child {
  margin-bottom: 0;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>