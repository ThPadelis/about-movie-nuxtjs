<template>
  <NuxtLink :to="`/movies/${id}`">
    <div class="card bg-dark text-white rounded">
      <img :src="imgSrc" :alt="imgAlt" class="card-img" />
      <div class="card-img-overlay">
        <h5 class="card-title text-truncate mt-5">{{ title }}</h5>
        <p class="card-text">{{ overview }}</p>
        <p class="card-text">Released: {{ releaseDate }}</p>
      </div>
      <div class="rating">{{ rating }}</div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    movie: { required: true, type: Object },
  },
  computed: {
    id() {
      return this.movie.id
    },
    imgSrc() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
    },
    imgAlt() {
      return this.movie.original_title
    },
    title() {
      return this.movie.title
    },
    overview() {
      const text = this.movie.overview
      return text.length > 200 ? `${text.slice(0, 200)}...` : text
    },
    rating() {
      return this.movie.vote_average
    },
    releaseDate() {
      const date = this.movie.release_date

      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style lang="scss">
.card {
  margin-bottom: 1.5rem;

  &:hover {
    cursor: pointer;
    .card-img-overlay {
      opacity: 1;
    }
  }

  .card-img-overlay {
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba($color: #000000, $alpha: 0.75);
    transition: all ease-in-out 0.25s;
  }

  .rating {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    color: $gray-200;
    padding: 10px;
    background: $yellow;
    border-bottom-right-radius: 0.25em;
  }
}
</style>