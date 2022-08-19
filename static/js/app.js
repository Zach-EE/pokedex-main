Vue.component('pokemon-card', {
  delimiters: ['[[', ']]'],
  props: ['pokemon'],
  template: `
        <h2></h2
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
                <a class="rounded btn btn-outline-success btn-sm btn-block float-start mr-1 w-100" @click.prevent="caughtPokemon(pokemon)">
                    catch<br>[[pokemon.name]]
                </a>
                <a class="rounded btn btn-outline-warning btn-sm float-none mx-1 w-100" @click.prevent="releasePokemon(pokemon)">edit<br>[[pokemon.name]]</a>
                <a class="rounded btn btn-outline-danger btn-sm btn-block ml-1 w-100" @click.prevent="releasedPokemon(pokemon)">release<br>[[pokemon.name]]</a>
            </div>
        </div>
    `,
  methods: {
    caughtPokemon: function (pokemon) {
      this.$emit('caught', pokemon);
    },
    releasedPokemon: function (pokemon) {
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
    activeUser: {},
    caught: [],
    released: [],
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
    loadActiveUser: function () {
      console.log('loading activeUser');
      axios({
        method: 'get',
        url: '/apis/v1/activeuser/',
      }).then((response) => {
        console.log(response.data);
        this.activeUser = response.data;
      });
    },
    caughtPokemon: function (pokemon) {
      this.activeUser.caught.push(pokemon.number);
      axios({
        method: 'patch',
        url: `/apis/v1/activeuser/`,
        headers: {
          'X-CSRFToken': this.csrfToken,
        },
        data: {
          caught: this.activeUser.caught,
          pokemon: this.pokemon,
        },
      })
        .then((response) => {
          console.log(this.activeUser.caught);

          this.loadActiveUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    releasedPokemon: function (pokemon) {
      this.activeUser.caught.splice(
        this.activeUser.caught.indexOf(pokemon.number),
        1
      );
      axios({
        method: 'patch',
        url: `/apis/v1/activeuser/`,
        headers: {
          'X-CSRFToken': this.csrfToken,
        },
        data: {
          caught: this.activeUser.caught,
          pokemon: this.pokemon,
        },
      })
        .then((response) => {
          this.loadActiveUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    this.loadUsers();
    this.loadActiveUser();
    this.loadPokemon();
  },

  mounted() {
    this.csrfToken = document.querySelector(
      'input[name=csrfmiddlewaretoken]'
    ).value;
  },
});
