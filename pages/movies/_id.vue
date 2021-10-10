<template>
  <div class="movie">
    <Loader v-if="$fetchState.pending" />

    <template v-else>
      <div class="container my-5">
        <div class="row">
          <div class="col-sm-6 col-md-3 col-lg-2 col-xl-2">
            <NuxtLink
              to="/"
              class="
                btn btn-block btn-danger
                d-flex
                justify-content-center
                align-items-center
                font-weight-bold
              "
            >
              <span class="fa fa-angle-left mr-2"></span>Back
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row h-100 align-items-center">
          <div class="col-sm-12 col-md-3 col-lg-4 col-xl-4">
            <img :src="imgSrc" :alt="imgAlt" class="img-fluid rounded mb-3" />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-8 col-xl-8">
            <h2>
              <span class="font-weight-bold mr-2">Title:</span>
              <span>{{ title }}</span>
            </h2>
            <h6 v-if="tagline">
              <span class="font-weight-bold mr-2">Tagline:</span>
              <span class="font-italic">{{ tagline }}</span>
            </h6>
            <p v-if="rating">
              <span class="font-weight-bold mr-2">Rating:</span>
              <span>{{ rating }}</span>
            </p>
            <p v-if="releaseDate">
              <span class="font-weight-bold mr-2">Released:</span>
              <span>{{ releaseDate }}</span>
            </p>
            <p v-if="duration">
              <span class="font-weight-bold mr-2">Duration:</span>
              <span>{{ duration }}</span>
            </p>
            <p v-if="revenue">
              <span class="font-weight-bold mr-2">Revenue:</span>
              <span>{{ revenue }}</span>
            </p>
            <p v-if="overview">
              <span class="font-weight-bold mr-2">Overview:</span>
              <span>{{ overview }}</span>
            </p>
            <p>
              <span
                v-for="(g, i) in genres"
                :key="i"
                class="badge bg-secondary"
                >{{ g }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    movie: {},
  }),
  async fetch() {
    await this.getMovie()
  },
  head() {
    return {
      title: `${this.title} - About Movie`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.overview,
        },
      ],
    }
  },
  computed: {
    title() {
      return this.movie.original_title || this.movie.title
    },
    imgSrc() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : require('@/assets/img/img_1.jpg') 
    },
    imgAlt() {
      return this.movie.original_title || this.movie.title
    },
    overview() {
      return this.movie.overview
    },
    duration() {
      const mins = this.movie.runtime
      return this.timeConvert(mins)
    },
    tagline() {
      return this.movie.tagline
    },
    rating() {
      return `${this.movie.vote_average} / 10`
    },
    releaseDate() {
      const date = this.movie.release_date

      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    revenue() {
      return this.movie.revenue.toLocaleString('en-us', {
        style: 'currency',
        currency: 'USD',
      })
    },
    genres() {
      return this.movie.genres.map((g) => g.name)
    },
  },
  methods: {
    async getMovie() {
      const id = this.$route.params.id
      const url = `https://api.themoviedb.org/3//movie/${id}`
      const _params = { api_key: process.env.apiKey }
      const params = new URLSearchParams(_params)
      const { data } = await this.$axios.get(url, { params })
      this.movie = data
    },
    timeConvert(n = 0) {
      const num = n
      const hours = num / 60
      const rhours = Math.floor(hours)
      const minutes = (hours - rhours) * 60
      const rminutes = Math.round(minutes)
      return rhours
        ? `${rhours} hr(s) ${rminutes} min(s)`
        : rminutes + ' min(s).'
    },
  },
}
</script>

<style lang="scss" scoped>
.movie {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .badge {
    font-size: 0.8em;
    padding: 7px 20px;
    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &:hover {
      background: $gray-600 !important;
    }
  }

  p {
    &:not(:last-of-type) {
      margin: 10px 0;
    }
  }
}
</style>