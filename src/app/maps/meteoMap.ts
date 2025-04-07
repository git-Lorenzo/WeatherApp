export const meteoIconMap: Map<number, string> = new Map()
export const meteoIconNightMap: Map<number, string> = new Map()
export const meteoBackgroundMap: Map<number, string> = new Map()
export const meteoNightBackgroundMap: Map<number, string> = new Map()

function setMap(weatherCode: number[], png: string){
    weatherCode.forEach(code => {
        meteoIconMap.set(code, png)
    });
}

setMap([0,1], 'sun')
setMap([2], 'cloudy')
setMap([3], 'overcast')
setMap([45,48], 'fog')
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
setNightMap([45,48], 'fog')
setNightMap([51, 53, 55, 56, 57], 'light_rain')
setNightMap([61, 63, 65, 66, 67, 80, 81, 82], 'heavy_rain')
setNightMap([71, 73, 75, 77, 85, 86], 'snow')
setNightMap([95, 96, 99], 'tempest')



function setBackgroundMap(weatherCode: number[], png: string){
    weatherCode.forEach(code => {
        meteoBackgroundMap.set(code, png)
    });
}

setBackgroundMap([0,1], 'day_sun')
setBackgroundMap([2], 'day_cloud')
setBackgroundMap([3], 'day_overcast')
setBackgroundMap([45,48], 'day_fog')
setBackgroundMap([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'day_rain')
setBackgroundMap([71, 73, 75, 77, 85, 86], 'day_snow')
setBackgroundMap([95, 96, 99], 'day_tempest')

function setNightBackgroundMap(weatherCode: number[], png: string){
    weatherCode.forEach(code => {
        meteoNightBackgroundMap.set(code, png)
    });
}

setNightBackgroundMap([0,1], 'night_moon')
setNightBackgroundMap([2], 'night_cloud')
setNightBackgroundMap([3], 'night_overcast')
setNightBackgroundMap([45,48], 'night_fog')
setNightBackgroundMap([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'night_rain')
setNightBackgroundMap([71, 73, 75, 77, 85, 86], 'night_snow')
setNightBackgroundMap([95, 96, 99], 'night_tempest')