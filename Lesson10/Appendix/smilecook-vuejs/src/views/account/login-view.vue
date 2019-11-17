<template>
  <div class="row">
    <div class="col-md-12" v-show="!checkLoginStatus">
      <h4 class="py-3 text-center">Login</h4>

      <form
        class="needs-validation"
        novalidate=""
      >
        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="email">Email</label>
            <input
              v-model="inputItem.email"
              type="email"
              class="form-control"
              id="email"
              :class="{'is-invalid': !emailValidated}"
            />
            <div
              v-show="!emailValidated"
              class="invalid-feedback"
            >
              Please enter a valid email address.
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="password">Password</label>
            <input
              v-model="inputItem.password"
              type="password"
              class="form-control"
              id="password"
              :class="{'is-invalid': !passwordValidated}"
            />
            <div
              v-show="!passwordValidated"
              class="invalid-feedback"
            >
              Please enter your password.
            </div>
          </div>
        </div>

        <hr class="mb-4 col-md-6 justify-content-center">

        <div class="row pb-5 justify-content-center">
          <div class="col-md-6">
            <button
              @click.stop="formCheck()"
              class="btn btn-primary btn-lg btn-block"
              type="button"
            >Sign in</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/account/login-view.ts"></script>
