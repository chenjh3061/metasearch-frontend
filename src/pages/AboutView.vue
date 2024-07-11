<template>
  <div class="about">
    <a-typography>
      <a-typography-title>关于本站</a-typography-title>
      <a-typography-paragraph>
        这是一个方便用户对站内外信息内容进行搜索的聚合平台。
      </a-typography-paragraph>
      <a-typography-paragraph>
        可以通过设置不同的搜索方式，搜索你想要的各式内容。<br />
        本站将
        <a-typography-text mark>持续更新</a-typography-text>
        以求
        <a-typography-text strong>更好的用户体验</a-typography-text>
      </a-typography-paragraph>
    </a-typography>
  </div>
  <div style="background-color: cadetblue">
    <canvas ref="canvasRef" width="1000" height="700"></canvas>
  </div>
  <!--  <p-from />-->
  <div class="footer">
    <div class="author">By——johoChen</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

window.addEventListener("click", (e) => {
  const pointer = document.createElement("div");
  pointer.classList.add("pointer");
  pointer.style.left = `${e.clientX}px`;
  pointer.style.top = `${e.clientY}px`;
  document.body.appendChild(pointer);
  pointer.addEventListener("animationend", () => {
    pointer.remove();
  });
});
// 获取canvas的dom节点
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvasEle = canvasRef.value;
  if (!canvasEle) return;
  //获取canvas上下文
  const ctx = canvasEle.getContext("2d")!;
  //坐标系移动
  ctx.translate(canvasEle.width / 2, canvasEle.height);
  //y轴反向
  ctx.scale(1, -1);

  const drawBranch = (
    coordinate: [number, number], //起始点
    len: number, //树枝长度
    thick: number, //树枝粗细
    angle: number, //生长角度
    callback: () => void // 回调函数，用于绘制下一个分支
  ) => {
    //结束条件
    if (thick < 10 && Math.random() < 0.1) return callback();
    if (thick < 2) {
      //绘制果实
      ctx.beginPath();
      ctx.arc(...coordinate, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      return callback();
    }

    ctx.beginPath(); // 开始绘制
    ctx.moveTo(...coordinate); //初始起始点

    //计算结束点
    const endCoordinate: [number, number] = [
      coordinate[0] + len * Math.cos((angle * Math.PI) / 180),
      coordinate[1] + len * Math.sin((angle * Math.PI) / 180),
    ];

    ctx.lineTo(...endCoordinate); //线段终点
    ctx.strokeStyle = "#333"; //线段颜色
    ctx.lineWidth = thick; //粗细
    ctx.lineCap = "round";
    ctx.stroke(); //开始绘画

    // 使用 requestAnimationFrame 逐步绘制分支
    requestAnimationFrame(() => {
      drawBranch(
        endCoordinate,
        len * 0.8,
        thick * 0.75,
        angle + Math.random() * 30,
        () => {
          drawBranch(
            endCoordinate,
            len * 0.8,
            thick * 0.75,
            angle - Math.random() * 30,
            callback
          );
        }
      );
    });
  };

  const drawTree = () => {
    drawBranch([0, 0], 100, 20, 90, () => {
      console.log("Tree drawing complete.");
    });
  };

  drawTree();
});
</script>

<style>
.about {
  text-align: center;
}

.author {
  max-width: 200px;
  margin-right: 0;
}

.ball {
  background-color: orangered;
}

.pointer {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  animation: fadeOut 0.5s forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(2);
  }
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>
