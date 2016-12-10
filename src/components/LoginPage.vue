<script>
    import router from '../router';
    export default {
        data() {
            return {
                user: {
                    login: '',
                    password: '',
                },
            }
        },
        beforeCompleted() {
            if(this.$store.state.user.isLogged == true) {
                window.location.hash = '#/manage';
            }
        },
        computed: {
            badLogged() {
                return this.$store.state.user.isBadLogin;
            },
            logged() {
                if(this.$store.state.user.isLogged == true) {
                    console.log('jest logged');
                    window.location.hash = '#/manage';
                }
                return this.$store.state.user.isLogged;
            }
        },
        methods: {
            login() {
                console.log('login()');
                this.$store.dispatch('login', JSON.stringify(this.user));
            },
        }
    }
</script>

<template lang="html">
    <div class="container">
        <h2>Login</h2>
        <div class="row">
            <p v-show="logged">Pomyślnie zalogowano</p>
            <p v-show="badLogged">Błędy login lub/i hasło</p>
            <form class="col s12" @submit.prevent="login()">
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Login" type="text" v-model="user.login">
                  <label for="">Login</label>
                </div>
                <div class="input-field col s6">
                  <input type="password" v-model="user.password">
                  <label>Password</label>
                </div>
                <div class="col s12">
                    <button type="submit" @click.prevent="login()" class="waves-effect waves-light btn">Login</button>
                </div>
              </div>
          </form>
        </div>
    </div>
</template>
