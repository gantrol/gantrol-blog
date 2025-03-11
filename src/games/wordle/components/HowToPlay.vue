<template>
  <div class="how-to-play-overlay" @click.self="$emit('close')">
    <div class="how-to-play-content">
      <div class="how-to-play-header">
        <h2>如何游玩 Wordle</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>

      <div class="how-to-play-body">
        <p>猜测隐藏的5字母单词。你有6次机会。</p>

        <div class="rule-section">
          <h3>每次猜测后，方块颜色会给出提示:</h3>

          <div class="example">
            <div class="example-row">
              <div class="example-cell correct">W</div>
              <div class="example-cell">O</div>
              <div class="example-cell">R</div>
              <div class="example-cell">D</div>
              <div class="example-cell">S</div>
            </div>
            <p>W 在单词中，且位置正确!</p>
          </div>

          <div class="example">
            <div class="example-row">
              <div class="example-cell">P</div>
              <div class="example-cell present">I</div>
              <div class="example-cell">L</div>
              <div class="example-cell">O</div>
              <div class="example-cell">T</div>
            </div>
            <p>I 在单词中，但位置错误。</p>
          </div>

          <div class="example">
            <div class="example-row">
              <div class="example-cell">V</div>
              <div class="example-cell">A</div>
              <div class="example-cell">G</div>
              <div class="example-cell absent">U</div>
              <div class="example-cell">E</div>
            </div>
            <p>U 不在单词中。</p>
          </div>
        </div>

        <div class="rule-section">
          <h3>特别功能:</h3>
          <p>当只剩下最后两次尝试机会时，系统会显示可能的单词列表，帮助你缩小范围。</p>
        </div>

        <button class="play-button" @click="$emit('close')">开始游戏</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close']
}
</script>

<style scoped>
.how-to-play-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.how-to-play-content {
  background-color: white;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.how-to-play-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.how-to-play-body {
  padding: 1rem;
}

.rule-section {
  margin: 1.5rem 0;
}

.example {
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example-row {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.example-cell {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #d3d6da;
  font-weight: bold;
}

.correct {
  background-color: #6aaa64;
  border-color: #6aaa64;
  color: white;
}

.present {
  background-color: #c9b458;
  border-color: #c9b458;
  color: white;
}

.absent {
  background-color: #787c7e;
  border-color: #787c7e;
  color: white;
}

.play-button {
  width: 100%;
  padding: 0.75rem;
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
  .example-cell {
    width: 2rem;
    height: 2rem;
    font-size: 0.9rem;
  }
}
</style>
