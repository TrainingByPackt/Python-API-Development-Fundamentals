<template>
  <div class="col">
    <div
      class="row pl-4 pr-4"
      v-show="enableResult"
    >
      <p
        v-if="listParams.q !== ''"
        class="text-secondary"
      >About <strong>{{pagination.total}}</strong> results for <strong>{{listParams.q}}</strong>.</p>
      <p
        v-else
        class="text-secondary"
      >The total of {{pagination.total}} recipes.</p>
    </div>

    <div class="row mb-auto mt-auto">
      <!-- pagination block -->
      <div
        class="col-4 ml-0"
        v-show="enablePagination && !!pagination.total"
      >
        <nav>
          <ul class="pagination mt-3">
            <li
              class="page-item"
              :class="{ disabled: !pagination.links.prev }"
            >
              <button
                class="page-link"
                @click.stop="onChangePage(pagination.page - 1)"
              >Previous</button>
            </li>

            <li
              v-for="page in pagination.pages"
              class="page-item"
              :class="{ active: page === pagination.page}"
            >
              <button
                v-if="page !== pagination.page && ((page > pagination.page - 2) && (page < pagination.page + 2) || (page === pagination.page + 2 && pagination.page === 1) || (page === pagination.page - 2 && pagination.page === pagination.pages))"
                class="page-link"
                @click.stop="onChangePage(page)"
              >{{page}}</button>
              <button
                v-if="page === pagination.page"
                class="page-link"
              >{{page}}</button>
            </li>

            <li
              class="page-item"
              :class="{ disabled: !pagination.links.next }"
            >
              <button
                class="page-link"
                @click.stop="onChangePage(pagination.page + 1)"
              >Next</button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- order by block -->
      <div
        class="col-5 mt-auto mb-auto p-2"
        v-show="(enableOrderBy || enableDisplay) && !!pagination.total"
      >
        <b-dropdown
          v-show="enableDisplay"
          id="dropdown-1"
          :text="'Display: ' + listParams.perPage"
          class="m-md-2"
          variant="outline-secondary"
        >
          <b-dropdown-item
            :active="listParams.perPage === 10"
            @click.stop="(listParams.perPage !== 10)? onChangePerPage(10): false"
          >10</b-dropdown-item>
          <b-dropdown-item
            :active="listParams.perPage === 20"
            @click.stop="(listParams.perPage !== 20)? onChangePerPage(20): false"
          >20</b-dropdown-item>
        </b-dropdown>

        <b-dropdown
          v-show="enableOrderBy"
          id="dropdown-2"
          :text="orderByObj.str"
          class="m-md-2 col-7"
          variant="outline-secondary"
        >
          <b-dropdown-item
            v-for="item in orderByStrList" v-bind:key="item.str"
            :active="item.sort === listParams.sort && item.order === listParams.order"
            @click.stop="(listParams.sort !== item.sort || listParams.order !== item.order ) ? onChangeOrderBy(item.sort, item.order): false"
          >{{item.str}}</b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- search block -->
      <div
        class="col-3 input-group p-3"
        v-show="enableSearch && !!pagination.total"
      >
        <input
          v-model="inputItem.q"
          type="text"
          class="form-control mb-auto mt-auto"
          placeholder=""
          aria-label="hamburger"
          aria-describedby="button-addon2"
          id="inputQ"
        >
        <div class="input-group-append mb-auto mt-auto mr-3">
          <button
            @click.stop="search()"
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PaginationItem, RecipeListParamsItem, LinksItem } from "@/response";
import { ActionTypes } from "@/store/aciton-types";

export interface InputItem {
  q: string;
}

@Component({
  props: {
    enableResult: { type: Boolean, default: true },
    enablePagination: { type: Boolean, default: true },
    enableDisplay: { type: Boolean, default: true },
    enableOrderBy: { type: Boolean, default: true },
    enableSearch: { type: Boolean, default: true }
  }
})
export default class FilterComponent extends Vue {
  inputItem = <InputItem>{
    q: ""
  };
  orderByStrList = [
    { sort: "created_at", order: "desc", str: "Newest First" },
    { sort: "cook_time", order: "asc", str: "Cook Time: Low to High" },
    { sort: "cook_time", order: "desc", str: "Cook Time: High to Low" },
    { sort: "num_of_servings", order: "asc", str: "Servings: Low to High" },
    { sort: "num_of_servings", order: "desc", str: "Servings: High to Low" }
  ];

  get listParams(): RecipeListParamsItem {
    return this.$store.state.recipeStore.listParams;
  }

  get orderByObj(): { str: string; sort: string; order: string } {
    let sort = this.listParams.sort || "created_at";
    let order = this.listParams.order || "desc";

    return (
      this.orderByStrList.find(
        item => item.sort === sort && item.order === order
      ) || this.orderByStrList[0]
    );
  }

  get pagination(): PaginationItem {
    try {
      return this.$store.state.recipeStore.pagination;
    } catch (e) {
      return <PaginationItem>{
        links: <LinksItem>{}
      };
    }
  }

  // get actionType(): string {
  //   return this.$props.majorAction;
  // }

  onChangePage(page: number) {
    this.resetRecipeList(
      this.inputItem.q,
      page,
      this.listParams.perPage,
      this.listParams.sort,
      this.listParams.order
    );
  }

  onChangePerPage(perPage: number) {
    this.resetRecipeList(
      this.inputItem.q,
      1,
      perPage,
      this.listParams.sort,
      this.listParams.order
    );
  }

  onChangeOrderBy(sort: string, order: string) {
    this.resetRecipeList(
      this.inputItem.q,
      1,
      this.listParams.perPage,
      sort,
      order
    );
  }

  search() {
    if (this.inputItem.q !== "") {
      this.resetRecipeList(
        this.inputItem.q,
        1,
        this.listParams.perPage,
        this.listParams.sort,
        this.listParams.order
      );
    }
  }

  resetRecipeList(
    q?: string,
    page?: number,
    perPage?: number,
    sort?: string,
    order?: string
  ) {
    this.$store.dispatch(ActionTypes.GET_RECIPE_LIST, {
      q: q || "",
      page: page,
      perPage: perPage,
      sort: sort,
      order: order,
      visibility: "public"
    });
  }

  beforeMount() {}
}
</script>
