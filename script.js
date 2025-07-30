// script.js (Tam ve Güncel Hali)

const CONFIG = {
  emojiCategories: {
    '2x2': ['🐶', '🐱'], '3x3': ['🍎', '🍊', '🍋', '🍌'], '4x4': ['🚗', '🚚', '🚜', '🚂', '🚁', '✈️', '🚤', '⛵'], '5x5': ['🍔', '🍕', '🌭', '🍟', '🍝', '🥗', '🍣', '🍱', '🥟', '🍰', '🍩', '🍫'],
    '4x8': ['🌟', '🔋', '🔥', '💧', '❄️', '⚡', '🌈', '☀️', '🌙', '⭐', '🌍', '🌐', '🛰️', '🪐', '💥', '🕒'], '5x9': ['🎉', '🎊', '📚', '✏️', '📖', '🖌️', '📜', '📍', '📦', '🔧', '🔨', '⚙️', '🧲', '🔬', '🔭', '🧪', '🧬', '🩺', '💊', '💉', '🩹', '🩼'],
    '6x9': ['⚽', '🏀', '🏈', '🎾', '🏐', '🏓', '🏸', '🥊', '⛳', '🎳', '🏒', '🥋', '🏊', '🏄', '🚴', '🤾', '🏋️', '⛸️', '🥇', '🥈', '🥉', '🏆', '🎯', '🎱', '🥏', '🎣', '🎽'], '8x10': ['🎸', '🎹', '🎻', '🥁', '🎺', '🎷', '🎤', '🎧', '🎼', '🎵', '🎶', '📯', '🪗', '🪕', '🎙️', '🔔', '🖼️', '🎨', '🎭', '🎬', '🎪', '🎫', '🎟️', '🎮', '🕹️', '🧩', '🧸', '🪁', '🏹', '🪄', '♟️', '♠️', '♣️', '♥️', '♦️', '🎲', '🎰', '🗿'],
    '9x11': ['👑', '🎩', '🧢', '👓', '🕶️', '👔', '👗', '👠', '🥾', '🧦', '🧤', '🧣', '👖', '👕', '👚', '👟', '🥿', '👢', '👞', '👡', '👙', '🩱', '🩲', '🩳', '🧥', '🦺', '🧱', '🧲', '🧳', '🧴', '🧵', '🧶', '🧷', '🧹', '🧺', '🧽', '🧼', '🪠', '🔑', '🚪', '🪑', '🛋', '🛏️', '🚽', '🚿', '🛁'], '9x12': ['🌺', '🌸', '🏵️', '🌹', '🥀', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌰', '🌼', '🌻', '🌍', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌚', '🌝', '🌞', '⭐', '🌟', '🌠', '🌌', '🌤️', '🌥️', '🌦️', '☁️', '🌨️', '⛈️', '🌩️', '🌪️', '🌫️', '🌬️', '🌊', '💧', '💦', '☔']
  },
  emojiTypes: { '2x2': 'hayvan', '3x3': 'meyve', '4x4': 'taşıt', '5x5': 'yiyecek', '4x8': 'çeşitli simge A', '5x9': 'çeşitli simge B', '6x9': 'spor', '8x10': 'sanat & eğlence', '9x11': 'giyim & eşya', '9x12': 'doğa & hava' },
  levels: { '2x2': 'İlk Bakış (2x2)', '3x3': 'Hafif Hatırlama (3x3)', '4x4': 'Akılda Kal! (4x4)', '5x5': 'Zihin Egzersizi (5x5)', '4x8': 'Karışık Kutular (4x8)', '5x9': 'Gizli İpuçları (5x9)', '6x9': 'Hafıza Labirenti (6x9)', '8x10': 'Zihin Oyunu (8x10)', '9x11': 'Usta Eşleyici (9x11)', '9x12': 'Efsane Hafıza (9x12)' },
  powerups: { 'Göz': '👁️', 'Zaman': '⏱️', 'Karıştırıcı': '🔄' },
  timeLimits: { '2x2': 30, '3x3': 45, '4x4': 60, '5x5': 90, '4x8': 110, '5x9': 135, '6x9': 160, '8x10': 240, '9x11': 300, '9x12': 330 },
  cardSize: { minFontSize: 8, maxFontSize: 48, fontScale: { default: 0.45, medium: 0.60, large: 0.70 } }
};

