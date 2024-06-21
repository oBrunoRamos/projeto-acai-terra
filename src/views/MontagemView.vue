<template>
  <div class="montagem-view-container">
    <!-- Pop-up de mensagem -->
    <div class="div-msg">
      <span class="msg">{{ mensagem }}</span>
    </div>

    <!-- Banner de fundo -->
    <div class="div-imagem">
      <img src="../../src/assets/logos/banner-acai.png" alt="" />
    </div>

    <!-- Logo da empresa -->
    <div class="div-acaiLogo">
      <img src="../../src/assets/logos/Logo-AcaiDaTerra.png" alt="" />
    </div>

    <!-- Div de montagem do pedido -->
    <div class="div-montagemPedido">
      <h2>Monte seu açaí</h2>

      <!-- Listagem de sabores de açais -->
      <div class="grupo-alimentos">
        <h3>SABORES</h3>
        <div class="cards-container">
          <CardComponent
            v-for="sabor in acais"
            :key="sabor.id"
            :produto="sabor"
            :atualiza="attProduto"
            @adicionar-produto="adicionaAoPedido"
            @remove-produto="removeDoPedido"
            @sem-estoque="acabouEstoque"
          />
        </div>
      </div>
      <hr />

      <!-- Listagem de adicionais -->
      <div class="grupo-alimentos">
        <h3>ADICIONAIS</h3>
        <div class="cards-container">
          <CardComponent
            v-for="adicional in adicionais"
            :key="adicional.id"
            :produto="adicional" 
            :atualiza="attProduto"
            @adicionar-produto="adicionaAoPedido"
            @remove-produto="removeDoPedido"
            @sem-estoque="acabouEstoque"
          />
        </div>
      </div>

      <div class="div-button">
        <button @click="visualizaPedido = true">CONFIRMAR PEDIDO</button>
      </div>
    </div>

    <!-- Componente de confirmação de pedido -->

    <VisualizaPedido
      v-if="visualizaPedido"
      :pedido="pedidoMontado"
      @clique-fora="visualizaPedido = false"
      @pedido-confirmado="enviaPedido"
      @adiciona-visualiza="adicionaAoPedido"
      @remove-visualiza="removeDoPedido"
      @deleta-produto="removeDoPedido"
      @atualiza-card-produto="adicionaAoPedido"
      :confirmaPedido="true"
      class="visualiza-pedido"
    />
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";
import VisualizaPedido from "@/components/VisualizaPedido.vue";

