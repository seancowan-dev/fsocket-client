import config from '../../../config';

class LocalHelpers {
    handleErrors(response) { // prepares error message for HTTP request errors
        if (response.ok === true) {
            return response.json();
        } 
        else {
            console.warn(`Code: ${response.status} Message: ${response.statusText}`);
        }
    }
    convertISOTime(timeCode) { // Converts ISO 8601 time codes to human friendly format

        function addZero(time) { // If the value of time is less than 10 then it needs a leading zero added
            let zeroTime = 0
            if (time < 10) {
                return zeroTime + time;
            } else return time
        }
    
        let hourIndex, minuteIndex, secondIndex = 0; // start on 0 for all times
        let time = ''; // instantiate output string
    
        if (timeCode.includes("H")) { // If the time code includes hours
            hourIndex = timeCode.indexOf("H"); // find the index in the string where hours appear
            let h = timeCode.slice(0, hourIndex).replace(/\D/g, ''); // Slice the digits out, and then replace them with nothing
            h = addZero(h); // Add zeros as needed
            time += h + ':'; // Append hours to the output time
        }
    
        if (timeCode.includes("M")) { // If the time code includes minutes
            minuteIndex = timeCode.indexOf("M");  // Find the index in the string where minutes appear
            let m = timeCode.slice(hourIndex, minuteIndex).replace(/\D/g, ''); // Slice the digits out, and then replace them with nothing
            m = addZero(m); // Add zeros as needed
            time += m + ':'; // Append minutes to the output time
        }
    
        if (timeCode.includes("S")) { // If the time code includes seconds
            secondIndex = timeCode.indexOf("S"); // Find the index in the string where seconds appear
            let s = timeCode.slice(minuteIndex, secondIndex).replace(/\D/g, ''); // Slice the digits out, and then replace them with nothing
            s = addZero(s); // Add zeros as needed
            time += s; // Append seconds to the output time
        }
        else { // If there are no seconds then that means the video end on a precise minute with 00 seconds, so add double zeros
            time += '00';
        }
    
        return time;
    }
    isVideoPlaying(listCode, playingCode) { // Compare the list code and the currently playing video code
        if (listCode === playingCode) { // If the match the video is playing
            return '\u2714';
        } else {
            return '\u2718'; // Otherwise the video is not playing
        }
    }
}

export default new LocalHelpers();