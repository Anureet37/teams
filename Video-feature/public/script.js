const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true;
// const peers = {}
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
  })
var clicked = true;
const peers=[];
let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
  .then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream)
    peer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })
    socket.on('user-connected', (userId)=> {
        connectToNewUser(userId,stream)
      })
      socket.on('user-disconnected', userId => {
        if (peers[userId]) peers[userId].close()
      })
      
})
peer.on('call',call => {
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    }).then(stream=>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream)
        })
        
    })
    
})
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);
})
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})
const connectToNewUser=(userId,stream)=> {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
    peers[userId] = call
  }


const addVideoStream=(video, stream)=> {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    videoGrid.append(video)
    let total=document.getElementsByTagName("video").length;
    if(total>1){
      for(let index =0;index<total;index+=1)
      {
        document.getElementsByTagName("video")[index].style.width=100/total+"%";
      }
    }
  }
  
   let msg = $('input')
   $('html').keydown((e)=>{
       if(e.which==13&&msg.val().length!=0){
         console.log(msg.val());
           socket.emit('message',msg.val());
           msg.val('')
       }
   });
   socket.on('createMessage',message=>{
     console.log("received");
       $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`)
       scrollToBottom();
   })
   const scrollToBottom=()=>{
       let d=$(`.main__chat_window`);
       d.scrollTop(d.prop("scrollHeight"));
   }
   const muteUnmute = () => {
       console.log(myVideoStream.getAudioTracks()[0].enabled);
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  const leave=()=>{
    window.location.replace("http://chat-app-372.web.app");
  }
  const displayChat=()=>{
    $(".main__right").toggleClass("disp");
    if(clicked){
      $(document).ready(function(){
        $('.main__left').attr('style', 'flex: 1');
    });}
    else{
      $(document).ready(function(){
        $('.main__left').attr('style', 'flex: 1');
    });
    }
    clicked=!clicked;
   }
   const show=()=>{

     $("<div id='overlay' onclick='hide()'>"+
     "<input type='text' value='..' id='roomLink' readonly/>"+"<br><span onClick='copy()'> Copy </span></div >").css({
          "position": "fixed",
          "top": 0,
          "left": 0,
          "width": "100%",
          "height": "100%",
          "background-color": "rgba(0,0,0,.5)",
          "z-index": 100,
          "vertical-align": "middle",
          "text-align": "center",
          "color": "#fff",
          "padding":"20%",
          "font-size": "20px",
          "font-weight": "bold",
      }).appendTo("body");
      document.getElementById("roomLink").value=window.location.href;
   }
   const hide=()=>{
    $("#overlay").remove();
   }
   const copy=()=>{
     var text=document.getElementById("roomLink");
     text.select();
     text.setSelectionRange(0,9999999);
     document.execCommand("copy");
     alert("Copied:"+text.value);
     hide();
   }
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }