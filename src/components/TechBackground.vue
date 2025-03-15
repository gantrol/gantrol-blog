<!-- TechBackground.vue -->
<template>
    <div class="tech-background" :class="{ 'dark-mode': isDark }">
      <canvas ref="particleCanvas" class="particle-canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { useData } from 'vitepress'
  
  const { isDark } = useData()
  const particleCanvas = ref(null)
  let animationId = null
  let particles = []
  
  // 粒子系统设置
  const particleSettings = {
    light: {
      particleCount: 100,
      connectDistance: 150,
      speed: 0.3,
      size: 1.2,
      color: '95, 103, 238',
      lineColor: '95, 103, 238',
      backgroundColor: '248, 249, 250'
    },
    dark: {
      particleCount: 120,
      connectDistance: 150,
      speed: 0.4,
      size: 1.3,
      color: '65, 209, 255',
      lineColor: '65, 209, 255',
      backgroundColor: '17, 24, 39'
    }
  }
  
  // 粒子类
  class Particle {
    constructor(canvas, settings) {
      this.canvas = canvas
      this.settings = settings
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * settings.speed
      this.vy = (Math.random() - 0.5) * settings.speed
      this.size = Math.random() * settings.size + 0.1
    }
  
    // 更新粒子位置
    update() {
      this.x += this.vx
      this.y += this.vy
  
      // 边界检查
      if (this.x < 0 || this.x > this.canvas.width) this.vx = -this.vx
      if (this.y < 0 || this.y > this.canvas.height) this.vy = -this.vy
    }
  
    // 绘制粒子
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.settings.color}, ${0.6 - (this.y / this.canvas.height) * 0.4})`
      ctx.fill()
    }
  }
  
  // 初始化粒子系统
  function initParticles() {
    const canvas = particleCanvas.value
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const settings = isDark.value ? particleSettings.dark : particleSettings.light
    
    // 设置画布大小
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // 创建粒子
    particles = []
    for (let i = 0; i < settings.particleCount; i++) {
      particles.push(new Particle(canvas, settings))
    }
    
    // 动画函数
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 更新并绘制粒子
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })
      
      // 绘制连接线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < settings.connectDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const opacity = (1 - distance / settings.connectDistance) * 0.2
            ctx.strokeStyle = `rgba(${settings.lineColor}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      
      animationId = requestAnimationFrame(animate)
    }
    
    // 开始动画
    animate()
  }
  
  // 处理窗口大小变化
  function handleResize() {
    if (!particleCanvas.value) return
    particleCanvas.value.width = window.innerWidth
    particleCanvas.value.height = window.innerHeight
    initParticles()
  }
  
  // 监听主题变化
  watch(isDark, () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    initParticles()
  })
  
  onMounted(() => {
    initParticles()
    window.addEventListener('resize', handleResize)
  })
  
  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', handleResize)
  })
  </script>
  
  <style scoped>
  .tech-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }
  
  .particle-canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>