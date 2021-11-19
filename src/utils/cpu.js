import calculateWinner from "../utils/calculateWinner";
import canPutStone from "./canPutStone";
import getLowestEmptyYIndex from "./getLowestEmptyYIndex";

const GameState = {
  game: "GAME",
  player_win: "PLAYER_WIN",
  cpu_win: "CPU_WIN",
  draw: "DRAW",
};

class Cpu {
  constructor(board, victoryCondition) {
    this.board = board;
    this.victoryCondition = victoryCondition;
    this.cpuName = "cpu";
    this.playerName = "player";
    this.myTurn = true;
    this.state = GameState.game;
  }

  /**
   * ターンを交代する
   */
  changeTurn() {
    this.myTurn = !this.myTurn;
  }

  /**
   * 座標に対する操作を取り消す
   * @param {number} x - 操作を取り消す座標x
   * @param {number} y - 操作を取り消す座標y
   */
  undoValue(x, y) {
    this.board[x][y] = null;
    this.changeTurn();
  }

  /**
   * 指定の座標に石を置く
   * @param {number} x - 石を置く座標x
   * @param {number} y - 石を置く座標y
   */
  putStone(x, y) {
    this.myTurn ? (this.board[x][y] = this.cpuName) : (this.board[x][y] = this.playerName);
    this.checkState(x, y);
    this.changeTurn();
  }

  /**
   * ゲームの状態を更新する
   * @param {number} x - 直前に石を置いた座標x
   * @param {number} y - 直前に石を置いた座標y
   */
  checkState(x, y) {
    let winner = calculateWinner(this.board, this.victoryCondition, x, y);
    if (winner === this.cpuName) {
      this.state = GameState.cpu_win;
    } else if (winner === this.playerName) {
      this.state = GameState.player_win;
    } else if (winner === "draw") {
      this.state = GameState.draw;
    } else {
      this.state = GameState.game;
    }
  }

  /**
   * 評価関数
   * @param {number} x - 直前に石を置いた座標x
   * @param {number} y - 直前に石を置いた座標y
   * @param {number} depth - ゲーム木の深さ
   * @returns 評価値
   */
  evaluate(x, y, depth) {
    let maxScore = this.board.length * this.board[0].length;
    let winner = calculateWinner(this.board, this.victoryCondition, x, y);
    if (winner === this.cpuName) {
      return maxScore - depth;
    } else if (winner == this.playerName) {
      return depth - maxScore;
    } else {
      return 0;
    }
  }

  /**
   * 次の手を考える
   * @param {string} mode - easy/medium/hard
   * @returns cpuが石を置く座標x
   */
  cpuThink(mode) {
    // let maxScore = this.board.length * this.board[0].length;
    if (mode === "easy") {
      return this.random();
    } else if (mode === "medium") {
      console.log("5手先まで読む");
    } else if (mode === "hard") {
      // return this.minmax(0, -maxScore, maxScore, 0, 0);
      console.log("最終手まで読む");
    }
  }

  /**
   * 石を置ける座標xをランダムに返す
   * @returns 石を置く座標x
   */
  random() {
    let x = Cpu.getRandomInt(this.board.length);
    if (canPutStone(this.board, x)) {
      return x;
    }
  }

  // 参考にしたサイト
  // https://qiita.com/army_sh/items/1ff678a0c184dff35116
  // https://postd.cc/tic-tac-toe-understanding-the-minimax-algorithm/
  // http://usapyon.game.coocan.jp/ComShogi/04.html
  /**
   * ミニマックス法（alpha-beta法）による走査
   * @param {number} depth - ゲーム木の深さ
   * @param {number} alpha - alpha値
   * @param {number} beta - beta値
   * @param {number} x - 石を置く座標x
   * @param {number} y - 石を置く座標y
   * @returns
   */
  minmax(depth, alpha, beta, x, y) {
    if (this.state !== GameState.game) {
      return this.evaluate(x, y, depth);
    }

    let best_value = 0;
    let value = null;
    this.myTurn ? (value = Infinity) : (value = -Infinity);

    for (let x = 0; x < this.board.length; x++) {
      if (canPutStone(this.board, x)) {
        let y = getLowestEmptyYIndex(this.board, x);
        this.putStone(x, y);
        let childValue = this.minmax(depth + 1, alpha, beta, x, y);

        if (this.myTurn) {
          if (beta <= childValue) {
            this.undoValue(x, y);
            return childValue;
          }
          if (childValue > value) {
            value = childValue;
            best_value = x;
            alpha = childValue;
          }
        } else {
          if (alpha >= childValue) {
            this.undoValue(x, y);
            return childValue;
          }
          if (childValue < value) {
            value = childValue;
            best_value = x;
            beta = childValue;
          }
        }
        this.undoValue(x, y);
      }
    }

    if (depth === 0) {
      return best_value;
    } else {
      return value;
    }
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

export default Cpu;
