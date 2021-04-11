<template>
  <div>
    <app-title v-bind:text="formStatus === 'create' ? 'Criando formulário' : 'Alterando formulário'"></app-title>
    <div>
      <app-loading :status="status"></app-loading>
    </div>
    <form @submit.prevent="saveForm">
      <div class="card mb-4">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Titulo do Formulario</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">
            <textarea class="form-control" id="question1" rows="3" v-model="form.question"></textarea>
          </div>
        </div>
      </div>
      <div class="card mb-4" v-for="(item, key) in form.items.filter((x) => x.status)" :key="'items' + key">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>{{ key + 1 }}) Pergunta</h4>
            <button type="button" class="btn btn-danger" v-on:click="delItem(item.id)" title="Excluir pergunta?">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">
            <div class="row">
              <div class="col-9">
                <div class="mb-3">
                  <label v-bind:for="key + 1 * 2" class="form-label">Pergunta</label>
                  <input type="text" class="form-control" v-bind:id="key + 1 * 2" placeholder="Write Answer" v-model="item.name" />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3">
                  <label v-bind:for="key + 1 * 3" class="form-label">Tipo</label>
                  <select class="custom-select" v-model="item.type" aria-label="Default select example" v-bind:id="key + 1">
                    <option value="1">Checkbox</option>
                    <option value="2">Option</option>
                    <option value="3">Text</option>
                    <option value="4">Comments</option>
                  </select>
                </div>
              </div>
              <div class="col-12" v-if="item.answers.length > 0">
                {{ item.answers.length > 1 ? "Respostas" : "Resposta" }}
              </div>
              <div class="col-12" v-for="(i, k) in item.answers.filter((x) => x.status)" :key="'answers' + k">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="i.text" />
                  <div class="input-group-prepend">
                    <button type="button" class="btn btn-danger" v-on:click="delAnswer(i.id)" title="Excluir resposta?">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-3 text-center">
                <button type="button" class="btn btn-success mr-3" v-on:click="addAnswer(item.id)" title="Adicionar pergunta?">
                  <i class="bi bi-plus-square"></i>
                </button>
                <button type="button" class="btn btn-primary" v-on:click="addAnswers(item.id)" title="Adicionar perguntas?">
                  <i class="bi bi-plus-square-dotted"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-1 row" v-for="(item, key) in form.items" :key="key"></div>
      <button class="btn btn-success" v-on:click="addItem" title="Adicionar pergunta?" type="button">
        <i class="bi bi-plus-square"></i>
      </button>
      <div class="text-right">
        <button class="btn btn-success mr-3" type="submit">
          <i class="bi bi-check-circle"></i>
          {{ formId === 0 ? "Adicionar" : "Alterar" }}
        </button>
        <button class="btn btn-primary" v-on:click="$router.push('/form')" title="Formulários" type="button">
          <i class="bi bi-arrow-90deg-left"></i>
        </button>
      </div>
    </form>
    <!-- <pre>{{ JSON.stringify(form, null, 2) }}</pre> -->
  </div>
</template>

<script>
import uniqid from "uniqid";
import { http } from "../../../utils";
import appTitle from "../../Title";
import appLoading from "../../Loading";
export default {
  name: "app-form-base",
  props: {
    formStatus: {
      type: String,
      default: "create",
    },
  },
  components: {
    "app-loading": appLoading,
    "app-title": appTitle,
  },
  data() {
    return {
      status: this.formStatus === "update",
      formId: 0,
      form: {
        id: uniqid(),
        question: "",
        items: [],
        status: true,
      },
    };
  },
  methods: {
    addItem: function() {
      this.form.items.push({
        id: uniqid(),
        name: "Question 1",
        type: 1,
        status: true,
        answers: [],
      });
    },
    delItem: function(id) {
      this.form.items = this.form.items.map((x) => {
        if (x.id === id) {
          x.status = false;
        }
        return x;
      });
    },
    addAnswer: function(id) {
      this.form.items.map((x) => {
        if (id === x.id) {
          x.answers.push({ id: uniqid(), text: "", status: true });
        }
        return x;
      });
    },
    addAnswers: function(id) {
      const count = parseInt(prompt("Digite a quantidade de pergunta"));
      if (count) {
        for (let i = 0; i < count; i++) {
          this.addAnswer(id);
        }
      }
    },
    delAnswer: function(id) {
      this.form.items = this.form.items.map((x) => {
        x.answers = [
          ...x.answers.map((z) => {
            if (z.id === id) {
              z.status = false;
            }
            return z;
          }),
        ];
        return x;
      });
    },
    saveForm: function() {
      if (this.formId === 0) {
        http.post("form", this.form).then((result) => {
          if (result.status === 201) {
            this.$router.push(`/form/update/${result.data.id}`);
          }
        });
      } else if (this.formId > 0) {
        http.put(`form/${this.formId}`, this.form).then((result) => {
          if (result.status === 204) {
            console.log(result.data);
            this.$router.push("/form");
          }
        });
      }
    },
    loadItem: function() {
      http
        .get(`form/${this.formId}`)
        .then((result) => {
          if (result.status === 200) {
            console.log(result.data);
            this.form = result.data;
          }
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          this.status = false;
        });
    },
  },
  created() {
    if (this.formStatus === "update") {
      this.formId = +this.$route.params.id;
      if (this.formId > 0) {
        this.loadItem();
      }
    }
  },
};
</script>

<style>
.mt-container {
  margin-top: 30px;
}
</style>
