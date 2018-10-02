// videos = [{
//             "name": "Beach",
//             "url": "https://storage.googleapis.com/coverr-main/mp4/Candolim-Beach.mp4",
//             "notes": 
//             {
//                 "1": "Hello",
//                 "4": "This",
//                 "5": "Is",
//                 "10": "an",
//                 "14": "annotation"
//             }
//         },

//         {
//             "name": "Donuts",
//             "url": "https://storage.googleapis.com/coverr-main/mp4/Yummmyy.mp4",
//             "notes": 
//             {
//                 "2": "This",
//                 "3": "Is",
//                 "7": "Also",
//                 "8": "Some",
//                 "10": "annotation!"
//             }
//         },

//         {
//             "name": "flowers",
//             "url": "https://staging.coverr.co/s3/mp4/Skate-park.mp4",
//             "notes": 
//             {
//                 "2": "This",
//                 "3": "Is",
//                 "7": "the",
//                 "8": "3rd",
//                 "10": "annotation..."
//             }
//         }]

current_selected_video = 0;
note_id=0;
var video_data_request = new XMLHttpRequest();

video_data_request.open('GET','data/videos.json');
video_data_request.onload = function(){
    video_data=JSON.parse(video_data_request.responseText);
    videos = video_data;
    note_time = Object.keys(videos[current_selected_video].notes);
    note_content = Object.values(videos[current_selected_video].notes);

    setFirstVideo(videos[current_selected_video].url);

    showVideoList(videos)

}
video_data_request.send();



var vid = document.getElementById("video-main");
vid.ontimeupdate = function() { updateNotes() };


function setFirstVideo(video_url) {
    var new_video = document.getElementById('video-main');
    new_video.src = video_url;
    new_video.load();
}


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


function showVideoList(videos_json){
    list_buffer=""
    console.log(videos_json)
    for(i=0;i<videos_json.length;i++){
        console.log(videos_json.name)
        list_buffer+="<li><a href=\"#\" onClick=\"javascript:swapVideo(\'" + videos_json[i].url + "\'\," + i + ")\; return false\;\">" + videos_json[i].name + "</a></li>";
    }
    document.getElementById("video-list").innerHTML = list_buffer
}

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

function checkRange(x,min,max){
    return x >= min && x < max;
}