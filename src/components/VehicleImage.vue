<template>
  <div>
    <img
      :src="url"
      width="100"
      height="100"
      @error="replaceUrl"
    />
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
      replaceUrl: (e) => {
        e.target.src = 'https://png.pngtree.com/png-clipart/20211009/original/pngtree-black-car-icon-png-image_6841793.png';
      },
    };
  },

};
</script>
