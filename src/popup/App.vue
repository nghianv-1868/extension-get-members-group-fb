<template>
  <div class="extension">
    <div class="header">
      <h2>Get Members Groups Facebook</h2>
    </div>
    <div class="container">
      <div v-if="urlTrue">
        <h2>Do you want to get the entire member list of this group?</h2>
        <button class="c-smileyButton" @click="getLinks" v-if="!processing">
          <span class="c-smileyButton__face"></span>
          &nbsp;Get Profiles
        </button>
        <div class="load-9" v-if="processing">
          <p>Processing</p>
          <div class="spinner">
            <div class="bubble-1"></div>
            <div class="bubble-2"></div>
          </div>
        </div>
      </div>
      <div v-if="!urlTrue">
        <h2>
          You need to access the group that you have joined in order for the
          tool to work!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
const browser = require("webextension-polyfill");
import XLSX from "xlsx";
export default {
  data() {
    return {
      keyword: "",
      urlTrue: false,
      trigger: false,
      processing: false
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

    chrome.runtime.onMessage.addListener(function(
      message,
      sender,
      sendResponse
    ) {
      if (message.msg === "getStatusTrigger") {
        sendResponse({
          data: self.trigger
        });
      }

      if (message.msg === "arrayProfile") {
        var ws = XLSX.utils.json_to_sheet(message.data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "link");
        XLSX.writeFile(wb, "linksProfile.xlsx");
        self.processing = false;
        sendResponse({
          received: true
        });
      }
    });
  },
  methods: {
    setDOMInfo(res) {
      console.log("setDOMInfo", res);
    },
    getLinks() {
      var self = this;
      this.trigger = true;
      this.processing = true;
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { trigger: true },
            self.setDOMInfo
          );
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
$debug: false;

$black: #000000;
$half-spanish-white: #fef2dc;
$perfume: #e0acf7;
$red: #ff0000;
$white: #ffffff;

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

// Css button
.c-smileyButton {
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: $white;

  border: 0;
  outline: 0;

  align-items: center;
  justify-content: center;

  position: relative;
  height: 2.5em;
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
  box-sizing: border-box;
  background-color: $perfume;
  box-shadow: 0 0.15em 1em rgba($black, 0.2);
  z-index: 1;

  &:hover .c-smileyButton__face::before {
    content: "\1F618";
    animation: animate 1.05s infinite;
  }

  // cursor fix
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
}

.c-smileyButton__face::before {
  content: "\1F614";
}

.c-smileyButton__hoverListener {
  position: absolute;
  cursor: default;
  z-index: -1;

  @if $debug {
    background-color: rgba($red, 0.2);
  }

  &:hover ~ .c-smileyButton__face::before {
    animation: none;
  }

  &:nth-child(1) {
    width: 290%;
    height: 550%;

    &:hover ~ .c-smileyButton__face::before {
      content: "\1F60C";
    }
  }

  &:nth-child(2) {
    width: 190%;
    height: 330%;

    &:hover ~ .c-smileyButton__face::before {
      content: "\1F61A";
    }
  }
}

@keyframes animate {
  100% {
    content: "\1F60A";
  }
}

// css loading
.load-wrapp p {
  padding: 0 0 20px;
}
.load-wrapp:last-child {
  margin-right: 0;
}

.l-9 {
  animation-delay: 1.44s;
}

.load-9 .spinner {
  animation: loadingI 2s linear infinite;
}
.load-9 .bubble-1,
.load-9 .bubble-2 {
  animation: bounce 2s ease-in-out infinite;
}
.load-9 .bubble-2 {
  animation-delay: -1s;
}

.spinner {
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0 auto;
}

.bubble-1,
.bubble-2 {
  position: absolute;
  top: 0;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #4b9cdb;
}

.bubble-2 {
  top: auto;
  bottom: 0;
}

.load-9 .spinner {
  animation: loadingI 2s linear infinite;
}
.load-9 .bubble-1,
.load-9 .bubble-2 {
  animation: bounce 2s ease-in-out infinite;
}
.load-9 .bubble-2 {
  animation-delay: -1s;
}

.load-9 p {
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #4b9cdb;
}

@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
