<template>
  <div class="edit">  
    <div class="row">
      <form action="">

       <div class="row">
          <div class="input-field col s6">
              <p>
                <input v-model="user.gender" :value="true"  type="radio" class="validate">
                <label for="test1">Homme</label>
              </p>
              <p>
                <input v-model="user.gender" :value="false"  type="radio" class="validate">
                <label for="test1">Femme</label>
              </p>
          </div>
        </div>

         <div class="row">
            <div class="input-field col s6">
              <input v-model="user.email" placeholder="Email" id="email" type="email" class="validate">
            </div>
        </div>

        <div class="row">
            <div class="input-field col s6">
              <input v-model="user.picture" placeholder="Picture" id="picture" type="url" class="validate">
            </div>
        </div>

        <div class="row">
            <div class="input-field col s6">
              <input v-model="user.address.city" placeholder="Ville" id="city" type="text" class="validate">
            </div>
        </div>

          <div class="row">
            <div class="input-field col s6">
              <input v-model="user.name" placeholder="Placeholder" id="first_name" type="text" class="validate">
            </div>
        </div>

        <div class="row">
            <div class="input-field col s6">
              <input v-model="user.age" placeholder="Placeholder" id="age" type="number" class="validate">
            </div>
        </div>


        <div class="row">
            <div class="input-field col s6">
              <select class="browser-default" v-model="user.category">
                <option value="Amateur">Amateur</option>
                <option value="Veteran">Veteran</option>
                <option value="Professionnel">Professionnel</option>
              </select>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s6">
              <select style="height: 200px" multiple class="browser-default" v-model="user.languages">
                <option value="PHP">PHP</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Python">Python</option>
                <option value="Ruby">Ruby</option>
              </select>
            </div>
        </div>

        <div class="row">
        <button type="button" @click="update" class="btn btn-large">Edit ce profil</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'edit',
  data(){
    return {
      user: {
        gender: null,
        languages: [],
        address: {
          city: ''
        }
      },
    }
  },
  mounted(){
      this.$http.get(`http://localhost:3000/detail/${this.$route.params.id}`).then(response => {
        this.user = response.body;
      });
  },
  methods: {

     update(){
        this.$http.post(`http://localhost:3000/update`, this.user).then(response => {
          this.$router.push('/');
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