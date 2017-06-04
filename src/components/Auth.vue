<template>
  <div class="row card">
    <form class="col s12 card-content" @submit.prevent="authentifiation">
      <div class="row">
        
         <div class="row">
        <div class="input-field col s12">
          <input v-model="user.email" id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model="user.password" id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
    
  <div class="row">
        <div class="input-field col s12">
        <button class="waves-effect waves-light btn"><i class="material-icons left">check_circle</i>connexion</button>
        </div>
      </div>

  </div>
  </form>
    </div>

</template>

<script>

import Item from '@/components/Item'
import Auth from '@/components/Auth'

export default {
  name: 'list',
  components: {item: Item},
  data(){
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  mounted(){
      
  },
  methods: {
    authentifiation(){
       this.$http.post("http://localhost:3000/auth", this.user).then(response => {
         console.log(response)
      });
    }
  }
}
</script>


<style>
 
</style>