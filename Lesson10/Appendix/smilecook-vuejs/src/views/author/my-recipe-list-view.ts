import { Component, Vue } from 'vue-property-decorator'

import AuthorFilterComponent from '@/components/AuthorFilterComponent.vue'
import RecipeItemComponent from '@/components/RecipeItemComponent.vue'
import { RecipeItem } from '@/response'
import { ActionTypes } from '@/store/aciton-types'

@Component({
  components: {
    RecipeItemComponent,
    AuthorFilterComponent
  }
})
export default class MyRecipeListView extends Vue {
  page: number = 1
  perPage: number = 10
  visibility: string = 'all'

  get username (): string {
    try {
      return (<any> this.$store.state).userStore.profile.username
    } catch (error) {
      return ''
    }
  }

  get recipes (): Array<RecipeItem> {
    try {
      return (<any> this.$store.state).recipeStore.recipeList
    } catch (e) {
      return []
    }
  }

  beforeMount () {
    if (!this.$store.state.isLogin || !!!this.username) {
      this.$router.push({ name: 'login' })
    }
    this.$store.dispatch(ActionTypes.GET_USER_RECIPE_LIST, {
      username: this.username,
      page: this.page,
      perPage: this.perPage,
      visibility: this.visibility
    })
  }
}
