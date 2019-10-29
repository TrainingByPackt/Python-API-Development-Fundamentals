import { Component, Vue } from 'vue-property-decorator'

import FilterComponent from '@/components/FilterComponent.vue'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import { ActionTypes } from '@/store/aciton-types'

@Component({
  components: {
    RecipeItemComponent,
    FilterComponent
  }
})
export default class RecipeListView extends Vue {
  page = 1
  perPage = 10
  sort = 'created_at'
  order = 'desc'

  get recipes (): Array<object> {
    try {
      return (<any> this.$store.state).recipeStore.recipeList
    } catch (e) {
      return []
    }
  }

  beforeMount () {
    this.$store.dispatch(ActionTypes.GET_RECIPE_LIST, {
      q: '',
      page: this.page,
      perPage: this.perPage,
      sort: this.sort,
      order: this.order
    })
  }
}
