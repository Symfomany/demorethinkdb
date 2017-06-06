<template>
  <div class="list">
  
    <div class="row">
     <div class="progress" v-if="!users.length">
        <div class="indeterminate"></div>
    </div>

    <auth></auth>
    <add @addItem="addItem"></add>

    <ul class="collection with-header z-depth-2" v-if="users.length">
        <item @remove="removeItem(user)" v-for="user in users" :key="user.id" :user="user" class="list-item"></item>
    </ul>
    <a id="more" @click="more" class="center-align btn waves-effect waves-light teal"><i class="material-icons">more_horiz</i></a>
    </div>

  </div>
</template>

<script>

import Item from '@/components/Item'
import Auth from '@/components/Auth'
import Add from '@/components/Add'

export default {
  name: 'list',
  components: {item: Item, auth: Auth, add: Add},
  data(){
    return {
      users: [],
      limit: 3
    }
  },
  mounted(){
      this.$http.get("http://localhost:3000/users").then(response => {
        this.users = response.body;
      });
  },
  methods: {
    addItem(){
      this.$http.get("http://localhost:3000/users").then(response => {
        this.users = response.body;
      });
    },
    removeItem(item){
      console.log(item)
      this.$http.delete(`http://localhost:3000/remove/${item.id}`).then(response => {
        this.users = response.body;
      });
    },
    inactive(){
      this.$http.get(`http://localhost:3000/inactive`).then(response => {
        this.users = response.body;
      });
    },
    more(){
      this.limit += 3;
      this.$http.get(`http://localhost:3000/more/${this.limit}`).then(response => {
        this.users = response.body;
      });
    }
  }
}
</script>


<style>
  .btn-floating.btn-large{
    width: 56px;
    margin: 0 auto;
  }
  #more{
    margin: 0 auto;
    display: block;
  }
</style>