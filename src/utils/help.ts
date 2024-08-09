// @/utils/help.ts

export function calcHeight(element: string): string {
  // 假设这个函数根据不同的元素标识符返回不同的高度值
  switch (element) {
    case "main":
      return "70vh"; // 主页面占整个视口高度
    case "header":
      return "60px"; // 头部高度
    case "footer":
      return "40px"; // 底部高度
    default:
      return "500px"; // 默认高度
  }
}