export default {
  data() {
    return {
      attProduto: null,

      visualizaPedido: false,

      acais: [],
      adicionais: [],

      mensagem: "",

      pedidoMontado: {
        acais: [],
        adicionais: [],
      },
    };
  },
  methods: {
    adicionaAoPedido(produto) {
      this.attProduto = produto;

      const acai = this.pedidoMontado.acais;
      const add = this.pedidoMontado.adicionais;

      if (produto.acai) {
        let produtoVelho = acai.find((item) => item.id === produto.id);

        if (produtoVelho) {
          acai.forEach((item, index) => {
            if (item.id === produto.id) {
              acai.splice(index, 1);
              acai.push(produto);
            }
          });
        } else {
          acai.push(produto);
        }
      } else {
        let produtoVelho = add.find((item) => item.id === produto.id);

        if (produtoVelho) {
          add.forEach((item, index) => {
            if (item.id === produto.id) {
              add.splice(index, 1);
              add.push(produto);
            }
          });
        } else {
          add.push(produto);
        }
      }
    },
    removeDoPedido(produto) {
      this.attProduto = produto;

      const acai = this.pedidoMontado.acais;
      const add = this.pedidoMontado.adicionais;

      if (produto.acai) {
        let produtoVelho = acai.find((item) => item.id == produto.id);

        if (produtoVelho) {
          acai.forEach((item, index) => {
            if (item.id == produto.id) {
              if (produto.quantidade == 0) {
                acai.splice(index, 1);
              } else {
                acai.splice(index, 1);
                acai.push(produto);
              }
            }
          });
        }
      } else {
        let produtoVelho = add.find((item) => item.id == produto.id);

        if (produtoVelho) {
          add.forEach((item, index) => {
            if (item.id == produto.id) {
              if (produto.quantidade == 0) {
                add.splice(index, 1);
              } else {
                add.splice(index, 1);
                add.push(produto);
              }
            }
          });
        }
      }
    },
    acabouEstoque() {
      const msg = document.querySelector(".msg");

      this.mensagem = "O estoque  deste produto acabou";

      msg.style.z_index = "500";
      msg.style.display = "block";

      setTimeout(() => {
        msg.style.display = "none";
        msg.style.z_index = "0";
        this.mensagem = "";
      }, 1500);
    },
    async enviaPedido(pedido) {
      if (
        this.pedidoMontado.acais.length != 0 ||
        this.pedidoMontado.adicionais.length != 0
      ) {
        const acais = this.pedidoMontado.acais;
        const adicionais = this.pedidoMontado.adicionais;

        const pedidos = "http://localhost:3000/pedidos";

        await fetch(pedidos)
          .then((r) => r.json())
          .then((r) => {
            let numId = 0;
            r.forEach(() => {
              numId += 1;
            });
            pedido.id = `${numId}`;
          });
        if (pedido.nome != "") {
          await fetch(pedidos, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido),
          });
          acais.forEach((produto) => {
            fetch(`http://localhost:3000/acais/${produto.id}`)
              .then((response) => response.json())
              .then((response) => {
                response.estoque = response.estoque - produto.quantidade * 25;

                fetch(`http://localhost:3000/acais/${produto.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(response),
                });
              });
          });
          adicionais.forEach((produto) => {
            fetch(`http://localhost:3000/adicionais/${produto.id}`)
              .then((response) => response.json())
              .then((response) => {
                response.estoque = response.estoque - produto.quantidade;

                fetch(`http://localhost:3000/adicionais/${produto.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(response),
                });
              });
          });
        }
      }
    },
    async fetchDB() {
      const acais = "http://localhost:3000/acais";
      const adicionais = "http://localhost:3000/adicionais";

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
  components: {
    CardComponent,
    VisualizaPedido,
  },
  created() {
    this.fetchDB();
  },
};
</script>

<style>
/* Estilização da View */
.montagem-view-container {
  display: flex;
  flex-direction: column;

  width: 100%;

  background: #59185b;
}
/* Estilização da mensagem de estoque */
.div-msg {
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  height: fit-content;
  width: 100vw;

  z-index: 3;

  padding-top: 8rem;

  background: transparent;
}
.msg {
  display: none;

  text-align: center;

  height: 3rem;
  width: 20rem;

  padding-top: 2rem;

  border-radius: 8px;

  background: #47ca18;
  font-weight: bolder;
}

/* Estilização da Imagem de Banner */
.div-imagem {
  width: 100%;
  height: fit-content;

  margin-bottom: -8px;
}
.div-imagem img {
  width: 100%;
}

/* Estilização do logo da empresa */
.div-acaiLogo {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;
  width: 100%;

  z-index: 1;

  background: #1f1d22;
}

/* Estilização da div geral de montagem de pedidos */
.div-montagemPedido {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: fit-content;
  margin-top: 10rem;

  color: #fff;
}
.div-montagemPedido hr {
  width: 80%;
}

/* Estilização das duas divs de alimentos */
.grupo-alimentos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 4rem;
  margin-bottom: 4rem;
}
.grupo-alimentos h3 {
  font-size: 25pt;
}

/* Estilização da disposição dos cards */
.cards-container {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;

  margin-top: 2rem;
  width: 50vw;
}

/* Estilização do botão de envio do pedido */
.div-button {
  display: flex;
  justify-content: end;
  width: 80%;

  padding: 3rem;
}
.div-button button {
  margin-right: 5rem;

  height: 5rem;
  width: 15rem;

  border: none;
  border-radius: 10px;

  background: #47ca18;
  color: #fff;

  font-weight: bold;
}

.visualiza-pedido {
  position: fixed;
}
</style>