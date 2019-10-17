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

  beforeMount () {
    this.fetchRecipe()
  }
}
