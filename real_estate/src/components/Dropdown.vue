<template>
  <div class="dropdown" @mouseenter="open" @mouseleave="close">
    <button class="dropbtn">
      {{ title }}
    </button>
    <transition name="fade">
      <div v-show="isOpen" class="dropdown-content">
        <a 
          v-for="item in items" 
          class="dropdown-item"
          @mouseenter="hoverItem(item.topic)"
          @mouseleave="unhoverItem(item.topic)"
          @click="selectItem(item)"
          :class="{ hovered: hoveredIndex === item.topic }"
        >
          {{ item.topic }}
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      hoveredIndex: null
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    hoverItem(index) {
      this.hoveredIndex = index
    },
    unhoverItem(index) {
      if (this.hoveredIndex === index) {
        this.hoveredIndex = null
      }
    },
    selectItem(item) {
      this.$emit('item-selected', item)
      this.close()
    }
  }
}
</script>

<style scoped>
.dropdown {
  height:100%;
  position: relative;
  width:300px;
  display: inline-block;
}

.dropbtn {
  font-size: 28px;
  font-weight: 500;
  width:300px;
  background: none;
  border: 2px solid transparent;
  cursor: pointer;
  height: 100%;
  color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown:hover .dropbtn {
  border-color: #f4f4f4;
  border-top:none;
  border-bottom-color: transparent;
}

.dropdown-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  border: 2px solid #f4f4f4;
  border-top: none;
  z-index: 10;
  box-sizing: border-box;
}

.dropdown-item {
  display: block;
  width:100%;
  font-size: 28px;
  font-weight: 500;
  padding: 10px 25px 15px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  background-color: #1e81b0;
  color:#f4f4f4;
  text-decoration: none;
  cursor:pointer;
}

.dropdown-item:hover {
  background-color: #114a64;
}
</style>