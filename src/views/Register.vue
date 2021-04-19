<template>
  <div class="container">
    <h1 class="my-5">User Registration</h1>
    <form>
        <input
          type="email"
          placeholder="Email"
          class="form-control my-2"
          v-model.trim="$v.email.$model"
          :class="{'is-invalid':$v.email.$error}"
        />
      <input
        type="password"
        placeholder="Password"
        class="form-control my-2"
        v-model.trim="$v.password.$model"
        :class="{'is-invalid':$v.password.$error}"
      />
      <input
        type="password"
        placeholder="Repeat Password"
        class="form-control my-2"
        v-model.trim="$v.rpassword.$model"
        :class="{'is-invalid':$v.rpassword.$error}"
      />
      <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Register</button>
    </form>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      rpassword: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    rpassword: { sameAsPassword: sameAs("password") },
  },
  computed: {},
};
</script>

<style></style>
