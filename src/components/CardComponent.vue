<template>
          <div class="card-container">
                    <div class="div-img">

                              <!-- Imagem do Produto -->

                              <img v-if="produto.acai" :src="acaiImage">
                              <img v-else :src="adicImage" alt="">

                    </div>
                    <div class="div-info">

                              <!-- Nome do Produto -->

                              <h4 v-if="produto.acai">{{ produto.sabor }}</h4>
                              <h4 v-else>{{ produto.adic }}</h4>

                              <!-- Valor do produto -->
                              <div class="div-preco">
                                        <p v-if="produto.acai">Valor KG</p>
                                        <p v-else>Valor adic.</p>
                                        <h2>{{ valorConvertido }}</h2>
                              </div>

                              <p v-if="produto.acai"><b>Selecione a quantidade</b></p>
                              <p v-else><b>Selecione a quantidade de adicionais</b></p>
                              <!-- Contador de quantidade de itens selecionados -->
                              <div class="div-contadora">
                              
                                        <button class="mais" @click="adicionaAoPedido(produto.id, produto.acai)">
                                                  <Plus/>
                                        </button>
                                        <p>{{ quant }}</p>
                                        <button class="menos" @click="removeDoPedido(produto.id, produto.acai)">
                                                  <Minus/>
                                        </button>
                              </div>

                              <!-- Mensadem informativa ai cliente -->
                              <p v-if="produto.acai">Cada bola de sorvete pesa em média 25g</p>

                    </div>
          </div>
</template>

<script>

import {Plus} from 'lucide-vue-next';
import {Minus} from 'lucide-vue-next';

export default {
          data(){
                    return{
                             valorConvertido: null,
                             quant: 0,
                             acaiImage: `../assets/acais/${this.produto.image}.png` ,
                             adicImage:  `../assets/adicionais/${this.produto.image}.png`
                    }
          },
          components:{
                    Plus,
                    Minus
          },
          props:{
                    produto:Object
          },
          methods:{
                    converteValor(){
                              const valor = this.produto.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                              this.valorConvertido = valor;
                    },
                    // adicionaAoPedido(produtoId, acai){
                    //           this.quant++;
                    //           let infoProduto = [produtoId, acai] ;
                              

                    //           // console.log(produtoId, acai);
                    
                    // },
                    // removeDoPedido(produtoId, acai){
                    //           this.quant--;

                              
                    //           
                    //           // console.log(produtoId, acai);
          
                    // }
                    
          },
          watch:{
                    quant(novoValor, valorAntigo){     
                              const acai = this.produto.acai;
                              const produtoId = this.produto.id
                              let infoProduto = [produtoId, acai] ;

                              if(novoValor<0){
                                        this.quant = 0
                              }

                              if(novoValor>valorAntigo){
                                        this.$emit('adicionar-produto', infoProduto);
                              }
                              else if(novoValor < valorAntigo){
                                        this.$emit('remove-produto', infoProduto);
                              }
                    }
          },
          created(){
                    this.converteValor()
          },
}
</script>

<style scoped>
          .card-container{         
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;

                    height: 23rem;
                    width: 15rem;

                    padding: 0.5rem;
                    margin: 1rem;

                    background: #ffffff;
                    color: #000;
                    box-shadow: 0 0 20px rgba(0, 0, 0, .7);

                    border-radius: 15px;
          }

          /* Div com a imagem do produto */
          .div-img{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                 
                    height: 25rem;
                    width: 145px;

                    border-radius: 5px;
          }


          /* Div com as informações gerais do item */
          .div-info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    height: fill;
                    width: 80%;

                    /* background: #213; */
          }
                    /* Div com preço do produto */
                    .div-preco{
                              display: flex;
                              justify-content: space-between;
                              align-items: end;
                    }



                    /* Div com contador */
                    .div-contadora{
                              display: flex;
                              justify-content: center;
                              align-items: center;

                              padding: 0 0px;

                              /* background: #456; */

                              height:30px;
                              width: min-content;

                    }

                              /* P que comstra a quantidade de itens */
                              .div-contadora p{
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;

                                        height: 2.2rem;
                                        width: 2.2rem;
                                        margin: -5px;

                                        background: #ffffff;

                                        border: 1px solid;
                                        border-radius: 20px;

                                        z-index: 2;
                              }

                              .div-contadora button{
                                        display: flex;
                                        align-items: center;

                                        height: 1.5rem;
                                        width: 5rem;
                                        padding: 0 15px;

                                        font-weight: 600;
                                        font-size: 20pt;
                                        

                                        color: #ffffff;
                                        background: #793892;

                                        border: none;

                                        cursor: pointer;
                              }
                              .mais{
                                        justify-content: left;
                                        border-radius: 20px 0 0 20px;
                              }
                              .menos{
                                        justify-content: right;
                                        border-radius: 0 20px 20px 0;

                              }

          
</style>