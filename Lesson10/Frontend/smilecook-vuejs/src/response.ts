export interface AuthorItem {
  id: number
  username: string
}

export interface ProfileItem extends AccountItem {
  username: string
}

export interface UserItem {
  id: number
  username: string
  email: string | null
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface AvatarItem {
  avatar_url: string
}

export interface CoverItem {
  cover_url: string
}

export interface RecipeItem {
  id: number
  name: string
  description: string
  num_of_servings: number
  cook_time: number
  directions: string
  ingredients: string
  is_publish: boolean
  cover_url: string
  author: AuthorItem
  created_at: string
  updated_at: string
}

export interface RecipeListItem extends RecipeItem {
  is_publish: boolean
  created_at: string
  updated_at: string
}

export interface LinksItem {
  first: number
  last: number
  prev: boolean | undefined | null
  next: boolean | undefined | null
}

export interface PaginationItem {
  links: LinksItem
  page: number
  pages: number
  per_page: number
  total: number
}

export interface RecipeListParamsItem {
  q: string
  page: number
  perPage: number
  sort: string
  order: string
}

export interface AuthorRecipeListParamsItem {
  page: number
  perPage: number
  visibility: string
}

export interface RecipeListPaginationItem extends PaginationItem {
  data: Array<RecipeListItem>
}

export interface AccountItem {
  email: string
  password: string
}

export interface TokenItem {
  access_token: string
  refresh_token: string
}

export interface TokenDataItem {
  token: string
  status: string
}

export interface RefreshItem {
  token: string
}

export interface MessageItem {
  message: string
}

export interface AlertItem {
  show: boolean
  message: string
  style: string
}

export interface DialogItem {
  show: boolean
  status: string
  title: string
  msg: string
  hasConfirmButton: boolean
  hasCancelButton: boolean
  callback: any
}

export interface RouteItem {
  name: string
  params: object
}

export interface RouteMapItem {
  to: RouteItem
  from: RouteItem
}
