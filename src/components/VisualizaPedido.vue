<template>
  <div class="modal-container" @click="cliqueFora">
    <div class="pedido-modal-container">
      <h3>Pedido</h3>

      <!-- Listagem de itens do pedido -->

      <ul class="itens-lista">
        <!-- Listagem de açaís -->
        <li v-for="sabor in pedido.acais" :key="sabor.id">
          <!-- Imagens Açais -->
          <img
            v-if="sabor.imagem == 'acai-tradicional'"
            class="imagem"
            src="../assets/acais/acai-tradicional.png"
          />
          <img
            v-if="sabor.imagem == 'acai-abacaxi'"
            class="imagem"
            src="../assets/acais/acai-abacaxi.png"
          />
          <img
            v-if="sabor.imagem == 'acai-banana'"
            class="imagem"
            src="../assets/acais/acai-banana.png"
          />
          <img
            v-if="sabor.imagem == 'acai-cupuacu'"
            class="imagem"
            src="../assets/acais/acai-cupuacu.png"
          />
          <img
            v-if="sabor.imagem == 'acai-guarana'"
            class="imagem"
            src="../assets/acais/acai-guarana.png"
          />
          <img
            v-if="sabor.imagem == 'acai-morango'"
            class="imagem"
            src="../assets/acais/acai-morango.png"
          />

          <h5>{{ sabor.nome }}</h5>
          <p>{{ sabor.quantidade * 25 }}g</p>
          <h3>
            {{ converteValor((sabor.valor / 1000) * 25 * sabor.quantidade) }}
          </h3>
          <div>
            <div class="div-contadora" v-if="confirmaPedido">
              <button class="mais" @click="adiciona(sabor)"><Plus /></button>
              <p>{{ sabor.quantidade }}</p>
              <button class="menos" @click="remove(sabor)"><Minus /></button>

              <button id="lixo" @click="deleta(sabor)"><Trash2 /></button>
            </div>
          </div>
        </li>

        <!-- Listagem de adicionais -->
        <li v-for="add in pedido.adicionais" :key="add.id">
          <!-- Imagens Adicionais -->
          <img
            v-if="add.imagem == 'adic-amendoim'"
            class="imagem"
            src="../assets/adicionais/adic-amendoim.png"
          />
          <img
            v-if="add.imagem == 'adic-banana'"
            class="imagem"
            src="../assets/adicionais/adic-banana.png"
          />
          <img
            v-if="add.imagem == 'adic-granola'"
            class="imagem"
            src="../assets/adicionais/adic-granola.png"
          />
          <img
            v-if="add.imagem == 'adic-kiwi'"
            class="imagem"
            src="../assets/adicionais/adic-kiwi.png"
          />
          <img
            v-if="add.imagem == 'adic-leiteCondensado'"
            class="imagem"
            src="../assets/adicionais/adic-leiteCondensado.png"
          />
          <img
            v-if="add.imagem == 'adic-leiteNinho'"
            class="imagem"
            src="../assets/adicionais/adic-leiteNinho.png"
          />
          <img
            v-if="add.imagem == 'adic-morango'"
            class="imagem"
            src="../assets/adicionais/adic-morango.png"
          />
          <img
            v-if="add.imagem == 'adic-pacoca'"
            class="imagem"
            src="../assets/adicionais/adic-pacoca.png"
          />
          <img
            v-if="add.imagem == 'adic-uvaVerde'"
            class="imagem"
            src="../assets/adicionais/adic-uvaVerde.png"
          />

          <h5>{{ add.nome }}</h5>
          <p>{{ add.quantidade }}un</p>
          <h3>{{ converteValor(add.valor * add.quantidade) }}</h3>
          <div>
            <div class="div-contadora" v-if="confirmaPedido">
              <button class="mais" @click="adiciona(add)"><Plus /></button>
              <p>{{ add.quantidade }}</p>
              <button class="menos" @click="remove(add)"><Minus /></button>

              <button id="lixo" @click="deleta(add)"><Trash2 /></button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Formulário de informações do cliente -->
      <form class="dados-pedido" v-if="confirmaPedido">
        <div class="info-user">
          <!-- Preencimento do nome -->
          <label for="nome-no-pedido">Seu nome:</label>
          <input
            type="text"
            name="nome-no-pedido"
            id="nome-no-pedido"
            required
          />

          <!-- Preenchimento da forma de pagamento -->
          <label for="forma-pagto">Tipo de pagamento:</label>
          <select name="forma-pagto" id="forma-pagto">
            <option value="Dinheiro" selected>Dinheiro</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Pix">Pix</option>
          </select>
        </div>

        <div>
          <h4>Total do pedido:</h4>
          <h2>{{ converteValor(totalPedido) }}</h2>
        </div>
        <input
          type="submit"
          class="envia-pedido"
          @click="pedidoConfirmado"
          value="Enviar Pedido"
        />
      </form>
    </div>
  </div>
