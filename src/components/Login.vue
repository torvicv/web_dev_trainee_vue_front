<template>
    <div class="form-container">
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" 
                class="form-control" id="email" 
                placeholder="Enter email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" 
                    class="form-control" id="password" 
                    placeholder="Enter password" required />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from "@/axios";

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