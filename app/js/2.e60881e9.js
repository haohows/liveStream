(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0565":function(e,t,n){"use strict";n("16f0")},"16f0":function(e,t,n){},"8b24":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{staticClass:"wrap"},[n("h4",[e._v("1. Start your Webcam")]),n("div",{staticClass:"videos"},[n("span",[n("h3",[e._v("Local Stream")]),n("video",{attrs:{id:"webcamVideo",autoplay:"",playsinline:""}})]),n("span",[n("h3",[e._v("Remote Stream")]),n("video",{attrs:{id:"remoteVideo",autoplay:"",playsinline:""}})])]),n("q-btn",{attrs:{label:"啟動網路攝影機",push:"",color:"blue-grey-9",disable:e.showWebcamButton},on:{click:e.webcamButton}}),n("h4",[e._v("2. Create a new Call")]),n("q-btn",{attrs:{label:"建立呼叫 (發送)",push:"",color:"blue-grey-9",disable:e.showCallButton},on:{click:e.callButton}}),n("h4",[e._v("3. Join a Call")]),n("div",{staticClass:"flex flex-center"},[n("q-input",{staticStyle:{width:"400px"},attrs:{filled:"",dense:"",label:"從不同的瀏覽器窗口或設備接聽電話",readonly:""},scopedSlots:e._u([{key:"after",fn:function(){return[n("q-btn",{attrs:{color:"blue-grey-9",icon:"send",disable:e.showAnswerButton},on:{click:e.answerButton}})]},proxy:!0}]),model:{value:e.callInput,callback:function(t){e.callInput=t},expression:"callInput"}})],1),n("h4",[e._v("4. Hangup")]),n("q-btn",{attrs:{label:"掛斷",push:"",color:"blue-grey-9",disable:e.showHangupButton}})],1)},o=[],r=n("c973"),c=n.n(r),s=n("ded3"),i=n.n(s),u=(n("96cf"),n("d3b7"),n("159b"),n("bf19"),n("2f62")),l={iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10},d=new RTCPeerConnection(l),p=null,f=null,w={name:"Index",data:function(){return{callInput:null,showCallButton:!0,showAnswerButton:!0,showWebcamButton:!1,showHangupButton:!0}},methods:i()(i()({},Object(u["b"])("admin/live",["fetch"])),{},{webcamButton:function(){var e=this;return c()(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 2:p=t.sent,f=new MediaStream,p.getTracks().forEach((function(e){d.addTrack(e,p)})),d.ontrack=function(e){e.streams[0].getTracks((function(e){f.addTrack(e)}))},n=document.querySelector("#webcamVideo"),remoteVideo=document.querySelector("#remoteVideo"),n.srcObject=p,remoteVideo.srcObject=f,e.showCallButton=!1,e.showAnswerButton=!1,e.showWebcamButton=!0;case 13:case"end":return t.stop()}}),t)})))()},callButton:function(){var e=this;return c()(regeneratorRuntime.mark((function t(){var n,a,o,r,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=fireStore.collection("calls").doc(),a=n.collection("offerCandidates"),o=n.collection("answerCandidates"),e.callInput=n.id,d.onicecandidate=function(e){e.candidate&&a.add(e.candidate.toJSON())},t.next=7,d.createOffer();case 7:return r=t.sent,t.next=10,d.setLocalDescription(r);case 10:return c={sdp:r.sdp,type:r.type},t.next=13,n.set({offer:c});case 13:n.onSnapshot((function(e){var t=e.data();if(!d.currentRemoteDescription&&t.answer){var n=new RTCSessionDescription(t.answer);d.setRemoteDescription(n)}o.onSnapshot((function(e){e.docChanges().forEach((function(e){if("added"===e.type){var t=new RTCIceCandidate(e.doc.data());d.addIceCandidate(t)}}))}))})),e.showHangupButton=!1;case 15:case"end":return t.stop()}}),t)})))()},answerButton:function(){var e=this;return c()(regeneratorRuntime.mark((function t(){var n,a,o,r,c,s,i,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.callInput,a=fireStore.collection("calls").doc(n),o=a.collection("answerCandidates"),r=a.collection("offerCandidates"),d.onicecandidate=function(e){e.candidate&&o.add(e.candidate.toJSON())},t.next=7,a.get();case 7:return c=t.sent.data(),s=c.offer,t.next=11,d.setRemoteDescription(new RTCSessionDescription(s));case 11:return t.next=13,d.createAnswer();case 13:return i=t.sent,t.next=16,d.setLocalDescription(new RTCSessionDescription(i));case 16:return u={type:i.type,sdp:i.sdp},t.next=19,a.update({answer:u});case 19:r.onSnapshot((function(e){e.docChanges().forEach((function(e){if("added"===e.type){var t=e.doc.data();d.addIceCandidate(new RTCIceCandidate(t))}}))}));case 20:case"end":return t.stop()}}),t)})))()}}),mounted:function(){}},h=w,m=(n("0565"),n("2877")),b=n("9989"),v=n("9c40"),g=n("27f9"),C=n("eebe"),y=n.n(C),S=Object(m["a"])(h,a,o,!1,null,null,null);t["default"]=S.exports;y()(S,"components",{QPage:b["a"],QBtn:v["a"],QInput:g["a"]})}}]);