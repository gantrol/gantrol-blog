<template>
    <div class="app-container">
        <div class="calculator-wrapper">
            <!-- Language Switch -->
            <div class="language-switch">
                <button @click="toggleLanguage" class="language-btn">
                    {{ currentLanguage === "en" ? "中文" : "English" }}
                </button>
            </div>

            <!-- Main Card -->
            <div class="main-card">
                <!-- Title -->
                <div class="title-container">
                    <h1 class="title">{{ t("title") }}</h1>
                </div>

                <!-- Input Section -->
                <div class="input-section">
                    <label class="label">{{ t("targetCards") }}</label>
                    <input
                        v-model.number="targetCards"
                        type="number"
                        min="1"
                        max="30"
                        class="number-input"
                    />
                </div>

                <!-- Strategy Selection -->
                <div class="input-section">
                    <label class="label">{{ t("strategy") }}</label>
                    <select v-model="strategy" class="select-input">
                        <option value="mulligan">
                            {{ t("mulliganStrategy") }}
                        </option>
                        <option value="keep">{{ t("keepStrategy") }}</option>
                    </select>
                </div>

                <!-- Results -->
                <div class="results-container">
                    <!-- First Player Card -->
                    <div class="result-card">
                        <h3 class="result-title">{{ t("firstPlayer") }}</h3>
                        <div class="probability">
                            {{ (getFirstPlayerProbability * 100).toFixed(2) }}%
                        </div>
                    </div>

                    <!-- Second Player Card -->
                    <div class="result-card">
                        <h3 class="result-title">{{ t("secondPlayer") }}</h3>
                        <div class="probability">
                            {{ (getSecondPlayerProbability * 100).toFixed(2) }}%
                        </div>
                    </div>
                </div>

                <!-- Footer Note -->
                <div class="footer">
                    <p class="note">{{ t("note") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentLanguage: "zh",
            targetCards: 2,
            strategy: "mulligan",
            translations: {
                en: {
                    title: "Hearthstone Draw Calculator",
                    targetCards: "Number of Key Cards:",
                    strategy: "Mulligan Strategy:",
                    mulliganStrategy: "Mulligan All If None Found",
                    keepStrategy: "Keep Initial Hand",
                    firstPlayer: "First Player",
                    secondPlayer: "Second Player",
                    note: "Calculate the probability of drawing at least one of your key cards in your opening hand.",
                },
                zh: {
                    title: "炉石传说抽卡概率",
                    targetCards: "关键卡牌数量：",
                    strategy: "调度策略：",
                    mulliganStrategy: "没找到就全换",
                    keepStrategy: "保留起手牌",
                    firstPlayer: "先手概率",
                    secondPlayer: "后手概率",
                    note: "计算在起手时抽到至少一张关键卡牌的概率。",
                },
            },
        };
    },
    methods: {
        t(key) {
            return this.translations[this.currentLanguage][key];
        },
        toggleLanguage() {
            this.currentLanguage = this.currentLanguage === "en" ? "zh" : "en";
        },
        combination(n, r) {
            if (r > n) return 0;
            if (r === 0) return 1;
            if (r === n) return 1;
            if (r > n - r) r = n - r;
            let result = 1;
            for (let i = 1; i <= r; i++) {
                result *= n + 1 - i;
                result /= i;
            }
            return result;
        },
    },
    computed: {
        getFirstPlayerProbability() {
            const deckSize = 30;
            const firstHandSize = 3;
            const targetCardsCount = this.targetCards;

            if (this.strategy === "mulligan") {
                const notFoundProb =
                    this.combination(
                        deckSize - targetCardsCount * 2,
                        firstHandSize,
                    ) / this.combination(deckSize, firstHandSize);
                return 1 - notFoundProb;
            } else {
                const notFoundProb =
                    this.combination(
                        deckSize - targetCardsCount,
                        firstHandSize,
                    ) / this.combination(deckSize, firstHandSize);
                return 1 - notFoundProb;
            }
        },
        getSecondPlayerProbability() {
            const deckSize = 30;
            const secondHandSize = 4;
            const targetCardsCount = this.targetCards;

            if (this.strategy === "mulligan") {
                const notFoundProb =
                    this.combination(
                        deckSize - targetCardsCount * 2,
                        secondHandSize,
                    ) / this.combination(deckSize, secondHandSize);
                return 1 - notFoundProb;
            } else {
                const notFoundProb =
                    this.combination(
                        deckSize - targetCardsCount,
                        secondHandSize,
                    ) / this.combination(deckSize, secondHandSize);
                return 1 - notFoundProb;
            }
        },
    },
};
</script>

<style scoped>
.app-container {
    min-height: 100vh;
    padding: 20px;
    background: url("/wood-texture.jpg") center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.calculator-wrapper {
    width: 100%;
    max-width: 800px;
    position: relative;
}

.language-switch {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.language-btn {
    padding: 10px 24px;
    background: linear-gradient(to bottom, #ffd700, #b8860b);
    border: 2px solid #8b4513;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.language-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.main-card {
    background: url("/parchment.jpg") center/cover;
    border: 4px solid #8b4513;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;
}

.main-card:hover {
    transform: scale(1.01);
}

.title-container {
    text-align: center;
    margin-bottom: 30px;
    position: relative;
}

.title-container::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: linear-gradient(to right, transparent, #8b4513, transparent);
}

.title {
    font-size: 32px;
    color: #8b4513;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
}

.input-section {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.label {
    display: block;
    font-size: 18px;
    color: #8b4513;
    margin-bottom: 10px;
    font-weight: bold;
}

.number-input,
.select-input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #8b4513;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    color: #8b4513;
    transition:
        border-color 0.3s,
        box-shadow 0.3s;
}

.number-input:focus,
.select-input:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.results-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.result-card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 215, 0, 0.1)
    );
    border: 2px solid #8b4513;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s;
}

.result-card:hover {
    transform: scale(1.05);
}

.result-title {
    font-size: 20px;
    color: #8b4513;
    margin-top: 0px;
    margin-bottom: 15px;
    font-weight: bold;
}

.probability {
    font-size: 28px;
    color: #8b4513;
    font-weight: bold;
}

.footer {
    text-align: center;
    border-top: 1px solid rgba(139, 69, 19, 0.2);
    padding-top: 20px;
}

.note {
    font-size: 14px;
    color: rgba(139, 69, 19, 0.8);
    font-style: italic;
}

/* 移除数字输入框的箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

@media (max-width: 600px) {
    .results-container {
        grid-template-columns: 1fr;
    }

    .main-card {
        padding: 20px;
    }

    .title {
        font-size: 24px;
    }
}
</style>
