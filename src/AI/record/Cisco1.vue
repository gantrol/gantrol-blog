<script setup>

</script>

<template>
  <div class="chart-container">
    <div class="title">主流LLM模型攻击成功率</div>
    <svg width="800" height="500" viewBox="0 0 800 500">
      <g class="grid">
        <line x1="100" y1="50" x2="100" y2="400" stroke="#ddd"/>
        <line x1="100" y1="400" x2="750" y2="400" stroke="#ddd"/>
        <line x1="100" y1="330" x2="750" y2="330" stroke="#ddd" stroke-dasharray="3,3"/>
        <line x1="100" y1="260" x2="750" y2="260" stroke="#ddd" stroke-dasharray="3,3"/>
        <line x1="100" y1="190" x2="750" y2="190" stroke="#ddd" stroke-dasharray="3,3"/>
        <line x1="100" y1="120" x2="750" y2="120" stroke="#ddd" stroke-dasharray="3,3"/>
        <line x1="100" y1="50" x2="750" y2="50" stroke="#ddd" stroke-dasharray="3,3"/>
      </g>
      <g class="y-axis">
        <text x="50" y="250" class="y-axis-label" transform="rotate(-90,50,250)">成功率 (%)</text>
        <text x="80" y="405" class="label">0</text>
        <text x="80" y="335" class="label">20</text>
        <text x="80" y="265" class="label">40</text>
        <text x="80" y="195" class="label">60</text>
        <text x="80" y="125" class="label">80</text>
        <text x="80" y="55" class="label">100</text>
      </g>
      <g class="bars">
        <!-- DeepSeek-R1 -->
        <rect class="bar" x="120" y="50" width="80" height="350"/>
        <text x="160" y="420" class="label" text-anchor="middle">DeepSeek-R1</text>
        <text x="160" y="40" class="bar-value" text-anchor="middle">100%</text>
        <rect class="bar" x="230" y="64" width="80" height="336"/>
        <text x="270" y="420" class="label" text-anchor="middle">Llama-3.1-405B</text>
        <text x="270" y="54" class="bar-value" text-anchor="middle">96%</text>
        <rect class="bar" x="340" y="99" width="80" height="301"/>
        <text x="380" y="420" class="label" text-anchor="middle">GPT-4o</text>
        <text x="380" y="89" class="bar-value" text-anchor="middle">86%</text>
        <rect class="bar" x="450" y="176" width="80" height="224"/>
        <text x="490" y="420" class="label" text-anchor="middle">Gemini-1.5-pro</text>
        <text x="490" y="166" class="bar-value" text-anchor="middle">64%</text>
        <rect class="bar" x="560" y="274" width="80" height="126"/>
        <text x="600" y="420" class="label" text-anchor="middle">Claude-3.5-Sonnet</text>
        <text x="600" y="264" class="bar-value" text-anchor="middle">36%</text>
        <rect class="bar" x="670" y="309" width="80" height="91"/>
        <text x="710" y="420" class="label" text-anchor="middle">O1-preview</text>
        <text x="710" y="299" class="bar-value" text-anchor="middle">26%</text>
      </g>
      <g class="legend">
        <rect x="600" y="20" width="20" height="20" fill="#60A5FA"/>
        <text x="630" y="35" class="legend">攻击成功率</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>

.chart-container {
  width: 800px;
  height: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.bar {
  fill: #60A5FA;
  transition: opacity 0.2s;
}

.bar:hover {
  opacity: 0.8;
}

.grid line {
  stroke: #ddd;
  stroke-dasharray: 3, 3;
}

.label {
  font-size: 12px;
}

.y-axis-label {
  font-size: 14px;
  font-weight: bold;
}

.bar-value {
  font-size: 12px;
  font-weight: bold;
}

.legend {
  font-size: 14px;
}
</style>
