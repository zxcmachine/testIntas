<template>
  <div v-show="getShowModal">
    <div class="bg-modal"></div>
    <div class="modal">
      <div class="modal-info">
        Вы уверены что хотите выйти?
        <span>Все результаты будут сброшены</span>
      </div>
      <div class="modal-buttons">
        <main-button :halfred="true" @click="confirmExit()">Выход</main-button>
        <main-button :red="true" @click="toggleModal()">Отмена</main-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex';
import MainButton from "../MainButton.vue";
export default {
    computed:{
        ...mapGetters(['getShowModal','getCurrentTest'])
    },  
  components: { MainButton },
  methods: {
    ...mapMutations(['setShowModal','resetTest']),
    toggleModal() {
      this.setShowModal()
    },
    confirmExit() {
      this.setShowModal()
      this.resetAnswers()
    },
    resetTest() {
      this.resetTest(this.getCurrentTest.id);
    },
    resetAnswers() {
      this.$store.commit('resetAnswers');
      window.history.back()
    },
  },
};
</script>

<style scoped>
.bg-modal {
  top: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  background: rgba(196, 196, 196, 0.7);
}
.modal {
  max-width: 320px;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Дополнительные стили модалки */
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  /* Добавьте другие стили по вашему усмотрению */
}
.modal-info {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
}
.modal-info {
  font-size: 14px;
  text-align: center;
}
.modal-info span {
  font-size: 10px;
  color: #263238;
}
.modal-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}
</style>
