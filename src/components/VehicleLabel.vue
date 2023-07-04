<template>
  <div class="q-pa-md">
    <q-chip rounded :label="text" :color="color" text-color="white" />
  </div>
</template>

<script>
import { QChip } from 'quasar';

export default {
  name: 'VehicleLabel',
  components: {
    QChip,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
  },
  setup() {
  },

};
</script>

<style>
</style>
