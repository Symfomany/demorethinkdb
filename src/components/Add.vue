<template>
  <div class="edit">  
    <div class="row">
      <form action="">

       <div class="row">
          <div class="input-field col s4">
               <p>
                <input id="homme" v-model="user.gender" name="gender" :value="true"  type="radio" class="validate">
                <label for="homme">Homme</label>
              </p>
              <p>
                <input id="femme" v-model="user.gender" name="gender" :value="false"  type="radio" class="validate">
                <label for="femme">Femme</label>
              </p>
          </div>
           <div class="input-field col s4">
              <input v-model="user.name" placeholder="Nom Complet" id="first_name" type="text" class="validate">
            </div>
          <div class="input-field col s4">
              <input v-model="user.username" placeholder="Pseudonyme" id="pseudonyme" type="text" class="validate">
            </div>
            <div class="input-field col s2">
              <input v-model="user.email" placeholder="Email" id="email" type="email" class="validate">
            </div>
            <div class="input-field col s3">
              <input v-model="user.password" placeholder="Mot de passe: 6 caractères min." id="password" type="password" class="validate">
            </div>
            <div class="input-field col s3">
              <input placeholder="Confirmer votre mot de passe" id="confpassword" type="password" class="validate">
            </div>

            <div class="input-field col s4">
              <input v-model="user.phone" placeholder="Telephone" id="phone" type="text" class="validate">
            </div>

            <div class="input-field col s4">
              <input v-model="user.picture" placeholder="Picture" id="picture" type="url" class="validate">
            </div>

            <div class="input-field col s3">
              <input v-model="user.address.city" placeholder="Ville" id="city" type="text" class="validate">
            </div>
           
            <div class="input-field col s3">
              <input v-model="user.age" placeholder="Age (an)" id="age" type="number" class="validate">
            </div>
            <div class="input-field col s4">
              <select class="browser-default" v-model="user.category">
                <option value="Amateur">Amateur</option>
                <option value="Veteran">Veteran</option>
                <option value="Professionnel">Professionnel</option>
              </select>
            </div>
            <div class="input-field col s4">
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
        <button type="button" @click="add" class="btn teal">Créer ce profil</button>
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
  methods: {

     add(){
        this.$http.post(`http://localhost:3000/add`, this.user).then(response => {
          this.$emit('addItem')
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