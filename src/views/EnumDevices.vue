<template>
  <div class="container">
    <b-table :data="devices" :columns="columns"></b-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IRDeviceItem, IREnumDevices} from "@/scripts/Server";

@Component
export default class EnumDevices extends Vue {
  devices = [] as IRDeviceItem[];
  columns = [
    {
      field: 'ID',
      label: 'ID',
      width: '140',
      centered: true
    },
    {
      field: 'Name',
      label: 'Наименование',
      width: '200',
      centered: true
    },
    {
      field: 'Serial',
      label: 'Номер',
      width: '200',
      centered: true
    },
  ]

  mounted(): void {
    this.$eventBus.$emit("progress-start");
    this.$serviceConnector.EnumDevices().then((r: IREnumDevices) => {
      this.devices = r.Items;
      this.$eventBus.$emit("progress-stop");
    });
  }
}
</script>
