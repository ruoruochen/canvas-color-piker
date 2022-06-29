import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  /**
   * 实现思路：
   * 1. 绘制图片
   * 2. 监听鼠标移动
   * 3. 获取当前鼠标位置 getImageData，拿到rgba 设置到指定位置颜色
   */
  const [canvasCtx, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [colorStyle, setColorStyle] = useState("");

  useEffect(() => {
    draw();
    window.addEventListener("mousemove", pickColor);

    return () => {
      window.removeEventListener("mousemove", pickColor);
    };
  }, []);

  const draw = () => {
    const canvas: HTMLCanvasElement | null =
      document.querySelector("#canvas-container");
    if (canvas?.getContext) {
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
      setCanvasContext(ctx);
      const image = new Image();
      image.src =
        "https://ruoruochen-img-bed.oss-cn-beijing.aliyuncs.com/20220618122345.png";
      image.crossOrigin = "anonymous";
      image.onload = () => {
        console.log("draw");

        canvasCtx?.drawImage(image, 0, 0);
      };
    }
  };

  const pickColor = (ev: Event): any => {
    console.log(ev);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = ev?.offsetX;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const y = ev?.offsetY;

    const data = canvasCtx?.getImageData(x, y, 1, 1)?.data;
    if (data?.length && data?.length > 3) {
      const color = `rgba(${data?.[0]},${data?.[1]},${data?.[2]},${
        data?.[3] / 255
      })`;
      setColorStyle(color);
    }
  };

  return (
    <div className="App">
      <div className="picker" style={{ backgroundColor: colorStyle }}>
        当前选取的颜色是:${colorStyle}
      </div>

      <canvas id="canvas-container"></canvas>
    </div>
  );
}

export default App;
