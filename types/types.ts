export interface ForecastApi {
    cod: string
    message: number
    cnt: number
    list: ForecastPoint[]
    city: City
}

export interface ForecastPoint {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level: number
        grnd_level: number
        temp_kf: number
    }
    weather: Weather[]
    clouds: {
        all: number
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }
    visibility: number
    pop: number
    rain?: {
        '3h': number
    }
    snow?: {
        '3h': number
    }
    sys: {
        pod: 'd' | 'n'
    }
    dt_txt: string
}

export interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

export interface City {
    id: number
    name: string
    coord: {
        lat: number
        lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}
export interface WeatherApi {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
    wind: {
        speed: number;
    };
}
