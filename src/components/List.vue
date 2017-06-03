<template>
  <div class="list">
  
    <div class="row">
     <div class="progress" v-if="!users.length">
        <div class="indeterminate"></div>
    </div>

    <ul class="collection with-header" v-if="users.length">
        <li class="collection-header">
          {{ users.length }} Utilisateurs actifs
          <a @click="inactive" class="flow-text waves-effect waves-light btn btn-sm cyan"><i class="material-icons left">do_not_disturb</i>Voir les inactifs</a>
        </li>
        <item v-for="user in users" :key="user.id" :user="user" class="list-item"></item>
    </ul>
    <a @click="more" class="center-align btn-floating btn-large waves-effect waves-light teal"><i class="material-icons">more_horiz</i></a>
    </div>

  </div>
</template>

<script>

import Item from '@/components/Item'
export default {
  name: 'list',
  components: {item: Item},
  data(){
    return {
      users: [],
      limit: 3
    }
  },
  mounted(){
      this.$http.get("http://localhost:3000/").then(response => {
        this.users = response.body;
      });
  },
  methods: {
    inactive(){
      this.limit += 3;
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

</style>