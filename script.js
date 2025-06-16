const CONFIG = {
 // script.js dosyasındaki CONFIG nesnesinin içinde
emojiCategories: {
    '4x2': ['❤️', '⭐', '☀️', '☘️'],
    '6x2': ['⚽', '☎️', '⚓', '✨', '✉️', '⏰'],
    '6x3': ['✅', '❌', '❓', '❗️', '➡️', '⬅️', '⬆️', '⬇️', '⚠️'],
    '8x3': ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '⚫', '⚪'],
    '8x4': ['♠️', '♣️', '♥️', '♦️', '™️', '©️', '®️', '㊙️', '㊗️', '🉐', '🈚', '🈯', '🈺', '🈶', '🈷️', '🈸'],
    '10x4': ['😀', '😂', '😍', '😎', '😭', '😡', '🤔', '😴', '👍', '👎', '💪', '👀', '🔥', '💯', '🚀', '🎉', '🎁', '💡', '🔔', '📌'],
    '10x5': ['🍎', '🍌', '🍇', '🍉', '🍓', '🍑', '🍍', '🥝', '🍔', '🍕', '🍟', '🌭', '🍗', '🌮', '🎂', '🍩', '🍪', '🍫', '🍿', '🎈', '🎨', '🎯', 'V', 'X', 'O'],
    '12x5': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3'],
    '12x6': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦋', '🐞', '🐢', '🐠', '🐳', '🐙', '🐌', '🐜', '🐝', '🕷️', '🦂', '🌹', '🌺', '🌻', '🌼', '🌷', '🌵']
},
  emojiTypes: {
    '4x2': 'sevimli hayvanlar',
    '6x2': 'taze meyveler',
    '6x3': 'araçlar',
    '8x3': 'lezzetli yiyecekler',
    '8x4': 'simgeler',
    '10x4': 'spor dalları',
    '10x5': 'sanat ve eğlence',
    '12x5': 'eşyalar',
    '12x6': 'doğa elementleri'
  },
  levels: {
    '4x2': 'Başlangıç (4x2)',
    '6x2': 'Isınma Turu (6x2)',
    '6x3': 'Dikkat Testi (6x3)',
    '8x3': 'Odaklanma (8x3)',
    '8x4': 'Hafıza Gücü (8x4)',
    '10x4': 'Gelişmiş Seviye (10x4)',
    '10x5': 'Uzman Bakışı (10x5)',
    '12x5': 'Usta Oyuncu (12x5)',
    '12x6': 'Efsane Hafıza (12x6)'
  },
  timeLimits: {
    '4x2': 40, '6x2': 60, '6x3': 90, '8x3': 120, '8x4': 160,
    '10x4': 200, '10x5': 250, '12x5': 300, '12x6': 360
  },
  cardSize: {
    minFontSize: 8,
    maxFontSize: 48,
    fontScale: {
    default: 0.60, /* Kartın %80'i */
    medium: 0.60,  /* Kartın %80'i */
    large: 0.60    /* Kartın %80'i */
}
  }
};const Game = {
  elements: {
    homeContainer: document.getElementById('home-container'), gameContainer: document.getElementById('game-container'), board: document.getElementById('game-board'),
    movesDisplay: document.getElementById('moves'), timeDisplay: document.getElementById('time'), scoreDisplay: document.getElementById('score'),
    levelDisplay: document.getElementById('level'), highScoreDisplay: document.getElementById('high-score'), modal: document.getElementById('modal'),
    modalLevel: document.getElementById('modal-level'), modalMoves: document.getElementById('modal-moves'), modalTime: document.getElementById('modal-time'),
    modalScore: document.getElementById('modal-score'), modalHighScore: document.getElementById('modal-high-score'), loseModal: document.getElementById('lose-modal'),
    loseModalLevel: document.getElementById('lose-modal-level'), loseModalMoves: document.getElementById('lose-modal-moves'),
    loseModalScore: document.getElementById('lose-modal-score'), startModal: document.getElementById('start-modal'),
    startModalMessage: document.getElementById('start-modal-message'), themeToggle: document.getElementById('theme-toggle'),
    nextLevelButton: document.querySelector('.next-level-btn'),
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
    document.querySelectorAll('.level-selection-home button').forEach(btn => btn.addEventListener('click', () => {  this.startGame(btn.dataset.level); }));
    document.getElementById('pause-button').addEventListener('click', () => {  this.pauseGame(); });
    document.getElementById('restart-button').addEventListener('click', () => {  this.restartGame(); });
    document.querySelector('.back-button').addEventListener('click', () => {  this.backToHome(); });
    this.elements.themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); const isDark = document.body.classList.contains('dark-mode'); this.elements.themeToggle.textContent = isDark ? '☀️' : '🌙'; localStorage.setItem('theme', isDark ? 'dark' : 'light');  });
    this.elements.startModal.querySelector('button').addEventListener('click', () => this.startGameModal());
    this.elements.modal.querySelector('button:not(.next-level-btn)').addEventListener('click', () => this.closeModal());
    this.elements.nextLevelButton.addEventListener('click', () => this.nextLevel());
    this.elements.loseModal.querySelector('button:nth-of-type(1)').addEventListener('click', () => this.restartGame());
    this.elements.loseModal.querySelector('button:nth-of-type(2)').addEventListener('click', () => this.backToHome());
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && this.elements.gameContainer.style.display === 'flex' && !this.state.isPaused) { this.pauseGame(true); } });
    // Dinamik yeniden boyutlandırma için resize listener şimdilik kaldırıldı.
    // window.addEventListener('resize', () => this.handleResize());
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
    this.elements.board.style.aspectRatio = `${this.state.cols} / ${this.state.rows}`;


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
        const flipHandler = () => { if (!card.classList.contains('center-card')) { this.flipCard(card); } };
        card.addEventListener('mousedown', flipHandler); let lastTouchTime = 0; card.addEventListener('touchstart', (e) => { const currentTime = new Date().getTime(); const timeSinceLastTouch = currentTime - lastTouchTime; if (timeSinceLastTouch > 300) { e.preventDefault(); flipHandler(); lastTouchTime = currentTime; } }, { passive: false }); card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipHandler(); } });
      }
      const cardBack = document.createElement('div'); cardBack.classList.add('card-back'); cardBack.setAttribute('aria-hidden', 'true'); card.appendChild(cardBack);
      const cardFront = document.createElement('div'); cardFront.classList.add('card-front'); cardFront.style.fontSize = `${fontSize}px`; cardFront.textContent = card.dataset.emoji || ''; cardFront.setAttribute('aria-hidden', 'true'); card.appendChild(cardFront);
      this.elements.board.appendChild(card); if (card.dataset.emoji && !card.classList.contains('center-card')) { this.state.cards.push(card); }
    }
  },

  flipCard(card) { if (this.state.lockBoard || card === this.state.firstCard || card.classList.contains('matched') || this.state.isPaused || card.classList.contains('center-card')) return; if (!this.state.isTimerStarted && !this.state.isPaused) this.startTimer(); card.classList.remove('hidden'); card.querySelector('.card-front').setAttribute('aria-hidden', 'false'); card.querySelector('.card-back').setAttribute('aria-hidden', 'true'); card.setAttribute('aria-label', `Kart: ${card.dataset.emoji}`); if (!this.state.firstCard) { this.state.firstCard = card; return; } this.state.secondCard = card; 
                  this.state.lockBoard = true; this.elements.board.classList.add('locked'); this.state.moves++; this.elements.movesDisplay.textContent = this.state.moves; this.checkForMatch(); },
  checkForMatch() { const isMatch = this.state.firstCard.dataset.emoji === this.state.secondCard.dataset.emoji; if (isMatch) { this.disableCards();  } else { this.unflipCards();  } },
  disableCards() { this.state.firstCard.classList.add('matched'); this.state.secondCard.classList.add('matched'); this.state.firstCard.setAttribute('aria-label', `Eşleşti: ${this.state.firstCard.dataset.emoji}`); this.state.secondCard.setAttribute('aria-label', `Eşleşti: ${this.state.secondCard.dataset.emoji}`); this.state.firstCard.setAttribute('tabindex', '-1'); this.state.secondCard.setAttribute('tabindex', '-1'); this.state.score += 10; this.elements.scoreDisplay.textContent = this.state.score; this.state.matchedPairs++; this.resetBoardState(); this.checkWin(); },



