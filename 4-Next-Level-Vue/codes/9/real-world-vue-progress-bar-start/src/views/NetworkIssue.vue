<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>Network issue. Please click the back button and try again</h3>
    <router-link :to="{name: 'event-list'}">Back to the home page</router-link>
  </div>
</template>

<script>
  export default {
    
  }
</script>
