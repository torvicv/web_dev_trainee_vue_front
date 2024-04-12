<template>
    <div class="form-container flex justify-center items-center min-h-screen">
        <form @submit.prevent="login" class="shadow-[0_0_6px_#CCCCCCBB] gap-6 w-2/6 flex flex-col px-6 py-4 rounded">
            <div class="flex justify-start w-full flex gap-4">
                <label for="email">Email</label>
                <input type="email" v-model="email" 
                class="w-full focus:outline-none focus:ring-0 focus:border-0 border-b border-blue-600" id="email" 
                placeholder="Email" required />
            </div>
            <div class="flex justify-start w-full flex gap-4">
                <label for="password">Password</label>
                <input type="password" v-model="password" 
                    class="w-full focus:outline-none focus:ring-0 focus:border-0 border-b border-blue-600" id="password" 
                    placeholder="Password" required />
            </div>
            <button type="submit" class="bg-blue-600 py-2 text-white rounded flex justify-center w-full">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from "../axios";

    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            async login() {
                try {
                    const response = await axios.post("/login", {
                        email: this.email,
                        password: this.password
                    })
                    
                    if (response.data.token) {
                        localStorage.setItem("token", response.data.token)
                    }

                    this.$store.commit('LOGIN');

                    this.$router.push('/');
                } catch (error) {
                    console.error(error.response.data.message);
                }
            }
        }
    }
</script>