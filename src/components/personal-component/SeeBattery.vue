<template>
  <div>
    <div>电池状态: <i :class="batteryIcon" class="battery-icon"></i></div>
    <div>电池剩余: {{ batteryLevel }}%</div>
  </div>
</template>

<script>
import { useBattery } from "@/hooks/useBattery";
import { computed } from "vue";

export default {
  setup() {
    const battery = useBattery();
    const batteryLevel = computed(() =>
      battery.value ? Math.round(battery.value.level * 100) : null
    );
    const batteryState = computed(() =>
      battery.value ? (battery.value.charging ? "充电中" : "未充电") : null
    );

    const batteryIcon = computed(() => {
      if (!battery.value) return "fas fa-battery-empty";

      const level = battery.value.level;
      if (battery.value.charging) {
        return "fas fa-battery-charging";
      } else if (level > 0.75) {
        return "fas fa-battery-full";
      } else if (level > 0.5) {
        return "fas fa-battery-three-quarters";
      } else if (level > 0.25) {
        return "fas fa-battery-half";
      } else if (level > 0) {
        return "fas fa-battery-quarter";
      } else {
        return "fas fa-battery-empty";
      }
    });

    return { batteryLevel, batteryState, batteryIcon };
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.battery-icon {
  font-size: 24px;
}
</style>
