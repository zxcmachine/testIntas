<template>
    <div>
        <button class="button" :class="{ red: red, halfred: halfred}" @click="handleClick"><slot></slot></button>
    </div>
</template>

<script>
export default {
    props:['red','halfred'],
    methods: {
    handleClick() {
      
    },
  },
}
</script>

<style scoped>
    .button{
        background: unset;
        padding: 7px 18px;
        border: 1px solid #707070;
        border-radius: 3px;
        cursor: pointer;
    }
    .button.red{
        border: 1px solid #D32F2F;
        background: #D32F2F;
        color: white;
    }
    .button.halfred{
        border: 1px solid #D32F2F;
        color: #D32F2F;
    }
</style>