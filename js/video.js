// Start with the first video
current_selected_video = 0;
// Start notes on the first note
note_id = 0;

// Create new AJAX requet
var video_data_request = new XMLHttpRequest();
video_data_request.open('GET','data/videos.json');

// Once we get the JSON, parse it and send values to functions
video_data_request.onload = function(){
    video_data=JSON.parse(video_data_request.responseText);
    videos = video_data;
    note_time = Object.keys(videos[current_selected_video].notes);
    note_content = Object.values(videos[current_selected_video].notes);

    setFirstVideo(videos[current_selected_video].url);
    showVideoList(videos)

}

//Send the AJAX request
video_data_request.send();

// Run a function everytime the play position changes
var vid = document.getElementById("video-main");
vid.ontimeupdate = function() { updateNotes() };


// Initiate video player with the first video url
function setFirstVideo(video_url) {
    var new_video = document.getElementById('video-main');
    new_video.src = video_url;
    new_video.load();
}

// Change the notes based on video position
function updateNotes() {
    timer = parseInt(vid.currentTime)
    for(i=0;i<note_time.length-1;i++){
		counter=i;
		//console.log(timer + " range: " + note_time[i] + " and " + note_time[i+1])
	    if(checkRange(timer,note_time[i],note_time[i+1])){
	        //console.log("True\n");
	        note_id=counter;
	        document.getElementById("notes").innerHTML = note_content[note_id];
	    }
	    else{
	    	document.getElementById("current-time").innerHTML = timer;
	    }
	    note_id=counter
	}
}

// Create lists based on video metadata. Allow the users to swap between videos
function showVideoList(videos_json){
    list_buffer=""
    list_buffer+="<ul>";
    console.log(videos_json)
    for(i=0;i<videos_json.length;i++){
        console.log(videos_json.name)
        list_buffer+="<li>";
        list_buffer+="<a href=\"#\" onClick=\"javascript:swapVideo(\'" + videos_json[i].url + "\'\," + i + ")\; return false\;\">" + videos_json[i].name + "</a>";
        list_buffer+="<ul>";
        list_buffer+="<li>" + videos_json[i].description + "</li>";
        list_buffer+="</ul>";
        list_buffer+="</li>";
    }
    list_buffer+="</ul>";
    document.getElementById("video-list").innerHTML = list_buffer
}

// Change the video
function swapVideo(videoURL,videoIndex) {
  current_selected_video=videoIndex
  console.log(current_selected_video);
  note_time = Object.keys(videos[current_selected_video].notes);
  note_content = Object.values(videos[current_selected_video].notes);

  var new_video = document.getElementById('video-main');
  new_video.src = videoURL;
  new_video.load();
  new_video.play();

  updateNotes(current_selected_video)
}

// Checks if an integer is in a certain range
function checkRange(x,min,max){
    return x >= min && x < max;
}