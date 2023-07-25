<template>
    <div>
        <div class="description-wrapper">
            <div class="description-header">
              {{ getCurrentTest.name }}
            </div>
            <div class="description-item">
                {{ getCurrentTest.description }}
            </div>
            <div class="description-buttons">
                <main-button :red="true" @click="$router.push('/questions')">Начать</main-button>
                <router-link to="/"><main-button>Отмена</main-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainButton from './MainButton.vue'
export default {
    components:{
        MainButton
    },
    computed:{
    ...mapGetters(['getTest','getCurrentTest']),
    },
    methods: {
        back(){
            window.history.back()
        },  
    },
}
</script>

<style scoped>
    .description-header{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #CFCFCF;
        font-weight: bold;
        border-bottom: 1px solid #CFD8DC;
    }
    .description-wrapper{
        padding-left: 16px;
    }
    .description-item{
        margin-top: 16px;
        font-size: 16px;
    }
    .description-buttons{
        display: flex;
        gap: 20px;
        margin-top: 20px;
    }
</style>