<template>
          <div class="pedido-component-container">

                    <!-- Div com os botões de finalização e cancelamento do pedido -->
                    <div class="div-buttons" v-if="emAberto">

                              <!-- Botão de finalizar -->
                              <button class="finalizar" @click="concluido">
                                        <Check />
                              </button>

                              <!-- Botão de cancelar -->
                              <button class="deletar" @click="deletar">
                                        <X />
                              </button>
                    </div>
                    

                    <!-- Informações do pedido -->
                    <img src="../assets/logos/user-icon.png" alt="">

                    <div class="info-pedido" @click="clicouPedido">

                              <!-- Nome do cliente -->
                              <h3>{{ pedido.nome }}</h3>

                              <!-- Forma de pagamento -->
                              <p>{{ pedido.forma_pagamento }}</p>
                    </div>

                    <!-- Total do pedido -->
                    <h2>{{ totalDoPedido }}</h2>
          </div>
</template>
<script>

          import { Check } from 'lucide-vue-next';
          import { X } from 'lucide-vue-next';


          export default {
                    components:{
                              X,
                              Check
                    },
                    props:{
                              pedido:Object,
                              emAberto:Boolean
                    },
                    data(){
                              return{
                                        totalDoPedido: null
                              }
                    },
                    methods:{
                              converteValor(){
                                        const valor = this.pedido.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                                        this.totalDoPedido = valor;
                              },
                              clicouPedido(){
                                        this.$emit('clicou-pedido')
                              },
                              concluido(){
                                        this.$emit('concluir-pedido')
                              },
                              deletar(){
                                        this.$emit('deletar-pedido')
                              }
                    },
                    created(){
                              this.converteValor()
                    }
          }
</script>
<style>

          /* Estilização do container do componente */
          .pedido-component-container{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    width: 80%;
                    padding: 0.5rem;
                    margin: 1rem;

                    border-radius: 10px;

                    background: #F5DAF5;
          }

          /* Estilização da div dos botões de confimação e cancelamneto */
          .div-buttons{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    height: 90%;
          }

          /* Estilização dos botões de confimação e cancelamneto  */
          .finalizar{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    height: 1.5rem;
                    width: 1.5rem;

                    color: #fff;
                    background: green;

                    border: none;
                    border-radius: 5px;
                    
                    cursor: pointer;
          }
          .deletar{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    height: 1.5rem;
                    width: 1.5rem;

                    background: red;
                    color: #fff;

                    border: none;
                    border-radius: 5px;
                    
                    cursor: pointer;
          } 
          
          /* Estilização das informaçãoes gerais do pedido */
          .info-pedido{
                    width: 50%;
                    height: 80%;

                    cursor: pointer;
          }
          .info-pedido p{
                    text-align: right;
          }
</style>