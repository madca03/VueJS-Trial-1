<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Prev Page</router-link> 
    </template>
    <template v-if="addPrevPageNextPageSeparator">
      |
    </template>
    <template v-if="addNextPageLink">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
        Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    addPrevPageNextPageSeparator() {
      return this.page != 1 && this.addNextPageLink
    },
    addNextPageLink() {
      return this.eventsTotal > this.page * 3
    },
    ...mapState(['events', 'eventsTotal']),
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
}
</script>
