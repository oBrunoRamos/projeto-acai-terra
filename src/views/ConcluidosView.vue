<template>
          <div class="concluidos-container">
                    <h2>Lista de  pedidos concluidos</h2>
                    <ul>
                              <PedidosComponent 
                                        v-for="pedido in pedidos"
                                        :key="pedido.id"

                                        :pedido="pedido"
                              
                              />
                    </ul>
          </div>
</template>

<script>

import PedidosComponent from '@/components/PedidoComponent.vue'

export default {
          components:{
                    PedidosComponent
          },
          data(){
                    return{
                              pedidos:[]
                    }
          },
          methods:{
                    async fetchDB(){
                              const pedidos = "http://localhost:3000/concluidos"

                              await fetch(pedidos).then(r => r.json()).then(r=>{
                                        this.pedidos = r
                              })
                    }
          },
          created(){
                    this.fetchDB()
          }


}
</script>

<style>
.concluidos-container{
          display: flex;
          justify-content: start;
          align-items: center;
          flex-direction: column;

          height: 100vh;
          padding-top: 7rem;


          background: #59185B;
          color: #fff;
          
}
.concluidos-container ul{
          display: flex;
          flex-direction: column;
          align-items: center;

          height: 80%;
          width: 90%;
          margin-top: 1rem;

          background: #fff;
          color: #000;

          border-radius: 15px;
}
</style>