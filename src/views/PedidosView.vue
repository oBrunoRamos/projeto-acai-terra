<template>
  <div class="pedidos-view-container">
    <VisualizaPedido
      class="modalPedido"
      v-if="verPedido"
      :pedido="pedidoAberto"
      @clique-fora="fechaPedido"
    />

    <!-- Div com os pedidos confirmados -->

    <div class="pedidos">
      <h3>Pedidos</h3>
      <hr />
      <div class="pedidos-ativo">
        <!-- <PedidosComponent :pedido="pedidoFake"/> -->
        <PedidosComponent
          v-for="pedido in pedidos"
          :key="pedido.id"
          :emAberto="true"
          :pedido="pedido"
          @clicou-pedido="visualizarPedido(pedido)"
          @concluir-pedido="concluirPedido(pedido)"
          @deletar-pedido="deletarPedido(pedido)"
        />
      </div>
    </div>

    <!-- Div com os produtos em estoque -->

    <div class="estoque">
      <h3>Estoque</h3>
      <hr />
      <div class="produtos">
        <h3>Sabores</h3>
        <hr />
        <div class="div-estoque">
          <ContaEstoque v-for="acai in acais" :key="acai.id" :produto="acai" />
        </div>
      </div>
      <div class="produtos">
        <h3>Adicionais</h3>
        <hr />
        <div class="div-estoque">
          <ContaEstoque
            v-for="adicional in adicionais"
            :key="adicional.id"
            :produto="adicional"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContaEstoque from "@/components/ContaEstoque.vue";
import PedidosComponent from "@/components/PedidoComponent.vue";
import VisualizaPedido from "@/components/VisualizaPedido.vue";

export default {
  components: {
    ContaEstoque,
    PedidosComponent,
    VisualizaPedido,
  },
  data() {
    return {
      pedidos: [],
      // pedido
      pedidoFake: {
        id: 1,
        nome: "Bruno ramos",
        forma_pagamento: "dinheiro",
        total: 10,
        acais: [],
        adicionais: [],
      },

      verPedido: false,
      pedidoAberto: {
        acais: [],
        adicionais: [],
      },

      // Estoque
      acais: [],
      adicionais: [],
    };
  },
  methods: {
    visualizarPedido(pedido) {
      this.pedidoAberto.acais = pedido.acais;
      this.pedidoAberto.adicionais = pedido.adicionais;

      this.verPedido = true;
    },
    fechaPedido() {
      this.pedidoAberto.acais = [];
      this.pedidoAberto.adicionais = [];

      this.verPedido = false;
    },
    async concluirPedido(pedido) {

          const pedidos = "http://localhost:3000/pedidos";
          const concluidos = "http://localhost:3000/concluidos";

          let pedidoConcluido = JSON.stringify(pedido)


          await fetch(concluidos, {
                    method: "POST",
                    headers:{
                              "Content-Type": "application/json"
                    },
                    body: pedidoConcluido
          })


          await fetch( pedidos + `/${pedido.id}`, {
           method: "DELETE",
          });


          await fetch(pedidos)
          .then((r) => r.json())
          .then((r) => {
                    this.pedidos = r;
          });
    },
    async deletarPedido(pedido) {

          const pedidos = "http://localhost:3000/pedidos";

      await fetch(`http://localhost:3000/pedidos/${pedido.id}`, {
        method: "DELETE",
      });

      await fetch(pedidos)
        .then((r) => r.json())
        .then((r) => {
          this.pedidos = r;
        });

    },
    async fetchDB() {
      const pedidos = "http://localhost:3000/pedidos";
      const acais = "http://localhost:3000/acais";
      const adicionais = "http://localhost:3000/adicionais";

      await fetch(pedidos)
        .then((r) => r.json())
        .then((r) => {
          this.pedidos = r;
        });
      await fetch(acais)
        .then((r) => r.json())
        .then((r) => {
          this.acais = r;
        });
      await fetch(adicionais)
        .then((r) => r.json())
        .then((r) => {
          this.adicionais = r;
        });
    },
  },
  created() {
    this.fetchDB();
  },
};
</script>

<style>
/* Container da View */
.pedidos-view-container {
  display: flex;
  justify-content: space-around;

  background: #59185b;
}

/* Estilização da div com os pedidos */
.pedidos-view-container hr {
  border: 2px solid;
  border-radius: 230px;
  width: 80%;
}
.pedidos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;

  background: #fff;

  width: 60%;

  border-radius: 10px;

  margin-top: 6rem;
}
.pedidos-ativo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.modal-pedido {
  position: fixed;
}

/* Estilização da div com o estoque */
.estoque {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;

  background: #de93e0;
  color: #fff;

  width: 30%;
  margin-top: 6rem;

  border-radius: 10px;
}
.produtos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 1rem 0;
}
.produtos hr {
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.div-estoque {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>