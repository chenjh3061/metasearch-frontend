import { onMounted, onUnmounted, ref } from "vue";

export function useBattery() {
  const battery = ref(null);

  function updateBatteryStatus(batteryManager) {
    battery.value = batteryManager;
  }

  onMounted(() => {
    navigator.getBattery().then((batteryManager) => {
      updateBatteryStatus(batteryManager);

      batteryManager.addEventListener("chargingchange", () =>
        updateBatteryStatus(batteryManager)
      );
      batteryManager.addEventListener("levelchange", () =>
        updateBatteryStatus(batteryManager)
      );
      batteryManager.addEventListener("chargingtimechange", () =>
        updateBatteryStatus(batteryManager)
      );
      batteryManager.addEventListener("dischargingtimechange", () =>
        updateBatteryStatus(batteryManager)
      );
    });
  });

  onUnmounted(() => {
    if (battery.value) {
      battery.value.removeEventListener("chargingchange", updateBatteryStatus);
      battery.value.removeEventListener("levelchange", updateBatteryStatus);
      battery.value.removeEventListener(
        "chargingtimechange",
        updateBatteryStatus
      );
      battery.value.removeEventListener(
        "dischargingtimechange",
        updateBatteryStatus
      );
    }
  });

  return battery;
}
