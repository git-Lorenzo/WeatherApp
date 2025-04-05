export const meteoIconMap: Map<number, string> = new Map()
export const meteoIconNightMap: Map<number, string> = new Map()

function setMap(weatherCode: number[], png: string){
    weatherCode.forEach(code => {
        meteoIconMap.set(code, png)
    });
}

setMap([0,1], 'sun')
setMap([2], 'cloudy')
setMap([3], 'overcast')
setMap([45,48], 'day_fog')
setMap([51, 53, 55, 56, 57], 'light_rain')
setMap([61, 63, 65, 66, 67, 80, 81, 82], 'heavy_rain')
setMap([71, 73, 75, 77, 85, 86], 'snow')
setMap([95, 96, 99], 'tempest')


function setNightMap(weatherCode: number[], png: string){
    weatherCode.forEach(code => {
        meteoIconNightMap.set(code, png)
    });
}

setNightMap([0,1], 'moon')
setNightMap([2], 'cloudy')
setNightMap([3], 'overcast')
setNightMap([45,48], 'night_fog')
setNightMap([51, 53, 55, 56, 57], 'light_rain')
setNightMap([61, 63, 65, 66, 67, 80, 81, 82], 'heavy_rain')
setNightMap([71, 73, 75, 77, 85, 86], 'snow')
setNightMap([95, 96, 99], 'tempest')