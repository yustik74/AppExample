<template>
  <div class="container">
    <b-table :data="schemas" :columns="columns"></b-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ISchemaItem} from "@/scripts/ServiceConnector";

@Component
export default class Home extends Vue {
  schemas = [] as ISchemaItem[];
  columns = [
    {
      field: 'ID',
      label: 'ID (идентификатор)',
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
    this.$serviceConnector.EnumSchemas().then((r: ISchemaItem[]) => {
      this.schemas = r;
    });
  }
}
</script>
