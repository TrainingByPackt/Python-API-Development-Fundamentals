<template>
  <div class="col">
    <div
      class="row pl-4 pr-4"
      v-show="enableResult"
    >
      <p
        v-if="isAuthor"
        class="text-secondary"
      >The total of {{pagination.total}} recipes by {{listParams.visibility}}.</p>
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
        v-show="(enableDisplay || enableVisibility) && !!pagination.total"
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
          v-show="isAuthor && enableVisibility"
          id="dropdown-1"
          :text="listParams.visibility"
          class="m-md-2"
          variant="outline-secondary"
        >
          <b-dropdown-item
            :active="listParams.visibility === 'all'"
            @click.stop="(listParams.visibility !== 'all')? onChangeVisibility('all'): false"
          >all</b-dropdown-item>
          <b-dropdown-item
            :active="listParams.visibility === 'public'"
            @click.stop="(listParams.visibility !== 'public')? onChangeVisibility('public'): false"
          >public</b-dropdown-item>
          <b-dropdown-item
            :active="listParams.visibility === 'private'"
            @click.stop="(listParams.visibility !== 'private')? onChangeVisibility('private'): false"
          >private</b-dropdown-item>
        </b-dropdown>

        <!-- <b-dropdown
          id="dropdown-2"
          :text="orderByObj.str"
          class="m-md-2 col-7"
          variant="outline-secondary"
        >
          <b-dropdown-item
            v-for="item in orderByStrList"
            :active="item.sort === listParams.sort && item.order === listParams.order"
            @click.stop="(listParams.sort !== item.sort || listParams.order !== item.order ) ? onChangeOrderBy(item.sort, item.order): false"
          >{{item.sort}} || {{item.order}}</b-dropdown-item>
        </b-dropdown> -->
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  PaginationItem,
  AuthorRecipeListParamsItem,
  LinksItem
} from "@/response";
import { ActionTypes } from "@/store/aciton-types";

export interface InputItem {
  q: string;
}

@Component({
  props: {
    enableResult: { type: Boolean, default: true },
    enablePagination: { type: Boolean, default: true },
    enableDisplay: { type: Boolean, default: true },
    enableVisibility: { type: Boolean, default: true },
    username: String
  }
})
export default class AuthorFilterComponent extends Vue {
  // get username(): string {
  //   return this.$props.username;
  // }

  get isAuthor(): boolean {
    try {
      return (
        this.$props.username ===
        (<any>this.$store.state).userStore.profile.username
      );
    } catch (error) {
      return false;
    }
  }

  get listParams(): AuthorRecipeListParamsItem {
    return this.$store.state.userStore.listParams;
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

  onChangePage(page: number) {
    this.resetRecipeList(
      this.$props.username,
      page,
      this.listParams.perPage,
      this.listParams.visibility
    );
  }

  onChangePerPage(perPage: number) {
    this.resetRecipeList(
      this.$props.username,
      1,
      perPage,
      this.listParams.visibility
    );
  }

  onChangeVisibility(visibility: string) {
    this.resetRecipeList(
      this.$props.username,
      1,
      this.listParams.perPage,
      visibility
    );
  }

  resetRecipeList(
    username: string,
    page?: number,
    perPage?: number,
    visibility?: string
  ) {
    this.$store.dispatch(ActionTypes.GET_USER_RECIPE_LIST, {
      username: username,
      page: page,
      perPage: perPage,
      visibility: visibility
    });
  }

  beforeMount() {}
}
</script>
