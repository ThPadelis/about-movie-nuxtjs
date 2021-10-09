<template>
  <div>
    <Hero />

    <!-- Movies grid -->
    <div class="container py-5">
      <div id="movies" class="row">
        <div
          v-for="m in movies"
          :key="m.id"
          class="col-sm-12 col-md-4 col-lg-3 col-xl-3"
        >
          <MoviePreview :movie="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    movies: [],
  }),
  async fetch() {
    await this.getMovies()
  },
  methods: {
    async getMovies() {
      const url = 'https://api.themoviedb.org/3/movie/now_playing'
      const _params = {
        api_key: process.env.apiKey,
        language: 'en-US',
        page: 1,
      }
      const params = new URLSearchParams(_params)
      const { data } = await this.$axios.get(url, { params })
      this.movies = data.results
    },
  },
}
</script>
