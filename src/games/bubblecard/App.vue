<template>
    <div class="app">
      <h1>戳破语言泡沫</h1>
      <p class="subtitle">点击卡片可以切换正反面</p>
      
      <div class="cards-container">
        <bubble-card
          v-for="(card, index) in cards"
          :key="index"
          :front-text="card.front"
          :back-text="card.back"
          :front-color="card.frontColor"
          :back-color="card.backColor"
          :front-gradient="card.frontGradient"
          :back-gradient="card.backGradient"
        />
      </div>
    </div>
  </template>
  
  <script>
  import BubbleCard from './BubbleCard.vue';
  
  export default {
    name: 'App',
    components: {
      BubbleCard
    },
    data() {
      return {
    cards: [
      {
        front: '下次约饭',
        back: '对啊，下次',
        frontColor: '#D81B60',
        backColor: '#424242',
        frontGradient: 'linear-gradient(135deg, #FFD1DC 0%, #F8BBD0 50%, #D1C4E9 100%)',
        backGradient: 'linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 50%, #E0E0E0 100%)'
      },
      {
        front: '有空再聊',
        back: '没空也不聊',
        frontColor: '#1E88E5',
        backColor: '#263238',
        frontGradient: 'linear-gradient(135deg, #BBDEFB 0%, #90CAF9 50%, #64B5F6 100%)',
        backGradient: 'linear-gradient(135deg, #455A64 0%, #607D8B 50%, #78909C 100%)'
      },
      {
        front: '改天请你吃饭',
        back: '改天等于没有这一天',
        frontColor: '#43A047',
        backColor: '#1A237E',
        frontGradient: 'linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 50%, #81C784 100%)',
        backGradient: 'linear-gradient(135deg, #3949AB 0%, #5C6BC0 50%, #7986CB 100%)'
      },
      {
        front: '我考虑一下吧',
        back: '已经拒绝，只是你没听懂',
        frontColor: '#7B1FA2',
        backColor: '#311B92',
        frontGradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 50%, #BA68C8 100%)',
        backGradient: 'linear-gradient(135deg, #512DA8 0%, #7E57C2 50%, #9575CD 100%)'
      },
      {
        front: '保持联系哈',
        back: '你不主动，我绝对不会联系',
        frontColor: '#F4511E',
        backColor: '#004D40',
        frontGradient: 'linear-gradient(135deg, #FFCCBC 0%, #FFAB91 50%, #FF8A65 100%)',
        backGradient: 'linear-gradient(135deg, #00796B 0%, #26A69A 50%, #4DB6AC 100%)'
      },
      {
        front: '最近比较忙',
        back: '只对你比较忙',
        frontColor: '#C0CA33',
        backColor: '#3E2723',
        frontGradient: 'linear-gradient(135deg, #F0F4C3 0%, #E6EE9C 50%, #DCE775 100%)',
        backGradient: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 50%, #A1887F 100%)'
      },
      {
        front: '你人挺好的',
        back: '就是没别的优点可夸了',
        frontColor: '#00ACC1',
        backColor: '#212121',
        frontGradient: 'linear-gradient(135deg, #B2EBF2 0%, #80DEEA 50%, #4DD0E1 100%)',
        backGradient: 'linear-gradient(135deg, #424242 0%, #616161 50%, #757575 100%)'
      },
      {
        front: '我回头再说',
        back: '说了你也别当真',
        frontColor: '#5E35B1',
        backColor: '#0D47A1',
        frontGradient: 'linear-gradient(135deg, #D1C4E9 0%, #B39DDB 50%, #9575CD 100%)',
        backGradient: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 50%, #64B5F6 100%)'
      },
      {
        front: '改天来我家坐坐',
        back: '客气一下，你千万别真来',
        frontColor: '#FB8C00',
        backColor: '#1B5E20',
        frontGradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 50%, #FFB74D 100%)',
        backGradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%)'
      },
      {
        front: '我也就随便看看',
        back: '看完不会买，别再推销了',
        frontColor: '#039BE5',
        backColor: '#37474F',
        frontGradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 50%, #4FC3F7 100%)',
        backGradient: 'linear-gradient(135deg, #546E7A 0%, #78909C 50%, #90A4AE 100%)'
      },
      {
        front: '刚才没看到信息',
        back: '看到了，但不想回',
        frontColor: '#00897B',
        backColor: '#4A148C',
        frontGradient: 'linear-gradient(135deg, #B2DFDB 0%, #80CBC4 50%, #4DB6AC 100%)',
        backGradient: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%)'
      },
      {
        front: '下回请你喝奶茶',
        back: '纯口头福利，没有兑现记录',
        frontColor: '#8E24AA',
        backColor: '#33691E',
        frontGradient: 'linear-gradient(135deg, #E1BEE7 0%, #CE93D8 50%, #BA68C8 100%)',
        backGradient: 'linear-gradient(135deg, #558B2F 0%, #7CB342 50%, #9CCC65 100%)'
      },
      {
        front: '有缘再见',
        back: '无缘，勿念',
        frontColor: '#F9A825',
        backColor: '#01579B',
        frontGradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 50%, #FFF176 100%)',
        backGradient: 'linear-gradient(135deg, #0277BD 0%, #039BE5 50%, #29B6F6 100%)'
      },
      {
        front: '你先忙你的',
        back: '我忙我的，别再烦我',
        frontColor: '#546E7A',
        backColor: '#880E4F',
        frontGradient: 'linear-gradient(135deg, #CFD8DC 0%, #B0BEC5 50%, #90A4AE 100%)',
        backGradient: 'linear-gradient(135deg, #AD1457 0%, #D81B60 50%, #EC407A 100%)'
      },
      {
        front: '下个月约一下',
        back: '到时再找个理由推脱',
        frontColor: '#6D4C41',
        backColor: '#BF360C',
        frontGradient: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 50%, #A1887F 100%)',
        backGradient: 'linear-gradient(135deg, #D84315 0%, #F4511E 50%, #FF7043 100%)'
      },
      {
        front: '先这样吧',
        back: '累了，不想再继续了',
        frontColor: '#EC407A',
        backColor: '#4A148C',
        frontGradient: 'linear-gradient(135deg, #F8BBD0 0%, #F48FB1 50%, #F06292 100%)',
        backGradient: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%)'
      },
      {
        front: '改天一定补上',
        back: '下次我依旧会忘',
        frontColor: '#D81B60',
        backColor: '#263238',
        frontGradient: 'linear-gradient(135deg, #FFCDD2 0%, #EF9A9A 50%, #E57373 100%)',
        backGradient: 'linear-gradient(135deg, #455A64 0%, #607D8B 50%, #78909C 100%)'
      }
    ]
  }
  
    }
  }
  </script>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }
  
  .app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-size: 42px;
    margin-bottom: 10px;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    font-size: 18px;
    margin-bottom: 40px;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    .cards-container {
      gap: 20px;
    }
  }
  </style>
  