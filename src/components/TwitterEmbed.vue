<template>
  <div>
    <div v-html="formattedTweet"></div>
  </div>
</template>

<script>
export default {
  name: 'TwitterEmbed',
  props: {
    tweetContent: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    userLink: {
      type: String,
      required: true
    },
    tweetDate: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedTweet() {
      return `
        <blockquote class="twitter-tweet">
          <p lang="zh" dir="ltr">
            ${this.tweetContent}
          </p>
          &mdash; ${this.username}
          <a href="${this.userLink}">${this.tweetDate}</a>
        </blockquote>
      `;
    }
  },
  mounted() {
    this.loadTwitterScript();
  },
  methods: {
    loadTwitterScript() {
      if (window.twttr) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        script.setAttribute('charset', 'utf-8');
        document.head.appendChild(script);
      }
    }
  }
};
</script>
