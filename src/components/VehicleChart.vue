<template>
  <LineChart :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  name: 'VehicleChart',
  components: {
    LineChart,
  },
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    const data = {
      labels: ['View', 'Leads', 'Opportunities', 'Closed/Won Opp'],
      options: {
      },
      datasets: [
        {
          data: props.chartData,
        },
      ],
    };
    return {
      options,
      data,
    };
  },
};
</script>
