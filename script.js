const CONFIG = {
  emojiCategories: {
    '2x2': ['🐶', '🐱'],
    '3x3': ['🍎', '🍊', '🍋', '🍌'],
    '4x4': ['🚗', '🚚', '🚜', '🚂', '🚁', '✈️', '🚤', '⛵'],
    '5x5': ['🍔', '🍕', '🌭', '🍟', '🍝', '🥗', '🍣', '🍱', '🥟', '🍰', '🍩', '🍫'],
    '4x8': ['🌟', '🔋', '🔥', '💧', '❄️', '⚡', '🌈', '☀️', '🌙', '⭐', '🌍', '🌐', '🛰️', '🪐', '💥', '🕒'],
    '5x9': ['🎉', '🎊', '📚', '✏️', '📖', '🖌️', '📜', '📍', '📦', '🔧', '🔨', '⚙️', '🧲', '🔬', '🔭', '🧪', '🧬', '🩺', '💊', '💉', '🩹', '🩼'],
    '6x9': ['⚽', '🏀', '🏈', '🎾', '🏐', '🏓', '🏸', '🥊', '⛳', '🎳', '🏒', '🥋', '🏊', '🏄', '🚴', '🤾', '🏋️', '⛸️', '🥇', '🥈', '🥉', '🏆', '🎯', '🎱', '🥏', '🎣', '🎽'],
    '8x10': ['🎸', '🎹', '🎻', '🥁', '🎺', '🎷', '🎤', '🎧', '🎼', '🎵', '🎶', '📯', '🪗', '🪕', '🎙️', '🔔', '🖼️', '🎨', '🎭', '🎬', '🎪', '🎫', '🎟️', '🎮', '🕹️', '🧩', '🧸', '🪁', '🏹', '🪄', '♟️', '♠️', '♣️', '♥️', '♦️', '🎲', '🎰', '🗿'],
    '9x11': ['👑', '🎩', '🧢', '👓', '🕶️', '👔', '👗', '👠', '🥾', '🧦', '🧤', '🧣', '👖', '👕', '👚', '👟', '🥿', '👢', '👞', '👡', '👙', '🩱', '🩲', '🩳', '🧥', '🦺', '🧱', '🧲', '🧳', '🧴', '🧵', '🧶', '🧷', '🧹', '🧺', '🧽', '🧼', '🪠', '🔑', '🚪', '🪑', '🛋', '🛏️', '🚽', '🚿', '🛁'],
    '9x12': ['🌺', '🌸', '🏵️', '🌹', '🥀', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌰', '🌼', '🌻', '🌍', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌚', '🌝', '🌞', '⭐', '🌟', '🌠', '🌌', '🌤️', '🌥️', '🌦️', '☁️', '🌨️', '⛈️', '🌩️', '🌪️', '🌫️', '🌬️', '🌊', '💧', '💦', '☔']
  },
  emojiTypes: {
    '2x2': 'hayvan', '3x3': 'meyve', '4x4': 'taşıt', '5x5': 'yiyecek', '4x8': 'çeşitli simge A',
    '5x9': 'çeşitli simge B', '6x9': 'spor', '8x10': 'sanat & eğlence', '9x11': 'giyim & eşya', '9x12': 'doğa & hava'
  },
  levels: { // Oyun adları güncellendi
    '2x2': 'İlk Bakış (2x2)',
    '3x3': 'Hafif Hatırlama (3x3)',
    '4x4': 'Akılda Kal! (4x4)',
    '5x5': 'Zihin Egzersizi (5x5)',
    '4x8': 'Karışık Kutular (4x8)',
    '5x9': 'Gizli İpuçları (5x9)',
    '6x9': 'Hafıza Labirenti (6x9)',
    '8x10': 'Zihin Oyunu (8x10)',
    '9x11': 'Usta Eşleyici (9x11)',
    '9x12': 'Efsane Hafıza (9x12)'
  },
  timeLimits: {
    '2x2': 30, '3x3': 45, '4x4': 60, '5x5': 90, '4x8': 110, '5x9': 135, '6x9': 160,
    '8x10': 240, '9x11': 300, '9x12': 330
  },
  cardSize: {
    minFontSize: 8,
    maxFontSize: 48,
    fontScale: { // Kart sayısına göre ölçek faktörleri
        default: 0.45, // <= 49 kart
        medium: 0.60,  // 50-79 kart
        large: 0.70    // >= 80 kart (emoji kutunun %70'ini kaplasın)
    }
  }
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
    gameStats: document.getElementById('game-stats'), buttonContainer: document.getElementById('button-container')
  },
  state: {
    cards: [], firstCard: null, secondCard: null, lockBoard: false, moves: 0, time: 0, score: 0, level: '4x4',
    rows: 4, cols: 4, isPaused: false, isTimerStarted: false, timer: null,
    highScores: JSON.parse(localStorage.getItem('highScores') || '{}'), pairCount: 0, matchedPairs: 0, isTransitioningLevel: false
  },

  init() {
    this.loadHighScores(); this.setupEventListeners(); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme'); if (savedTheme === 'dark' || (!savedTheme && prefersDark)) { document.body.classList.add('dark-mode'); this.elements.themeToggle.textContent = '☀️'; } else { document.body.classList.remove('dark-mode'); this.elements.themeToggle.textContent = '🌙'; }
  },
  loadHighScores() { this.state.highScores = JSON.parse(localStorage.getItem('highScores') || '{}'); },
  updateHighScoreDisplay() { this.elements.highScoreDisplay.textContent = this.state.highScores[this.state.level] || 0; },
  setupEventListeners() {
    document.querySelectorAll('.level-selection-home button').forEach(btn => btn.addEventListener('click', () => { this.playSound(this.elements.clickSound); this.startGame(btn.dataset.level); }));
    document.getElementById('pause-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.pauseGame(); });
    document.getElementById('restart-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.restartGame(); });
    document.querySelector('.back-button').addEventListener('click', () => { this.playSound(this.elements.clickSound); this.backToHome(); });
    this.elements.themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); const isDark = document.body.classList.contains('dark-mode'); this.elements.themeToggle.textContent = isDark ? '☀️' : '🌙'; localStorage.setItem('theme', isDark ? 'dark' : 'light'); this.playSound(this.elements.clickSound); });
    this.elements.startModal.querySelector('button').addEventListener('click', () => this.startGameModal());
    this.elements.modal.querySelector('button:not(.next-level-btn)').addEventListener('click', () => this.closeModal());
    this.elements.nextLevelButton.addEventListener('click', () => this.nextLevel());
    this.elements.loseModal.querySelector('button:nth-of-type(1)').addEventListener('click', () => this.restartGame());
    this.elements.loseModal.querySelector('button:nth-of-type(2)').addEventListener('click', () => this.backToHome());
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && this.elements.gameContainer.style.display === 'flex' && !this.state.isPaused) { this.pauseGame(true); } });
    // Dinamik yeniden boyutlandırma için resize listener şimdilik kaldırıldı.
    // window.addEventListener('resize', () => this.handleResize());
  },
  playSound(soundElement) {
    if (soundElement && typeof soundElement.play === 'function') { soundElement.currentTime = 0; if (soundElement.readyState >= 2) { soundElement.play().catch(error => console.warn(`Ses oynatılamadı (${soundElement.id}):`, error)); } else { console.warn(`Ses dosyası hazır değil veya desteklenmiyor: ${soundElement.id}, src: ${soundElement.src}`); if (soundElement.error) { console.error(`Ses elementi hatası (${soundElement.id}): Kod ${soundElement.error.code}, Mesaj: ${soundElement.error.message}`); } } } else { console.warn('Geçersiz ses elementi:', soundElement); }
  },
  parseLevelString(levelString) { const parts = levelString.split('x'); return { cols: parseInt(parts[0], 10), rows: parseInt(parts[1], 10) }; },

  startGame(selectedLevelKey) {
    console.log(`Starting game with level key: ${selectedLevelKey}`);
    this.state.level = selectedLevelKey;
    const dimensions = this.parseLevelString(selectedLevelKey);
    if (isNaN(dimensions.cols) || isNaN(dimensions.rows) || dimensions.cols <= 0 || dimensions.rows <= 0) {
        console.error(`Invalid level key or dimensions: ${selectedLevelKey}. Returning to home.`); this.backToHome(); return;
    }
    this.state.rows = dimensions.rows; this.state.cols = dimensions.cols;
    this.elements.homeContainer.style.display = 'none'; this.elements.gameContainer.style.display = 'flex';
    this.state.moves = 0; this.state.time = 0; this.state.score = 0; this.state.matchedPairs = 0; this.state.isPaused = true; this.state.isTimerStarted = false; this.state.firstCard = null; this.state.secondCard = null; this.state.lockBoard = false;
    this.elements.movesDisplay.textContent = this.state.moves; this.elements.timeDisplay.textContent = this.state.time; this.elements.scoreDisplay.textContent = this.state.score;
    this.elements.levelDisplay.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`;
    this.updateHighScoreDisplay();
    document.getElementById('pause-button').textContent = 'Duraklat'; this.elements.board.style.pointerEvents = 'none'; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none';
    if (this.state.timer) clearInterval(this.state.timer);
    this.createBoard();
    const levelName = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; const timeLimit = CONFIG.timeLimits[this.state.level] || 120; const emojiType = CONFIG.emojiTypes[this.state.level] || 'çeşitli';
    this.elements.startModalMessage.textContent = `${levelName}. Bu bölümde ${emojiType} emojileri ve ${timeLimit} saniye süreniz var. Başarılar!`; this.elements.startModal.style.display = 'flex'; this.elements.startModal.querySelector('button').focus();
  },
  startGameModal() { this.elements.startModal.style.display = 'none'; this.state.isPaused = false; this.elements.board.style.pointerEvents = 'auto'; this.state.isTransitioningLevel = false; if (!this.state.isTimerStarted && !this.state.isPaused) { this.startTimer(); } },
  backToHome() { if (this.state.timer) clearInterval(this.state.timer); this.elements.homeContainer.style.display = 'flex'; this.elements.gameContainer.style.display = 'none'; this.state.isTimerStarted = false; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none'; this.elements.startModal.style.display = 'none'; this.state.isTransitioningLevel = false; },

  createBoard() {
    this.elements.board.innerHTML = '';
    this.state.cards = [];

    this.elements.board.style.gridTemplateColumns = `repeat(${this.state.cols}, 1fr)`;
    this.elements.board.style.gridTemplateRows = `repeat(${this.state.rows}, 1fr)`;

    const totalCards = this.state.rows * this.state.cols;
    const hasUnpairedCard = totalCards % 2 !== 0;
    this.state.pairCount = Math.floor(totalCards / 2);

    // Emoji seçimi (önceki gibi)
    let currentLevelEmojis = CONFIG.emojiCategories[this.state.level];
    let emojisToUse = [];
    if (currentLevelEmojis && currentLevelEmojis.length >= this.state.pairCount) { emojisToUse = [...currentLevelEmojis]; }
    else { console.warn(`Not enough emojis for level ${this.state.level}. Using fallback.`); let fallbackEmojis = ['❓','❗️','⚠️','♨️','🌀','➿','🔆','🔅','♠️', '♣️', '♥️', '♦️']; if (currentLevelEmojis && currentLevelEmojis.length > 0) { emojisToUse = [...currentLevelEmojis]; } let i = 0; while (emojisToUse.length < this.state.pairCount) { emojisToUse.push(fallbackEmojis[i % fallbackEmojis.length]); i++; } }
    const selectedEmojis = emojisToUse.sort(() => 0.5 - Math.random()).slice(0, this.state.pairCount);
    if (selectedEmojis.length < this.state.pairCount) { console.error(`CRITICAL: Could not select enough emojis.`); let finalSelectedEmojis = [...selectedEmojis]; if (finalSelectedEmojis.length === 0 && this.state.pairCount > 0) { for(let k=0; k < this.state.pairCount; k++) finalSelectedEmojis.push(String.fromCharCode(65+k)); } else { while(finalSelectedEmojis.length < this.state.pairCount && finalSelectedEmojis.length > 0) { finalSelectedEmojis.push(finalSelectedEmojis[Math.floor(Math.random() * finalSelectedEmojis.length)]); } } selectedEmojis.length = 0; selectedEmojis.push(...finalSelectedEmojis); }

    let pairsData = []; selectedEmojis.forEach(emoji => { pairsData.push({ type: 'emoji', value: emoji }); pairsData.push({ type: 'emoji', value: emoji }); });
    let centerCardIndex = -1; if (hasUnpairedCard) { const middleRow = Math.floor(this.state.rows / 2); const middleCol = Math.floor(this.state.cols / 2); centerCardIndex = middleRow * this.state.cols + middleCol; }
    let finalCardData = [...pairsData]; if (hasUnpairedCard && centerCardIndex >= 0 && centerCardIndex < totalCards) { let tempShuffledPairs = pairsData.sort(() => 0.5 - Math.random()); finalCardData = new Array(totalCards).fill(null); let pairIdx = 0; for (let i = 0; i < totalCards; i++) { if (i === centerCardIndex) { finalCardData[i] = { type: 'empty' }; } else if (pairIdx < tempShuffledPairs.length) { finalCardData[i] = tempShuffledPairs[pairIdx++]; } } } else { finalCardData = pairsData.sort(() => 0.5 - Math.random()); }
    if (finalCardData.length !== totalCards) { console.error(`CRITICAL: finalCardData length mismatch.`); while(finalCardData.length < totalCards) finalCardData.push({type: 'empty'}); finalCardData = finalCardData.slice(0, totalCards); }

    // Font Boyutu Hesaplaması
    // Kartlar DOM'a eklendikten sonra hesaplamak daha doğru olurdu ama createBoard bitmeden mümkün değil.
    // Bu yüzden #game-board'un clientWidth'ini kullanıyoruz.
    // Bu, #game-board'un CSS'de (örn: calc(100vw - 20px)) bir genişliğe sahip olmasına dayanır.
    let cardSideLength = 0;
    if (this.state.cols > 0) {
        const boardElement = this.elements.board;
        const boardStyle = getComputedStyle(boardElement);
        const boardClientWidth = boardElement.clientWidth; // padding dahil iç genişlik
        const boardGap = parseFloat(boardStyle.gap) || 4;
        // clientWidth, padding'i içerir. Grid itemları bu clientWidth içinde dağılır.
        // Dolayısıyla, bir kartın genişliği = (clientWidth - (sütun sayısı - 1) * boşluk) / sütun sayısı
        cardSideLength = (boardClientWidth - (this.state.cols - 1) * boardGap) / this.state.cols;
    }
    cardSideLength = Math.max(10, cardSideLength); // Minimum 10px

    let scaleFactor = CONFIG.cardSize.fontScale.default;
    const totalCardsInGrid = this.state.cols * this.state.rows;
    if (totalCardsInGrid >= 80) { // 9x11 (99), 9x12 (108), 8x10 (80)
        scaleFactor = CONFIG.cardSize.fontScale.large;
    } else if (totalCardsInGrid >= 50) { // 6x9 (54), 5x9 (45 - aslında bu mediuma girmemeliydi, ama kalsın)
        scaleFactor = CONFIG.cardSize.fontScale.medium;
    }

    let fontSize = Math.floor(cardSideLength * scaleFactor);
    // maxFontSize'ı burada uygulamak, büyük gridlerdeki daha büyük font isteğiyle çelişebilir.
    // fontSize = Math.min(fontSize, CONFIG.cardSize.maxFontSize);
    fontSize = Math.max(fontSize, CONFIG.cardSize.minFontSize);
    if (isNaN(fontSize) || fontSize < CONFIG.cardSize.minFontSize) fontSize = CONFIG.cardSize.minFontSize;
    console.log(`Card side est: ${cardSideLength.toFixed(1)}px, Font size: ${fontSize}px (Scale: ${scaleFactor})`);

    for (let i = 0; i < totalCards; i++) {
      const card = document.createElement('div'); card.classList.add('card'); const cardDataItem = finalCardData[i];
      if (!cardDataItem || cardDataItem.type === 'empty') { card.classList.add('center-card'); card.removeAttribute('role'); card.removeAttribute('tabindex'); card.setAttribute('aria-hidden', 'true'); }
      else if (cardDataItem.type === 'emoji') { card.classList.add('hidden'); card.dataset.emoji = cardDataItem.value; card.setAttribute('role', 'button'); card.setAttribute('tabindex', '0'); card.setAttribute('aria-label', 'Kapalı kart');
        const flipHandler = () => { if (!card.classList.contains('center-card')) { this.playSound(this.elements.clickSound); this.flipCard(card); } };
        card.addEventListener('click', flipHandler); let lastTouchTime = 0; card.addEventListener('touchstart', (e) => { const currentTime = new Date().getTime(); const timeSinceLastTouch = currentTime - lastTouchTime; if (timeSinceLastTouch > 300) { e.preventDefault(); flipHandler(); lastTouchTime = currentTime; } }, { passive: false }); card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipHandler(); } });
      }
      const cardBack = document.createElement('div'); cardBack.classList.add('card-back'); cardBack.setAttribute('aria-hidden', 'true'); card.appendChild(cardBack);
      const cardFront = document.createElement('div'); cardFront.classList.add('card-front'); cardFront.style.fontSize = `${fontSize}px`; cardFront.textContent = card.dataset.emoji || ''; cardFront.setAttribute('aria-hidden', 'true'); card.appendChild(cardFront);
      this.elements.board.appendChild(card); if (card.dataset.emoji && !card.classList.contains('center-card')) { this.state.cards.push(card); }
    }
  },

  flipCard(card) { if (this.state.lockBoard || card === this.state.firstCard || card.classList.contains('matched') || this.state.isPaused || card.classList.contains('center-card')) return; if (!this.state.isTimerStarted && !this.state.isPaused) this.startTimer(); card.classList.remove('hidden'); card.querySelector('.card-front').setAttribute('aria-hidden', 'false'); card.querySelector('.card-back').setAttribute('aria-hidden', 'true'); card.setAttribute('aria-label', `Kart: ${card.dataset.emoji}`); if (!this.state.firstCard) { this.state.firstCard = card; return; } this.state.secondCard = card; this.state.lockBoard = true; this.state.moves++; this.elements.movesDisplay.textContent = this.state.moves; this.checkForMatch(); },
  checkForMatch() { const isMatch = this.state.firstCard.dataset.emoji === this.state.secondCard.dataset.emoji; if (isMatch) { this.disableCards(); this.playSound(this.elements.matchSound); } else { this.unflipCards(); this.playSound(this.elements.mismatchSound); } },
  disableCards() { this.state.firstCard.classList.add('matched'); this.state.secondCard.classList.add('matched'); this.state.firstCard.setAttribute('aria-label', `Eşleşti: ${this.state.firstCard.dataset.emoji}`); this.state.secondCard.setAttribute('aria-label', `Eşleşti: ${this.state.secondCard.dataset.emoji}`); this.state.firstCard.setAttribute('tabindex', '-1'); this.state.secondCard.setAttribute('tabindex', '-1'); this.state.score += 10; this.elements.scoreDisplay.textContent = this.state.score; this.state.matchedPairs++; this.resetBoardState(); this.checkWin(); },
  unflipCards() { setTimeout(() => { if (this.state.firstCard) { this.state.firstCard.classList.add('hidden'); this.state.firstCard.querySelector('.card-front').setAttribute('aria-hidden', 'true'); this.state.firstCard.querySelector('.card-back').setAttribute('aria-hidden', 'false'); this.state.firstCard.setAttribute('aria-label', 'Kapalı kart'); } if (this.state.secondCard) { this.state.secondCard.classList.add('hidden'); this.state.secondCard.querySelector('.card-front').setAttribute('aria-hidden', 'true'); this.state.secondCard.querySelector('.card-back').setAttribute('aria-hidden', 'false'); this.state.secondCard.setAttribute('aria-label', 'Kapalı kart'); } this.resetBoardState(); }, 800); },
  resetBoardState() { this.state.firstCard = null; this.state.secondCard = null; this.state.lockBoard = false; },
  checkWin() { if (this.state.matchedPairs === this.state.pairCount) { clearInterval(this.state.timer); this.state.isTimerStarted = false; this.updateHighScore(); this.playSound(this.elements.winSound); setTimeout(() => { this.showWinModal(); if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } }); }, 500); } },
  updateHighScore() { const currentHighScore = this.state.highScores[this.state.level] || 0; if (this.state.score > currentHighScore) { this.state.highScores[this.state.level] = this.state.score; localStorage.setItem('highScores', JSON.stringify(this.state.highScores)); this.updateHighScoreDisplay(); } },
  showWinModal() { this.elements.modalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; this.elements.modalMoves.textContent = this.state.moves; this.elements.modalTime.textContent = this.state.time; this.elements.modalScore.textContent = this.state.score; this.elements.modalHighScore.textContent = this.state.highScores[this.state.level] || 0; const levelKeys = Object.keys(CONFIG.levels); const currentLevelIndex = levelKeys.indexOf(this.state.level); if (currentLevelIndex > -1 && currentLevelIndex < levelKeys.length - 1) { this.elements.nextLevelButton.style.display = 'inline-block'; this.elements.nextLevelButton.dataset.nextLevel = levelKeys[currentLevelIndex + 1]; } else { this.elements.nextLevelButton.style.display = 'none'; } this.elements.modal.style.display = 'flex'; this.elements.modal.querySelector('button:not(.next-level-btn)').focus(); },
  closeModal() { this.elements.modal.style.display = 'none'; this.backToHome(); },
  nextLevel() { if (this.state.isTransitioningLevel) return; this.state.isTransitioningLevel = true; this.elements.modal.style.display = 'none'; const nextLevelKey = this.elements.nextLevelButton.dataset.nextLevel; if (nextLevelKey && CONFIG.levels[nextLevelKey]) { this.startGame(nextLevelKey); } else { this.state.isTransitioningLevel = false; this.backToHome(); } },
  startTimer() { if (this.state.timer) clearInterval(this.state.timer); const timeLimit = CONFIG.timeLimits[this.state.level] || 120; this.state.isTimerStarted = true; this.state.timer = setInterval(() => { if (!this.state.isPaused && this.elements.startModal.style.display === 'none') { this.state.time++; this.elements.timeDisplay.textContent = this.state.time; if (this.state.time >= timeLimit) { clearInterval(this.state.timer); this.state.isTimerStarted = false; this.showLoseModal(); } } }, 1000); },
  showLoseModal() { this.playSound(this.elements.mismatchSound); this.elements.loseModalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; this.elements.loseModalMoves.textContent = this.state.moves; this.elements.loseModalScore.textContent = this.state.score; this.elements.loseModal.style.display = 'flex'; this.elements.loseModal.querySelector('button:nth-of-type(1)').focus(); },
  pauseGame(autoPaused = false) { if (this.elements.modal.style.display === 'flex' || this.elements.loseModal.style.display === 'flex' || this.elements.startModal.style.display === 'flex') return; this.state.isPaused = !this.state.isPaused; document.getElementById('pause-button').textContent = this.state.isPaused ? 'Devam Et' : 'Duraklat'; this.elements.board.style.opacity = this.state.isPaused ? '0.6' : '1'; this.elements.board.style.pointerEvents = this.state.isPaused ? 'none' : 'auto'; },
  restartGame() { if (this.state.timer) clearInterval(this.state.timer); this.state.isTimerStarted = false; this.state.time = 0; this.elements.timeDisplay.textContent = this.state.time; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none'; this.state.isTransitioningLevel = false; this.startGame(this.state.level); }
};

document.addEventListener('DOMContentLoaded', () => { Game.init(); });