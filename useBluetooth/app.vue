<template>
  <div>
    <h3> Bluetooch Devices</h3>
    <button @click="startBluetooch">连接蓝牙</button>
    <ul>
      <li v-for="device in devices" :key="device.id">{{ device.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let devices = ref([])
async function startBluetooch() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    devices.value.push(device)
  } catch (error) {
    console.error('Error initializing Bluetooth:', error)
  }
}

</script>
