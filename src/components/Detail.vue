<template>

 <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
      <img :src="user.picture">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <router-link :to="{ name: 'list'}"><i class="material-icons">view_list</i> Voir la liste</router-link>

          <h2 class="header">{{ user.name }} {{ user.gender }}</h2>
          <p>Age: {{ user.age }}</p>
          <p>Budget: {{ user.budget }}</p>
          <p>Catégory: {{ user.category }}</p>
          <p>Company: {{ user.company.name }} {{ user.company.catchPhrase }} {{ user.company.bs }}</p>
          <p>Facebook: {{ user.fb.amis }} amis  {{ user.fb.likes }} likes {{ user.fb.photos }} photos</p>
          
          <div class="row">
              <img class="responsive-img" v-for="photo in user.photos" :src="photo.thumbnailUrl">
          </div>
            
          <ul>
            <li><a>{{ user.email }}</a></li>
            <li><a>{{ user.phone }}</a></li>
          </ul>
        </div>
        <div class="card-action">
          <a href="#">Supprimer cet utilisateur</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'item',
  data(){
    return {
      user: {}
    }
  },
  methods: {

  },
  mounted(){
    this.$http.get(`http://localhost:3000/detail/${this.$route.params.id}`).then(response => {
        this.user = response.body;
      });
  }

  
}
</script>
