<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="py-3 text-center">Sign up</h4>

      <form
        class="needs-validation"
        novalidate=""
      >
        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="username">Username</label>
            <div class="input-group">
              <input
                v-model="inputItem.username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                :class="{'is-invalid': !usernameValidated}"
              />
              <div
                v-if="!usernameValidated"
                class="invalid-feedback"
              >
                Please enter a valid.
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="email">Email</label>
            <input
              v-model="inputItem.email"
              type="email"
              class="form-control"
              id="email"
              placeholder="you@example.com"
              :class="{'is-invalid': !emailValidated}"
            />
            <div
              v-if="!emailValidated"
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
              placeholder=""
              :class="{'is-invalid': !passwordValidated}"
            />
            <div
              v-if="!passwordValidated"
              class="invalid-feedback"
            >
              Please enter a valid password.
            </div>

          </div>
        </div>

        <div class="row justify-content-center py-3">
          <div class="col-md-6">
            <label for="confirm-password">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              class="form-control"
              id="confirm-password"
              placeholder=""
              :class="{'is-invalid': !confirmPasswordValidated}"
            />
            <div
              v-if="!confirmPasswordValidated"
              class="invalid-feedback"
            >
              Please enter a valid confirm password.
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
            >Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="@/views/account/register-view.ts"></script>
