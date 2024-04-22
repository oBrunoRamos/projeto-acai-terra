<template>
          <div class="nav-container">
                    <img src="../assets/logos/Logo-Acai.png" alt="">
                    <nav class="nav-links">
                              <router-link  to="/" class="link"> Montagem</router-link>
                              <router-link to="/pedidos" class="link">Pedidos</router-link>
                              <router-link to="/concluidos" class="link">Pedidos Concluidos</router-link>
                    </nav>
          </div>
</template>
<script>
export default {      
}
</script>
<style>

          /* Estilização do container do componente */
          .nav-container{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    width: 100vw;
                    height: 4.4rem;

                    background: #1f1d22;

                    border-bottom: 3px solid #47ca18;
          }

          /* Estilização da posição da imagem */
          .nav-container img{
                    margin-left: 3%;
          }

          /* Estilização dos links */
          .nav-links{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    height: 100%;
                    width: 20%;
                    margin-right: 3%;

                    list-style: none;
                    color: #fff;
          }
          .link{
                    color: #868686;
                    text-decoration: none;
          }
          .router-link-exact-active{
                    color: #47ca18;
                    font-size: large;
                    text-decoration: underline;
          }
</style>