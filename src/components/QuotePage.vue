  <template>
    <div class="RandomQuote">
      <h1>Random Quote Fetcher</h1>
      <h2>By Timothy Singer</h2>
      <form class="navbar">
        <button
          v-on:click.prevent="getRandomQuote('')"
          type="submit"
          class="ui-elem btn random-btn"
        >
          Get Random Quote
        </button>
        <input
          type="text"
          placeholder="Search for author"
          v-model="input"
          class="ui-elem searchbar"
        />
        <button
          v-on:click.prevent="search(input)"
          type="submit"
          class="ui-elem btn"
        >
          Search
        </button>
      </form>
      <div v-if="authorInfo">
        <p v-if="noSuchAuthor">No author found with search term '{{ searchTerm }}'.</p>
        <div v-else>
          <h3>{{ authorName }}</h3>
          <p>{{ bio }}</p>
          
          <button
            v-on:click.prevent="getRandomQuote(authorSlug)"
            type="submit"
            class="ui-elem btn random-btn"
            >
            Get Quote
          </button>
          <p v-if="quote != ''">"{{ quote }}"</p>
        </div>
      </div>
      <div v-else>
        <div v-if="quote != ''">
          <p>"{{ quote }}"</p>
          <h3>- {{ authorName }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getRandom } from "./functions/functions";
  import { getAuthorBySlug } from "./functions/functions"

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
      this.authorInfo = false;
      this.noSuchAuthor = false;
    },
    methods: {
      getRandomQuote(author) {
        if(author == "") {
          this.authorInfo = false;
        }
        getRandom(author).then(data => {
          this.quote = data.content;
          this.authorName = data.author;
        });
      },
      resetFields() {
        this.quote = "";
        this.authorName = "";
        this.random = false;
        this.bio = "";
        this.noSuchAuthor = false;
      },
      search(searchTerm) {
        this.searchTerm = searchTerm;
        if(this.searchTerm != "") {
          this.authorInfo = true;
        }
        this.resetFields()
        getAuthorBySlug(searchTerm)
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

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 25px;
  }

  p {
    padding-right: 20%;
    padding-left: 20%;
    width: 60%;
  }
  .navbar {
    margin: 30px;
  }

  .searchbar {
    margin-right: 5px;
  }

  .ui-elem {
    padding: 12px 22px;
    border-radius: 20px;
    border-width: 1px;
    border: none;
  }

  .btn {
    background-color: #202020;
    color: #fff;
    font-weight: bold;
  }

  .random-btn {
    margin: 20px;
  }
  </style>