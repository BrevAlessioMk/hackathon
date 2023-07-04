<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="ColdSparks"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :sort-method="customSort"
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
            <template v-else-if="col.name === 'fuel_type'">
              <vehicle-label :text="props.row.fuel_type" />
              <vehicle-label :text="props.row.status" color="warning" />
            </template>
            <template v-else-if="col.name === 'image'">
              <vehicle-image :make="props.row.make" :model="props.row.model" />
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="height: 300px;">
            <VehicleChart :chart-data="[30, 50, 20, 100]" />
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
import VehicleImage from 'components/VehicleImage.vue';
import VehicleLabel from 'components/VehicleLabel.vue';

const columns = [
  {
    name: 'image',
  },
  {
    name: 'make',
    field: 'make',
    required: true,
    label: 'Make',
    sortable: false,
  },
  {
    name: 'model',
    align: 'center',
    label: 'Model',
    field: 'model',
    sortable: false,
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    sortable: false,
  },
  {
    name: 'fuel_type',
    label: 'Fuel type',
    field: 'fuel_type',
    sortable: false,
  },
  {
    name: 'country',
    label: 'Country',
    field: 'country',
    sortable: false,
  },
  {
    name: 'temperature',
    label: 'Temperature',
    field: 'temperature',
    sortable: true,
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    make: 'fiat',
    model: '500',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
    status: 'New',
    price: '1000',
  },
  {
    id: 2,
    make: 'fiat',
    model: '500',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
    status: 'Km0',
    price: '2000',
  },
  {
    id: 3,
    make: 'fiat',
    model: '500',
    version: '500 Xl',
    fuel_type: 'Benzina',
    country: 'Italy',
    temperature: Math.random(),
    status: 'New',
    price: '4000',
  },
  {
    id: 4,
    make: 'Audi',
    model: 'a3',
    version: 'audio a3 sport',
    fuel_type: 'Diesel',
    country: 'Germany',
    temperature: Math.random(),
    status: 'Used',
    price: '4900',
  },
];

export default {
  name: 'VehiclesList',
  components: {
    VehicleTemperature,
    VehicleChart,
    VehicleImage,
    VehicleLabel,
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
      customSort: (dataRow, sortBy, descending) => {
        const data = [...dataRow];

        if (sortBy) {
          data.sort((a, b) => {
            const x = descending ? b : a;
            const y = descending ? a : b;

            if (sortBy === 'name') {
              // string sort
              return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
            }
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
          });
        }
        return data;
      },
    };
  },

};
</script>

<style>
</style>
