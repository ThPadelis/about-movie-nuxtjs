<template>
  <div class="hero">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
          <span class="text-danger font-weight-bold h5 text-uppercase"
            >Now streaming</span
          >
          <h1>Now Streaming</h1>
          <a href="#movies-grid" class="btn btn-danger">View Movies</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 0;
  height: 40vh;
  background: url('@/assets/img/img_1.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.75);
  }

  //   padding: 4em;
  //   display: flex;
  //   align-items: center;
  //   justify-content: flex-start;
}
</style>