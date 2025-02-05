<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Information Theory: R3 Encoding & Majority Vote Decoding</h1>
      <div class="noise-control">
        <label for="noiseLevel">Channel Noise Level (f):</label>
        <div class="formula">f = <span>{{ noiseLevel }}</span>%</div>
        <input
            type="range"
            id="noiseLevel"
            class="noise-slider"
            min="0"
            max="50"
            v-model="noiseLevel"
            @input="updateNoisyBlocks"
        />
      </div>
    </div>

    <div class="blocks-container">
      <div class="block-section">
        <div class="block-title">Original Signal (s)</div>
        <div class="pixel-block">
          <div v-for="pixel in 64" :key="'original-' + pixel" class="pixel"></div>
        </div>
      </div>

      <div class="block-section">
        <div class="block-title">Encoded Signal (t)</div>
        <div class="pixel-block" v-for="i in 3" :key="'encoded-' + i">
          <div v-for="pixel in 64" :key="'encoded-' + i + '-' + pixel" class="pixel"></div>
        </div>
      </div>

      <div class="block-section">
        <div class="block-title">Noisy Channel (r)</div>
        <div v-for="i in 3" :key="'noisy-' + i" class="pixel-block">
          <div v-for="pixel in 64" :key="'noisy-' + i + '-' + pixel" class="pixel" :class="{ noisy: isPixelNoisy(i, pixel) }"></div>
        </div>
      </div>

      <div class="block-section">
        <div class="block-title">Decoded Signal (ŝ)</div>
        <div class="pixel-block">
          <div v-for="pixel in 64" :key="'decoded-' + pixel" class="pixel" :class="{ noisy: isDecodedPixelNoisy(pixel) }"></div>
        </div>
      </div>
    </div>

    <div class="description">
      This visualization demonstrates the R3 encoding strategy and majority vote decoding in information theory:
      <ol>
        <li>The original signal is encoded by creating three identical copies (R3 strategy)</li>
        <li>Each copy passes through a noisy channel where bits may flip with probability f</li>
        <li>The decoder uses majority voting from the three received copies to reconstruct the original signal</li>
        <li>This technique reduces the probability of decoded bit errors significantly</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const noiseLevel = ref(10);

const pixels = Array(64).fill(false); // false means not noisy, true means noisy

const isPixelNoisy = (blockIndex, pixelIndex) => {
  // Simulate whether a pixel is noisy based on noise level
  return Math.random() < noiseLevel.value / 100;
};

const isDecodedPixelNoisy = (pixelIndex) => {
  const noisyBlocks = [1, 2, 3]; // Simulate three noisy blocks for majority voting
  const votes = noisyBlocks.map(block => !isPixelNoisy(block, pixelIndex));
  return votes.filter(v => v).length < 2;
};

// Method to update noisy blocks when noise level changes
const updateNoisyBlocks = () => {
  // You can perform additional logic to update noisy blocks when slider changes
  // This is handled directly in the template using computed properties and reactivity
};
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.noise-control {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem;
  text-align: center;
}

.noise-slider {
  width: 100%;
  margin: 1rem 0;
}

.blocks-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.block-section {
  text-align: center;
  flex: 1;
  min-width: 200px;
}

.block-title {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 1rem;
  font-weight: 500;
}

.pixel-block {
  width: 160px;
  height: 160px;
  margin: 0 auto 1rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
  background: #eee;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pixel {
  background: #FFB7C5;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.pixel.noisy {
  background: #ccc;
}

.arrows {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #95a5a6;
  margin: 1rem 0;
}

.description {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
  line-height: 1.6;
}

.formula {
  font-family: "Times New Roman", serif;
  font-style: italic;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin: 0.5rem 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .blocks-container {
    flex-direction: column;
    align-items: center;
  }

  .block-section {
    width: 100%;
    margin-bottom: 2rem;
  }
}
</style>
