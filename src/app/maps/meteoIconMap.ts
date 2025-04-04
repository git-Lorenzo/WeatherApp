export const meteoIconMap: Map<number, string> = new Map()

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
setMap([61, 63, 65, 66, 67], 'heavy_rain')
setMap([71, 73, 75, 77], 'snow')
setMap([95, 96, 99], 'tempest')