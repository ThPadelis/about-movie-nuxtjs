<template>
  <div>
    <Hero />

    <!-- Search -->
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-5 col-xl-4">
          <div class="input-group">
            <div class="input-group-prepend">
              <span id="basic-addon1" class="input-group-text">
                <i class="fa fa-search"></i>
              </span>
            </div>
            <input
              v-model.lazy="searchInput"
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              @keyup.enter="searchMovies"
            />
            <div class="input-group-append">
              <button class="btn btn-dark" @click="clearSearch">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading spinner -->
    <template v-if="$fetchState.pending">
      <Loader />
    </template>

    <!-- Movies grid -->
    <template v-else>
      <div class="container mb-5">
        <div id="movies" class="row">
          <template v-if="searchInput === ''">
            <div
              v-for="m in movies"
              :key="m.id"
              class="col-sm-12 col-md-4 col-lg-3 col-xl-3"
            >
              <MoviePreview :movie="m" />
            </div>
          </template>
          <template v-else>
            <div
              v-for="m in searchedMovies"
              :key="m.id"
              class="col-sm-12 col-md-4 col-lg-3 col-xl-3"
            >
              <MoviePreview :movie="m" />
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    movies: [],
    searchedMovies: [],
    searchInput: '',
  }),
  async fetch() {
    if (this.searchInput === '') await this.getMovies()
    else await this.searchMovies()
  },
  head() {
    return {
      title: 'About Movie - Latest Streaming Movie Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming',
        },
      ],
    }
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
    async searchMovies() {
      if (this.searchInput.trim().length === 0) return
      const url = 'https://api.themoviedb.org/3/search/movie'
      const _params = {
        api_key: process.env.apiKey,
        query: this.searchInput.trim(),
      }
      const params = new URLSearchParams(_params)
      const { data } = await this.$axios.get(url, { params })
      this.searchedMovies = data.results
    },
    clearSearch() {
      this.searchInput = ''
      this.searchedMovies = []
    },
  },
}
</script>