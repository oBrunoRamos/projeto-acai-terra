<template>
          <div class="nav-container">
                    <img src="../assets/logos/Logo-Acai.png" alt="">
                    <nav class="nav-links">
                              <li class="link-ativo">Montagem</li>
                              <li>Pedidos</li>
                    </nav>
          </div>
</template>

<script>
export default {

}
</script>

<style>
          .nav-container{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    width: 100vw;
                    height: 4.4rem;

                    background: #1f1d22;

                    border-bottom: 3px solid #47ca18;
          }

          .nav-container img{
                    margin-left: 3%;
          }

          .nav-links{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    height: 100%;
                    width: 12%;
                    margin-right: 3%;

                    list-style: none;
                    color: #fff;
          }
          .nav-links li{
                    cursor: pointer;
          }
          .link-ativo{
                    color: #47ca18;
                    font-size: large;
                    text-decoration: underline;
          }
</style>