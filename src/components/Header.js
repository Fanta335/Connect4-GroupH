import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

// TODO: Yuki Ueno: ゲーム画面からホーム画面、設定画面に遷移する際にタイマーを停止する処理を追加する（参考：https://weblike-curtaincall.ssl-lolipop.jp/blog/?p=2056）
const Header = () => {
  return (
    <header>
      <Link to="/">
        <Button variant="contained" color="primary" style={{ height: "50px" }}>
          Home
        </Button>
      </Link>
      <Link to="/settings">
        <Button variant="contained" color="primary" style={{ height: "50px" }}>
          Settings
        </Button>
      </Link>
    </header>
  );
};

export default Header;
