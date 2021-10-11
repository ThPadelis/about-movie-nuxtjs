<template>
  <div class="app">
    <Hero />

    <!-- Search -->
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-5 col-xl-5">
          <div class="input-group custom-search">
            <input
              v-model="searchInput"
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="basic-addon2"
              @keyup.enter="searchMovies"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="searchMovies"
              >
                <span class="fa fa-search"></span>
              </button>
              <button
                v-if="searchInput.trim().length !== 0"
                class="btn btn-outline-secondary"
                type="button"
                @click="clearSearch"
              >
                <span class="fa fa-times"></span>
              </button>
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
          <template v-if="!!searchedMovies">
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
    const isEmpty = this.searchInput.trim().length === 0
    if (isEmpty) await this.getMovies()
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
      const isEmpty = this.searchInput.trim().length === 0
      if (isEmpty) return
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

        if (data.results.length === 0) {
          this.$bvToast.toast("We couldn't match any movie", {
            title: 'Search result',
            variant: 'info',
            solid: true,
            autoHideDelay: 2500,
          })
        }
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
        const isEmpty = this.searchInput.trim().length === 0
        this.getScrollPercent()

        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          if (isEmpty) await this.getMovies()
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

.custom-search {
  width: 100%;
  input.form-control {
    background: darken($color: $gray-900, $amount: 2);
    border-color: darken($color: $gray-900, $amount: 5);
    border-right: 0;
    border-width: 2px;
    font-weight: 500;

    &:focus,
    &:hover {
      color: $gray-100;

      &::placeholder {
        color: $gray-500;
      }
    }

    &::placeholder {
      color: $gray-600;
    }
  }

  button.btn-outline-secondary {
    border: 0;
    background-color: darken($color: $gray-900, $amount: 5);
    color: $gray-500;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 0.9em;

    &:first-of-type {
      border-left: 0;
      border-top: solid 2px transparent;
      border-bottom: solid 2px transparent;
    }
    &:last-of-type {
      border-top: solid 2px transparent;
      border-right: solid 2px transparent;
      border-bottom: solid 2px transparent;
    }

    &:hover {
      &:first-of-type {
        color: $gray-100;
      }
      &:last-of-type {
        color: $danger;
      }
      &:only-child {
        color: $gray-100;
      }
    }

    &:focus,
    &:active,
    &:hover {
      box-shadow: none !important;
      background-color: darken($color: $gray-900, $amount: 2) !important;
      border-color: darken($color: $gray-900, $amount: 5);
    }
  }
}
</style>
