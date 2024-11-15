<template>
  <!-- <h1>{{ $translate('greetings.hello') }}</h1> -->
  <h4>Your balance</h4>
  <h1 id="balance">${{ total }}</h1>
</template>
<script setup>
import { defineProps } from 'vue'
// import { $translate } from '../plugins/i18n'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
})
</script>
