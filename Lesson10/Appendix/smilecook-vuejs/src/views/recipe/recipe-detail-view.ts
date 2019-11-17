import { Component, Vue } from 'vue-property-decorator'

import OperatorComponent from '@/components/OperatorComponent.vue'
import { AlertItem, RecipeItem } from '@/response'
import { ActionTypes } from '@/store/aciton-types'

@Component({
  components: {
    OperatorComponent
  }
})
export default class RecipeDetailView extends Vue {
  path = ''
  query = {}

  get recipe (): RecipeItem {
    try {
      return (<any> this.$store.state).recipeStore.recipeDetail
    } catch (e) {
      return <RecipeItem>{
        author: {}
      }
    }
  }

  get recipeId () {
    return this.$route.params['recipeId']
  }

  fetchRecipe () {
    this.$store
      .dispatch(ActionTypes.GET_RECIPE, { recipeId: this.recipeId })
      .then(() => {})
  }

  toPreviousPage () {
    this.$router.push({path: this.$store.state.recipeStore.previous.path, query: {...this.$store.state.recipeStore.previous.query}})
  }

  beforeMount () {
    if (this.$store.state.routeMap.from.name === 'my-recipes' || this.$store.state.routeMap.from.name === 'author' || this.$store.state.routeMap.from.name === 'recipe-list') {
      this.$store.dispatch(ActionTypes.UPDATE_PREVIOUS, { path: this.$store.state.routeMap.from.path, query: this.$store.state.routeMap.from.params}) 
    } 
    this.fetchRecipe()
  }
}
