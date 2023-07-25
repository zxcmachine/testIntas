import { createStore } from "vuex";

export default createStore({
  state: {
    tests: [
      {
        id: 0,
        name: "test1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales.",
        questions: [
          {
            id: 0,
            name: "Вопрос 1",
            answers: [
              { id: 0, name: "Вариант А", correct: false },
              { id: 1, name: "Вариант Б", correct: true },
              { id: 2, name: "Вариант В", correct: false },
              { id: 3, name: "Вариант Г", correct: false },
              { id: 4, name: "Вариант Д", correct: false },
              { id: 5, name: "Вариант Е", correct: false },
            ],
          },
          {
            id: 1,
            name: "Вопрос 2",
            answers: [
              { id: 0, name: "Вариант А", correct: false },
              { id: 1, name: "Вариант Б", correct: true },
              { id: 2, name: "Вариант В", correct: false },
              { id: 3, name: "Вариант Г", correct: false },
              { id: 4, name: "Вариант Д", correct: false },
              { id: 5, name: "Вариант Е", correct: false },
            ],
          },
          {
            id: 2,
            name: "Вопрос 3",
            answers: [
              { id: 0, name: "Вариант А", correct: false },
              { id: 1, name: "Вариант Б", correct: true },
              { id: 2, name: "Вариант В", correct: false },
              { id: 3, name: "Вариант Г", correct: false },
              { id: 4, name: "Вариант Д", correct: false },
              { id: 5, name: "Вариант Е", correct: false },
            ],
          },
          {
            id: 3,
            name: "Вопрос 4",
            answers: [
              { id: 0, name: "Вариант А", correct: false },
              { id: 1, name: "Вариант Б", correct: true },
              { id: 2, name: "Вариант В", correct: false },
              { id: 3, name: "Вариант Г", correct: false },
              { id: 4, name: "Вариант Д", correct: false },
              { id: 5, name: "Вариант Е", correct: false },
            ],
          },
          {
            id: 4,
            name: "Вопрос 5",
            answers: [
              { id: 0, name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", correct: false },
              { id: 1, name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin odio sit amet.", correct: true },
              { id: 2, name: "Lorem ipsum dolor sit amet, aliquam sollicitudin odio sit amet.", correct: false },
            ],
          },
          
        ],
      },
      {
        id: 1,
        name: "test2",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper volutpat tristique. Fusce et nunc porttitor, pretium urna at, sagittis purus. Nullam sagittis congue sapien non sodales. Aliquam vel condimentum lacus, sit amet feugiat velit. Suspendisse congue imperdiet dui, sit amet cursus mi viverra sed. Nam porttitor venenatis vehicula. Vestibulum sed arcu vel lorem venenatis tempor.",
        questions: [
          {
            id: 0,
            name: "quest1",
            answers: [
              { id: 0, name: "answ1", correct: false },
              { id: 1, name: "answ2", correct: true },
              { id: 2, name: "answ3", correct: false },
            ],
          },
          {
            id: 1,
            name: "quest2",
            answers: [
              { id: 0, name: "answ1", correct: false },
              { id: 1, name: "answ2", correct: true },
              { id: 2, name: "answ3", correct: false },
            ],
          },
        ],
      },
    ],
    page: '',
    selectedAnswers: {},
    completedTests: {},
    showModal: false,
  },
  getters: {
    getTest(state){
      return state.tests
    },
    getCurrentTest(state){
      for (let test of state.tests) {
        if (test.id === state.page) {
          return test;
        }
      }
      return null
    },
    isTestEnd: (state) => (testId) => {
      return state.completedTests.hasOwnProperty(testId) && state.completedTests[testId];
    },
    getShowModal(state){
      return state.showModal
    },
  },
  mutations: {
    setShowModal(state) {
      state.showModal = !state.showModal;
    },
    setTest(state,page){
      localStorage.setItem('page', page) 
      state.page = page
    },
    selectAnswer(state, { testId, questionId, answerId }) {
      if (!state.selectedAnswers[testId]) {
        state.selectedAnswers[testId] = {};
      }
      state.selectedAnswers[testId][questionId] = answerId;
      localStorage.setItem('selectedAnswers', JSON.stringify(state.selectedAnswers));
    },
    resetAnswers(state) {
      state.selectedAnswers = {};
      localStorage.removeItem('selectedAnswers');
    },
    setTestCompletion(state, { testId, isCompleted }) {
      state.completedTests = { ...state.completedTests, [testId]: isCompleted };
    },
    resetTest(state, testId) {
      state.completedTests = { ...state.completedTests, [testId]: false };
    }
  },

});
