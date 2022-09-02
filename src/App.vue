<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { getCocktails, getingredients } from "@/services/api";
import { onBeforeMount } from "vue";
import type { Ingredient } from "./services/api";

interface State {
  query: string;
  loading: boolean;
  ingredients: Ingredient[];
  selectedIngredient: string[];
  cocktailList: any;
  error: any;
}

const state: State = reactive({
  query: "",
  loading: false,
  ingredients: [],
  error: null,
  selectedIngredient: [],
  cocktailList: [],
});

onBeforeMount(() => {
  getData();
});

async function getData() {
  state.loading = true;
  state.ingredients = [];
  state.error = null;
  try {
    state.ingredients = await getingredients();
  } catch (error) {
    state.error = error;
  } finally {
    state.loading = false;
  }
}

watch(
  () => state.selectedIngredient,
  async (selectedIngredient) => {
    state.cocktailList = await getCocktails(
      import.meta.env.VITE_COCKTAIL_API_KEY,
      selectedIngredient
    );
  }
);
</script>

<template>
  <!-- <header></header> -->

  <main>
    selectedIngredient ={{ state.selectedIngredient }}
    <div class="CheckboxContainer">
      <div
        class="IngredientCheckBox"
        :key="ingredient.strIngredient1"
        v-for="ingredient in state.ingredients"
      >
        <input
          type="checkbox"
          :id="ingredient.strIngredient1"
          :value="ingredient.strIngredient1"
          v-model="state.selectedIngredient"
        />
        <label :for="ingredient.strIngredient1">
          {{ ingredient.strIngredient1 }}</label
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.CheckboxContainer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: row;
}

.IngredientCheckBox {
  margin-right: 2px;
}
</style>
