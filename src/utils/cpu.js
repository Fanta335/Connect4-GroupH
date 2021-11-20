import calculateWinner from "./calculateWinner";
import canPutStone from "./canPutStone";
import getLowestEmptyYIndex from "./getLowestEmptyYIndex";

const GameState = {
  game: "GAME",
  player_win: "PLAYER_WIN",
  cpu_win: "CPU_WIN",
  draw: "DRAW",
};

/**
 * CPUのクラス
 */
class Cpu {
  /**
   * Cpuクラスのコンストラクターの説明
   * @param {string[][]} board - 盤面を表す二次元配列
   * @param {number} victoryCondition - 勝利条件
   * @param {string} cpuName - boardで使用しているcpuの名前（Player2など）
   * @param {string} playerName - boardで使用しているplayerの名前（Player1など）
   */
  constructor(board, victoryCondition, cpuName, playerName) {
    this.board = board;
    this.victoryCondition = victoryCondition;
    this.cpuName = cpuName;
    this.playerName = playerName;
    this.myTurn = false; // false: CPU, true: Player
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
    this.myTurn ? (this.board[x][y] = this.playerName) : (this.board[x][y] = this.cpuName);
    this.checkState(x, y);
    this.changeTurn();
  }

  /**
   * ゲームの状態を更新する
   * @param {number} x - 直前に石を置いた座標x
   * @param {number} y - 直前に石を置いた座標y
   */
  checkState(x, y) {
    const winner = calculateWinner(this.board, this.victoryCondition, x, y);
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
    const maxScore = this.board.length * this.board[0].length + 1;
    const winner = calculateWinner(this.board, this.victoryCondition, x, y);
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
    const maxScore = this.board.length * this.board[0].length + 1;
    if (mode === "easy") {
      return this.random(); // ランダム
    } else if (mode === "medium") {
      return this.minmax(0, -maxScore, maxScore, null, null, 3); // 3手先まで読む
    } else if (mode === "hard") {
      return this.minmax(0, -maxScore, maxScore, null, null, 10); // 10手先まで読む
    }
  }

  /**
   * 石を置ける座標xをランダムに返す
   * @returns 石を置く座標x
   */
  random() {
    for (;;) {
      let x = Cpu.getRandomInt(this.board.length);
      if (canPutStone(this.board, x)) {
        return x;
      }
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
  minmax(depth, alpha, beta, x, y, limit) {
    if (this.state !== GameState.game || depth >= limit) {
      return this.evaluate(x, y, depth);
    }

    let best_value = 0;
    let value = null;
    this.myTurn ? (value = Infinity) : (value = -Infinity);

    // 盤面の中央から探索した方が、早く良い手を見つけられる可能性が高いので、中央から外に向かって探索していく
    let searchXIndex = [...Array(this.board.length)].map((_, i) => i); //=> [0, 1, 2, 3, 4]
    searchXIndex.sort(function (a, b) {
      return (
        Math.abs(a - searchXIndex[Math.floor(searchXIndex.length / 2)]) -
        Math.abs(b - searchXIndex[Math.floor(searchXIndex.length / 2)])
      );
    }); //=> [2, 1, 3, 0, 4]

    for (let i = 0; i < searchXIndex.length; i++) {
      let x = searchXIndex[i];
      if (canPutStone(this.board, x)) {
        let y = getLowestEmptyYIndex(this.board, x);
        this.putStone(x, y);
        let childValue = this.minmax(depth + 1, alpha, beta, x, y, limit);

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
