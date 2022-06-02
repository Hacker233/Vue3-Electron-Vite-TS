<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <div>
    <button @click="openNewWin">打开新窗口</button>
  </div>
</template>
<script setup lang="ts">
import { useIpcRenderer } from "@vueuse/electron";
const ipcRenderer = useIpcRenderer();
const openNewWin = () => {
  ipcRenderer.send("window-new", {
    route: "/helloworld",
    width: 500,
    height: 500,
  });
};
</script>