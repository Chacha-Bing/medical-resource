<template>
  <div class="search-bar" :class="{active : isActive}" @click="searchClick">
    <svg t="1587709423019" class="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1911" width="20" height="20"><path d="M839.566222 774.826667l170.894222 170.922666a45.539556 45.539556 0 0 1 0 64.796445 46.136889 46.136889 0 0 1-32.398222 13.454222 46.136889 46.136889 0 0 1-32.398222-13.454222L774.826667 839.68a473.713778 473.713778 0 0 1-636.017778-30.833778A473.827556 473.827556 0 0 1 473.770667 0C735.402667 0 947.484444 212.110222 947.484444 473.799111c0 112.213333-39.594667 217.941333-107.946666 301.056zM473.770667 91.733333c-210.887111 0.341333-381.724444 171.207111-382.065778 382.094223 0 211.000889 171.064889 382.094222 382.065778 382.094222s382.037333-171.093333 382.037333-382.094222c0-211.029333-171.036444-382.094222-382.037333-382.094223z" fill="#ffffff" p-id="1912"></path></svg>
    <input type="text" class="search-box" @blur="searchBlur" @keyup.enter="startSearch" ref="searchText">
  </div>
</template>

<script>
export default {
  // @searchBar，搜索框
  name: 'searchBar',
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    searchClick() {
      this.isActive = true
    },
    searchBlur() {
      this.isActive = false
    },
    startSearch() {
      this.$emit('startSearch', this.$refs.searchText.value)
    }
  }
}
</script>

<style>
  .search-bar {
    width: 60px;
    height: 30px;
    border: 2px solid #c5e5ff8a;
    border-radius: 20px;
    transition: .5s;
  }
  .search-icon {
    position: absolute;
    top: 18%;
    left: 10%;
  }
  .search-box {
    font-family: 'Tencent';
    width: 16px;
    border: none;
    outline: none;
    line-height: 30px;
    padding-left: 34px;
    color: #FFEB3B;
    background-color: transparent;
  }
  .search-bar.active {
    width: 190px;
  }
  .active>.search-box {
    padding-left: 50px;
    width: 128px;
  }
</style>