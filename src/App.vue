<template lang='pug' >
  #app
    img(src='./assets/logo.png')
    h1 {{ msg }}
    select(v-model='selectedCountry' )
      option(v-for='country in countries' v-bind:value='country.value') {{ country.name }}
    spinner(v-show='busy')
    ul
      artist(v-for="artist in artists", :artist='artist' v-bind:key='artist.mbid')

    ul
      li
        a(href='https://vuejs.org', target='_blank') Core Docs
      li
        a(href='https://forum.vuejs.org', target='_blank') Forum
      li
        a(href='https://chat.vuejs.org', target='_blank') Community Chat
      li
        a(href='https://twitter.com/vuejs', target='_blank') Twitter
    h2 Ecosystem
    ul
      li
        a(href='http://router.vuejs.org/', target='_blank') vue-router
      li
        a(href='http://vuex.vuejs.org/', target='_blank') vuex
      li
        a(href='http://vue-loader.vuejs.org/', target='_blank') vue-loader
      li
        a(href='https://github.com/vuejs/awesome-vue', target='_blank') awesome-vue

</template>

<script>
import artist from "./components/Artist";
import spinner from "./components/spinner";
import getArtists from "./api/index";
export default {
  name: 'app',
  data () {
    return {
      busy: false,
      msg: 'Welcome to MusicApp',
      artists: [],
      countries: [
        {
          name: 'México',
          value: 'mexico'
        },
        {
          name: 'Alemania',
          value: 'germany'
        },
        {
          name: 'España',
          value: 'spain'
        }
      ],
      selectedCountry: 'mexico'
    }
  },
  components: {
    artist: artist,
    spinner: spinner
  },
  methods:{
    setArtistsList () {
      this.busy = true;
      this.artist = [];
      const self = this;
      getArtists(this.selectedCountry)
        .then( function (artists) {
          self.artists = artists;
          self.busy = false;
        } );
    }
  },
  mounted: function () {
    this.setArtistsList();
  },
  watch: {
    selectedCountry: function () {
      this.setArtistsList();
    }
  }
}
</script>

<style lang='stylus' >

#app 
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
h1, h2 
	font-weight normal
ul 
	list-style-type none
	padding 0
li 
	display inline-block
	margin 0 10px
a 
	color #42b983

</style>
