<template>
  <div>
    <h2>Lista de Formulários</h2>
    <div class="mt-3 mb-3 text-center">
      <button
        class="btn btn-primary"
        v-on:click="$router.push('/form/create')"
        title="Criar formulário"
      >
        <i class="bi bi-newspaper"></i>
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Formulário (Title)</th>
          <th scope="col">...</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <button
              v-on:click="$router.push('/form/update/:id')"
              class="btn btn-primary"
              title="Editar formulário"
            >
              <i class="bi bi-pencil"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app-form-index",
};
</script>

<style></style>
