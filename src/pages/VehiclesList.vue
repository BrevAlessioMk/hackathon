<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      :rows="vehicles"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :sort-method="customSort"
      :pagination="{
        page: 1,
        rowsPerPage: 50
      }"
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
              <vehicle-temperature
                :vehicle="props.row"
                :key="props.row.id"
                @temperatureLoaded="props.row.temperature = $event"
              />
            </template>
            <template v-else-if="col.name === 'fuel_type'">
              <vehicle-label :text="props.row.fuel_type" :key="props.row.id" />
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
                props.row.sum_views,
                props.row.sum_leads,
                props.row.sum_opportunities,
                props.row.sum_closed_won_opportunities]"
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
import { vehicles as rawVehicles } from 'src/data/vehicles';

const vehicles = rawVehicles.map((v, i) => ({
  ...v,
  id: i,
  temperature: null,
  mockTemperature: Math.random(),
}));

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
      vehicles,
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
