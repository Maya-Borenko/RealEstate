<template>
    <div class="enter-container">
        <h1>{{ currentForm.headline }}</h1>
        <form class="enter-form"  @submit.prevent="submitForm">
            <h2>{{ currentForm.login }}</h2>
            <input v-model="mail" type="text"
             placeholder="example@mail.ru"
             @blur="validateEmail">
            <h2>{{ currentForm.password}}</h2>
            <input v-model="password" type="password" placeholder="*******">
            <p v-if="incorrect" class="incorrect">{{currentMistake}}</p>
            <button type="submit">{{ currentForm.buttonText }}</button>
            <p class="helpline" @click="toggleForm"><i>{{ currentForm.helpText }}</i></p>
        </form>
    </div>
</template>

<script>
import {AuthService, useAuthStore} from '@/services/authService'

export default{
    data() {
        return {
            mail: '',
            password: '',
            isLoginForm: true,
            incorrect: false,
            formText: [
                {headline: 'Войти', login: 'Введите логин', password: 'Введите пароль', buttonText: 'Войти', helpText: 'Еще нет аккаунта?'},
                {headline: 'Зарегистрироваться', login: 'Введите почту', password: 'Придумайте пароль', buttonText: 'Зарегистрироваться', helpText: 'Уже есть аккаунт?'}
            ],
            currentMistake: ''
        }
    },
    computed: {
    currentForm() {
      return this.isLoginForm ? this.formText[0] : this.formText[1]
    }
  },
  methods: {
    toggleForm() {
      this.isLoginForm = !this.isLoginForm
      this.mail = ''
      this.incorrect = false
      this.password = ''
    },
    validateEmail() {
        console.log('validate email', (this.mail))
      if (!this.mail) {
        this.currentMistake = 'Поле обязательно для заполнения';
        return false;
      }      
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(this.mail)) {
        this.currentMistake = 'Введите корректный email (например: user@example.com)';
        return false;
      }

      return true;
    },
    async submitForm() {
        if (!this.validateEmail()) {
                this.incorrect = true
                return
            }
        if (!this.password) {
                this.currentMistake = 'Не все поля заполнены'
                this.incorrect = true
                return
            }
            
        if (this.password.length < 6 || this.password.length > 12) {
            this.currentMistake = 'Пароль должен быть 6-12 символов'
            this.incorrect = true
            return
        }
            
            this.incorrect = false
            
            try {
                if (this.isLoginForm) {
                    const response = await AuthService.login(this.mail, this.password)
                    console.log('Успешный вход:', response)
                    if (response.token) {
                        const auth = useAuthStore()
                        auth.login(response.token)
                        this.$emit('open-page', '/')
                    }
                } else {
                    const response = await AuthService.register(this.mail, this.password)
                    console.log('Успешная регистрация:', response)
                    if (response.token) {
                        const auth = useAuthStore()
                        auth.login(response.token)
                        this.$emit('open-page', '/')
                    }
                }
            } catch (error) {
  console.error('Ошибка:', error)
  
  if (error.response) {
    switch (error.response.status) {
      case 400:
        this.currentMistake = error.response.data?.message || 'Некорректные данные'
        break
      case 401:
        this.currentMistake = 'Неверная почта или пароль'
        localStorage.removeItem('authToken')
        window.dispatchEvent(new Event('auth-changed'))
        break
      case 404:
        this.currentMistake = 'Пользователь не найден'
        break
      case 409:
        this.currentMistake = 'Пользователь с таким email уже существует'
        break
      case 500:
        this.currentMistake = 'Ошибка сервера. Попробуйте позже'
        break
      default:
        this.currentMistake = error.response.data?.message || 'Произошла ошибка'
    }
  } else if (error.request) {
    this.currentMistake = 'Нет соединения с сервером'
  } else {
    this.currentMistake = 'Произошла непредвиденная ошибка'
  }
  
  this.incorrect = true
}
      }
    }
  }

</script>

<style scoped>
.enter-container{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
}
.enter-form{
  width: 660px;
  min-height:370px;
  display: flex;
  padding: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 2px solid #FC9755;
}

h1{
  font-weight: 500;
  margin-top:0;
  margin-bottom: 20px;
  font-size: 30px;
  color: #7b4414;
}


h2 {
  margin-bottom:15px;
}

input{
    font-size: 20px;
    margin-bottom: 20px;
    border: 2px solid #FC9755;
    border-radius: 5px;
    padding:5px 10px;
    width: 300px;
}

button {
    margin-top:20px;
    background-color: #de864b;
    font-weight: 500;
    color: #f4f4f4;
    border-radius: 5px;
    font-size: 20px;
    padding: 5px 20px
}

.helpline{
    cursor: pointer;
    text-indent: 0;
    text-decoration: underline;
    
}

.incorrect {
    color: red;
    text-indent: 0;
    text-decoration: none;
    margin:2px 0;
}
</style>