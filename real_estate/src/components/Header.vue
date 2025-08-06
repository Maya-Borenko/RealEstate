<template>
  <div class="navigator">
    <router-link to="/"><img class="logo" src="/photo_2025-07-25_10-55-01.png"></router-link>
    <router-link to="/" class="links">ПроНедвижимость+</router-link>
    
    <Dropdown
      title="Хочу купить"
      :items="dropdownItemsWantBuy"
      @item-selected="handleItemSelect">
    </Dropdown>
    
    <Dropdown
      title="В процессе покупки"
      :items="dropdownItemsAlreadyBuy"
      @item-selected="handleItemSelect">
    </Dropdown>
    <Dropdown
      title="Уже купил"
      :items="dropdownItemsNew"
      @item-selected="handleItemSelect"
      @click="plug()">
    </Dropdown>
    
    <SearchInput 
    @search="openSearchPage"/>
  </div>
</template>

<script>
import Dropdown from './Dropdown'
import SearchInput from './SearchInput'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {AuthService, useAuthStore} from '@/services/authService'


export default {
  
setup() {
  const auth = useAuthStore()

  const handleLogout = () => {
    auth.logout()
  }

  return {
    isAuthenticated: computed(() => auth.isAuthenticated),
    handleLogout
  }
},
  data(){
    return{
    dropdownItemsWantBuy:[
        {topic: "Проверка недвижимости", url: '/real-estate-verification'},
        {topic: "Проверка продавца", url: '/seller-verification'},
        {topic: "Чек-лист", url: '/checklist'}
    ],
    dropdownItemsAlreadyBuy:[
        {topic: "Приемка-передача недвижимости", url: '/reception-transmission'},
        {topic: "Риски при покупке недвижимости", url: '/risks'}
    ],
    dropdownItemsNew: []
    }
  },
  components: { Dropdown, SearchInput },
  methods:{
    handleItemSelect(selectedItem) {
      this.$router.push({
        path: selectedItem.url,
        query: { topic:selectedItem.topic }
      })
    },
    openSearchPage (query){
      this.$router.push({
        path: '/search',
        query: { query }
      })
    },
    plug(){
      window.alert = function(message) {
        const alert = document.createElement('div')
        alert.style.position = 'fixed'
        alert.style.top = '120px'
        alert.style.left = '50%'
        alert.style.transform = 'translateX(-50%)'
        alert.style.padding = '15px 25px'
        alert.style.background = '#f4f4f4'
        alert.style.color = '#000'
        alert.style.borderRadius = '4px'
        alert.style.border = '2px solid #FC9755'
        alert.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)'
        alert.style.zIndex = '9999'
        alert.textContent = message
  
        document.body.appendChild(alert)
  
        setTimeout(() => {
          document.body.removeChild(alert)
        }, 3000)
      }
      alert('Раздел находится в разработке')
    }
  }
}
</script>

<style scoped>
.navigator {
  height:6rem;
  /* border-bottom: 2px solid #FC9755; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #1e81b0;
  position: fixed;
  z-index: 9;
  top:0;
  padding: 0 40px;
  width:100%;
}

.logo{
  width: 70px;
  height: auto;
  padding-top:5px;
}

.links {
  color: #f4f4f4;
  font-size: 28px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 0;
}


</style>