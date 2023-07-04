<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
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
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if="col.name === 'temperature'">
              <vehicle-temperature :temperature="col.value" :key="props.row.id" />
            </template>
            <template v-else-if="col.name === 'fuel_type'">
              <vehicle-label :text="props.row.fuel_type" :key="props.row.id" />
              <vehicle-label :text="props.row.status" color="warning" :key="props.row.id" />
            </template>
            <template v-else-if="col.name === 'image'">
              <vehicle-image :make="props.row.make" :model="props.row.model" :key="props.row.id" />
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
          <q-td  auto-width>
            <q-btn
              size="sm"
              color="gray"
              flat
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_less' : 'expand_more'"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="height: 300px;">
            <VehicleChart
              :chart-data="[
                props.row.views,
                props.row.leads,
                props.row.opportunities,
                props.row.closedOpportunities]"
            />
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
    style: 'width: 200px;',
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
    views: 100,
    leads: 50,
    opportunities: 30,
    closedOpportunities: 10,
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
    views: 100,
    leads: 50,
    opportunities: 30,
    closedOpportunities: 10,
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
    views: 100,
    leads: 50,
    opportunities: 30,
    closedOpportunities: 10,
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
    views: 100,
    leads: 50,
    opportunities: 30,
    closedOpportunities: 10,
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
