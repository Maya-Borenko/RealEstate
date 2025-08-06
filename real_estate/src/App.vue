<template>
  <v-app>
    <v-main>
      <Header />
      <div class="bot-container">
      <div class="window">
        <p v-if="!isOpen" @click.prevent="openChat">Онлайн консультация</p>
        <Bot v-if="isOpen" @close-chat="closeChat" />
      </div>
      </div>
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import Bot from './components/Bot'

export default{
  name: 'app',
  components:{
    Header, AboutPage, Footer, Bot
  },
  data (){
    return{
      isOpen: false
    }
  },
  methods:{
    openChat(){
      this.isOpen = true;
    },
    closeChat(){
      this.isOpen = false;
    }
  }
}
</script>


<style>
.bot-container{
  height:100%;
  position: absolute;
  right:0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
}
.window{
  position: sticky;
  bottom:0;
  margin-right:9%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid #FC9755;
  color: #fffefd;
  font-weight:500;
  background-color: #FC9755;
  width: 29rem;
  cursor:pointer;
  z-index: 10;
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.25));
}

p{
  text-indent: 0;
  font-size: 22px;
  margin:10px
}
</style>