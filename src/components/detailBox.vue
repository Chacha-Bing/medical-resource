<template>
  <div class="detail-box" :class="{'fade-out' : isActive}">
    <div class="detail-left-box">
      <img src="~assets/background.jpg" alt="" class="hos-img"/>
      <p class="hos-name">{{detailMsg.name}}</p>
    </div>
    <div class="detail-right-box">
      <div class="area">
        <span class="title">标签</span>
        <p class="hos-tag">{{detailMsg.tag}}</p>
      </div>

      <div class="area">
        <span class="title">电话</span>
        <p class="hos-tel">{{detailMsg.tel}}</p>
      </div>

      <div class="area">
        <span class="title">医院地址</span>
        <p class="hos-addr">{{detailMsg.addr}}</p>
      </div>

      <div class="area">
        <span class="title">想去这儿？</span>
        <p class="hos-fever" @click="toHere">一键规划路径</p>
      </div>
    </div>
    <div class="close-box" @click="closeBox"></div>
  </div>
</template>

<script>
export default {
  // @detailBox 医院详细信息框
  name: 'detailBox',
  props: {
    detailMsg: Object
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    closeBox() {
      this.isActive = true
      setTimeout(()=>{
        this.$emit('hideBox')
        // this.isActive = false
      }, 400)
    },
    toHere() {
      this.$router.push({
        name: 'fromTo',
        params: {
          destination: this.detailMsg.name
        }
      })
    }
  }
}
</script>

<style>
  span, p {
    font-family: 'Tencent';
    color: white;
  }
  p {
    padding: 6px 0;
  }
  .detail-box {
    height: 450px;
    width: 700px;
    margin: auto;
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: .4s, box-shadow .3s .4s;
    z-index: 1;
  }
  
  .close-box {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 25px;
    right: 10px;
    transition: all .5s;
  }
  .close-box::before, .close-box::after {
    content: '';
    width: 60%;
    height: 3px;
    background-color: white;
    position: absolute;
    top: 5px;
    transition: .4s;
    font-family: 'Tencent';
  }
  .close-box::before {
    transform: rotate(-45deg);
  }
  .close-box::after {
    transform: rotate(45deg);
  }
  .close-box:hover::before {
    transform: rotate(-45deg) translateX(-8px);
  }
  .close-box:hover::after {
    transform: rotate(45deg) translateX(8px);
  }

  .detail-left-box, .detail-right-box {
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    background-color: rgba(71, 71, 71, 0.8);
    padding: 20px;
    top: 0;
    position: relative;
    transition: .4s;
  }
  .detail-left-box {
    float: left;
  }
  .detail-right-box {
    float: right;
    background: linear-gradient(-45deg, #1f4561, #09203a);
  }
  .detail-box.fade-out {
    box-shadow: none;
    transition: box-shadow 0s;
  }
  .fade-out>.detail-left-box {
    top: 150px;
    opacity: 0;
    visibility: hidden;
  }
  .fade-out>.detail-right-box, .fade-out>.close-box {
    top: -150px;
    opacity: 0;
    visibility: hidden;
  }

  .area {
    padding-top: 18px;
  }
  .hos-img {
    width: 100%;
    max-height: 360px;
  }
  .hos-name {
    position: absolute;
    width: 90%;
    bottom: 0;
    left: 50%;
    font-size: 1.5rem;
    text-align: center;
    transform: translateX(-50%);
  }
  .hos-tag {
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 24px;
    
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8; */
  }
  .hos-tag, .hos-tel, .hos-addr, .hos-fever {
    text-align: center;
    font-size: large;
  }
  .hos-fever {
    cursor: pointer;
  }
</style>