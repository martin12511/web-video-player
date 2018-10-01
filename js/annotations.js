videos = [{
            "name": "Beach",
            "url": "https://storage.googleapis.com/coverr-main/mp4/Candolim-Beach.mp4",
            "notes": 
            {
                "1": "Hello",
                "4": "This",
                "5": "Is",
                "10": "an",
                "14": "annotation"
            }
        },

        {
            "name": "Donuts",
            "url": "https://storage.googleapis.com/coverr-main/mp4/Yummmyy.mp4",
            "notes": 
            {
                "2": "This",
                "3": "Is",
                "7": "Also",
                "8": "Some",
                "10": "annotation!"
            }
        },

        {
            "name": "flowers",
            "url": "https://staging.coverr.co/s3/mp4/Skate-park.mp4",
            "notes": 
            {
                "2": "This",
                "3": "Is",
                "7": "the",
                "8": "3rd",
                "10": "annotation..."
            }
        }]


annotation_id=0
note_time = Object.keys(videos[1].notes)
note_content = Object.values(videos[1].notes)

// var timer=0

// timer++;


var vid = document.getElementById("video-main");

// Assign an ontimeupdate event to the <video> element, and execute a function if the current playback position has changed
vid.ontimeupdate = function() {updateNotes()};

function updateNotes() {
    timer = parseInt(vid.currentTime)
    for(i=0;i<note_time.length-1;i++){
		counter=i;
		//console.log(timer + " range: " + note_time[i] + " and " + note_time[i+1])
	    if(checkRange(timer,note_time[i],note_time[i+1])){
	        //console.log("True\n");
	        annotation_id=counter;
	        document.getElementById("current-time").innerHTML = note_content[annotation_id];
	    }
	    else{
	    	document.getElementById("notes").innerHTML = timer;
	    }
	    annotation_id=counter
	}
}

function checkRange(x,min,max){
    return x >= min && x < max;
}