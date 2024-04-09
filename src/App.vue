<template>
          <div id="app">
                    <NavBar class="navbar"/>
                    <MontagemView/>
          </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MontagemView from './views/MontagemView.vue'


export default {
          components:{
                    NavBar,
                    MontagemView
          }
}
</script>

<style>
          #app{       
                    font-family: Arial, Helvetica, sans-serif;   
          }

          .navbar{
                    position: fixed;
                    z-index: 100;
          }

</style>