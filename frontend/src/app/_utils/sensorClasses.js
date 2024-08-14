// Описание классов для телеметрии. Фабрика сенсоров

export class Logos1Sensor {
    constructor(name, sensor_id) {
        this.name = name;
        this.sensor_id = sensor_id;
    }

    getApiEndpoint(sensor_id) {
        const date = new Date();
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const apiURL = `***`;

        return apiURL
    }
}
export class Logos1SensorReport {
    constructor(name, sensor_id) {
        this.name = name;
        this.sensor_id = sensor_id;
    }

    getApiEndpoint() {
        const apiURL = `***`;
        
        return apiURL
    }
}


export class LogosSensor {
    constructor(name, sensor_id, url) {
        this.name = name;
        this.sensor_id = sensor_id;
        this.url = url
    }

    getChartEndpoint() {
        const date = new Date();
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const apiURL = `***`;

        return apiURL
    }

    getTableEndpoint() {
        const date = new Date();
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const apiURL = `***`;

        return apiURL
    }
}   