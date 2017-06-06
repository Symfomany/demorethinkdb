<template>

  <div class="collection-item avatar">
        <span class="badge">
          <a><i v-if="user.enabled" class="material-icons">check_circle</i></a>
          <a><i v-if="!user.enabled" class="material-icons">highlight_off</i></a>
        </span>
      <img :src="user.picture" alt="" class="circle">
      <h3><b><router-link :to="{ name: 'detail', params: { id: user.id }}">{{ user.name }}</router-link></b> - <b>{{ user.category }}</b></h3>

      <ul>
        <li>Nb de langues: <i>{{ user.languages.length }} langues</i></li>
      </ul>
        <div class="row s12 details">
          <div class="col s3 detail"><i class="material-icons">account_circle</i> {{ user.username }}</div>
          <div class="col s3 detail"><i class="material-icons">email</i> {{ user.email }}</div>
          <div class="col s3 detail"><i class="material-icons">phone</i> {{ user.phone }}</div>
        </div>
        <a class="red-text" @click="remove"><i class="material-icons">delete</i> Supprimer ce profil</a>

        <router-link :to="{ name: 'edit', params: { id: user.id }}"><i class="material-icons">edit</i> Editer ce profil</router-link>
    </div>

</template>

<script>
export default {
  name: 'item',
  props: ['user'],
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  },
  data(){
    return {
    }
  },
  
}
</script>

<style lang="">
  .material-icons{
      vertical-align: middle;
          font-size: 0.9rem;
  }
  h3{
    font-size: 1.42rem;
  }
  .collection .collection-item.avatar .circle{
    width: 50px;
    height: 50px;
    vertical-align: middle;
    top: 33px;
  }
  .details{
    margin-top: 10px;
  }
  .detail{
        color: #888;
        font-size: 0.9rem;
  }

</style>
