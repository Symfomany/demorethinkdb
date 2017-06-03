<template>

  <div class="collection-item avatar">
        <span class="badge">
          <a><i v-if="user.enabled" class="material-icons">check_circle</i></a>
          <a><i v-if="!user.enabled" class="material-icons">highlight_off</i></a>
        </span>
      <img :src="user.picture" alt="" class="circle">
      <span><b><router-link :to="{ name: 'detail', params: { id: user.id }}">{{ user.name }}</router-link></b></span>

        <div class="row s12">
          <div class="col s6"><i class="material-icons">email</i> {{ user.email }}</div>
          <div class="col s6"><i class="material-icons">phone</i> {{ user.phone }}</div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'item',
  props: ['user'],
  data(){
    return {
    }
  },
  
}
</script>
