<template>
  <form class="search-block" @submit.prevent="handleSubmit">
    <input 
      v-model="query"
      type="text" 
      placeholder="Искать здесь..."
      @input="handleInput"
    />
    <button type="submit" class="search"><img src="/searchIcon.png"></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('search', this.query)
      this.query = ''
    },
    handleInput() {
      this.$emit('input', this.query)
    }
  }
}
</script>

<style scoped>
.search-block {
  position: relative;
  width: 300px;
  margin-right:5px;
}

img{
  width:50%;
  height:50%;
}

input {
  width: 100%;
  height: 42px;
  padding: 0 10px;
  border: 2px solid #f4f4f4;
  border-radius: 5px;
  outline: none;
  background: #f4f4f4;
  color: #000;
}

.search {
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
  border: 2px solid #f4f4f4;
  border-left: none;
  background: #f4f4f4;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>