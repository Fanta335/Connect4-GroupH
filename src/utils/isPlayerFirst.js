/**
 * 一様分布関数から抽出した乱数の、2の剰余で先攻、後攻を決定
 * @returns {boolean} プレイヤーが先攻ならtrueを返す。
 */
function isPlayerFirst() {
  // 0~999の乱数を生成(整数)。
  const randomNumber = Math.floor(Math.random() * 1000);
  // 乱数を2で割り、余りで先攻、後攻を決定。
  if (randomNumber % 2 === 0) return true;
  return false;
}

export default isPlayerFirst;