const Game = {
  elements: {
    homeContainer: document.getElementById('home-container'), gameContainer: document.getElementById('game-container'), board: document.getElementById('game-board'),
    movesDisplay: document.getElementById('moves'), timeDisplay: document.getElementById('time'), scoreDisplay: document.getElementById('score'),
    levelDisplay: document.getElementById('level'), highScoreDisplay: document.getElementById('high-score'), modal: document.getElementById('modal'),
    modalLevel: document.getElementById('modal-level'), modalMoves: document.getElementById('modal-moves'), modalTime: document.getElementById('modal-time'),
    modalScore: document.getElementById('modal-score'), modalHighScore: document.getElementById('modal-high-score'), loseModal: document.getElementById('lose-modal'),
    loseModalLevel: document.getElementById('lose-modal-level'), loseModalMoves: document.getElementById('lose-modal-moves'),
    loseModalScore: document.getElementById('lose-modal-score'), startModal: document.getElementById('start-modal'),
    startModalMessage: document.getElementById('start-modal-message'), themeToggle: document.getElementById('theme-toggle'),
    clickSound: document.getElementById('clickSound'), matchSound: document.getElementById('matchSound'),
    mismatchSound: document.getElementById('mismatchSound'), winSound: document.getElementById('winSound'), nextLevelButton: document.querySelector('.next-level-btn'),
    gameStats: document.getElementById('game-stats'), buttonContainer: document.getElementById('button-container'),
    toastContainer: document.getElementById('toast-container')
  },
  state: {
    cards: [], firstCard: null, secondCard: null, lockBoard: false, moves: 0, time: 0, score: 0, level: '4x4',
    rows: 4, cols: 4, isPaused: false, isTimerStarted: false, timer: null,
    highScores: JSON.parse(localStorage.getItem('highScores') || '{}'), pairCount: 0, matchedPairs: 0, isTransitioningLevel: false,
    unlockedLevels: JSON.parse(localStorage.getItem('unlockedLevels') || '["2x2", "3x3"]'),
    streak: 0, mistakes: 0
  },

  init() {
    this.loadHighScores(); this.setupEventListeners(); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme'); if (savedTheme === 'dark' || (!savedTheme && prefersDark)) { document.body.classList.add('dark-mode'); this.elements.themeToggle.textContent = '☀️'; } else { document.body.classList.remove('dark-mode'); this.elements.themeToggle.textContent = '🌙'; }
    this.updateLevelButtons();
  },
  loadHighScores() { this.state.highScores = JSON.parse(localStorage.getItem('highScores') || '{}'); },
  updateHighScoreDisplay() { this.elements.highScoreDisplay.textContent = this.state.highScores[this.state.level] || 0; },
  setupEventListeners() {
    document.querySelectorAll('.level-selection-new button').forEach(btn => btn.addEventListener('click', () => { this.playSound(this.elements.clickSound); this.startGame(btn.dataset.level); }));
    document.getElementById('rules-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); document.getElementById('rules-modal').style.display = 'flex'; });
    document.getElementById('rules-modal').querySelector('button').addEventListener('click', () => { this.playSound(this.elements.clickSound); document.getElementById('rules-modal').style.display = 'none';});
    document.getElementById('pause-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.pauseGame(); });
    document.getElementById('restart-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.restartGame(); });
    document.getElementById('hint-button').addEventListener('click', () => { if (!this.state.isPaused) { this.showHint(); }});
    document.querySelector('.back-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.backToHome(); });
    document.getElementById('reset-progress-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.resetProgress(); });
    this.elements.themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); const isDark = document.body.classList.contains('dark-mode'); this.elements.themeToggle.textContent = isDark ? '☀️' : '🌙'; localStorage.setItem('theme', isDark ? 'dark' : 'light'); this.playSound(this.elements.clickSound); });
    this.elements.startModal.querySelector('button').addEventListener('click', () => this.startGameModal());
    document.querySelector('#modal .close-modal-btn').addEventListener('click', () => this.closeModal());
    this.elements.nextLevelButton.addEventListener('click', () => this.nextLevel());
    this.elements.loseModal.querySelector('.restart-game-btn').addEventListener('click', () => this.restartGame());
    this.elements.loseModal.querySelector('.back-to-home-btn').addEventListener('click', () => this.backToHome());
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && this.elements.gameContainer.style.display === 'flex' && !this.state.isPaused) { this.pauseGame(true); } });
  },
  playSound(soundElement) { if (soundElement && typeof soundElement.play === 'function') { soundElement.currentTime = 0; if (soundElement.readyState >= 2) { soundElement.play().catch(error => {}); } } },
  parseLevelString(levelString) { const parts = levelString.split('x'); return { cols: parseInt(parts[0], 10), rows: parseInt(parts[1], 10) }; },

  startGame(selectedLevelKey) {
    this.state.level = selectedLevelKey;
    const dimensions = this.parseLevelString(selectedLevelKey);
    if (isNaN(dimensions.cols) || isNaN(dimensions.rows) || dimensions.cols <= 0 || dimensions.rows <= 0) { this.backToHome(); return; }
    this.state.rows = dimensions.rows; this.state.cols = dimensions.cols;
    this.elements.homeContainer.classList.add('hidden-view');
    this.elements.gameContainer.classList.remove('hidden-view');
    this.state.time = CONFIG.timeLimits[this.state.level] || 120;
    this.state.moves = 0; this.state.score = 0; this.state.matchedPairs = 0; this.state.isPaused = true; this.state.isTimerStarted = false; this.state.firstCard = null; this.state.secondCard = null; this.state.lockBoard = false;
    this.elements.movesDisplay.textContent = this.state.moves; this.elements.timeDisplay.textContent = this.state.time; this.elements.scoreDisplay.textContent = this.state.score;
    this.elements.levelDisplay.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`;
    this.updateHighScoreDisplay();
    document.getElementById('pause-button').textContent = 'Duraklat'; this.elements.board.style.pointerEvents = 'none'; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none';
    if (this.state.timer) clearInterval(this.state.timer);
    const timerElement = document.querySelector('.timer-box');
    if (timerElement) timerElement.style.animation = 'timerFlash 1s infinite';
    requestAnimationFrame(() => { this.createBoard(); });
    const levelName = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; const timeLimit = CONFIG.timeLimits[this.state.level] || 120; const emojiType = CONFIG.emojiTypes[this.state.level] || 'çeşitli';
    this.elements.startModalMessage.textContent = `${levelName}. Bu bölümde ${emojiType} emojileri ve ${timeLimit} saniye süreniz var. Başarılar!`;
    this.elements.startModal.style.display = 'flex'; this.elements.startModal.querySelector('button').focus();
  },
  startGameModal() { this.elements.startModal.style.display = 'none'; this.state.isPaused = false; this.elements.board.style.pointerEvents = 'auto'; this.state.isTransitioningLevel = false; if (!this.state.isTimerStarted && !this.state.isPaused) { this.startTimer(); } },
  backToHome() {
    if (this.state.timer) clearInterval(this.state.timer);
    this.elements.homeContainer.classList.remove('hidden-view');
    this.elements.gameContainer.classList.add('hidden-view');
    this.state.isTimerStarted = false; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none'; this.elements.startModal.style.display = 'none'; this.state.isTransitioningLevel = false;
    this.updateLevelButtons();
  },
  createBoard() {
    this.elements.board.innerHTML = ''; this.state.cards = []; this.state.streak = 0; this.state.mistakes = 0;
    document.getElementById('hint-button').disabled = false;
    this.elements.board.style.gridTemplateColumns = `repeat(${this.state.cols}, 1fr)`;
    const totalCards = this.state.rows * this.state.cols;
    this.state.pairCount = Math.floor(totalCards / 2);
    let currentLevelEmojis = [...CONFIG.emojiCategories[this.state.level]];
    let emojisToUse = currentLevelEmojis.sort(() => 0.5 - Math.random()).slice(0, this.state.pairCount);
    let pairsData = [];
    emojisToUse.forEach(emoji => { pairsData.push({ type: 'emoji', value: emoji }); pairsData.push({ type: 'emoji', value: emoji }); });
    const powerupKeys = Object.keys(CONFIG.powerups);
    const powerupCount = Math.floor(this.state.pairCount / 8);
    for (let i = 0; i < powerupCount && powerupKeys.length > 0 && pairsData.length >= 2; i++) {
        const randomPowerupKey = powerupKeys[Math.floor(Math.random() * powerupKeys.length)];
        const powerupEmoji = CONFIG.powerups[randomPowerupKey];
        pairsData.splice(0, 2);
        pairsData.push({ type: 'powerup', value: powerupEmoji, name: randomPowerupKey });
        pairsData.push({ type: 'powerup', value: powerupEmoji, name: randomPowerupKey });
    }
    let shuffledPairs = pairsData.sort(() => 0.5 - Math.random());
    let finalCardData;
    const hasUnpairedCard = totalCards % 2 !== 0;
    if (hasUnpairedCard) {
      const centerCardIndex = Math.floor(shuffledPairs.length / 2);
      shuffledPairs.splice(centerCardIndex, 0, { type: 'empty' });
      finalCardData = shuffledPairs;
    } else {
      finalCardData = shuffledPairs;
    }
    const boardElement = this.elements.board;
    const boardStyle = getComputedStyle(boardElement);
    const boardClientWidth = boardElement.clientWidth;
    if (boardClientWidth === 0) { return; }
    const boardGap = parseFloat(boardStyle.gap) || 4;
    let cardSideLength = (boardClientWidth - (this.state.cols - 1) * boardGap) / this.state.cols;
    let scaleFactor = CONFIG.cardSize.fontScale.default;
    const totalCardsInGrid = this.state.cols * this.state.rows;
    if (totalCardsInGrid >= 80) { scaleFactor = CONFIG.cardSize.fontScale.large; } else if (totalCardsInGrid >= 50) { scaleFactor = CONFIG.cardSize.fontScale.medium; }
    let fontSize = Math.floor(cardSideLength * scaleFactor);
    fontSize = Math.max(fontSize, CONFIG.cardSize.minFontSize);
    for (let i = 0; i < finalCardData.length; i++) {
      const card = document.createElement('div'); card.classList.add('card');
      const cardDataItem = finalCardData[i];
      if (cardDataItem.type === 'empty') {
        card.classList.add('center-card');
      } else {
        card.classList.add('hidden'); card.dataset.emoji = cardDataItem.value;
        if (cardDataItem.type === 'powerup') { card.dataset.powerupName = cardDataItem.name; }
        card.setAttribute('role', 'button'); card.setAttribute('tabindex', '0'); card.setAttribute('aria-label', 'Kapalı kart');
        const flipHandler = () => { this.playSound(this.elements.clickSound); this.flipCard(card); };
        card.addEventListener('click', flipHandler);
      }
      const cardBack = document.createElement('div'); cardBack.classList.add('card-back'); card.appendChild(cardBack);
      const cardFront = document.createElement('div'); cardFront.classList.add('card-front'); cardFront.style.fontSize = `${fontSize}px`; cardFront.textContent = card.dataset.emoji || ''; card.appendChild(cardFront);
      this.elements.board.appendChild(card);
      if (cardDataItem.type !== 'empty') { this.state.cards.push(card); }
    }
  },
  flipCard(card) { if (this.state.lockBoard || card === this.state.firstCard || card.classList.contains('matched') || this.state.isPaused) return; if (!this.state.isTimerStarted && !this.state.isPaused) this.startTimer(); card.classList.remove('hidden'); if (!this.state.firstCard) { this.state.firstCard = card; return; } this.state.secondCard = card; this.state.lockBoard = true; this.state.moves++; this.elements.movesDisplay.textContent = this.state.moves; this.checkForMatch(); },
  checkForMatch() { const isMatch = this.state.firstCard.dataset.emoji === this.state.secondCard.dataset.emoji; if (isMatch) { this.disableCards(); this.playSound(this.elements.matchSound); } else { this.unflipCards(); this.playSound(this.elements.mismatchSound); } },
  disableCards() {
    this.state.firstCard.classList.add('matched'); this.state.secondCard.classList.add('matched');
    this.state.streak++;
    const baseScore = 10;
    const bonusScore = this.state.streak > 1 ? (this.state.streak - 1) * 5 : 0;
    this.state.score += baseScore + bonusScore;
    this.elements.scoreDisplay.textContent = this.state.score;
    this.state.matchedPairs++;
    if (this.state.firstCard.dataset.powerupName) { this.activatePowerup(this.state.firstCard.dataset.powerupName); }
    this.resetBoardState();
    this.checkWin();
  },
  unflipCards() {
    this.state.streak = 0; this.state.mistakes++; this.state.score -= 2;
    this.elements.scoreDisplay.textContent = this.state.score;
    setTimeout(() => {
        if (this.state.firstCard) { this.state.firstCard.classList.add('hidden'); }
        if (this.state.secondCard) { this.state.secondCard.classList.add('hidden'); }
        this.resetBoardState();
    }, 800);
  },
  resetBoardState() { [this.state.firstCard, this.state.secondCard, this.state.lockBoard] = [null, null, false]; },
  checkWin() { if (this.state.matchedPairs === this.state.pairCount) { clearInterval(this.state.timer); this.state.isTimerStarted = false; this.playSound(this.elements.winSound); setTimeout(() => { this.showWinModal(); if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } }); }, 500); } },
  showWinModal() {
    this.elements.modalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`;
    this.elements.modalMoves.textContent = this.state.moves;
    const timeLimit = CONFIG.timeLimits[this.state.level] || 120;
    const elapsedTime = timeLimit - this.state.time;
    this.elements.modalTime.textContent = elapsedTime;
    this.elements.modalScore.textContent = this.state.score;
    const timeBonus = Math.max(0, this.state.time * 2);
    const moveBonus = this.state.moves > 0 ? Math.max(0, Math.floor((this.state.pairCount * 2 / this.state.moves) * 10)) : 0;
    const totalBonus = timeBonus + moveBonus;
    const finalScore = this.state.score + totalBonus;
    document.getElementById('modal-bonus-score').textContent = totalBonus;
    document.getElementById('modal-total-score').textContent = finalScore;
    const currentHighScore = this.state.highScores[this.state.level] || 0;
    if (finalScore > currentHighScore) { this.state.highScores[this.state.level] = finalScore; localStorage.setItem('highScores', JSON.stringify(this.state.highScores)); }
    this.elements.modalHighScore.textContent = this.state.highScores[this.state.level] || 0;
    this.updateLevelButtonsOnWin();
    const levelKeys = Object.keys(CONFIG.levels);
    const currentLevelIndex = levelKeys.indexOf(this.state.level);
    if (currentLevelIndex > -1 && currentLevelIndex < levelKeys.length - 1) { this.elements.nextLevelButton.style.display = 'inline-block'; this.elements.nextLevelButton.dataset.nextLevel = levelKeys[currentLevelIndex + 1];
    } else { this.elements.nextLevelButton.style.display = 'none'; }
    this.elements.modal.style.display = 'flex';
  },
  updateLevelButtonsOnWin() {
    const levelKeys = Object.keys(CONFIG.levels); const currentLevelIndex = levelKeys.indexOf(this.state.level); const nextLevelKey = levelKeys[currentLevelIndex + 1];
    if (nextLevelKey && !this.state.unlockedLevels.includes(nextLevelKey)) { this.state.unlockedLevels.push(nextLevelKey); localStorage.setItem('unlockedLevels', JSON.stringify(this.state.unlockedLevels)); }
  },
  closeModal() { this.elements.modal.style.display = 'none'; this.backToHome(); },
  nextLevel() { if (this.state.isTransitioningLevel) return; this.state.isTransitioningLevel = true; this.elements.modal.style.display = 'none'; const nextLevelKey = this.elements.nextLevelButton.dataset.nextLevel; if (nextLevelKey && CONFIG.levels[nextLevelKey]) { this.startGame(nextLevelKey); } else { this.state.isTransitioningLevel = false; this.backToHome(); } },
  startTimer() {
    if (this.state.timer) clearInterval(this.state.timer);
    this.state.isTimerStarted = true;
    this.state.timer = setInterval(() => {
      if (!this.state.isPaused && this.elements.startModal.style.display === 'none') {
        this.state.time--;
        this.elements.timeDisplay.textContent = this.state.time;
        if (this.state.time <= 0) {
          this.elements.timeDisplay.textContent = 0;
          clearInterval(this.state.timer);
          this.state.isTimerStarted = false;
          const timerElement = document.querySelector('.timer-box');
          if (timerElement) timerElement.style.animation = 'none';
          this.showLoseModal();
        }
      }
    }, 1000);
  },
  showLoseModal() { this.playSound(this.elements.mismatchSound); this.elements.loseModalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; this.elements.loseModalMoves.textContent = this.state.moves; this.elements.loseModalScore.textContent = this.state.score; this.elements.loseModal.style.display = 'flex'; this.elements.loseModal.querySelector('.restart-game-btn').focus(); },
  pauseGame(autoPaused = false) { if (this.elements.modal.style.display === 'flex' || this.elements.loseModal.style.display === 'flex' || this.elements.startModal.style.display === 'flex') return; this.state.isPaused = !this.state.isPaused; document.getElementById('pause-button').textContent = this.state.isPaused ? 'Devam Et' : 'Duraklat'; this.elements.board.style.opacity = this.state.isPaused ? '0.6' : '1'; this.elements.board.style.pointerEvents = this.state.isPaused ? 'none' : 'auto'; },
  restartGame() { if (this.state.timer) clearInterval(this.state.timer); this.state.isTimerStarted = false; this.state.time = 0; this.elements.timeDisplay.textContent = this.state.time; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none'; this.state.isTransitioningLevel = false; this.startGame(this.state.level); },
  updateLevelButtons() { document.querySelectorAll('.level-selection-new button').forEach(btn => { const level = btn.dataset.level; if (this.state.unlockedLevels.includes(level)) { btn.disabled = false; btn.classList.remove('locked'); } else { btn.disabled = true; btn.classList.add('locked'); } }); },
  activatePowerup(powerupName) {
    this.showToast(`✨ ${powerupName} gücü aktive edildi! ✨`, 'info');
    switch (powerupName) {
      case 'Göz':
        this.state.lockBoard = true;
        const unMatchedCards = this.state.cards.filter(card => !card.classList.contains('matched'));
        unMatchedCards.forEach(card => card.classList.add('peek'));
        setTimeout(() => { unMatchedCards.forEach(card => card.classList.remove('peek')); this.state.lockBoard = false; }, 1500);
        break;
      case 'Zaman': this.state.time += 10; this.elements.timeDisplay.textContent = this.state.time; break;
      case 'Karıştırıcı':
        this.state.lockBoard = true;
        let hiddenCards = this.state.cards.filter(card => card.classList.contains('hidden') && !card.classList.contains('matched'));
        let emojis = hiddenCards.map(card => card.dataset.emoji);
        for (let i = emojis.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [emojis[i], emojis[j]] = [emojis[j], emojis[i]]; }
        hiddenCards.forEach((card, index) => { card.dataset.emoji = emojis[index]; card.querySelector('.card-front').textContent = emojis[index]; });
        this.state.lockBoard = false;
        break;
    }
  },
  showHint() {
    if (this.state.score < 15) { this.showToast('İpucu için yeterli puan yok!', 'error'); return; }
    const unMatchedCards = this.state.cards.filter(card => !card.classList.contains('matched'));
    if (unMatchedCards.length < 2) return;
    this.state.score -= 15; this.elements.scoreDisplay.textContent = this.state.score;
    document.getElementById('hint-button').disabled = true;
    const randomCard = unMatchedCards[Math.floor(Math.random() * unMatchedCards.length)];
    const matchingCard = unMatchedCards.find(card => card.dataset.emoji === randomCard.dataset.emoji && card !== randomCard);
    if (randomCard && matchingCard) {
      randomCard.classList.add('hinted'); matchingCard.classList.add('hinted');
      setTimeout(() => { randomCard.classList.remove('hinted'); matchingCard.classList.remove('hinted'); }, 2000);
    }
  },
  showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    this.elements.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  },
  showConfirmationToast(message, onConfirm) {
    const toast = document.createElement('div');
    toast.className = 'toast confirm';
    
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    
    const buttonsEl = document.createElement('div');
    buttonsEl.className = 'toast-buttons';
    
    const yesButton = document.createElement('button');
    yesButton.textContent = 'Evet';
    yesButton.onclick = () => { onConfirm(); toast.classList.add('toast-out'); toast.addEventListener('animationend', () => toast.remove()); };
    
    const noButton = document.createElement('button');
    noButton.textContent = 'Hayır';
    noButton.onclick = () => { toast.classList.add('toast-out'); toast.addEventListener('animationend', () => toast.remove()); };
    
    buttonsEl.appendChild(yesButton);
    buttonsEl.appendChild(noButton);
    toast.appendChild(messageEl);
    toast.appendChild(buttonsEl);
    
    this.elements.toastContainer.appendChild(toast);
  },
  resetProgress() {
    this.showConfirmationToast(
        "Tüm ilerlemeniz silinecektir. Emin misiniz?",
        () => {
            localStorage.removeItem('highScores');
            localStorage.removeItem('unlockedLevels');
            this.showToast("İlerleme sıfırlandı!", "success");
            setTimeout(() => location.reload(), 1500);
        }
    );
  }
};

document.addEventListener('DOMContentLoaded', () => { Game.init(); });