<template>
  <div class="show-wrapper">
    <div class="show-title">
      <slot name="show-title"></slot>
    </div>
    <div class="show-box" :class="{'btm-color' : showBtmColor}" :style="{'background-color' : showColor}" @click="showClick"></div>
  </div>
</template>

<script>
export default {
  // @showButton，首页左上角的指示标识
  name: 'showButton',
  props: {
    showColor : String,
    childId : String
  },
  data() {
    return {
      showBtmColor: false
    }
  },
  methods: {
    showClick(event) {
      this.$emit('showClick', this.childId, this.showBtmColor)
      this.showBtmColor = !this.showBtmColor
    }
  }
}
</script>

<style>
  .show-wrapper {
    position: absolute;
    z-index: 1;
    display: flex;
    width: 150px;
  }
  .show-title, .show-box {
    flex: 1;
    flex-basis: 30px;
  }
  .show-title>p {
    font-family: 'Tencent';
    color: white;
    margin: 0;
    font-size: 1rem;
  }
  .show-box {
    height: 25px;
    border-radius: 25px;
    transition: all .4s;
  }
  .show-box:hover {
    box-shadow: 0 2px 8px rgb(35, 32, 128);
  }
  .btm-color {
    background-color: rgba(156, 156, 156, 0.5)!important;
  }
</style>