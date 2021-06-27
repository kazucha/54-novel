import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/index.module.scss';

declare global {
  interface Window {
    gtag: (name: string, value: string) => void;
  }
}

export default function IndexPage() {
  const [ isInit, setIsInit ] = useState(false);
  const [ img, setImg ] = useState<HTMLImageElement>(null);
  const [ text, setText ] = useState([]);
  const [ href, setHref ] = useState('');
  const [ novel, setNovel ] = useState('');
  const [ news, setNews ] = useState([]);
  const [ books, setBooks ] = useState([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const WIDTH = 550; //frameの高さ
  const HEIGHT = 550; //frameの幅 
  const TXT_LENGTH = 54; //文字数
  const TXT_SIZE = 34; //テキストの大きさ
  //const X_MARGIN = 425; //original:入力欄の最大幅
  //const Y_MARGIN = 51; //original:縦の余白
  const UPPER_MARGIN = 87.5;
  const LEFT_MARGIN = 40;
  const X_RANGE = 74.5;
  const Y_RANGE = 50;
  const X_LENGTH = 6; //行数
  const Y_LENGTH = 9; //1行の文字数
  //const GRID_SIZE = 50; //1文字のサイズ
  const LINE_HEIGHT = 75; //入力エリア１行分の高さ
  const LINE_WIDTH = 470; //入力エリア１行分の幅
  const MAX_LINE = 5;
  const MAX_TXT = 70; //最大文字数

  useEffect(() => {
    if (isInit) {
      return;
    }

/* 
    (async () => {
      const headers = { 'X-API-KEY': '28b5c90f-7954-4d78-9bd6-516c1497263a' };

      await Promise.all([
        axios.get('https://54ji.microcms.io/api/v1/novel', {
          headers
        }),
        axios.get('https://54ji.microcms.io/api/v1/news', {
          headers
        }),
        axios.get('https://54ji.microcms.io/api/v1/books', {
          headers
        }),
      ]).then((res) => {
        setNovel(res[0].data.novel);
        setNews(res[1].data.contents.reverse());
        setBooks(res[2].data.contents.reverse());
      });
    })();
     */

    const imgElm = new Image();

    imgElm.onload = () => {
      setIsInit(true);
      setImg(imgElm);
    };
    imgElm.src = './yat5_format.png';

    /* 
    ([].slice.call(document.querySelectorAll('[data-ga]'))).forEach(function(elm: HTMLElement) {
      elm.addEventListener('click', () => {
        handleClickGa(elm);
      });
    });
 */
    const txt = txtRef.current;

    setInterval(() => {
      setText([...txt.innerText]);
    }, 100);
  }, [isInit]);

  useEffect(() => {
    if (!img) {
      return;
    }

    const txt = txtRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const subCanvas = document.createElement('canvas');
    const subCtx = subCanvas.getContext('2d');

    //subCanvas.width = subCanvas.height = GRID_SIZE;
    subCanvas.width = LINE_WIDTH;
    subCanvas.height = LINE_HEIGHT;

    render();

    function render():void {
      canvas.width  = WIDTH;
      canvas.height = HEIGHT;

      ctx.save();
        ctx.drawImage(img, 0, 0);
      ctx.restore();

      ctx.save();
     //   subCtx.fillStyle = '#333';
          subCtx.textBaseline = 'middle'; // context . textBaseline = "ベースラインの位置" …… ベースラインの位置を指定する
     //   subCtx.textAlign = 'center';
        subCtx.font = "bold " + TXT_SIZE + 'pt YuGothic';

        for (let i = 0; i < MAX_TXT; ++i) {
          const str = text[i];

          subCtx.save();
          if(str){
            subCtx.fillText(str, 0, 0);//context.fillText(text, x, y [, maxWidth ] ) …… 塗りつぶしのテキストを指定座標に描画する
            subCtx.restore();
            ctx.drawImage(subCanvas, getX(i), 0); //文字の描画
          }

          // if (str) {
          //   subCtx.save();
          //     //subCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);//context . clearRect(x, y, w, h) …… 四角形の形にクリアする
          //     //subCtx.clearRect(0, 0, LINE_WIDTH, LINE_HEIGHT);//context . clearRect(x, y, w, h) …… 四角形の形にクリアする
          //     //subCtx.translate(GRID_SIZE / 2, GRID_SIZE / 2);//context . translate(x, y) …… 移動する
          //     //subCtx.translate(LINE_WIDTH / 2, LINE_HEIGHT / 2);//context . translate(x, y) …… 移動する
          //     //setCharacterTransform(subCtx, str);
          //     //subCtx.fillText(str, 0, 0);//context.fillText(text, x, y [, maxWidth ] ) …… 塗りつぶしのテキストを指定座標に描画する
          //     subCtx.fillText(str, 0, 0);//context.fillText(text, x, y [, maxWidth ] ) …… 塗りつぶしのテキストを指定座標に描画する
          //   subCtx.restore();
          //   ctx.drawImage(subCanvas, getX(i), getY(i)); //文字の描画
          // }

        }
      ctx.restore();
      setHref(canvas.toDataURL('image/png'));
    }
 
    function getX(i: number):number {
      //return X_MARGIN - X_RANGE * (i / Y_LENGTH | 0); //original:右上から書き出し
      return LEFT_MARGIN + TXT_SIZE * i
    }
 
    function getY(i: number): number {
      // return Y_MARGIN + Y_RANGE * (i % Y_LENGTH); //original:右上から書き出し
      return UPPER_MARGIN + LINE_HEIGHT * i //上から順に行を切り替え
    }
/* 
    function setCharacterTransform(ctx: CanvasRenderingContext2D, c: string):void {
      let em  = TXT_SIZE,
          deg = Math.PI / 180;

      switch (true) {
        case -1 < '。、．，'.indexOf(c):
          ctx.translate(0.7 * em, -0.6 * em);
          return;
        case -1 < '「」『』（）()＜＞<>〈〉【】［］《》｛｝'.indexOf(c):
          ctx.rotate(90 * deg);
          return;
        case -1 < '“'.indexOf(c):
          ctx.translate(0.4 * em, 0.1 * em);
          ctx.rotate(180 * deg);
          return;
        case -1 < '”'.indexOf(c):
          ctx.translate(-0.35 * em, -0.1 * em);
          ctx.scale(-1, 1);
          return;
        case -1 < '〝'.indexOf(c):
          ctx.translate(0.6 * em, 0.6 * em);
          ctx.scale(-1, 1);
          return;
        case -1 < '〟'.indexOf(c):
          ctx.translate(-0.6 * em, -0.65 * em);
          ctx.scale(-1, 1);
          return;
        case -1 < 'ー'.indexOf(c):
          ctx.scale(-1, 1);
          ctx.rotate(91.5 * deg);
          return;
        case -1 < '—…―〜'.indexOf(c):
          ctx.rotate(90 * deg);
          return;
        case -1 < '：；｜'.indexOf(c):
          ctx.rotate(90 * deg);
          return;
        case -1 < `'`.indexOf(c):
          ctx.rotate(90 * deg);
          return;
        case -1 < 'ぁぃぅぇぉゃゅょっァゥォュョッ'.indexOf(c):
          ctx.translate(0.1 * em, -0.1 * em);
          return;
        case -1 < 'ャ'.indexOf(c):
          ctx.translate(0.12 * em, -0.1 * em);
          return;
        case -1 < 'ィ'.indexOf(c):
          ctx.translate(0.2 * em, -0.1 * em);
          return;
        case -1 < 'ェ'.indexOf(c):
          ctx.translate(0.1 * em, -0.15 * em);
          return;
        case -1 < '.,-'.indexOf(c):
          ctx.rotate(90 * deg);
          return;
        case /[A-Za-z]/.test(c):
          ctx.rotate(90 * deg);
          return;
        case -1 < 'Ｑ'.indexOf(c):
          ctx.translate(0, -0.1 * em);
          return;
        case -1 < 'Ｊａｃｅｊｍｎｏｒｓｔｕｖｗｘｚ'.indexOf(c):
          ctx.translate(0, -0.15 * em);
          return;
        case -1 < 'ｇｐｑｙ'.indexOf(c):
          ctx.translate(0, -0.25 * em);
          return;
      }
    } */
  }, [text]);
  /* 
  function getNewsItem(item, i) {
    return (
      <div
        key={ i }
        className={ styles.box }
      >
        <h1>{ item.title }</h1>
        <div dangerouslySetInnerHTML={{__html: item.html}} />
      </div>
    );
  }
 */
/* 
  function getNews() {
    return news.map((item, i) => {
      return getNewsItem(item, i);
    });
  }
 */
  /* 
  function getBookBox(book, i) {
    return (
      <div
        key={ i }
        className={ styles['book-box'] }
      >
        <a
          data-ga={ `book$${i + 1}-picture` }
          className={ styles['book-link'] }
          href={ book.link }
          target="_blank"
        >
          <img
            src={ `${book.img.url}?w=260` }
            className={ styles['book-link-img'] }
          />
        </a>
        <a
          data-ga={ `book$${i + 1}-button` }
          className={ `${styles.btn} ${styles['book-link-btn']}` }
          href={ book.link }
          target="_blank"
        >書籍情報</a>
      </div>
    );
  }
 */
  /* 
  function getBookBoxes() {
    return books.map((book, i) => {
      return getBookBox(book, i);
    });
  }

  function handleClickGa(elm: HTMLElement) {
    window.gtag('event', String(elm.dataset.ga));
  }
 */
  return (
    <div
      className={ styles.index }
      style={{ opacity: isInit ? 1 : 0 }}
    >
      <figure>
        <canvas
          ref={ canvasRef }
        />
        <img src={ href } />
      </figure>
      <div
        id="text" //★
        ref={ txtRef }
        className={ styles.txt } 
        contentEditable={ true }
        suppressContentEditableWarning={ true }
      >{/*{ novel }*/}</div>
      <a
        id="btn-download"
        className={ `${styles.btn} ${styles['btn-save']}` }
        href={ href }
        download="54"
      >画像を保存</a>
      {<div className={ styles.box }>
       <h1>あなたがこの１年でやってみたことを書いてみましょう。</h1>
      </div>}
      {/*{ getNews() }
      <div className={ styles.box }>
        <h1>54字の物語 好評発売中!!</h1>
        <p>たった54字の新感覚ショートストーリー。<br />意味がわかるとゾクゾクする90の物語を収録!</p>
        { getBookBoxes() }
      </div>
      <a
        data-ga="thinking-footer"
        className={ styles.logo }
        href="https://thinking.co.jp/"
        target="_blank"
      >
        <img src="./logo.png" />
      </a> */}
    </div>
  );
}