import { Component, Vue, Watch } from 'vue-property-decorator'

import { ActionTypes } from '@/store/aciton-types'
import { APIHost } from '@/utils'
import { validNumber } from '@/validation'

export interface InputItem {
  id: string | null
  name: string
  description: string
  num_of_servings: number
  cook_time: number
  ingredients: string
  directions: string
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component
export default class RecipePanelView extends Vue {
  inputItem = <InputItem>{}

  nameValidated = true
  numOfServingsValidated = true
  cookTimeValidated = true
  imageValidated = true

  isUpload: boolean = false

  // uploading: string = 'w-0';
  originImage: string =
    (<any> this.$store.state).recipeStore.recipeDetail.cover_url
  newImage: string = ''
  imageName: string = 'Choose file...'

  imageFile: File = <File>{}

  mode: string = 'create'

  get recipeId (): string | null {
    try {
      return this.$route.params['recipeId']
    } catch (error) {
      return null
    }
  }

  checkForm () {
    this.nameValidated = !!this.inputItem.name
    this.numOfServingsValidated =
      !!this.inputItem.num_of_servings &&
      validNumber(this.inputItem.num_of_servings)
    this.cookTimeValidated =
      !!this.inputItem.cook_time && validNumber(this.inputItem.cook_time)

    if (
      this.nameValidated &&
      this.numOfServingsValidated &&
      this.cookTimeValidated
    ) {
      this.submitRecipe()
      return
    }

    window.scrollTo({
      left: (<any> document.getElementById('name')).offsetLeft || 0,
      top:  (<any> document.getElementById('name')).offsetTop || 0
    })
  }

  onImageChange (event: HTMLInputEvent) {
    const files = event.target.files || null
    if (files === null) {
      return
    }

    if (!files.length) {
      return
    }

    this.loadImage(files[0])
  }

  isValidFileExtension (file: File) {
    const MimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/bmp'
    ]
    return MimeTypes.some(item => item === file.type)
  }

  // updateProgress(event: ProgressEvent) {
  // // evt is an ProgressEvent.
  //   if (event.lengthComputable) {
  //     var percentLoaded = Math.round((event.loaded / event.total) * 100);
  //     if (percentLoaded < 100) {
  //       console.log(percentLoaded)
  //       // this.uploading = 'w-' + percentLoaded;
  //     }
  //   }
  // }

  loadImage (file: File) {
    var reader = new FileReader()

    if (this.isValidFileExtension(file)) {
      // reader.onprogress = this.updateProgress
      reader.onload = (e: any) => {
        this.newImage = e.target.result
        this.imageName = file.name
      }
      reader.readAsDataURL(file)

      this.isUpload = true
      this.imageFile = file
    } else {
      this.isUpload = false
      this.imageValidated = false
      this.imageFile = <File>{}
    }
  }

  submitCover (recipeId: string) {
    if (this.isUpload && !!recipeId) {
      this.$store
        .dispatch(ActionTypes.UPLOAD_COVER, {
          recipeId: recipeId,
          file: this.imageFile
        })
        .then(result => {
          if (result) {
            this.$store.dispatch(ActionTypes.OPEN_ALERT, {
              alert: {
                show: true,
                message: 'Update success!!',
                style: 'alert-success'
              }
            })
          } else {
            this.$store.dispatch(ActionTypes.OPEN_ALERT, {
              alert: {
                show: true,
                message: 'Upload image failure, please try again',
                style: 'alert-warning'
              }
            })
          }
        })
    } else if (!!recipeId) {
      this.$store.dispatch(ActionTypes.OPEN_ALERT, {
        alert: {
          show: true,
          message: 'Create success!!',
          style: 'alert-success'
        }
      })
    }
  }

  submitRecipe () {
    const recipe = {
      id: this.inputItem.id || null,
      name: this.inputItem.name,
      description: this.inputItem.description || '',
      num_of_servings: this.inputItem.num_of_servings || 1,
      cook_time: this.inputItem.cook_time || 1,
      ingredients: this.inputItem.ingredients || '',
      directions: this.inputItem.directions || ''
    }

    if (this.mode === 'create') {
      this.$store
        .dispatch(ActionTypes.CREATE_RECIPE, { recipe: recipe })
        .then(recipeId => {
          this.submitCover(recipeId)
          this.$router.push({ name: 'my-recipes' })
        })
    } else {
      this.$store
        .dispatch(ActionTypes.UPDATE_RECIPE, { recipe: recipe })
        .then(() => {
          if (!!recipe.id) {
            this.submitCover(recipe.id)
            this.$router.push({
              name: 'recipe-detail',
              params: { recipeId: recipe.id }
            })
          }
        })
    }
  }

  initCreate () {
    this.inputItem = <InputItem>{}
    this.nameValidated = true
    this.numOfServingsValidated = true
    this.cookTimeValidated = true
    this.imageValidated = true
    this.isUpload = false
    this.originImage = require("@/static/images/default-recipe-cover.jpg")
  }

  get publicPath () {
    return process.env.BASE_URL
  }

  fetchRecipe () {
    if (
      String((<any> this.$store.state).recipeStore.recipeDetail.id) !==
      this.recipeId
    ) {
      this.$store
        .dispatch(ActionTypes.GET_RECIPE, { recipeId: this.recipeId })
        .then(success => {
          this.inputItem = (<any> this.$store.state).recipeStore.recipeDetail
        })
    }
  }

  @Watch('$route')
  routeChange (newVal: any, oldVal: any) {
    if (newVal.name === 'create-recipe') {
      this.mode = 'create'
      this.initCreate()
    }
  }

  beforeMount () {
    if (this.$route.name === 'edit-recipe') {
      this.mode = 'edit'
      this.fetchRecipe()
    } else {
      this.$store.dispatch(ActionTypes.RESET_RECIPE)
      this.mode = 'create'
      this.initCreate()
    }
  }
}
