<template>
  <Suspense>
    <template #default>
      <q-icon v-if="temperature !== null" :name="iconName" :color="iconColor" size="30px" />
      <q-circular-progress v-else indeterminate rounded color="primary" size="lg" />
    </template>
    <template #fallback>
      <q-circular-progress indeterminate rounded color="primary" size="lg" />
    </template>
  </Suspense>
</template>

<script>
import { TemperatureService } from 'src/services/TemperatureService';
import { QCircularProgress } from 'quasar';

export default {
  name: 'VehicleTemperature',
  components: { QCircularProgress },
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iconName: null,
      iconColor: null,
      temperature: null,
    };
  },
  async mounted() {
    this.temperature = await TemperatureService.getTemperature(this.vehicle);
    this.$emit('temperature-loaded', this.temperature);
    const price = this.temperature > 0.5
      ? parseInt((Math.random() * (30_000 - 20_000)) + 20_000, 10)
      : parseInt((Math.random() * (40_000 - 30_000)) + 30_000, 10);
    this.$emit('price-loaded', price);

    if (this.temperature > 0.5) {
      this.iconName = 'local_fire_department';
      this.iconColor = 'negative';
    } else if (this.temperature < 0.5) {
      this.iconName = 'ac_unit';
      this.iconColor = 'info';
    } else {
      this.iconName = 'device_thermostat';
      this.iconColor = 'warning';
    }
  },
};
</script>
