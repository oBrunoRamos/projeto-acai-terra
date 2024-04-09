<template>
          <div class="montagem-container">

                    <!-- Banner de fundo -->
                    <div class="div-imagem">
                              <img src="../../src/assets/logos/banner-acai.png" alt="">
                    </div>

                    <!-- Logo da empresa -->
                    <div class="div-acaiLogo">
                              <img src="../../src/assets/logos/Logo-AcaiDaTerra.png" alt="">
                    </div>


                    <!-- Div de montagem do pedido -->
                    <div class="div-montagemPedido">

                              <h2>Monte seu açaí</h2>

                              <!-- Listagem de sabores de açais -->
                              <div class="agrupado">
                                        <h3>SABORES</h3>
                                        <div class="cards-container">
                                                  <CardComponent 
                                                  v-for="sabor in sabores" 
                                                  :key="sabor.id"
                                                  
                                                  :produto="sabor"

                                                  @adcionar-produto="adicionaProduto"
                                                  @remove-produto="removeProduto"
                                                  />
                                        </div>
                              </div>
                              <hr>

                              <!-- Listagem de adicionais -->
                              <div class="agrupado">
                                        <h3>ADICIONAIS</h3>
                                        <div class="cards-container">
                                                  <CardComponent 
                                                  v-for="adicional in adicionais" 
                                                  :key="adicional.id"
                                                  
                                                  :produto="adicional"

                                                  @adcionar-produto="adicionaProduto"
                                                  @remove-produto="removeProduto"
                                                  />
                                        </div>
                              </div>

                              <div class="div-button">
                                        <button >ENVIAR</button>
                              </div>
                    </div>
          </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'

export default {
          data(){
                    return{
                              fetched: false,
                              sabores:[
                                        {
                                                  "id": 1,
                                                  "acai": true,
                                                  "sabor": "Açai Tradicional - Polpanorte",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 27.90,
                                                  "imagem": "/src/assets/acais/acai-tradicional.png"
                                        },
                                        {
                                                  "id": 2,
                                                  "acai": true,
                                                  "sabor": "Açai com Abacaxi - Fruta Brasileira",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 36.90,
                                                  "imagem": "/src/assets/acais/acai-abacaxi.png"
                                        },
                                        {
                                                  "id": 3,
                                                  "acai": true,
                                                  "sabor": "Açai com Banana - Frooty",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 32.90,
                                                  "imagem": "/src/assets/acais/acai-banana.png"
                                        },
                                        {
                                                  "id": 4,
                                                  "acai": true,
                                                  "sabor": "Açai com Cupuaçu - Polpanorte",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 29.90,
                                                  "imagem": "/src/assets/acais/acai-cupuacu.png"
                                        },
                                        {
                                                  "id": 5,
                                                  "acai": true,
                                                  "sabor": "Açai com Guaraná - Polpanorte",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 29.90,
                                                  "imagem": "/src/assets/acais/acai-gurana.png"
                                        },
                                        {
                                                  "id": 6,
                                                  "acai": true,
                                                  "sabor": "Açai com Morango - Frooty",
                                                  "estoque": 1000,
                                                  "unidade": "KG",
                                                  "valor": 32.90,
                                                  "imagem": "/src/assets/acais/acai-morango.png"
                                        }
                              ],
                              adicionais: [
                                        {
                                        "id": 1,
                                        "acai": false,
                                        "adic":"Adicional de Amendoim",
                                        "estoque": 10,
                                        "unidade": "UN",
                                        "valor": 1,
                                        "imagem": "/src/assets/adicionais/adic-amendoim.png"
                                        },
                                        {
                                                  "id": 2,
                                                  "acai": false,
                                                  "adic":"Adicional de Banana",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-banana.png"
                                        },
                                        {
                                                  "id": 3,
                                                  "acai": false,
                                                  "adic":"Adicional de Granola",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-granola.png"
                                        },
                                        {
                                                  "id": 4,
                                                  "acai": false,
                                                  "adic":"Adicional de Kiwi",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-kiwi.png"
                                        },
                                        {
                                                  "id": 5,
                                                  "acai": false,
                                                  "adic":"Adicional de Leite Condensado",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-leiteCondensado.png"
                                        },
                                        {
                                                  "id": 6,
                                                  "acai": false,
                                                  "adic":"Adicional de Leite Ninho",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-leiteNinho.png"
                                        },
                                        {
                                                  "id": 7,
                                                  "acai": false,
                                                  "adic":"Adicional de Morango",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-morango.png"
                                        },
                                        {
                                                  "id": 8,
                                                  "acai": false,
                                                  "adic":"Adicional de Pacoca",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-pacoca.png"
                                        },
                                        {
                                                  "id": 9,
                                                  "acai": false,
                                                  "adic":"Adicional de Uva Verde",
                                                  "estoque": 10,
                                                  "unidade": "UN",
                                                  "valor": 1,
                                                  "imagem": "/src/assets/adicionais/adic-uvaVerde.png"
                                        }
                              ],
                              saboresPedido:[

                              ],
                              adicionaisPedido:[

                              ]
                    }
          },
          components:{
                    CardComponent
          },
          methods:{
                    adicionaProduto(infoProduto){
                              console.log(infoProduto)
                    },
                    removeProduto(infoProduto){
                              console.log(infoProduto)
                    }
          }
}
</script>

<style>
          .montagem-container{
                    display: flex;
                    flex-direction: column;

                    width: 99.2vw;

                    background: #59185B;
          }

          .div-imagem{
                    width: 100vw;
                    height: fit-content;

                    margin-bottom: -8px;
          }
          .div-imagem img{
                    width: 99.13vw;
          }

          .div-acaiLogo{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    height: 4rem;

                    z-index: 1;

                    background: #1f1d22;
          }



          .div-montagemPedido{
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    width: 100vw;
                    height: fit-content;
                    margin-top: 10rem;

                    color: #fff;
          }
        
          .div-montagemPedido hr{
                    width: 80%;
          }

          .agrupado{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;             

                    margin: 4rem;
          }
          .agrupado h3{
                    font-size: 25pt;
          }

          .cards-container{
                    display: flex;
                    flex-flow: wrap;
                    justify-content: space-around;

                    margin-top: 2rem;
                    width: 50vw;
          
          }

          .alerta-quantidade{
                    position: fixed;

                    background: #fff;
          }
</style>