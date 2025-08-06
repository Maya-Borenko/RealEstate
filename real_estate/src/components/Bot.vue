<template>
    <div class="bot-link">
        <img src="/qrcode(2).svg">
        <p>Нужна помощь? Обратитесь к нашему <a href="https://t.me/pro_nedvizhimost_plus_bot" target="_blank">ИИ ассистенту</a>!<br>
        <u @click="handleClose">Закрыть</u></p>
    </div>
</template>

<script>
export default{
    methods: {
    handleClose() {
      this.$emit('close-chat');
    }
  }
}
</script>

<style scoped>
.bot-link{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding:40px 10px 0;
}

img{
    background-color: #f4f4f4;
    border-radius: 20px;
    margin-bottom: 20px;
    width:80%;
}
p{
    text-align: center;
    padding:0 20px;
}

a{
    color:#f4f4f4;
}
</style>