<template>
    <div class="main-menu" :class="{ active: showMenu }">
      <div class="menu-header" @click="toggleMenu">
        <div class="open"><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="1" x2="14" y2="1" stroke="#8EACBB" stroke-width="2"/><line y1="11" x2="14" y2="11" stroke="#8EACBB" stroke-width="2"/><line y1="6" x2="14" y2="6" stroke="#8EACBB" stroke-width="2"/></svg></div>
        <div class="close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.04754 13.0623L7.35387 13.774C7.06015 14.0753 6.5852 14.0753 6.29461 13.774L0.220288 7.545C-0.0734293 7.24365 -0.0734293 6.75636 0.220288 6.45821L6.29461 0.226013C6.58833 -0.0753378 7.06327 -0.0753378 7.35387 0.226013L8.04754 0.937715C8.34438 1.24227 8.33813 1.73918 8.03504 2.03733L4.26984 5.71766H13.2501C13.6657 5.71766 14 6.06068 14 6.48706V7.51294C14 7.93932 13.6657 8.28235 13.2501 8.28235H4.26984L8.03504 11.9627C8.34126 12.2608 8.34751 12.7577 8.04754 13.0623Z" fill="#8EACBB"/></svg>  
          ТЕСТЫ
        </div>
      </div>
      <div class="menu-items">
        <router-link @click="setTest(list.id)" :to="'/description/' + list.id" class="menu-item" v-for="list in getTest" :key="list.id"><div class="cirle"></div>{{ list.name }}</router-link>
      </div>
    </div>  
  </template>
  
  <script>
import { mapGetters,mapMutations } from 'vuex'

  export default {
    data() {
      return {
        showMenu: false,
      }
    },
    computed:{
    ...mapGetters(['getTest']),
    },
    methods: {
      ...mapMutations(['setTest']),
      toggleMenu(){
        this.showMenu = !this.showMenu
      },
    },
  }
  </script>
  <style lang="scss" scoped>
    .main-menu{
      max-width:50px;
      background: #ECEFF1;
      width: 100%;
      transition: .4s;
    }
    .main-menu .menu-items{
        opacity: 0;
        visibility: hidden;
        transition: .4s;
    }
    .main-menu.active .menu-items{
        opacity: 1;
        visibility: visible;
    }
    .main-menu.active{
      max-width: 200px;
    }
    .close{
      display: none;
      transition: .4s;
      opacity: 0;
    }
    .open{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .main-menu.active .close{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 18px;
      gap: 43px;
      opacity: 1;
    }
    .main-menu.active .open{
      display: none;
    }
    .menu-header{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #CFD8DC;
      justify-content: space-between;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
    .menu-items{
      padding-left: 7px;
      margin-top: 20px;
      max-width: 184px;
      display: flex;
      gap: 6px;
      flex-direction: column;
    }
    .menu-item{
      padding: 7px 8px;
      border-radius: 3px;
      font-size: 14px;
      display: flex;
      gap: 11px;
      align-items: center;
      cursor: pointer;
      transition: .4s;
      color: black;
    }
    .menu-item:hover{
      background: #D32F2F;
      color: white;
      
    }
    .menu-item:hover .cirle{
      background: white;
    }
    .cirle{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: black;
    } 
    @media(max-width:1199px){
      .main-menu.active .close{
        gap: 10px;
      }
      .main-menu.active{
        padding-right: 10px;
      }
    }
    .router-link-active.menu-item{
      background: #D32F2F;
      color:white;
    }
    .router-link-active.menu-item .cirle{
      background: white;
    }
   
  </style>