<template>
  <div>
    <div class="top">TESTS</div>
    <div class="container">
      <main-menu></main-menu>
      <router-view/>
      <attention-modal></attention-modal>
    </div>
    <div class="bottom">2020 © INTAS-Company.com</div>
  </div>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import AttentionModal from './components/Modals/AttentionModal.vue';
export default {
  components: {
    MainMenu,
    AttentionModal
  },
  created() {
    if (window.performance) {
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        this.$router.push({ path: '/' });
      }
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Nunito';
}
body {
  background: #dfdfdf;
}
.container {
  max-width: 1200px;
  width: 100%;
  height: 75vh;
  background: white;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.top{
  color: #D32F2F;
  font-size: 32px;
  padding: 29px 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: 'Rubik';
  letter-spacing: 10.4px;
}
.bottom{
  padding-top: 44px;
  padding-bottom: 46px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: #263238;
  font-size: 12px;
}
a{
  text-decoration: none;
}
@media(max-width:1199px){
  #app{
    padding: 0 15px;
  }
  .container{
    height: unset;
  }
}
</style>
