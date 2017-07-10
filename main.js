 var songNumber = 1;
 var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon

var songs = [
  {
    'name': 'Aashiq Surrender',
    'artist': 'Shreya Ghoshal, Ammal Malik',
    'album': 'Badrinath ki Dulhania',
    'duration': '4:10',
    'fileName': 'song4.mp3',
    'image' : 'song1.jpg'
  },

{
  'name': 'Badri Ki Dulhania (Title Track)',
  'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
  'album': 'Badrinath ki Dulhania',
  'duration': '3:26',
  'fileName': 'song1.mp3',
  'image' : 'song1.jpg'

},
{
  'name': 'Ding Dang',
  'artist': 'Antara Mitra, Amit Mishra',
  'album': 'Munna Michael',
  'duration': '3:22',
  'fileName': 'song3.mp3',
  'image' : 'song3.jpg'
},
{
  'name': 'Gulabi 2.0',
  'artist': 'Tulsi Kumar, Amaal Malik, Yash Narvekar',
  'album': 'Noor',
  'duration': '3:32',
  'fileName': 'song5.mp3',
  'image' : 'song5.jpg'
},
{
  'name': 'Radio',
  'artist': 'Amit Mishra, Pritam Chakraborty, Kamaal Khan',
  'album': 'Tubelight',
  'duration': '4:39',
  'fileName': 'song2.mp3',
  'image' : 'song2.jpg'
},
]


$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});

$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
 });

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

// $('audio').on('ended',function() {
//     var audio = document.querySelector('audio');
//     if(currentSongNumber < 5) {
//         var nextSongObj = songs[currentSongNumber];
//        audio.src = nextSongObj.fileName; // Change Soure
//         toggleSong(); // Play Next Song
//         changeCurrentSongDetails(nextSongObj); // Update Image
//         currentSongNumber = currentSongNumber + 1; // Change State
//     }
//     else if(willLoop == 1) {
//         var nextSongObj = songs[0];
//         audio.src = nextSongObj.fileName;
//         toggleSong();
//         changeCurrentSongDetails(nextSongObj);
//         currentSongNumber =  1;
//     }
//     else {
//         $('.play-icon').removeClass('fa-pause').addClass('fa-play');
//         audio.currentTime = 0;
//     }
// })

$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,5,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 5) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})


// Code for the 'Next' button.
$('.fa-step-forward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber < songs.length) {
    currentSongNumber++;
    var nextSongObj = songs[currentSongNumber - 1];
    audio.src = nextSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(nextSongObj);
  }
  else {
    currentSongNumber = 1;
    audio.src = songs[0].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[0]);
  }
});

// Code for the 'Previous' button.
$('.fa-step-backward').on('click', function() {
  var audio = document.querySelector('audio');
  if(currentSongNumber >= 1) {
    currentSongNumber--;
    var prevSongObj = songs[currentSongNumber - 1];
    audio.src = prevSongObj.fileName;
    toggleSong();
    changeCurrentSongDetails(prevSongObj);
  }
  else {
    currentSongNumber = songs.length;
    audio.src = songs[currentSongNumber - 1].fileName;
    toggleSong();
    changeCurrentSongDetails(songs[currentSongNumber - 1]);
  }
});



//update progress bar
$('audio').on('timeupdate', function() {
  var audio = document.querySelector('audio');
  $('.progress-filled').stop().animate({'width': (audio.currentTime) / audio.duration * 100 + '%'}, 250, 'linear');
});

