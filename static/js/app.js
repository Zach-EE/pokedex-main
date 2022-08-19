Vue.component('pokemon-card', {
  delimiters: ['[[', ']]'],
  props: ['pokemon'],
  template: `
        <div class="card mt-2 mx-1 rounded border border-info" style="width: 21rem;">
            <div class="card-header container-fluid d-flex justify-content-around">
                <img class="rounded float-start mx-1 px-1" :src="pokemon.image_front" :alt="pokemon.name">
                <img class="rounded float-end mx-1 px-1" :src="pokemon.image_back" :alt="pokemon.name">
            </div>
            <div class="card-body">
                <h4 class="card-title text-center">[[ pokemon.name ]]</h4>
                <hr>
                <p class="card-text">Type: [[ pokemon.height ]]</p>
                <p class="card-text">Height: [[ pokemon.height ]]</p>
                <p class="card-text">Weight: [[ pokemon.weight ]]</p>

            </div>
            <div class="card-footer btn-group d-flex justify-content-around" style="width: 21rem;">
                <a class="rounded btn btn-outline-success btn-sm btn-block float-start mr-1 w-100" @click.prevent="catchPokemon(pokemon)">
                    catch<br>[[pokemon.name]]
                </a>
                <a class="rounded btn btn-outline-warning btn-sm float-none mx-1 w-100" @click.prevent="releasePokemon(pokemon)">edit<br>[[pokemon.name]]</a>
                <a class="rounded btn btn-outline-danger btn-sm btn-block ml-1 w-100" @click.prevent="releasePokemon(pokemon)">release<br>[[pokemon.name]]</a>
            </div>
        </div>
    `,
  methods: {
    catchPokemon: function (pokemon) {
      this.$emit('catch', pokemon);
    },
    releasePokemon: function (pokemon) {
      this.$emit('release', pokemon);
    },
  },
});

const vm = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    pokemon_list: [],
    csrfToken: '',
    users: [],
    type: [],
  },
  methods: {
    loadPokemon: function () {
      console.log('loading pokemon');
      axios({
        method: 'get',
        url: '/apis/v1/pokemon/',
      }).then((response) => {
        console.log(response.data);
        this.pokemon_list = response.data;
      });
    },
    loadUsers: function () {
      console.log('loading users');
      axios({
        method: 'get',
        url: '/apis/v1/users/',
      }).then((response) => {
        console.log(response.data);
        this.users = response.data;
      });
    },
    catchPokemon: function (pokemon) {
      console.log('catch ', pokemon.name);
      let pokeID = 
      axios({
        method: 'patch',
        url: `/apis/v1/pokemon/${this.pokemon.id}/`,
        headers: {
            'X-CSRFToken': this.csrfToken
        }
      }).then((response) => {
        this.pokemon_list = response.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    releasePokemon: function (pokemon) {
      console.log('release ', pokemon.name);
      this.$emit('release', pokemon);
    },
  },
  created: function () {
    this.loadPokemon()
    this.loadUsers()
  },
  mounted() {
    this.csrfToken = document.querySelector(
      'input[name=csrfmiddlewaretoken]'
    ).value;
  },
});