</template>
<script>
import { Plus } from "lucide-vue-next";
import { Minus } from "lucide-vue-next";
import { Trash2 } from "lucide-vue-next";

export default {
  components: {
    Plus,
    Minus,
    Trash2,
  },
  props: {
    pedido: Object,
    confirmaPedido: Boolean,
  },
  data() {
    return {
      totalPedido: null,
    };
  },
  methods: {
    somaProdutos() {
      const acais = this.pedido.acais;
      const adic = this.pedido.adicionais;

      let total = 0;
      acais.forEach((item) => {
        total += ((item.valor/1000) * 25) * item.quantidade;
      });
      adic.forEach((item) => {
        total += item.valor*item.quantidade;
      });
      this.totalPedido = total;
    },
    cliqueFora(event) {
      if (event.target === event.currentTarget) {
        this.$emit("clique-fora");
      }
    },
    pedidoConfirmado() {
      const nomePedido = document.querySelector("#nome-no-pedido");
      const formaPagto = document.querySelector("#forma-pagto");

      let pedidoFechado = {
        id: 0,
        nome: nomePedido.value,
        forma_pagamento: formaPagto.value,
        total: this.totalPedido,
        acai: this.pedido.acai,
        adicionais: this.pedido.adicionais,
      };

      this.$emit("pedido-confirmado", pedidoFechado);
    },
    converteValor(valorRecebido) {
      const valor = valorRecebido.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return valor;
    },
    clicouPedido() {
      if (this.confirmaPedido == true) {
        this.somaProdutos();
      }
    },
    adiciona(produto) {

          let url;

          if (produto.acai) {
                    url = "http://localhost:3000/acais";
          } else {
                    url = "http://localhost:3000/adicionais";
          }

         
          fetch(url + `/${produto.id}`)
          .then((response) => response.json())
          .then((response) => {
                    let estoque = response.estoque;

                    let quantPedido = produto.acai ? produto.quantidade * 25 : produto.quantidade;

                    if (quantPedido < estoque) {
                              produto.quantidade += 1;
                              this.$emit("adiciona-visualiza", produto);
                    }
          });
          
    },
    remove(produto) {
      if (produto.quantidade > 0) {
        produto.quantidade -= 1;
        this.$emit("remove-visualiza", produto);
      }
    },
    deleta(produto) {
      produto.quantidade = 0;
      this.$emit("deleta-produto", produto);
    },
  },
  created() {
    this.clicouPedido();
  },
  updated() {
    this.somaProdutos();
  },
};
</script>
<style>
/* Estilização da parte de fora do modal do componente */
.modal-container {
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  z-index: 100;

  background: rgba(0, 0, 0, 0.5);
}
/* Estilização do modal */
.pedido-modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 80vh;
  width: 80vw;
  padding: 2rem 0;

  background: #59185b;
  color: #fff;

  border-radius: 10px;
}
/* Estilização da lista de itens do pedido */
.itens-lista {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-flow: wrap;

  background: #fff;
  color: #000;

  width: 90%;
  height: fill;

  border-radius: 10px;
}
.itens-lista li {
  display: flex;

  justify-content: space-between;
  align-items: center;

  list-style: none;

  height: 3rem;
  width: 40%;
}
.itens-lista li img {
  height: fit-content;
  max-height: 80%;
  width: fit-content;
}
/* Estilização da area dos dados do usuário no pedido */
.dados-pedido {
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 90%;
  height: 20%;
}
.info-user {
  display: flex;
  flex-direction: column;
}
.info-user input,
select {
  background: #d9d9d9;
  color: #000;

  border: none;
  border-radius: 5px;

  margin: 2%;
  width: 150%;
}
/* Estilização do botão */
.envia-pedido {
  height: 4rem;
  width: 10rem;

  background: #47ca18;
  color: #fff;

  font-size: 12pt;

  border: none;
  border-radius: 10px;

  cursor: pointer;
}
.div-contadora {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 0px;

  /* background: #456; */

  height: 30px;
  width: min-content;
}
/* P que comstra a quantidade de itens */
.div-contadora p {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.5rem;
  width: 1.5rem;
  margin: -5px;

  background: #ffffff;

  border: 1px solid;
  border-radius: 20px;

  z-index: 2;
}
.div-contadora button {
  display: flex;
  align-items: center;

  height: 1rem;
  width: 3rem;
  padding: 0 15px;

  font-weight: 600;
  font-size: 20pt;

  color: #ffffff;
  background: #793892;

  border: none;

  cursor: pointer;
}
.mais {
  justify-content: left;
  border-radius: 20px 0 0 20px;
}
.menos {
  justify-content: right;
  border-radius: 0 20px 20px 0;
}
#lixo {
  height: 2.8rem;
  width: 2.8rem;

  border-radius: 100%;
}
</style>