// The 'scrub' function: it updates the current time whenever the user clicks
// anywhere on the progress bar.
$('.player-progress').on('click', function(event) {
  var audio = document.querySelector('audio');
  var progress = document.querySelector('.player-progress');

  var scrubTime = (event.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
});


    function toggleSong() {
    var song = document.querySelector('audio');
    if(song.paused == true) {
    console.log('Playing');
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    song.play();
    }
    else {
    console.log('Pausing');
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
    song.pause();
    }
    }

    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });

    $('.play-icon').on('click', function() {
        toggleSong();
    });

    // $('body').on('keypress', function(event) {
    //     if (event.keyCode == 32) {
    //         toggleSong()
    //     }
    // });

    $('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
    });


    // function addSongNameClickEvent(songName,position) {
    //   var id = "#song" + position;
    // $(id).click(function() {
    // var audio = document.querySelector('audio');
    // var currentSong = audio.src;
    // if(currentSong.search(songName) != -1)
    // {
    // toggleSong();
    // }
    // else {
    // audio.src = songName;
    // toggleSong();
    // }
    // });
    // }

    function addSongNameClickEvent(songObj,position) {
      var songName = songObj.fileName;
       var id = "#song" + position;
     $(id).click(function() {
     var audio = document.querySelector('audio');
     var currentSong = audio.src;
     if(songNumber !== position)
     {
        audio.src = songName;
        songNumber = position;
         changeCurrentSongDetails(songObj); // Function Call
     }
      toggleSong();
     });
     }


    function fancyTimeFormat(time)
    {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    function updateCurrentTime() {
      var song = document.querySelector('audio');
      var currentTime = Math.floor(song.currentTime);
      currentTime = fancyTimeFormat(currentTime);
      var duration = Math.floor(song.duration);
      duration = fancyTimeFormat(duration)
      $('.time-elapsed').text(currentTime);
      $('.song-duration').text(duration);
    }

    function changeCurrentSongDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image)
        $('.current-song-name').text(songObj.name)
        $('.current-song-album').text(songObj.album)
    }



    window.onload = function() {



      updateCurrentTime();
      setInterval(function() {
      updateCurrentTime();
      },1000);
      // var songName1 = 'L';
      // var songName2 = 'L';
      // var songName3 = 'L';
      // var songName4 = 'L';
      // var songName5 = 'L';
      // var songList = ['Badri Ki Dulhania (Title Track)',
      // 'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song', 'gulabi'];
      //
      // var artistList = ['Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi','dsfg','dsfsdg'];
      // var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil','sgaeg'];
      // var durationList = ['2:56','3:15','2:34','2:29','2:66'];









    changeCurrentSongDetails(songs[0]);
      // $('#song1 .song-name').text(songList[0]);
      // $('#song2 .song-name').text(songList[1]);
      // $('#song3 .song-name').text(songList[2]);
      // $('#song4 .song-name').text(songList[3]);
      // $('#song1 .song-artist').text(artistList[0]);
      // $('#song2 .song-artist').text(artistList[1]);
      // $('#song3 .song-artist').text(artistList[2]);
      // $('#song4 .song-artist').text(artistList[3]);
      for(var i =0; i < songs.length;i++) {
      var obj = songs[i];
      var name = '#song' + (i+1);
      var song = $(name);
      song.find('.song-name').text(obj.name);
      song.find('.song-artist').text(obj.artist);
      song.find('.song-album').text(obj.album);
      song.find('.song-length').text(obj.duration);
      addSongNameClickEvent(obj,i+1)
      }

      $('#songs').DataTable({
      paging: false
    });


    //   var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3', 'song5.mp3'];
    //
    //   // addSongNameClickEvent(fileNames[0],1);
    //   // addSongNameClickEvent(fileNames[1],2);
    //   // addSongNameClickEvent(fileNames[2],3);
    //   // addSongNameClickEvent(fileNames[3],4);
    //   // addSongNameClickEvent(fileNames[4],5);
    //
    //   for (var i = 0; i < fileNames.length ; i++) {
    //   addSongNameClickEvent(fileNames[i],i+1)
    // }


    }

    // $('#song1').click(function() {
    // var audio = document.querySelector('audio');
    // audio.src = fileNames[0];
    // // audio.play();
    // toggleSong();
    // });
