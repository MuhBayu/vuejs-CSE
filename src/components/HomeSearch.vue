<template>
  <div class="container">
    <h3>{{ msg }}</h3>
    <section class="my-5 row justify-content-center">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input type="text" v-model="q" class="form-control" placeholder="Kata kunci..." aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-success" type="button" v-on:click="doSearch()">Cari</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Search result -->
    <section class="row mb-5" v-if="searchResult != null">
        <post-card
        	v-for="(post, key, index) in searchResult.items"  
            v-bind:post="post" v-bind:key="post.title">
        </post-card>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.component('post-card', {
   props: ['post'],
   template: '<div class="col-md-6 col-lg-4 mb-4 d-flex">' +
               '<div class="card card-shadow">' +
                  '<a :href="post.link"' + '<img class="card-img-top" :src="post.pagemap.cse_thumbnail[0].src"/>'+'</a> <pre>{{ post.metatags }}</pre>' +
                     '<div class="card-body">'+
                        '<h5 class="card-title">'+
                           '<a class="text-dark" :href="post.link">{{ post.title }} </a>' +
                        '</h5>' +
                     '</div>' +
               '</div>' +
            '</div>'
})

export default {
	name: 'HomeSearch',
	data () {
		return {
			msg: 'Vuejs Custom Search Engine',
			q: '',
			searchResult: null,
			api_key: 'YOUR_API_KEY',
			cse_id: 'YOUR_CSE_ID'
		}
	},
	created: function () {
		// _.debounce is a function provided by lodash to limit how
		// often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
		this.debouncedDoSearch = _.debounce(this.doSearch, 500);
		this.q = this.$route.query.q;
	},
    watch: {
        q: function () {
            this.debouncedDoSearch()
        }
    },
	methods: {
		doSearch: function () {
			var app = this
			if (app.q != undefined && app.q != '') {
				axios.get(`https://www.googleapis.com/customsearch/v1?key=${app.api_key}&cx=${app.cse_id}&q=${app.q}`)
					.then(function (response) {
						app.searchResult = response.data;
						//console.log(app.searchResult);
					})
					.catch(function (error) {
						console.log(error);
					})
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-success {
	background: #41b883
}
</style>
