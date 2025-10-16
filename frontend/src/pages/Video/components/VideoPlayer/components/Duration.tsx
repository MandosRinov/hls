
import * as classes from "./../videoPlayer.module.css";

import {parseDurationToFormat} from "@utils/videoDurationParse";

function Duration({currentTime, totalDuration}: {currentTime: number; totalDuration: number}) {

    return (
        <div className={classes.controls__duration_info}>
            <span className={classes.duration_info}>{parseDurationToFormat(currentTime)} / {parseDurationToFormat(totalDuration)}</span>
        </div>
    )
}

export {Duration};

