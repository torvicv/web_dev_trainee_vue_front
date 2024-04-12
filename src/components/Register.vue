<template>
    <div class="form-container">
        <form @submit.prevent="register" class="min-h-screen flex flex-col justify-center items-center">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
            </div>
            <input type="submit" value="Registrarse" />
        </form>
    </div>
</template>

<script>
    import axios from "../axios";

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: ''
            };
        },
        methods: {
            async register() {
                try {
                    const response = await axios.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    });
                    this.$router.push({name: 'login'});
                } catch (error) {
                    console.error('An error occurred', error);
                    if (error.response) {
                        console.error('Error details:', error.response.data);
                    }
                }
            }
        }
    }
</script>