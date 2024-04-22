<template>
          <div id="app">
                    <NavBar class="navbar"/>
                    <router-view>
                    </router-view>
          </div>
</template>

<script>
import NavBar from './components/NavBar.vue'


export default {
          components:{
                    NavBar,
                    // MontagemView,
                    // PedidosView
          }
}
</script>

<style>
          #app{       
                    font-family: Arial, Helvetica, sans-serif; 
                    margin: 0;
                    padding: 0; 
          }

          .navbar{
                    position: fixed;
                    z-index: 50;
          }

</style>