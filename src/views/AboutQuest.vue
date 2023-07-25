<template>
  <div class="quests-wrapper">
    <div class="quests-header">
      <div class="exit" @click="setShowModal">Выход</div>
      <div class="name">{{ getCurrentTest.name }}</div>
      <div class="info-items">
        <div class="reboot" v-if="!isTestEnd" @click="resetAnswers">Сбросить все ответы</div>
        <div class="counter">{{ getSelectedCount }}/5</div>
        <div class="timer">{{ formattedTime }}</div>
      </div>
    </div>
    <div class="items-quests" v-if="!isTestEnd">
      <div
        class="item-quest"
        v-for="question in getCurrentTest.questions"
        :key="question.id"
      >
        <div class="name">{{ question.name }}</div>
        <div class="dots-container">
          <div
            class="dots"
            v-for="answer in question.answers"
            :key="answer.id"
            @click="handleAnswerClick(getCurrentTest.id, question.id, answer.id)"
           
          >
            <div class="checkbox"  :class="{ active: isActiveAnswer(getCurrentTest.id, question.id, answer.id) }">
              <div class="inside"></div>
            </div>
            {{ answer.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="item-quests" v-else>
      <!-- Блок с результатами теста -->
      <div class="end-quest">
        <div class="end-quest-header">Тест завершён
          <span>Вы ответили на {{ correctCount }} из 5 вопросов.</span>
        </div>
        <div class="answers-container">
          Ваши ответы
          <div v-for="(question, index) in getCurrentTest.questions" :key="index" class="answer-item">
            <div class="name">{{ index + 1 }}. {{ question.name }}</div>
            <div class="correct-answer">Правильный ответ: {{ getCorrectAnswer(question) }}</div>
            <div class="your-answer">Вы ответили: {{ getYourAnswer(question) }}</div>
          </div>
        </div>
      </div>
    </div>
   
    <div class="bottom-button">
      <main-button :halfred="true" @click="finishTest" v-if="!isTestEnd">Завершить</main-button>
      <main-button :halfred="true" v-else @click="repeatTest">Пройти ещё раз</main-button>

    </div>
  </div>
</template>

<script>
import MainButton from "@/components/MainButton.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import TestResults from '@/components/TestResults.vue';
export default {
  computed: {
    ...mapGetters(["getCurrentTest"]),
    // formattedTime() {
    //   const hours = String(Math.floor(this.timeInSeconds / 3600)).padStart(2, '0');
    //   const minutes = String(Math.floor((this.timeInSeconds % 3600) / 60)).padStart(2, '0');
    //   const seconds = String(this.timeInSeconds % 60).padStart(2, '0');
    //   return `${hours}:${minutes}:${seconds}`;
    // },
    isQuestionAnswered() {
      return (questionId) => {
        return this.$store.state.selectedAnswers[this.getCurrentTest.id]?.hasOwnProperty(questionId);
      };
    },
    isAnswerCorrect() {
      return (questionId, answerId) => {
        const selectedAnswerId = this.$store.state.selectedAnswers[this.getCurrentTest.id]?.[questionId];
        return selectedAnswerId === answerId && this.getCurrentTest.questions.find(q => q.id === questionId)?.answers.find(a => a.id === answerId)?.correct;
      };
    },
    isTestEnd() {
      return this.$store.getters.isTestEnd(this.getCurrentTest.id);
    },
    getSelectedCount() {
      return Object.keys(this.$store.state.selectedAnswers).length;
    },
    getCorrectAnswersCount() {
      let correctCount = 0;
      for (const question of this.getCurrentTest.questions) {
        if (this.isQuestionAnswered(question.id) && this.isAnswerCorrect(question.id, this.$store.state.selectedAnswers[this.getCurrentTest.id][question.id])) {
          correctCount++;
        }
      }
      return correctCount;
    }
  },
  components: {
    MainButton,
    TestResults,
  },
  data() {
    return {
      testEnd:false,
      selectedAnswers: {},
      timeInSeconds: 0,
      timerInterval: null
    };
  },
  mounted() {
    // this.startTimer();
  },
  methods: {
    ...mapMutations(["selectAnswer", "setTestCompletion", "resetTest",'setShowModal']),
    // startTimer() {
    //   this.timerInterval = setInterval(() => {
    //     this.timeInSeconds++;
    //   }, 1000);
    // },
    getCorrectAnswer(question) {
      const correctAnswer = question.answers.find((answer) => answer.correct);
      return correctAnswer ? correctAnswer.name : "Не указан";
    },
    getYourAnswer(question) {
      const questionId = question.id;
      const selectedAnswer = this.$store.state.selectedAnswers[this.getCurrentTest.id]?.[questionId];
      return selectedAnswer !== undefined
        ? question.answers.find((answer) => answer.id === selectedAnswer)?.name || "Не ответили"
        : "Не ответили";
    },
    finishTest() {
      this.setTestCompletion({ testId: this.getCurrentTest.id, isCompleted: true });
    },  
    repeatTest() {
      this.resetAnswers(); // Сбросить ответы пользователя
      this.resetTest(this.getCurrentTest.id); // Сбросить флаг завершенности теста
    },
    resetAnswers() {
      this.$store.commit('resetAnswers');
    },
    handleAnswerClick(testId, questionId, answerId) {
      this.$store.commit('selectAnswer', { testId, questionId, answerId });
    },
    isActiveAnswer(testId, questionId, answerId) {
      const selectedAnswers = this.$store.state.selectedAnswers;
      return selectedAnswers[testId]?.[questionId] === answerId;
    },
  },
};
</script>

<style scoped>
.quests-header {
  display: flex;
  width: 100%;
  height: 51px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #cfd8dc;
}
.quests-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.info-items {
  display: flex;
  gap: 10px;
  color: #8d8d8d;
  font-size: 12px;
}
.exit {
  font-size: 12px;
  color: #8d8d8d;
}
.name {
  font-weight: bold;
  font-size: 16px;
}
.items-quests {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dots-container {
  display: flex;
  justify-content: space-between;
}
.checkbox {
  width: 13px;
  height: 13px;
  border: 1px solid #afafaf;
  border-radius: 50%;
  overflow: hidden;
}
.inside {
  width: 100%;
  height: 100%;
}
.checkbox.active {
  border: 1px solid #d32f2f;
}
.checkbox.active .inside {
  background: #ff6659;
}
.dots {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}
.dots-container {
  padding: 16px 36px;
  box-sizing: border-box;
  background: #efefef;
  border-radius: 3px;
}
.item-quest {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bottom-button {
  padding: 9px 16px;
  margin-top: auto;
  border-top: 1px solid #cfd8dc;
}
.reboot{
    cursor: pointer;
}
.item-quest:last-child .dots-container{
  flex-direction: column;
  gap: 20px;
}
.end-quest-header{
  display: flex;
  flex-direction: column;
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
}
.end-quest-header span{
  font-size: 13px;
  color: #8D8D8D;
}
.answers-container{
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.answer-item{
  padding-top: 5px;
  border-bottom: 1px dashed #E0E0E0;
  padding-bottom: 20px;
}


@media(max-width:1199px){
  .dots-container{
    flex-direction: column;
  }
}


</style>
