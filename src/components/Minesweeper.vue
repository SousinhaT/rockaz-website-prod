<template>
    <div class="mine-casino">
      <div class="header">
        <div class="stats">
          <div class="balance">
            <span>Conta</span>
            <span class="value">€{{ formatNumber(balance) }}</span>
          </div>
          <div class="multiplier" :class="{ active: gameState === 'playing' }">
            <span>Multiplicador</span>
            <span class="value">{{ currentMultiplier }}x</span>
          </div>
        </div>
      </div>
  
      <div class="game-container">
        <div class="game-status" v-if="gameState === 'start' || gameState === 'end'">
          <h2>{{ gameState === 'start' ? 'Novo Jogo' : gameResult }}</h2>
          <div class="bet-controls" v-if="gameState === 'start'">
            <label>
              Aposta
              <input type="number" v-model.number="betAmount" min="1" :max="balance" />
            </label>
            <div class="mine-controls">
              <label>
                Minas
                <input type="number" v-model.number="mineCount" min="1" max="24" />
              </label>
              <div class="mine-badges">
                <button 
                  v-for="count in [3, 5, 10, 24]" 
                  :key="count" 
                  @click="mineCount = count"
                  :class="{ active: mineCount === count }"
                >{{ count }}</button>
              </div>
            </div>
          </div>
          <button class="action-button start" @click="startGame" v-if="gameState === 'start'" :disabled="!canStartGame">
            Iniciar Jogo
          </button>
          <div class="result" v-if="gameState === 'end'">
            <p>{{ gameResultDetails }}</p>
          </div>
          <button class="action-button restart" @click="resetGame" v-if="gameState === 'end'">
            Jogar de Novo
          </button>
        </div>
  
        <div class="game-controls" v-if="gameState === 'playing'">
          <div class="potential-win">
            <span>Ganho Potencial</span>
            <span class="value">€{{ formatNumber(potentialWin) }}</span>
          </div>
          <button class="action-button cashout" @click="cashOut" :disabled="revealedCount === 0">
            Retirar €{{ formatNumber(potentialWin) }}
          </button>
        </div>
  
        <transition-group name="grid" tag="div" class="grid">
          <div 
            v-for="(cell, index) in grid" 
            :key="index"
            class="cell"
            :class="{ 
              revealed: cell.revealed, 
              mine: cell.revealed && cell.isMine,
              safe: cell.revealed && !cell.isMine,
              'show-mines': showAllMines && cell.isMine
            }"
            @click="revealCell(index)"
          >
            <div class="cell-content">
              <div class="cell-inner">
                <template v-if="cell.revealed || (showAllMines && cell.isMine)">
                  <div v-if="cell.isMine" class="mine">💣</div>
                  <div v-else class="gem">💎</div>
                </template>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
  
      <div class="history" v-if="gameHistory.length > 0">
        <h3>Historico (Ultimos 5 Jogos)</h3>
        <div class="history-list">
          <div 
            v-for="(game, index) in gameHistory.slice(0, 5)" 
            :key="index" 
            class="history-item"
            :class="{ win: game.result === 'win', lose: game.result === 'lose' }"
          >
            <div class="history-info">
              <span>Aposta: €{{ formatNumber(game.bet) }}</span>
              <span style="margin-left: 5px;"> | {{ game.mines }} minas</span>
            </div>
            <div class="history-result">
              <span v-if="game.result === 'win'">+€{{ formatNumber(game.profit) }}</span>
              <span v-if="game.result === 'lose'">-€{{ formatNumber(game.bet) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        balance: 1000,
        betAmount: 10,
        mineCount: 5,
        gridSize: 25,
        grid: [],
        gameState: 'start', // 'start', 'playing', 'end'
        gameResult: '',
        gameResultDetails: '',
        revealedCount: 0,
        currentMultiplier: 1.00,
        potentialWin: 0,
        showAllMines: false,
        gameHistory: []
      };
    },
    computed: {
      canStartGame() {
        return this.betAmount > 0 && this.betAmount <= this.balance && this.mineCount > 0 && this.mineCount < this.gridSize;
      }
    },
    methods: {
      formatNumber(num) {
        return num.toFixed(2);
      },
      initializeGrid() {
        this.grid = Array(this.gridSize).fill().map(() => ({
          revealed: false,
          isMine: false
        }));
      },
      placeMines() {
        // Randomly place mines
        let minesPlaced = 0;
        while (minesPlaced < this.mineCount) {
          const randomIndex = Math.floor(Math.random() * this.gridSize);
          if (!this.grid[randomIndex].isMine) {
            this.grid[randomIndex].isMine = true;
            minesPlaced++;
          }
        }
      },
      startGame() {
        if (!this.canStartGame) return;
        
        this.balance -= this.betAmount;
        this.gameState = 'playing';
        this.revealedCount = 0;
        this.currentMultiplier = 1.00;
        this.potentialWin = this.betAmount;
        this.showAllMines = false;
        
        this.initializeGrid();
        this.placeMines();
        this.calculateMultiplier();
      },
      revealCell(index) {
        if (this.gameState !== 'playing' || this.grid[index].revealed) return;
        
        const cell = this.grid[index];
        cell.revealed = true;
        
        if (cell.isMine) {
          this.endGame('lose');
        } else {
          this.revealedCount++;
          this.calculateMultiplier();
          
          // Check if all non-mine cells are revealed
          if (this.revealedCount === this.gridSize - this.mineCount) {
            this.endGame('win-all');
          }
        }
      },
      calculateMultiplier() {
        const safeSquares = this.gridSize - this.mineCount;
        const remainingSafeSquares = safeSquares - this.revealedCount;
        
        if (this.revealedCount === 0) {
          this.currentMultiplier = 1.00;
          this.potentialWin = this.betAmount;
          return;
        }
        
        // This is a simplified multiplier formula
        // In a real game, this would be more complex based on probability
        const baseMultiplier = this.gridSize / (this.gridSize - this.mineCount);
        this.currentMultiplier = parseFloat((baseMultiplier * (1 + (this.revealedCount * 0.1))).toFixed(2));
        this.potentialWin = parseFloat((this.betAmount * this.currentMultiplier).toFixed(2));
      },
      cashOut() {
        if (this.gameState !== 'playing' || this.revealedCount === 0) return;
        
        const winAmount = this.potentialWin;
        this.balance += winAmount;
        
        this.gameHistory.unshift({
          bet: this.betAmount,
          mines: this.mineCount,
          result: 'win',
          profit: winAmount - this.betAmount,
          multiplier: this.currentMultiplier
        });
        
        this.gameResult = 'Ganhas-te!';
        this.gameResultDetails = `Ganhas-te a aposta com ${this.currentMultiplier}x multiplicador e ganhas-te €${this.formatNumber(winAmount - this.betAmount)}!`;
        this.endGame('win-cashout');
      },
      endGame(result) {
        this.gameState = 'end';
        this.showAllMines = true;
        
        switch(result) {
          case 'win-cashout':
            // Already handled in cashOut method
            break;
          case 'win-all':
            const maxWin = this.potentialWin;
            this.balance += maxWin;
            this.gameResult = 'Perfect Game!';
            this.gameResultDetails = `You revealed all safe cells and won $${this.formatNumber(maxWin - this.betAmount)}!`;
            
            this.gameHistory.unshift({
              bet: this.betAmount,
              mines: this.mineCount,
              result: 'win',
              profit: maxWin - this.betAmount,
              multiplier: this.currentMultiplier
            });
            break;
          case 'lose':
            this.gameResult = 'Perdes-te!';
            this.gameResultDetails = `Rebentas-te uma bomba e perdes-te €${this.formatNumber(this.betAmount)}!`;
            
            this.gameHistory.unshift({
              bet: this.betAmount,
              mines: this.mineCount,
              result: 'lose',
              profit: -this.betAmount,
              multiplier: 0
            });
            break;
        }
      },
      resetGame() {
        this.gameState = 'start';
        this.initializeGrid();
      }
    },
    created() {
      this.initializeGrid();
    }
  };
  </script>
  
  <style>
  .mine-casino {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 20%;
    margin: 0 auto;
    padding: 1rem;
    color: #ffffff;
  }
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #f9d423, #ff4e50);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
  
  .stats {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 1rem;
  }
  
  .balance, .multiplier {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    min-width: 120px;
    margin-right: 1rem;
  }
  
  .multiplier.active {
    background: linear-gradient(180deg, 
        #8A75B7 55%, 
        #F2A97E 100%
    
    );
    color:white !important;
    animation: pulse 2s infinite;
  }
  
  .stats .value {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .game-container {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .game-status {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    z-index: 10;
    padding: 1rem;
    text-align: center;
  }
  
  .game-status h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: #8A75B7;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .bet-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
    margin-bottom: 1.5rem;
  }
  
  .bet-controls label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .bet-controls input {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .mine-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .mine-badges {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .mine-badges button {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .mine-badges button.active {
    background-color: #F2A97E;
    color:#fff !important;
  }
  
  .action-button {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 200px;
  }
  
  .action-button.start {
    background: #F2A97E;
    color: #222;
  }
  
  .action-button.start:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
  
  .action-button.cashout {
    background: #F2A97E;
    color: #222;
  }
  
  .action-button.cashout:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
  
  .action-button.restart {
    background: linear-gradient(45deg, #9733ee, #da22ff);
    color: white;
  }
  
  .game-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .potential-win {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
  
  .potential-win .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2af598;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
    margin-bottom: 2rem;
  }
  
  .cell {
    position: relative;
    aspect-ratio: 1;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
  }
  
  .cell:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .cell.revealed {
    pointer-events: none;
  }
  
  .cell.mine {
    background-color: rgba(255, 78, 80, 0.3);
    animation: explode 0.5s ease-out;
  }
  
  .cell.safe {
    background-color: rgba(42, 245, 152, 0.3);
    animation: reveal 0.3s ease-out;
  }
  
  .cell.show-mines {
    background-color: rgba(255, 78, 80, 0.3);
  }
  
  .cell-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .cell-inner {
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .mine {
    animation: shake 0.5s ease-out;
  }
  
  .gem {
    animation: sparkle 1s ease-out;
  }
  
  .result {
    margin: 1rem 0;
    font-size: 1.125rem;
  }
  
  .history {
    margin-top: 2rem;
  }
  
  .history h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .history-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .history-item.win {
    border-left: 3px solid #2af598;
  }
  
  .history-item.lose {
    border-left: 3px solid #ff4e50;
  }
  
  .history-result {
    font-weight: bold;
  }
  
  .history-item.win .history-result {
    color: #2af598;
  }
  
  .history-item.lose .history-result {
    color: #ff4e50;
  }
  
  /* Animations */
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(42, 159, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(42, 159, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(42, 159, 255, 0);
    }
  }
  
  @keyframes reveal {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes explode {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes shake {
    0% { transform: translate(0, 0) rotate(0); }
    10% { transform: translate(-2px, -2px) rotate(-2deg); }
    20% { transform: translate(2px, -2px) rotate(2deg); }
    30% { transform: translate(-2px, 2px) rotate(-2deg); }
    40% { transform: translate(2px, 2px) rotate(2deg); }
    50% { transform: translate(-2px, -2px) rotate(-2deg); }
    60% { transform: translate(2px, -2px) rotate(2deg); }
    70% { transform: translate(-2px, 2px) rotate(-2deg); }
    80% { transform: translate(2px, 2px) rotate(2deg); }
    90% { transform: translate(-1px, -1px) rotate(-1deg); }
    100% { transform: translate(0, 0) rotate(0); }
  }
  
  @keyframes sparkle {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      filter: brightness(1.5);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Grid transitions */
  .grid-enter-active, .grid-leave-active {
    transition: all 0.3s;
  }
  .grid-enter-from, .grid-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  /* Responsive design */
  @media (max-width: 600px) {
    .mine-casino {
      padding: 0.5rem;
    }
    
    .title {
      font-size: 2rem;
    }
    
    .grid {
      grid-gap: 6px;
    }
    
    .cell-inner {
      font-size: 1.25rem;
    }
    
    .stats .value {
      font-size: 1.25rem;
    }
    
    .game-controls {
      flex-direction: column;
      gap: 1rem;
    }
    
    .potential-win {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    
    .action-button {
      width: 100%;
    }
    
  }
  </style>