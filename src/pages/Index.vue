<template>
  <q-page class="wrap">
    <h4>1. Start your Webcam</h4>
    <div class="videos">
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoplay playsinline></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoplay playsinline></video>
      </span>
    </div>
    <q-btn
      label="啟動網路攝影機"
      push
      color="blue-grey-9"
      :disable="showWebcamButton"
      @click="webcamButton"
    ></q-btn>
    <!-- <button id="webcamButton">啟動網路攝影機</button> -->
    <h4>2. Create a new Call</h4>
    <q-btn
      label="建立呼叫 (發送)"
      push
      color="blue-grey-9"
      :disable="showCallButton"
      @click="callButton"
    ></q-btn>
    <!-- <button id="callButton" disabled>建立呼叫 (發送)</button> -->

    <h4>3. Join a Call</h4>
    <!-- <input id="callInput" />
    <button id="answerButton" disabled>Answer</button> -->
    <div class="flex flex-center">
      <q-input
        filled
        dense
        v-model="callInput"
        label="從不同的瀏覽器窗口或設備接聽電話"
        style="width: 400px"
      >
        <template v-slot:after>
          <q-btn
            color="blue-grey-9"
            icon="send"
            :disable="showAnswerButton"
            @click="answerButton"
          />
        </template>
      </q-input>
    </div>

    <h4>4. Hangup</h4>

    <!-- <button id="hangupButton" disabled>掛斷</button> -->
    <q-btn label="掛斷" push color="blue-grey-9" :disable="showHangupButton"></q-btn>
  </q-page>
</template>

<script>
// server config
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"], // free stun server
    },
  ],
  iceCandidatePoolSize: 10,
};

// global states
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// const webcamButton = document.querySelector("#webcamButton");
// const webcamVideo = document.querySelector("#webcamVideo");
// const callButton = document.querySelector("#callButton");
// const callInput = document.querySelector("#callInput");
// const answerButton = document.querySelector("#answerButton");
// const remoteVideo = document.querySelector("#remoteVideo");
// const hangupButton = document.querySelector("#hangupButton");

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      callInput: null,
      showCallButton: true,
      showAnswerButton: true,
      showWebcamButton: false,
      showHangupButton: true,
    };
  },
  methods: {
    ...mapActions("admin/live", ["fetch"]),
    async webcamButton() {
      // setting local stream to the video from our camera
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // initalizing the remote server to the mediastream
      remoteStream = new MediaStream();

      // Pushing tracks from local stream to peerConnection
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      pc.ontrack = (event) => {
        event.streams[0].getTracks((track) => {
          remoteStream.addTrack(track);
        });
      };

      // displaying the video data from the stream to the webpage
      const webcamVideo = document.querySelector("#webcamVideo");
      remoteVideo = document.querySelector("#remoteVideo");
      webcamVideo.srcObject = localStream;
      remoteVideo.srcObject = remoteStream;

      // enabling and disabling interface based on the current condtion
      this.showCallButton = false;
      this.showAnswerButton = false;
      this.showWebcamButton = true;
    },
    async callButton() {
      // referencing firebase collections
      const callDoc = fireStore.collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidiates = callDoc.collection("answerCandidates");

      // setting the input value to the calldoc id
      this.callInput = callDoc.id;

      // get candidiates for caller and save to db
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      // create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      // config for offer
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      // listening to changes in fireStore and update the streams accordingly

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();

        if (!pc.currentRemoteDescription && data.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }

        // if answered add candidates to peer connection
        answerCandidiates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
            }
          });
        });
      });

      this.showHangupButton = false;
    },
    async answerButton() {
      const callId = this.callInput;

      // getting the data for this particular call
      const callDoc = fireStore.collection("calls").doc(callId);

      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      // here we listen to the changes and add it to the answerCandidates
      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      // setting the remote video with offerDescription
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      // setting the local video as the answer
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(new RTCSessionDescription(answerDescription));

      // answer config
      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.wrap {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 80px 10px;
}

video {
  width: 40vw;
  height: 30vw;
  margin: 2rem;
  background: rgb(44, 62, 80);
}

.videos {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
