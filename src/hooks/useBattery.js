import { onMounted, onUnmounted, ref } from "vue";

export function useBattery() {
  const battery = ref(null);

  function updateBatteryStatus(batteryManager) {
    battery.value = batteryManager;
  }

  function handleBatteryChange() {
    updateBatteryStatus(battery.value);
  }

  onMounted(() => {
    navigator.getBattery().then((batteryManager) => {
      updateBatteryStatus(batteryManager);
      battery.value = batteryManager;

      batteryManager.addEventListener("chargingchange", handleBatteryChange);
      batteryManager.addEventListener("levelchange", handleBatteryChange);
      batteryManager.addEventListener(
        "chargingtimechange",
        handleBatteryChange
      );
      batteryManager.addEventListener(
        "dischargingtimechange",
        handleBatteryChange
      );
    });
  });

  onUnmounted(() => {
    if (battery.value) {
      battery.value.removeEventListener("chargingchange", handleBatteryChange);
      battery.value.removeEventListener("levelchange", handleBatteryChange);
      battery.value.removeEventListener(
        "chargingtimechange",
        handleBatteryChange
      );
      battery.value.removeEventListener(
        "dischargingtimechange",
        handleBatteryChange
      );
    }
  });

  return battery;
}
