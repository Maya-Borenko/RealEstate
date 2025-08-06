<template>
  <section class="about-us">
    <h1>О нас</h1>
    <div class="content">
      <p>ПроНедвижимость+ - ваш помощник в сфере недвижимости. На сайте вы найдете:</p>
      <ul class="benefits-list">
        <li v-for="(benefit, index) in benefits" :key="index">{{ benefit }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        "Как проверить недвижимость перед покупкой ",
        "Как выбрать надежного продавца",
        "Какие документы нужны для сделки",
        "Какие риски бывают и как их избежать"
      ]
    }
  }
}
</script>

<style scoped>
.about-us {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:1%;
}

h1 {
  font-weight: 600;
  font-size: 35px;
  margin-bottom: 20px;
  color: #FC9755;
  text-align: center;
  letter-spacing: 1px;
}

.content {
  width:65%;
  font-size: 22px;
  line-height: 1.8;
  padding: 0 1rem;
  text-align: justify;
}

.content p {
  font-size: 24px;
  text-indent: -0.5em;
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  padding-left: 0.5rem;
}

.benefits-list li {
  margin-bottom: 1rem;
  font-size: 24px;
  position: relative;
  padding-left: 1.5em;
  text-indent: -0.5em;
}

.benefits-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #FC9755;
  font-weight: bold;
}

</style>