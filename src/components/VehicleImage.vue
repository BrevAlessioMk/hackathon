<template>
  <div class="q-pa-md">
    <img :src="url" height="100" />
  </div>
</template>

<script>
export default {
  name: 'VehicleImage',
  components: {
  },
  props: {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const url = `https://www.generatormix.com/images/car-model/${props.make.toLowerCase()}-${props.model.toLowerCase()}.jpg`;
    return {
      url,
    };
  },

};
</script>

<style>
</style>
