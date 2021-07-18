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

    ctx.font = "Bold 34px Yu Gothic"
    ctx.drawImage(img, 0, 0);
    
    for(var lines = text.split( "\n" ), i = 0, l = lines.length; l > i; i++ ) {
      var line = lines[i] ;
      var addY = TXT_SIZE ;
      if(i) addY += LINE_HEIGHT * i ;
      if(i < 5) ctx.fillText(line.slice(0,14), LEFT_MARGIN, UPPER_MARGIN + addY ) ;
    }
    
    setHref(canvas.toDataURL('image/png'));
 
  }, [text, img]);
 
  function bytes(str) {
    str = str.replace(/[｡-ﾟ]/g, 'K');
    var hex = '';
    for (var i = 0; i < str.length; i++) {
      hex += (('0000' + str.charCodeAt(i).toString(16)).slice(-4)).replace(/^00/, '');
    }
    return hex.length/2;
  }

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
        id="text" 
        ref={ txtRef }
        className={ styles.txt } 
        contentEditable={ true }
        suppressContentEditableWarning={ true }
      ></div>
      <a
        id="btn-download"
        className={ `${styles.btn} ${styles['btn-save']}` }
        href={ href }
        download="54"
      >画像を保存</a>
      {<div className={ styles.box }>
       <h1>あなたがこの１年でやってみたことを書いてみましょう。</h1>
      </div>}
    </div>
  );
}