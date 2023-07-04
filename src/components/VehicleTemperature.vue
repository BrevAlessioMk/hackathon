<template>
  <q-icon :name="iconName" :color="iconColor" size="30px" />
</template>

<script>
export default {
  name: 'VehicleTemperature',
  props: {
    temperature: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    let iconName; let
      iconColor;
    if (props.temperature > 0.5) {
      iconName = 'local_fire_department';
      iconColor = 'negative';
    } else {
      iconName = 'ac_unit';
      iconColor = 'info';
    }
    return { iconName, iconColor };
  },
};
</script>
