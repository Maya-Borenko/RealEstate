<template>
  <div class="judicial-practice">
    <h2>Судебная практика</h2>
    <div class="practice-items">
      <div v-for="(item, index) in items" :key="index" class="practice-item"
      @click="selectItem(item)">
        <h3>{{ item.title }}</h3>
        <p class="read-more">{{ item.description }}</p>
      </div>
       <h3><a href="https://cloud.consultant.ru/cloud/cgi/online.cgi?req=doc&base=PSP&n=44&dst=100649&cacheid=02F38F434EC34FB0F75A62AD0D87A1B7&mode=splus&rnd=kMMEeQ#I9UzDrU48dt7TQTh1" target="_blank">Больше судебной практики</a></h3>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      require: true
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('item-selected', item)
    }
  }
}
</script>

<style scoped>
.judicial-practice {
  width: 100%;
  z-index: 10;
}

.practice-items {
  width:100%;
  background-color: #fffefd;
  border: 2px solid #FC9755;
  border-radius: 30px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.practice-item {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px;
}

.practice-item p{
  text-indent: 25px;
  font-size: 18px;
  margin: 5px;
}

.practice-item:hover p {
  text-decoration: underline;
}

.practice-item:last-child {
  margin-bottom: 0;
}

.practice-item p:last-child{
  margin-bottom: 7px;
}

h2 {
  font-size: 24px;
  text-align: center;
}

h3 {
  font-size: 20px;
  color: #e67e22;
  text-align: center;
}

h3 a{
  text-decoration: none;
  color: #e67e22; 
}

h3:hover a{
  text-decoration: underline;
  font-size: 18px;
  color: #e67e22;
  
}

.read-more {
  color: #000;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}
</style>