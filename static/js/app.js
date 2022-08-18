Vue.component('pokemon-card', {
  delimiters: ['[[', ']]'],
  props: ['pokemon'],
  template: `
        <div class="card mt-2 mx-1 rounded border border-info" style="width: 18rem;">
            <div class="card-header container-fluid">
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
            <div class="card-footer btn-group d-flex justify-content-around" style="width: 18rem;">
                <a href="#" class="btn btn-outline-success btn-sm btn-block float-start mr-1 w-100">
                    catch<br>[[pokemon.name]]
                </a>
                <a href="#" class="btn btn-outline-warning btn-sm float-none mx-1 w-100">edit<br>[[pokemon.name]]</a>
                <a href="#" class="btn btn-outline-danger btn-sm btn-block ml-1 w-100">release<br>[[pokemon.name]]</a>
            </div>
        </div>
    `,
});

const vm = new Vue ({
    el: '#app',
    delimiters:['[[',']]'],
    data: {
        pokemon_list: [],
        csrfToken: "",
        users: [],
        type: []
    },
    methods: {
        loadPokemon: function(){
            console.log('loading')
            axios({
                method: 'get',
                url: '/apis/v1/pokemon/',
            }).then((response) => {
                console.log(response.data)
                this.pokemon_list = response.data
            })
        },
    },
    created: function () {
        this.loadPokemon()
    },
    mounted() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    },
})