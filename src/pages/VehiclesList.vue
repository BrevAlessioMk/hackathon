<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td  auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if="col.name === 'temperature'">
              <vehicle-temperature :temperature="col.value" />
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="height: 300px;">
            <VehicleChart />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import {
  QBtn, QIcon, QInput, QTable, QTd, QTr,
} from 'quasar';
import { ref } from 'vue';
import VehicleChart from 'components/VehicleChart.vue';
import VehicleTemperature from 'components/VehicleTemperature.vue';

const columns = [
  {
    name: 'make',
    field: 'make',
    required: true,
    label: 'Make',
    sortable: true,
  },
  {
    name: 'model',
    align: 'center',
    label: 'Model',
    field: 'model',
    sortable: true,
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    sortable: true,
  },
  {
    name: 'fuel_type',
    label: 'Fuel type',
    field: 'fuel_type',
  },
  {
    name: 'country',
    label: 'Country',
    field: 'country',
  },
  {
    name: 'temperature',
    label: 'Temperature',
    field: 'temperature',
  },
];

const rows = [
  {
    id: 1,
    make: 'Fiat',
    model: '500',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
  },
  {
    id: 2,
    make: 'Fiat',
    model: '200',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
  },
  {
    id: 3,
    make: 'Fiat',
    model: '219',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
  },
];

export default {
  name: 'VehiclesList',
  components: {
    VehicleTemperature,
    VehicleChart,
    QTr,
    QTd,
    QBtn,
    QIcon,
    QInput,
    QTable,
  },
  setup() {
    return {
      filter: ref(''),
      columns,
      rows,
    };
  },

};
</script>

<style>
</style>
