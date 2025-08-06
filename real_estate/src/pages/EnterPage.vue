<template>
    <div class="enter-page">
        <Authorization 
        @open-page="openPage"/>
    </div>
</template>

<script>
import Authorization from '@/components/Authorization.vue'
import { onMounted, onUnmounted } from 'vue'

export default{
    methods:{
        openPage(href){
            this.$router.push({path: '/', query: ''})
        }
    }
}
</script>

<style>
.enter-page{
  background-color: #fffefd;
  height: 87%;
  width:100%;
  margin-top:3rem;
}
</style>