<template>
  <div>
    <app-title text="Lista de Formulários"></app-title>
    <div class="mt-3 mb-3 text-center">
      <button class="btn btn-primary" v-on:click="$router.push('/form/create')" title="Criar formulário">
        <i class="bi bi-newspaper"></i>
      </button>
    </div>
    <app-loading :status="status"></app-loading>
    <table class="table" v-if="items.length > 0">
      <thead>
        <tr>
          <th scope="col" class="text-center">Id</th>
          <th scope="col" class="text-center">Formulário (Title)</th>
          <th scope="col" class="text-center">...</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="">{{ item.id }}</td>
          <td class="">{{ item.question }}</td>
          <td class="text-center">
            <button v-on:click="$router.push('/form/update/' + item.id)" class="btn btn-primary" title="Editar formulário">
              <i class="bi bi-pencil"></i>
            </button>
            <button v-on:click="deleteItems(item.id)" class="btn btn-danger ml-3" title="Excluir formulário">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { http } from "./../../utils";
import appTitle from "../Title";
import appLoading from "../Loading";
export default {
  name: "app-form-index",
  components: {
    "app-loading": appLoading,
    "app-title": appTitle,
  },
  data() {
    return {
      items: [],
      status: true,
    };
  },
  methods: {
    fetchItems: function() {
      http
        .get("form")
        .then((response) => {
          if (response.status === 200) {
            this.items = response.data;
          }
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          this.status = false;
        });
    },
    deleteItems: function(id) {
      http
        .delete(`form/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.fetchItems();
          }
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  created: function() {
    this.fetchItems();
  },
};
</script>
