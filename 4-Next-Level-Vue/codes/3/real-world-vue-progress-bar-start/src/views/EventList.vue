<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
      Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import store from '@/store/store'

export default {
  components: {
    EventCard
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    const perPage = 3
    console.log("beforeRouteEnter")
    console.log(routeTo)
    console.log(routeFrom)
    
    NProgress.start()
    store.dispatch('event/fetchEvents', {
      perPage,
      page: routeTo.query.page || 1
    }).then(() => {
      NProgress.done()
      next()
    })
  },

  beforeRouteUpdate(routeTo, routeFrom, next) {
    console.log("beforeRouteUpdate")
    console.log(routeTo)
    console.log(routeFrom)

    NProgress.start()
    store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: routeTo.query.page || 1
    }).then(() => {
      NProgress.done()
      next()
    })
  },

  beforeRouteLeave(routeTo, routeFrom, next) {
    console.log("beforeRouteLeave")
    console.log(routeTo)
    console.log(routeFrom)
    next();
  },

  beforeCreate() {
    console.log("beforeCreate hook")
  },

  created() {
    console.log("created hook")
    this.perPage = 3
  },

  beforeMount() {
    console.log("beforeMount hook")
  },

  mounted() {
    console.log("mounted hook")
  },

  beforeUpdate() {
    console.log("beforeUpdate hook")
  },

  update() {
    console.log("update hook")
  },

  beforeDestroy() {
    console.log("beforeDestroy hook")
  },

  destroyed() {
    console.log("destroyed hook")
  },

  // created() {
  //   this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
  //   // We don't need it to be reactive, and this way our component has access to it.

  //   this.$store.dispatch('event/fetchEvents', {
  //     perPage: this.perPage,
  //     page: this.page
  //   })
  // },
  
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user'])
  }
}
</script>
