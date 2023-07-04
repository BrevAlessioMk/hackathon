<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-8 text-white">
        <q-toolbar-title>
          HotStock
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>
