<template>
  <div class="how-to-play-container">
    <div class="how-to-play-content">
      <div class="header">
        <h2>如何游玩</h2>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="rules">
        <p>猜出隐藏的单词。你有6次机会。</p>
        <p>每次猜测后，方块的颜色会改变，显示你的猜测有多接近答案。</p>
      </div>

      <div class="examples">
        <h3>示例</h3>

        <div class="example">
          <div class="word-row">
            <div class="word-tile correct">W</div>
            <div class="word-tile">E</div>
            <div class="word-tile">A</div>
            <div class="word-tile">R</div>
            <div class="word-tile">Y</div>
          </div>
          <p><b>W</b> 在正确的位置。</p>
        </div>

        <div class="example">
          <div class="word-row">
            <div class="word-tile">P</div>
            <div class="word-tile wrong-position">I</div>
            <div class="word-tile">L</div>
            <div class="word-tile">L</div>
            <div class="word-tile">S</div>
          </div>
          <p><b>I</b> 在单词中，但位置错误。</p>
        </div>

        <div class="example">
          <div class="word-row">
            <div class="word-tile">V</div>
            <div class="word-tile">A</div>
            <div class="word-tile">G</div>
            <div class="word-tile wrong-letter">U</div>
            <div class="word-tile">E</div>
          </div>
          <p><b>U</b> 不在单词中。</p>
        </div>
      </div>

      <div class="extra-info">
        <p>每次随机选一个新单词。</p>
        <p>使用键盘或屏幕上的按键输入字母。</p>
        <p>按回车键提交你的猜测。</p>
        <p>右上角💡按钮有提示，剩下三步后会列出可能的单词</p>
      </div>

      <button class="play-button" @click="$emit('close')">开始游戏</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToPlay',
  emits: ['close']
}
</script>

<style scoped>
.how-to-play-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
  overflow-y: auto;
}

.how-to-play-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  font-size: 1.8rem;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.rules {
  margin-bottom: 1.5rem;
}

.examples {
  margin-bottom: 1.5rem;
}

.example {
  margin-bottom: 1rem;
}

.word-row {
  display: flex;
  gap: 5px;
  margin-bottom: 0.5rem;
}

.word-tile {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  border: 2px solid #d3d6da;
  background-color: white;
}

.correct {
  background-color: #6aaa64;
  color: white;
  border-color: #6aaa64;
}

.wrong-position {
  background-color: #c9b458;
  color: white;
  border-color: #c9b458;
}

.wrong-letter {
  background-color: #787c7e;
  color: white;
  border-color: #787c7e;
}

.extra-info {
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #d3d6da;
}

.play-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background-color: #6aaa64;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.play-button:hover {
  background-color: #588e53;
}

@media (max-width: 767px) {
  .how-to-play-content {
    padding: 1.5rem;
  }

  .word-tile {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }

  .header h2 {
    font-size: 1.5rem;
  }
}
</style>
