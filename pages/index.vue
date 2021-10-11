<template>
  <div class="app">
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

    <template v-else-if="$fetchState.error">
      <pre class="text-white">{{ $fetchState.error.message }}</pre>
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

    <!-- Go to top -->
    <template v-if="scrollTop > 20">
      <button class="go btn btn-dark" @click="goTop">
        <span class="fa fa-arrow-alt-circle-up"></span>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    movies: [],
    searchedMovies: [],
    searchInput: '',
    page: 1,
    searchedMoviesPage: 1,
    scrollTop: 0,
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
  mounted() {
    this.onReachBottom()
  },
  methods: {
    async getMovies() {
      try {
        const url = 'https://api.themoviedb.org/3/movie/now_playing'
        const _params = {
          api_key: process.env.apiKey,
          language: 'en-US',
          page: this.page,
        }
        const params = new URLSearchParams(_params)
        const { data } = await this.$axios.get(url, { params })
        data.results.forEach((movie) => {
          this.movies.push(movie)
        })
        this.page++
      } catch (error) {
        this.movies = []
        this.page = 1
      }
    },
    async searchMovies() {
      if (this.searchInput.trim().length === 0) return
      try {
        const url = 'https://api.themoviedb.org/3/search/movie'
        const _params = {
          api_key: process.env.apiKey,
          query: this.searchInput.trim(),
          page: this.searchedMoviesPage,
        }
        const params = new URLSearchParams(_params)
        const { data } = await this.$axios.get(url, { params })
        data.results.forEach((movie) => {
          this.searchedMovies.push(movie)
        })
        this.searchedMoviesPage++
      } catch (error) {
        this.searchedMovies = []
      }
    },
    clearSearch() {
      this.searchInput = ''
      this.searchedMovies = []
      this.searchedMoviesPage = 1
    },
    getScrollPercent() {
      const h = document.documentElement
      const b = document.body
      const st = 'scrollTop'
      const sh = 'scrollHeight'
      this.scrollTop =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
    },
    onReachBottom() {
      window.onscroll = async () => {
        this.getScrollPercent()

        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          if (this.searchInput === '') await this.getMovies()
          else await this.searchMovies()
        }
      }
    },
    goTop() {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.go {
  position: fixed;
  bottom: 2em;
  right: 2em;
}
</style>
