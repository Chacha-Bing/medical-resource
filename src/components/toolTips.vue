<template>
  <div class="tool-tips" :class="{'tip-in-out' : tipActive}">
    <div class="tip-title">
      <slot name="tipTitle"></slot>
    </div>
    <div class="tip-text">
      <slot name="tipText1"></slot>
      <slot name="tipText2"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // @toolTips，警示框
  name: 'toolTips',
  data() {
    return {
      tipActive: false,
    }
  }
}
</script>

<style>
  .tool-tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 250px;
    padding: 15px;
    background-color: rgba(128, 128, 128, 0.8);
    color: white;
    z-index: 1;
    font-size: 1.2rem;
    border: solid 2px #fffa26;
    border-radius: 10px;
    box-shadow: none;
    transition: all .4s;
  }
  .tip-title {
    text-align: center;
    font-family: 'Tencent';
  }
  .tip-title>p {
    border-bottom: solid 4px;
    border-radius: 4px;
    color: #fffa26;
  }
  .tip-text>p {
    margin-top: 20px;
    font-size: 1rem;
    text-align: left;
  }

  .tip-in-out {
    animation: bounceInOut 2s cubic-bezier(0, 0.51, 1, 0.54) forwards;
  }
  @keyframes bounceInOut {
    5%, 90% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 2px 30px #909090;
    }
    95% {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
</style>