<template>
  <p>{{ formattedPrice }}</p>
</template>

<script>
import { watch, ref } from 'vue';

export default {
  name: 'VehiclePrice',
  props: {
    price: Number,
  },
  setup(props) {
    const formattedPrice = ref(new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(props.price));

    watch(props.price, (value) => {
      console.log('enn');
      formattedPrice.value = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
      }).format(value);
    });

    return { formattedPrice };
  },
};
</script>
