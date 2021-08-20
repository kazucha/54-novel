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
  const [ text, setText ] = useState<string>('');
  const [ href, setHref ] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const WIDTH = 550;
  const HEIGHT = 550; 
  const TXT_SIZE = 34;
  const UPPER_MARGIN = 95;
  const LEFT_MARGIN = 40;
  const LINE_HEIGHT = 80;
  
  useEffect(() => {
    if (isInit) {
      return;
    }

    const imgElm = new Image();

    imgElm.onload = () => {
      setIsInit(true);
      setImg(imgElm);
    };
    imgElm.src = './yat5_format.png';

    const txt = txtRef.current;

    setInterval(() => {
      setText(txt.innerText);
    }, 100);
  }, [isInit]);

  useEffect(() => {
    if (!img) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width  = WIDTH;
    canvas.height = HEIGHT;

    ctx.font = 'bold 34px "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic", sans-serif';
    ctx.drawImage(img, 0, 0);

    var rep_text = text.replace(/\n{2}/g, '\n');
    for(var lines = rep_text.split('\n'), i = 0, l = lines.length; l > i; i++ ) {
      var line = lines[i] ;
      var addY = TXT_SIZE ;
      addY += LINE_HEIGHT * i ;
      if(i < 5) ctx.fillText(line.slice(0, 14), LEFT_MARGIN, UPPER_MARGIN + addY ) ;
    }
    
    setHref(canvas.toDataURL('image/png'));
  }, [text, img]);

  return (
    <div
      className={ styles.index }
      style={{ opacity: isInit ? 1 : 0 }}
    >
      <div
       className={ styles.title }>
         <img className={ styles.title_img } src = "./mty_title.png"></img>
      </div>
      <div
       className={styles.img1_div}>
       <img className={ styles.num_img } src= "./mty_1.png"></img>
      </div>
      <div
       className={ styles.description }
       >
        <p>あなたが「この１年でやってみた」ことを</p>
        <p>5つ書いてみましょう。</p>
        <p>(1行あたり14文字以内に収めてください)</p>
      </div>
      <figure>
        <canvas
          ref={ canvasRef }
        />
        <img src={ href } />
      </figure>
      <div
        id="text" 
        ref={ txtRef }
        className={ styles.txt } 
        contentEditable={ true }
        suppressContentEditableWarning={ true }
      ></div>
      <div
        className={ styles.arrowdiv1 }>
          <img className={ styles.arrow_img } src="./mty_yajirushi.png"></img>
      </div>
      <div
       className={styles.img2_div}>
       <img className={ styles.num_img } src= "./mty_2.png"></img>
      </div>
      <div
       className={ styles.description }
       >
        <p className={ styles.pdes }>入力が終わったら、</p>
        <p className={ styles.pdes }>画像をダウンロードしてみましょう。</p>
      </div>
      <a
        id="btn-download"
        className={ `${styles.btn} ${styles['btn-save']}` } 
        href={ href }
        download="this-my-year"
        backgroud-color= "#fff"
      ><img className={ styles.download_img} src="./mty_dl.gif"></img></a>
      <div
        className={ styles.arrowdiv2 }>
        <img  className={ styles.arrow_img } src="./mty_yajirushi.png"></img>
      </div>
      <div
       className={styles.img3_div}>
       <img className={ styles.num_img } src= "./mty_3.png"></img>
      </div>
      {<div className={ styles.box }>
       <p className={ styles.pbox }>SNSでシェアしてみましょう。</p>
      </div>}
      <div className={ styles.twitter_div } >
        <a href="https://twitter.com/1nen_yattemita" target="_blank" className={ styles.twitter_link }>
        <img className={ styles.twitter_icon } src="./mty_twitter.png"></img>「#この1年でやってみた」公式ツイッター</a>
      </div>
    </div>
  );
}