<template>
  <div class="capybara-container" aria-label="Animated capybara looking around">
    <div class="capybara" ref="capybaraRef">
      <!-- 身体 -->
      <div class="body"></div>
      
      <!-- 头部 -->
      <div class="head">
        <!-- 眼睛 -->
        <div class="eye left"></div>
        <div class="eye right"></div>
        
        <!-- 鼻子 -->
        <div class="nose">
          <div class="nostril left"></div>
          <div class="nostril right"></div>
        </div>
        
        <!-- 耳朵 -->
        <div class="ear left"></div>
        <div class="ear right"></div>
      </div>
      
      <!-- 腿 -->
      <div class="leg front-left"></div>
      <div class="leg front-right"></div>
      <div class="leg back-left"></div>
      <div class="leg back-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const capybaraRef = ref<HTMLElement | null>(null)

let lookTimeout: number | null = null
let blinkInterval: number | null = null

// 随机眨眼动画
function startBlinking() {
  blinkInterval = window.setInterval(() => {
    const eyes = capybaraRef.value?.querySelectorAll('.eye')
    if (eyes) {
      eyes.forEach(eye => {
        eye.classList.add('blink')
        setTimeout(() => {
          eye.classList.remove('blink')
        }, 200)
      })
    }
  }, 4000 + Math.random() * 3000) as unknown as number
}

// 随机看向不同方向
function startLooking() {
  const lookDirections = ['center', 'left', 'right', 'up', 'down']
  
  function look() {
    const direction = lookDirections[Math.floor(Math.random() * lookDirections.length)]
    if (capybaraRef.value) {
      capybaraRef.value.dataset.look = direction
    }
    
    lookTimeout = window.setTimeout(() => {
      look()
    }, 2000 + Math.random() * 3000) as unknown as number
  }
  
  look()
}

onMounted(() => {
  startBlinking()
  startLooking()
})

onUnmounted(() => {
  if (blinkInterval !== null) {
    clearInterval(blinkInterval)
  }
  
  if (lookTimeout !== null) {
    clearTimeout(lookTimeout)
  }
})
</script>

<style scoped>
.capybara-container {
  position: relative;
  width: 100%;
  height: 300px;
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
}

.capybara {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 160px;
}

/* 身体 */
.body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 100px;
  background-color: #a67c52;
  border-radius: 50%;
  z-index: 1;
}

/* 头部 */
.head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 100px;
  background-color: #a67c52;
  border-radius: 50%;
  z-index: 2;
  transition: transform 0.6s ease-out;
}

/* 眼睛 */
.eye {
  position: absolute;
  top: 30px;
  width: 12px;
  height: 12px;
  background-color: #000;
  border-radius: 50%;
  transition: transform 0.6s ease-out;
}

.eye.left {
  left: 40px;
}

.eye.right {
  right: 40px;
}

.eye.blink {
  transform: scaleY(0.1);
}

/* 鼻子 */
.nose {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 25px;
  background-color: #8a6642;
  border-radius: 50%;
}

/* 鼻孔 */
.nostril {
  position: absolute;
  top: 10px;
  width: 6px;
  height: 6px;
  background-color: #000;
  border-radius: 50%;
}

.nostril.left {
  left: 10px;
}

.nostril.right {
  right: 10px;
}

/* 耳朵 */
.ear {
  position: absolute;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: #8a6642;
  border-radius: 50%;
}

.ear.left {
  left: 20px;
}

.ear.right {
  right: 20px;
}

/* 腿 */
.leg {
  position: absolute;
  width: 20px;
  height: 15px;
  background-color: #8a6642;
  border-radius: 10px;
  z-index: 0;
}

.leg.front-left {
  bottom: 0;
  left: 40px;
}

.leg.front-right {
  bottom: 0;
  right: 40px;
}

.leg.back-left {
  bottom: 0;
  left: 60px;
}

.leg.back-right {
  bottom: 0;
  right: 60px;
}

/* 看向不同方向 */
.capybara[data-look="left"] .head {
  transform: translateX(-50%) rotate(-5deg);
}

.capybara[data-look="right"] .head {
  transform: translateX(-50%) rotate(5deg);
}

.capybara[data-look="up"] .head {
  transform: translateX(-50%) translateY(-5px);
}

.capybara[data-look="down"] .head {
  transform: translateX(-50%) translateY(5px);
}

.capybara[data-look="left"] .eye.left,
.capybara[data-look="left"] .eye.right {
  transform: translateX(-3px);
}

.capybara[data-look="right"] .eye.left,
.capybara[data-look="right"] .eye.right {
  transform: translateX(3px);
}

.capybara[data-look="up"] .eye.left,
.capybara[data-look="up"] .eye.right {
  transform: translateY(-3px);
}

.capybara[data-look="down"] .eye.left,
.capybara[data-look="down"] .eye.right {
  transform: translateY(3px);
}

/* 简单的呼吸动画 */
.body {
  animation: breathe 4s infinite ease-in-out;
}

@keyframes breathe {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.03, 1.02); }
}
</style> 