<template>
  <div class="container">
    <b-table :data="schemas" :columns="columns"></b-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IRSchema} from "@/scripts/Server";

@Component
export default class EnumSchemas extends Vue {
  schemas = [] as IRSchema[];
  columns = [
    {
      field: 'ID',
      label: 'ID',
      width: '140',
      centered: true
    },
    {
      field: 'Group',
      label: 'Группа',
      width: '200',
      centered: true
    },
    {
      field: 'Name',
      label: 'Наименование',
      width: '200',
      centered: true
    },
  ]

  mounted(): void {
    this.$eventBus.$emit("progress-start");
    this.$serviceConnector.EnumSchemas().then((r: IRSchema[]) => {
      this.schemas = r;
      this.$eventBus.$emit("progress-stop");
    });
  }
}
</script>
