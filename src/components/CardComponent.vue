<template>
  <div class="card-container">
    <div class="div-img">
      <!-- Imagem do Produto -->

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

      <h4>{{ produto.nome }}</h4>

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
        <button class="mais" @click="quant++"><Plus /></button>

        <p>{{ quant }}</p>

        <button class="menos" @click="quant--"><Minus /></button>
      </div>

      <!-- Mensadem informativa ai cliente -->
      <p v-if="produto.acai">Cada bola de sorvete pesa em média 25g</p>
    </div>
  </div>
</template>

<script>
import { Plus } from "lucide-vue-next";
import { Minus } from "lucide-vue-next";

export default {
  components: {
    Plus,
    Minus,
  },
  props: {
    produto: Object,
    quantidade:Array
  },
  data() {
    return {
      valorConvertido: null,
      quant: 0,
    };
  },
  methods: {
    converteValor() {
      const valor = this.produto.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      this.valorConvertido = valor;
    },
  },
  watch: {
    quant(novoValor, valorAntigo) {
      let url;

      if (this.produto.acai) {
        url = "http://localhost:3000/acais";
      } else {
        url = "http://localhost:3000/adicionais";
      }

      if (novoValor < 0) {
        this.quant = 0;
      } else {
        fetch(url + `/${this.produto.id}`)
          .then((response) => response.json())
          .then((response) => {
            let estoque = response.estoque;

            let quantPedido = this.produto.acai ? this.quant * 25 : this.quant;

            if (quantPedido <= estoque) {
              let produto = {
                id: this.produto.id,
                acai: this.produto.acai,
                nome: this.produto.nome,
                valor: this.produto.valor,
                imagem: this.produto.imagem,
                quantidade: this.quant,
              };

              if (novoValor > valorAntigo) {
                this.$emit("adicionar-produto", produto);
              } else if (novoValor < valorAntigo) {
                this.$emit("remove-produto", produto);
              }
            } else {
              this.quant = valorAntigo;
              this.$emit("sem-estoque");
            }
          });
      }
    },
  },
  created() {
    this.converteValor();
  },
};
</script>

<style scoped>
.card-container {
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);

  border-radius: 15px;
}

/* Div com a imagem do produto */
.div-img {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 90%;
  width: 80%;


  border-radius: 5px;
}
.di-img img {
  height: fit-content;
  max-height: 40%;
  width: fit-content;
}

/* Div com as informações gerais do item */
.div-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: fill;
  width: 80%;

  /* background: #213; */
}
/* Div com preço do produto */
.div-preco {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

/* Div com contador */
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

  height: 2.2rem;
  width: 2.2rem;
  margin: -5px;

  background: #ffffff;

  border: 1px solid;
  border-radius: 20px;

  z-index: 2;
}

.div-contadora button {
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
.mais {
  justify-content: left;
  border-radius: 20px 0 0 20px;
}
.menos {
  justify-content: right;
  border-radius: 0 20px 20px 0;
}
</style>