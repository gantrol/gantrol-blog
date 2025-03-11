<template>
    <div class="card-container">
      <div class="card" :class="{ 'is-flipped': isFlipped }" @click="flipCard">
        <!-- 正面：马卡龙色调，泡沫背景 -->
        <div class="card-face front">
          <div class="bubble-background">
            <div class="bubbles">
              <div class="bubble" v-for="n in 15" :key="`front-bubble-${n}`" 
                   :style="getBubbleStyle(n)">
                <div class="bubble-shine"></div>
              </div>
            </div>
            <div class="content">
              <h2>{{ frontText }}</h2>
            </div>
          </div>
        </div>
        
        <!-- 反面：全新设计，几何图案背景 -->
        <div class="card-face back">
          <div class="geometric-background">
            <div class="patterns">
              <div class="pattern" v-for="n in 12" :key="`pattern-${n}`"
                   :style="getPatternStyle(n)">
              </div>
            </div>
            <div class="circles">
              <div class="circle" v-for="n in 8" :key="`circle-${n}`"
                   :style="getCircleStyle(n)">
              </div>
            </div>
            <div class="content">
              <h2 v-html="formattedBackText"></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BubbleCard',
    props: {
      frontText: {
        type: String,
        required: true
      },
      backText: {
        type: String,
        required: true
      },
      frontColor: {
        type: String,
        default: '#D81B60' // 默认前面文字颜色
      },
      backColor: {
        type: String,
        default: '#424242' // 默认背面文字颜色
      },
      frontGradient: {
        type: String,
        default: 'linear-gradient(135deg, #FFD1DC 0%, #F8BBD0 50%, #D1C4E9 100%)'
      },
      backGradient: {
        type: String,
        default: 'linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 50%, #E0E0E0 100%)'
      }
    },
    data() {
      return {
        isFlipped: false,
        // 马卡龙色调的泡泡
        bubbleColors: [
          'rgba(255, 209, 220, 0.7)', // 粉色
          'rgba(209, 196, 233, 0.7)', // 淡紫色
          'rgba(179, 229, 252, 0.7)', // 淡蓝色
          'rgba(200, 230, 201, 0.7)', // 薄荷色
          'rgba(255, 236, 179, 0.7)'  // 淡黄色
        ],
        // 几何图案的颜色
        patternColors: [
          'rgba(224, 224, 224, 0.4)', // 浅灰色
          'rgba(189, 189, 189, 0.4)', // 中灰色
          'rgba(238, 238, 238, 0.4)', // 极浅灰色
          'rgba(158, 158, 158, 0.4)', // 深灰色
          'rgba(245, 245, 245, 0.4)'  // 近白色
        ],
        // 几何形状
        patterns: [
          'polygon(50% 0%, 0% 100%, 100% 100%)', // 三角形
          'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // 菱形
          'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // 六边形
          'circle(50% at 50% 50%)' // 圆形
        ]
      }
    },
    computed: {
      formattedBackText() {
        // 处理换行
        return this.backText.replace(/\n/g, '<br>');
      }
    },
    methods: {
      flipCard() {
        this.isFlipped = !this.isFlipped;
      },
      getBubbleStyle(index) {
        const size = 20 + Math.random() * 50;
        const colorIndex = index % this.bubbleColors.length;
        const delay = Math.random() * 8;
        const duration = 5 + Math.random() * 7;
        
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          backgroundColor: this.bubbleColors[colorIndex],
          opacity: 0.5 + Math.random() * 0.5,
          transform: `scale(${0.8 + Math.random() * 0.4})`
        };
      },
      getPatternStyle(index) {
        const size = 30 + Math.random() * 70;
        const colorIndex = index % this.patternColors.length;
        const patternIndex = index % this.patterns.length;
        const rotation = Math.random() * 360;
        
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: this.patternColors[colorIndex],
          clipPath: this.patterns[patternIndex],
          transform: `rotate(${rotation}deg)`,
          opacity: 0.1 + Math.random() * 0.5
        };
      },
      getCircleStyle(index) {
        const size = 40 + Math.random() * 120;
        const colorIndex = index % this.patternColors.length;
        
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderColor: this.patternColors[colorIndex],
          opacity: 0.1 + Math.random() * 0.3,
          borderWidth: `${1 + Math.random() * 3}px`
        };
      }
    }
  }
  </script>
  
  <style scoped>
  h2 {
    border-top: none;
  }
  .card-container {
    width: 300px;
    height: 450px; /* 2:3比例 */
    perspective: 1500px;
    margin: 20px auto;
  }
  
  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    border-radius: 24px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  
  .card.is-flipped {
    transform: rotateY(180deg);
  }
  
  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .front {
    background: v-bind(frontGradient);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .back {
    background: v-bind(backGradient);
    transform: rotateY(180deg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .content {
    text-align: center;
    padding: 20px;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }
  
  .front .content h2 {
    font-size: 54px;
    margin: 0;
    font-weight: 800;
    color: v-bind(frontColor);
    text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.5);
    letter-spacing: -1px;
    transition: all 0.3s ease;
  }
  
  .back .content h2 {
    font-size: 42px;
    margin: 0;
    font-weight: 700;
    color: v-bind(backColor);
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3);
    letter-spacing: -0.5px;
    line-height: 1.3;
    transition: all 0.3s ease;
  }
  
  .card:hover .content h2 {
    transform: scale(1.05);
  }
  
  /* 泡沫效果 */
  .bubble-background {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .bubble {
    position: absolute;
    border-radius: 50%;
    box-shadow: 
      inset 0 0 10px rgba(255, 255, 255, 0.8),
      0 5px 15px rgba(0, 0, 0, 0.1);
    animation: float 8s infinite ease-in-out;
  }
  
  .bubble-shine {
    position: absolute;
    width: 30%;
    height: 30%;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    top: 20%;
    left: 20%;
    filter: blur(3px);
  }
  
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(10px, -15px) scale(1.05);
    }
    50% {
      transform: translate(5px, -25px) scale(1.1);
    }
    75% {
      transform: translate(-5px, -15px) scale(1.05);
    }
  }
  
  /* 几何图案背景 */
  .geometric-background {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .patterns {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .pattern {
    position: absolute;
    transition: all 0.5s ease;
  }
  
  .is-flipped .pattern {
    animation: fadeInRotate 1.2s forwards ease-out;
  }
  
  @keyframes fadeInRotate {
    0% {
      opacity: 0;
      transform: rotate(0deg) scale(0.2);
    }
    100% {
      opacity: 1;
      transform: rotate(360deg) scale(1);
    }
  }
  
  .circles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .circle {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    transition: all 0.5s ease;
  }
  
  .is-flipped .circle {
    animation: pulseIn 1.5s forwards ease-out;
  }
  
  @keyframes pulseIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .front .content h2 {
      font-size: 42px;
    }
    
    .back .content h2 {
      font-size: 32px;
    }
  }
  </style>