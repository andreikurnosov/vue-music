<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="regShowAlert"
    :class="regAlertVariant"
  >
    {{ regAlertMessage }}
  </div>
  <vee-form @submit="register" :validation-schema="schema" :initialValues="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message class="text-red-600 block" name="tos" />
    </div>
    <button
      :disabled="regInSubmission"
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
import { useStore } from 'vuex';

export default {
  name: 'RegisterForm',
  setup() {
    const store = useStore();
    const schema = ref({
      name: 'required|min:3|max:100|alpha_spaces',
      email: 'required|min:3|max:100|email',
      age: 'required|min_value:18|max_value:100',
      password: 'required|min:3|max:100',
      confirm_password: 'passwords_mismatch:@password',
      country: 'required|country_excluded:Antartica',
      tos: 'tos',
    });

    const regInSubmission = ref(false);
    const regShowAlert = ref(false);
    const regAlertVariant = ref('bg-blue-500');
    const regAlertMessage = ref('Please wait! Your account is being created.');

    const userData = {
      country: 'USA',
    };

    const register = async (values) => {
      regShowAlert.value = true;
      regInSubmission.value = true;
      regAlertVariant.value = 'bg-blue-500';
      regAlertMessage.value = 'Please wait! Your account is being created.';
      console.log(values);

      try {
        store.dispatch('registerUser', values);
      } catch (error) {
        regInSubmission.value = false;
        regAlertVariant.value = 'bg-red-500';
        regAlertMessage.value = 'An unexpected error occured. Please try again later.';
        return;
      }

      regAlertVariant.value = 'bg-green-500';
      regAlertMessage.value = 'Success! Your account has been created.';
    };

    return {
      schema,
      register,
      userData,
      regInSubmission,
      regShowAlert,
      regAlertVariant,
      regAlertMessage,
    };
  },
};
</script>
