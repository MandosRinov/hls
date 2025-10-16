function parseDurationToFormat (durationSeconds: number): string  {

    const listOfDurations : string[] = [];

    const days = Math.floor(durationSeconds / (3600*24)).toString()
    const hours= Math.floor(durationSeconds % (3600*24) / 3600).toString()
    const minutes= Math.floor(durationSeconds % 3600 / 60).toString()
    const seconds= Math.floor(durationSeconds % 60).toString()

    if (parseInt(days) > 0) {
        listOfDurations.push(days.padStart(2, "0"))
    }
    if (parseInt(hours) > 0 || parseInt(days) > 0) {
        listOfDurations.push(hours.padStart(2, "0"))
    }

    listOfDurations.push(minutes.padStart(2, "0"),
        seconds.padStart(2, "0"))

    return listOfDurations.join(":")
}


export {
    parseDurationToFormat
}