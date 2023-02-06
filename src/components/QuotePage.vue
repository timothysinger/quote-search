  <template>
    <div class="RandomQuote">
      <h1>Timothy Singer's Quote Search</h1>
      <form class="searchbar">
        <button
          v-on:click.prevent="getRandom('')"
          type="submit"
          class=""
        >
          Get Random Quote
        </button>
        <input
          type="text"
          placeholder="Search for author"
          v-model="input"
          class="navbar-elem"
        />
        <button
          v-on:click.prevent="search(input)"
          type="submit"
          class="navbar-elem"
        >
          Search
        </button>
      </form>
      <div v-if="authorInfo">
        <p v-if="noSuchAuthor">No author found with search term '{{ searchTerm }}'.</p>
        <div v-else>
          <h2>{{ authorName }}</h2>
          <p>{{ bio }}</p>
          
          <button
            v-on:click.prevent="getRandom(authorSlug)"
            type="submit"
            >
            Get Quote
          </button>
          <p>{{ quote }}</p>
        </div>
      </div>
      <div v-else>
        <p>{{ quote }}</p>
        <p>{{ author }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "RandomQuote",
    data() {
      return {
        quote: "",
        authorName: "",
        input: "",
        searchTerm: "",
        bio: "",
        authorInfo: Boolean,
        authorSlug: "",
        noSuchAuthor: Boolean
      }
    },
    created() {
      this.random = false;
      this.authorInfo = false;
      this.noSuchAuthor = false;
    },
    methods: {
      getRandom() {
        if(this.authorSlug == "") {
          this.authorInfo = false;
        }
        axios
        .get("https://api.quotable.io/random?author=" + this.authorSlug)
        .then(response => response.data)
        .then(data => {
          this.quote = '"' + data.content + '"';
          this.author = "- " + data.author;
        });
      },
      search(searchTerm) {
        this.quote = "";
        this.authorName = "";
        this.random = false;
        this.authorInfo = true;
        this.bio = "";
        this.searchTerm = searchTerm;
        this.noSuchAuthor = false;
        axios
        .get("https://api.quotable.io/search/authors?query=" + searchTerm)
        .then(response => response.data)
        .then(data => data.results)
        .then(results =>  {
          if(results == "") {
            this.noSuchAuthor = true;
          } else {
            this.bio = results[0].bio;
            this.authorName = results[0].name;
            this.authorSlug = results[0].slug;
          }
        });
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .navbar {
    Text-align-last:justify
  }

  .navbar-elem {
    margin: 1em;
  }
  </style>