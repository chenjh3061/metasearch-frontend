<template>
  <div class="about">
    <a-typography>
      <a-typography-title>关于本站</a-typography-title>
      <a-typography-paragraph>
        这是一个方便用户对站内外信息内容进行搜索的聚合平台。
      </a-typography-paragraph>
      <a-typography-paragraph>
        随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
        Ant Design。基于
        <a-typography-text mark>『确定』和『自然』</a-typography-text>
        的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
        <a-typography-text strong>更好的用户体验</a-typography-text>
        。
      </a-typography-paragraph>
      <a-typography-title :level="2">设计资源</a-typography-title>
      <a-typography-paragraph>
        我们提供完善的设计原则、最佳实践和设计资源文件（
        <a-typography-text code>Sketch</a-typography-text>
        和
        <a-typography-text code>Axure</a-typography-text>
        ），来帮助业务快速设计出高质量的产品原型。
      </a-typography-paragraph>
      <a-typography-paragraph>
        <blockquote>{{ blockContent }}</blockquote>
        <pre>{{ blockContent }}</pre>
      </a-typography-paragraph>

      <a-typography-paragraph>
        按
        <a-typography-text keyboard>Esc</a-typography-text>
        键退出阅读……
      </a-typography-paragraph>
    </a-typography>
  </div>
  <div style="background-color: cadetblue">
    <canvas ref="canvasRef" width="1000" height="700"></canvas>
  </div>
  <p-from />
  <div class="footer">By——johoChen</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PFrom from "@/components/personal-component/personalFormTest.vue";

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
const ball = document.querySelector(".ball");
const blockContent = `AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。
我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。`;
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