unflipCards() {
    // Bu fonksiyon, iki kart eşleşmediğinde çağrılır.
    // Oyun alanı kilitli durumdayken 1 saniye bekler.
    setTimeout(() => {
      // 1 saniye sonunda, kartların hala mevcut olduğunu kontrol eder.
      if (this.state.firstCard) {
        // 'hidden' sınıfını ekleyerek kartın kapanma animasyonunu tetikler.
        this.state.firstCard.classList.add('hidden');
        this.state.firstCard.querySelector('.card-front').setAttribute('aria-hidden', 'true');
        this.state.firstCard.querySelector('.card-back').setAttribute('aria-hidden', 'false');
        this.state.firstCard.setAttribute('aria-label', 'Kapalı kart');
      }
      if (this.state.secondCard) {
        this.state.secondCard.classList.add('hidden');
        this.state.secondCard.querySelector('.card-front').setAttribute('aria-hidden', 'true');
        this.state.secondCard.querySelector('.card-back').setAttribute('aria-hidden', 'false');
        this.state.secondCard.setAttribute('aria-label', 'Kapalı kart');
      }

      // Kartlar kapandıktan sonra, bir sonraki hamle için oyun durumunu sıfırlar
      // ve oyun alanının kilidini açar.
      this.resetBoardState();
    }, 1000); // 1000 milisaniye = 1 saniye bekleme süresi
  },







  resetBoardState() { this.state.firstCard = null; this.state.secondCard = null; this.state.lockBoard = false; this.elements.board.classList.remove('locked'); },
  checkWin() { if (this.state.matchedPairs === this.state.pairCount) { clearInterval(this.state.timer); this.state.isTimerStarted = false; this.updateHighScore();  setTimeout(() => { this.showWinModal(); if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } }); }, 500); } },
  updateHighScore() { const currentHighScore = this.state.highScores[this.state.level] || 0; if (this.state.score > currentHighScore) { this.state.highScores[this.state.level] = this.state.score; localStorage.setItem('highScores', JSON.stringify(this.state.highScores)); this.updateHighScoreDisplay(); } },
  showWinModal() { this.elements.modalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; this.elements.modalMoves.textContent = this.state.moves; this.elements.modalTime.textContent = this.state.time; this.elements.modalScore.textContent = this.state.score; this.elements.modalHighScore.textContent = this.state.highScores[this.state.level] || 0; const levelKeys = Object.keys(CONFIG.levels); const currentLevelIndex = levelKeys.indexOf(this.state.level); if (currentLevelIndex > -1 && currentLevelIndex < levelKeys.length - 1) { this.elements.nextLevelButton.style.display = 'inline-block'; this.elements.nextLevelButton.dataset.nextLevel = levelKeys[currentLevelIndex + 1]; } else { this.elements.nextLevelButton.style.display = 'none'; } this.elements.modal.style.display = 'flex'; this.elements.modal.querySelector('button:not(.next-level-btn)').focus(); },
  closeModal() { this.elements.modal.style.display = 'none'; this.backToHome(); },
  nextLevel() { if (this.state.isTransitioningLevel) return; this.state.isTransitioningLevel = true; this.elements.modal.style.display = 'none'; const nextLevelKey = this.elements.nextLevelButton.dataset.nextLevel; if (nextLevelKey && CONFIG.levels[nextLevelKey]) { this.startGame(nextLevelKey); } else { this.state.isTransitioningLevel = false; this.backToHome(); } },
  startTimer() { if (this.state.timer) clearInterval(this.state.timer); const timeLimit = CONFIG.timeLimits[this.state.level] || 120; this.state.isTimerStarted = true; this.state.timer = setInterval(() => { if (!this.state.isPaused && this.elements.startModal.style.display === 'none') { this.state.time++; this.elements.timeDisplay.textContent = this.state.time; if (this.state.time >= timeLimit) { clearInterval(this.state.timer); this.state.isTimerStarted = false; this.showLoseModal(); } } }, 1000); },
  showLoseModal() { this.plathis.elements.loseModalLevel.textContent = CONFIG.levels[this.state.level] || `${this.state.cols}x${this.state.rows}`; this.elements.loseModalMoves.textContent = this.state.moves; this.elements.loseModalScore.textContent = this.state.score; this.elements.loseModal.style.display = 'flex'; this.elements.loseModal.querySelector('button:nth-of-type(1)').focus(); },
  pauseGame(autoPaused = false) { if (this.elements.modal.style.display === 'flex' || this.elements.loseModal.style.display === 'flex' || this.elements.startModal.style.display === 'flex') return; this.state.isPaused = !this.state.isPaused; document.getElementById('pause-button').textContent = this.state.isPaused ? 'Devam Et' : 'Duraklat'; this.elements.board.style.opacity = this.state.isPaused ? '0.6' : '1'; this.elements.board.style.pointerEvents = this.state.isPaused ? 'none' : 'auto'; },
  restartGame() { if (this.state.timer) clearInterval(this.state.timer); this.state.isTimerStarted = false; this.state.time = 0; this.elements.timeDisplay.textContent = this.state.time; this.elements.modal.style.display = 'none'; this.elements.loseModal.style.display = 'none'; this.state.isTransitioningLevel = false; this.startGame(this.state.level); }
};

document.addEventListener('DOMContentLoaded', () => { Game.init(); });
