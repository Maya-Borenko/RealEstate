<template>
    <div class="document" @click="selectItem(document)">
        <h2>{{ document.title }}</h2>
        <p>{{ document.description }}</p>
    </div>
</template>

<script>

export default{
    props:{
        document: {
            type: Object,
            required: true
        }
    },
    methods:{
        selectItem(item) {
            this.$emit('item-selected', item)
        }
    }
}
</script>

<style>
.document{
    padding:20px;
    border-bottom:2px solid #e67e22;
}
.document:hover{
    background-color: #eee9e3;
}

p{
  text-align:justify;
  text-indent: 35px;
  margin: 1rem 0;
}

h2 {
  font-size: 1.5rem;
  color: #e67e22;
}
</style>