<template>
    <div class="form-container">
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Password">
            </div>
            <input type="submit" value="Registrarse" />
        </form>
    </div>
</template>