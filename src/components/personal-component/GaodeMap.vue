<template>
  <div class="flx-align-center mb-10">
    <a-input
      v-model="address"
      class="address mr-20"
      id="address"
      placeholder="请输入地址"
    ></a-input>
    <a-button type="primary" @click="search">查询</a-button>
  </div>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const address = ref("");
let map: {
  plugin: (
    arg0: string[],
    arg1: {
      (): void;
      (): void;
      (): void;
      (): void;
      (): void;
      (): void;
      (): void;
    }
  ) => void;
  addControl: (arg0: any) => void;
  destroy: () => void;
} | null = null;
let geocoder: any;

window._AMapSecurityConfig = {
  securityJsCode: "0f09299057858403ca371050ff96ed57",
};
onMounted(() => {
  AMapLoader.load({
    // 申请好的Web端开发者Key，首次调用 load 时必填
    key: "a4887a4b718a39aa7e85a964fe865f87",
    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    version: "2.0",
    //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    plugins: [
      "AMap.ToolBar",
      "AMap.Scale",
      "AMap.PlaceSearch",
      "AMap.AutoComplete",
      "AMap.HawkEye",
      "AMap.Geolocation",
      "AMap.Geocoder",
      "AMap.MapType",
      "AMap.DistrictSearch",
      "AMap.LineSearch",
      "AMap.StationSearch",
      "AMap.Driving",
      "AMap.Walking",
      "AMap.Transfer",
      "AMap.DragRoute",
      "AMap.MouseTool",
      "AMap.PolylineEditor",
      "AMap.CloudDataSearch",
      "AMap.RangingTool",
      "AMap.Weather",
    ],
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        //设置地图容器id
        viewMode: "3D",
        //设置地图级别
        zoom: 10,
        //设置地图中心点
        center: [116.397428, 39.90923],
      });
      // 添加工具条
      //map?.addControl(new AMap.ToolBar());
      map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
      });
      map.plugin(["AMap.Scale"], function () {
        map.addControl(new AMap.Scale()); // 比例尺条控件
      });
      map.plugin(["AMap.Geolocation"], function () {
        map.addControl(new AMap.Geolocation()); //定位当前位置插件； 用来获取和展示用户主机所在的经纬度位置；
      });
      map.plugin(["AMap.HawkEye"], function () {
        map.addControl(new AMap.HawkEye()); //鹰眼插件；在地图右下角显示地图的缩略图
      });
      map.plugin(["AMap.MapType"], function () {
        map.addControl(new AMap.MapType()); //实现默认图层与卫星图、实施交通图层之间切换的控件
      });
      // 添加搜索控件
      map.plugin(["AMap.PlaceSearch"], function () {
        map.addControl(new AMap.PlaceSearch());
      });
      // 灵活点标记
      var marker = new AMap.ElasticMarker();
      map.addControl(marker);
      // 添加地图操作控件
      var controlBar = new AMap.ControlBar({
        position: {
          right: "10px",
          top: "10px",
        },
      });
      map.addControl(controlBar);
      // 图层切换
      var mapType = new AMap.MapType();
      map.addControl(mapType);
      // 输入提示
      var auto = new AMap.AutoComplete();
      map.addControl(auto);
      // 行政区查询
      var districtSearch = new AMap.DistrictSearch();
      map.addControl(districtSearch);
      // 公交查询
      var bus = new AMap.LineSearch();
      map.addControl(bus);
      var stationSearch = new AMap.StationSearch();
      map.addControl(stationSearch);
      // 驾车路线
      var driving = new AMap.Driving();
      map.addControl(driving);
      // 步行路线
      var walking = new AMap.Walking();
      map.addControl(walking);
      // 拖拽导航
      var dragRoute = new AMap.DragRoute();
      map.addControl(dragRoute);
      // 城市获取
      var citySearch = new AMap.CitySearch();
      map.addControl(citySearch);
      // 地理编码
      var geocoder = new AMap.Geocoder();
      map.addControl(geocoder);
      // 鼠标工具插件
      map.plugin(["AMap.MouseTool"], function () {
        var mouseTool = new AMap.MouseTool(map);
        mouseTool.rule();
      });
      //用户手动绘制折线图，测量距离
      // 轨迹编辑
      var lineEditor = new AMap.PolylineEditor();
      map.addControl(lineEditor);
      // 测距
      var ruler = new AMap.RangingTool();
      map.addControl(ruler);
      // 天气
      var weather = new AMap.Weather();
      map.addControl(weather);
      geocoder = new AMap.Geocoder({ city: "" });
    })
    .catch((e: any) => {
      console.log(e);
    });
});
// const search = () => {
//   geocoder.getLocation(address.value, (status: any, result: any) => {
//     console.log("result", address.value, status, result);
//     if (status === "complete" && result.info === "OK") {
//       // result中对应详细地理坐标信息
//       console.log("result", result);
//       console.log("result", result.geocodes[0].location);
//       let lngLat = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
//       console.log("result", lngLat);
//       locationArr.value = lngLat;
//     } else {
//       console.error("查询失败");
//     }
//   });
// };

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
