import { Component, Vue } from 'vue-property-decorator'

import AuthorComponent from '@/components/AuthorComponent.vue'
import AuthorFilterComponent from '@/components/AuthorFilterComponent.vue'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import { RecipeItem, UserItem } from '@/response'
import { ActionTypes } from '@/store/aciton-types'

@Component({
  components: {
    AuthorComponent,
    RecipeItemComponent,
    AuthorFilterComponent
  }
})
export default class AuthorView extends Vue {
  get recipes (): Array<RecipeItem> {
    try {
      return (<any> this.$store.state).recipeStore.recipeList
    } catch (e) {
      return []
    }
  }

  get username (): string {
    return this.$route.params['username']
  }

  beforeMount () {
    this.$store.dispatch(ActionTypes.GET_USER_RECIPE_LIST, {
      username: this.username,
      page: 1,
      perPage: 10,
      visibility: 'public'
    })
  }
}
