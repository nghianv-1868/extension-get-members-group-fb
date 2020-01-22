<template>
  <div class="extension">
    <div class="header">
      <h2>Get Members Groups Facebook</h2>
    </div>
    <div class="container">
      <div v-if="urlTrue">
        <h2>Do you want to get the entire member list of this group?</h2>
        <button @click="getLinks">Get Links Profile</button>
      </div>
      <div v-if="!urlTrue">
        <h2>You need to access the group that you have joined in order for the tool to work!</h2>
      </div>
    </div>
  </div>
</template>

<script>
const browser = require("webextension-polyfill");
export default {
  data() {
    return {
      keyword: "",
      urlTrue: false
    };
  },
  mounted() {
    var self = this;
    window.addEventListener("DOMContentLoaded", function() {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          var url = tabs[0].url;
          var checkUrlFb = /https:\/\/www.facebook.com\/groups\/*/;
          if (checkUrlFb.test(url)) {
            self.urlTrue = true;
          }
        }
      );
    });
  },
  methods: {
    setDOMInfo(res) {},
    getLinks() {
      var self = this;
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { get: true }, self.setDOMInfo);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #fff;
  font-family: sans-serif;
  font-size: 0.8rem;
  min-width: 30rem;
}

.header {
  align-items: center;
  height: 4rem;
  display: flex;
  background: #4266b1;
  div {
    text-align: center;
  }
  h2 {
    width: 100%;
    text-align: center;
    color: #fff;
  }
}

.container {
  min-height: 5rem;
  padding: 1.5rem;
}

p {
  font-size: 16px;
}

.extension {
  min-width: 300px;
  text-align: center;
}
</style>
