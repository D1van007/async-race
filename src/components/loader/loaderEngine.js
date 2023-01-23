class LoaderEngine {
    serverPath;
    paramsId;
    paramsStatus;
    engine;
    constructor() {
        this.serverPath = 'http://127.0.0.1:3000/';
        this.engine = 'engine';
        this.paramsId = 'id';
        this.paramsStatus = 'status';
    }
    // eslint-disable-next-line consistent-return
    async startStopEngine(id, status) {
        try {
            const response = await fetch(`${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            const velocityCar = await response.json();
            return await velocityCar;
        }
        catch {
            throw new Error('ошибочка');
        }
    }
    // eslint-disable-next-line consistent-return
    async driveCar(id, status, callback) {
        try {
            // this.startStopEngine(id, Engine.started);
            const controller = new AbortController();
            const response = await fetch(`${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
            });
            const driveCar = await response.json();
            return driveCar;
        }
        catch {
            if (callback)
                callback();
        }
    }
}
export const loaderEngine = new LoaderEngine();
