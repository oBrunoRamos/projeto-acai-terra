<template>
          <div class="estoque-card">

                    <!-- Imagens Açais -->
                    <img v-if="produto.imagem == 'acai-tradicional' " class="imagem" src="../assets/acais/acai-tradicional.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'acai-abacaxi' " class="imagem" src="../assets/acais/acai-abacaxi.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'acai-banana' " class="imagem" src="../assets/acais/acai-banana.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'acai-cupuacu' " class="imagem" src="../assets/acais/acai-cupuacu.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'acai-guarana' " class="imagem" src="../assets/acais/acai-guarana.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'acai-morango' " class="imagem" src="../assets/acais/acai-morango.png" :alt="produto.alt">

                    <!-- Imagens Adicionais -->
                    <img v-if="produto.imagem == 'adic-amendoim' " class="imagem" src="../assets/adicionais/adic-amendoim.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-banana' " class="imagem" src="../assets/adicionais/adic-banana.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-granola' " class="imagem" src="../assets/adicionais/adic-granola.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-kiwi' " class="imagem" src="../assets/adicionais/adic-kiwi.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-leiteCondensado' " class="imagem" src="../assets/adicionais/adic-leiteCondensado.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-leiteNinho' " class="imagem" src="../assets/adicionais/adic-leiteNinho.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-morango' " class="imagem" src="../assets/adicionais/adic-morango.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-pacoca' " class="imagem" src="../assets/adicionais/adic-pacoca.png" :alt="produto.alt">
                    <img v-if="produto.imagem == 'adic-uvaVerde' " class="imagem" src="../assets/adicionais/adic-uvaVerde.png" :alt="produto.alt">
                    


                    <div class="produto">
                              <h4>{{ produto.nome }}</h4>
                              <p>Quant.</p>

                              <div class="info-estoque">
                                        <h4>{{ produto.unidade }}</h4>
                                        <h2>{{ produto.estoque }}</h2>
                              </div>
                    </div>
          </div>
</template>
<script>
export default {
          props:{
                    produto:Object
          }
}
</script>
<style>

          .estoque-card{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    height: 18rem;
                    width: 12rem;
                    
                    color: #000;
                    background: #fff;

                    border-radius: 10px;

                    margin: 1rem 0;
          }

          .imagem{
                    height: fit-content;
                    max-height: 40%;
                    width: fit-content;

                    margin: 10% 0;
          }

          .produto{     
                    width: 80%;
                    height: 40%;
          }
          .produto p{
                    padding: 0.5rem 0;
          }

          .info-estoque{
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
          }
          .info-estoque h2{
                    font-size: 25pt;
          }

</style>