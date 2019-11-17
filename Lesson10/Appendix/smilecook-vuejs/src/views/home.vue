<template>
  <div class="home">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Welcome to Smilecook Demo Site !!!</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
      </div>
      <div class="col-8">
        <h3>Client</h3>
        <p>You can test API here with web side</p>
      </div>
      <div class="col">
      </div>
    </div>

    <div class="row">
      <div class="col">
      </div>
      <div class="col-8">
        <h3>All route</h3>
        <ul>
          <li>/users</li>
          <li>/users/{username}</li>
          <li>/users/avatar</li>
          <li>/users/{username}/recipes</li>
          <li>/me</li>
          <li>/token</li>
          <li>/refresh</li>
          <li>/revoke</li>
          <li>/recipes</li>
          <li>/recipes/{recipe_id}</li>
          <li>/recipes/{recipe_id}/publish</li>
        </ul>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/home.ts">

</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
