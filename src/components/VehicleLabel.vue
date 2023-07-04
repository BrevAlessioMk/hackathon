<template>
  <div class="q-pa-md">
    <q-badge rounded :label="text" :color="color" />
  </div>
</template>

<script>
import { QBadge } from 'quasar';

export default {
  name: 'VehicleLabel',
  components: {
    QBadge,
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
