const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');
  const end = document.querySelector('.end');

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  //Get length of outline
  const outlineLength = outline.getTotalLength();
  //Duration

  let fakeDuration = 120;

  outline.style.strokeDasharray = outlineLength;  //間隔
  outline.style.strokeDashoffset = outlineLength; //しゅっぱつ地点



  //pick different sound
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      play.src = './svg/play.svg';
      song.pause();
      video.pause();
      song.currentTime = 0;
    });
  });

  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //select time
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {  //アローにしてたからダメだった
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = ('(fakeDuration / 60):(fakeDuration % 60)');
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
      song.currentTime = 0;
    });
  });

  //create a function specific to stop and play the sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  //We can animated the circle;
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elasped = fakeDuration - currentTime;
    let seconds = Math.floor(elasped % 60);
    let minutes = Math.floor(elasped / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg"
      end.play();
    }
  }


};

app();