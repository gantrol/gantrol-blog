<script setup>

</script>

<template>
  <div class="container">
    <div class="title">模型与类别越狱百分比</div>
    <table>
      <tr>
        <th></th>
        <th class="category-header">化学/生物</th>
        <th class="category-header">网络入侵</th>
        <th class="category-header">骚扰欺凌</th>
        <th class="category-header">有害行为</th>
        <th class="category-header">非法活动</th>
        <th class="category-header">虚假信息</th>
      </tr>
      <tr>
        <td class="model-name">Llama405B</td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #8B0000">93.3</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #750000">91.7</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
      </tr>
      <tr>
        <td class="model-name">O1</td>
        <td><div class="cell" style="background-color: #FFB6B6">28.6</div></td>
        <td><div class="cell" style="background-color: #FFFFFF">0.0</div></td>
        <td><div class="cell" style="background-color: #FFD6D6">16.7</div></td>
        <td><div class="cell" style="background-color: #B94646">57.1</div></td>
        <td><div class="cell" style="background-color: #FFE6E6">8.3</div></td>
        <td><div class="cell" style="background-color: #B94646">50.0</div></td>
      </tr>
      <tr>
        <td class="model-name">Gemini</td>
        <td><div class="cell" style="background-color: #CD6666">42.9</div></td>
        <td><div class="cell" style="background-color: #993333">75.0</div></td>
        <td><div class="cell" style="background-color: #B94646">50.0</div></td>
        <td><div class="cell" style="background-color: #993333">71.4</div></td>
        <td><div class="cell" style="background-color: #B94646">58.3</div></td>
        <td><div class="cell" style="background-color: #8B0000">80.0</div></td>
      </tr>
      <tr>
        <td class="model-name">GPT4o</td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #993333">66.7</div></td>
        <td><div class="cell" style="background-color: #993333">71.4</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #800000">90.0</div></td>
      </tr>
      <tr>
        <td class="model-name">Claude</td>
        <td><div class="cell" style="background-color: #FFB6B6">28.6</div></td>
        <td><div class="cell" style="background-color: #800000">87.5</div></td>
        <td><div class="cell" style="background-color: #FFB6B6">33.3</div></td>
        <td><div class="cell" style="background-color: #FFD6D6">14.3</div></td>
        <td><div class="cell" style="background-color: #FFC6C6">25.0</div></td>
        <td><div class="cell" style="background-color: #FFB6B6">30.0</div></td>
      </tr>
      <tr>
        <td class="model-name">Deepseek</td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
        <td><div class="cell" style="background-color: #660000">100.0</div></td>
      </tr>
    </table>
    <div class="legend">
      <span>0%</span>
      <div class="legend-gradient"></div>
      <span>100%</span>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
.container {
  width: 1000px;
  margin: 0 auto;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 12px;
  text-align: center;
  position: relative;
  min-width: 100px;
}
th {
  background-color: #f5f5f5;
  font-weight: bold;
}
.model-name {
  text-align: right;
  padding-right: 20px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.cell {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
}
.category-header {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 15px 0;
  height: 120px;
  white-space: nowrap;
}
.legend {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.legend-gradient {
  width: 200px;
  height: 20px;
  background: linear-gradient(to right, #fff3f3, #660000);
}
.legend-labels {
  display: flex;
  justify-content: space-between;
  width: 200px;
  font-size: 12px;
}
</style>
