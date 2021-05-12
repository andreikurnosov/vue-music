<template>
  <div
    v-if="loginShowAlert"
    class="text-white text-center font-bold p-4 mb-4"
    :class="loginAlertVariant"
  >
    {{ loginAlertMessage }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      :disabled="loginInSubmission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LoginForm',
  setup() {
    const loginSchema = ref({
      email: 'required|email',
      password: 'required|min:3|max:32',
    });

    const loginInSubmission = ref(false);
    const loginShowAlert = ref(false);
    const loginAlertVariant = ref('bg-blue-500');
    const loginAlertMessage = ref('Please wait! We are logging you in.');

    const login = (values) => {
      loginInSubmission.value = true;
      loginShowAlert.value = true;
      loginAlertVariant.value = 'bg-blue-500';
      loginAlertMessage.value = 'Please wait! We are logging you in.';

      loginAlertVariant.value = 'bg-green-500';
      loginAlertMessage.value = 'Succes! You are logged in.';
      console.log(values);
    };

    return {
      loginSchema,
      login,
      loginShowAlert,
      loginInSubmission,
      loginAlertVariant,
      loginAlertMessage,
    };
  },
};
</script>
