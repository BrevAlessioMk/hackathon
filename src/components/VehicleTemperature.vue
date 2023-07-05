<template>
  <Suspense>
    <template #default>
      <q-icon v-if="temperature" :name="iconName" :color="iconColor" size="30px" />
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
    if (this.temperature > 0.5) {
      this.iconName = 'local_fire_department';
      this.iconColor = 'negative';
    } else {
      this.iconName = 'ac_unit';
      this.iconColor = 'info';
    }
  },
};
</script>
