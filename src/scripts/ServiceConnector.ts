/* eslint-disable */
import moment from "moment";
import {
    ICacheFindResult,
    IDataLoadSaveResult,
    IREnumDevices,
    IREnumDrivers,
    IREnumGeofences,
    IREnumImplements, IRGeoFence, IROnlineInfo,
    IRParameters, IRProperties,
    IRSchema, IRTrackInfo, IRTrips, IRTripStage, IRTripTables, ITrackResult
} from "@/scripts/Server";

export class ServiceConnector {
    public url: string = "";
    public token: string = "";
    public schemaID: string = "";
    public serviceName: string = "";
    FMT_DT: string = "YYYYMMDD-HHmm";

    constructor(url: string, token: string, serviceName: string, schemaID?: string) {
        this.url = url + "/";
        this.token = token;
        this.schemaID = schemaID || "";
        this.serviceName = serviceName || "";
    }

    dataToFormData(data?: any): string {
        if (data) {
            let r = [];
            for (let k in data)
                r.push(k + "=" + data[k]);
            return r.join('&');
        }
        return "";
    }

    post<T>(method: string, data?: any, converter?: Function | undefined): Promise<T> {
        if (this.token) {
            if (data) data['session'] = this.token;
            else data = {session: this.token};
        }

        if (this.schemaID) {
            if (data) data['schemaID'] = this.schemaID;
            else data = {schemaID: this.schemaID};
        }

        return fetch(this.url + method,
            {
                method: "POST",
                body: this.dataToFormData(data),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                mode: "cors"
            })
            // .then(r => )
            // .done((r: any) => {
            //     if (converter) r = converter(r);
            //     d.resolve(r);
            // })
            // .catch(() => d.reject())
            // .always(() => this.changeStateCallback(false));
            .then(r => {
                if (r.ok) return r.json();
                console.error("[" + r.status + "] " + r.statusText + "  (" + this.url + ")");
                return Promise.reject();
            })
            .then(r => {
                if (converter) r = converter(r);
                return r;
            })
            .finally(() => {
                //this.$root.$emit("busy", false);
            });
    }

    toArray<T>(r: any): T[] {
        let items: T[] = [];
        for (let it in r)
            if (r[it])
                items.push(r[it]);
        return items;
    }

    colorFromARGB(num: any): string {
        num >>>= 0;
        let b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16;
        return "rgba(" + [r, g, b].join(",") + ")";
    }

    // ================
    public EnumSchemas(): Promise<IRSchema[]> {
        return this.post("EnumSchemas");
    }

    public EnumDevices(): Promise<IREnumDevices> {
        return this.post("EnumDevices");
    }

    public EnumGeofences(): Promise<IREnumGeofences> {
        return this.post("EnumGeoFences");
    }

    public EnumDrivers(): Promise<IREnumDrivers> {
        return this.post("EnumDrivers");
    }

    public EnumImplements(): Promise<IREnumImplements> {
        return this.post("EnumImplements");
    }

    public EnumParameters(ids: string[]): Promise<IRParameters[]> {
        return this.post<IRParameters[]>("EnumParameters",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => this.toArray<IRParameters[]>(r));
    }

    public GetGeofences(ids: string[]): Promise<IRGeoFence[]> {
        return this.post<IRGeoFence[]>("GetGeoFences",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => this.toGeofences(r));
    }

    public GetGeofencesInRect(latMin: number, lngMin: number, latMax: number, lngMax: number): Promise<IRGeoFence[]> {
        return this.post<IRGeoFence[]>("GetGeoFencesInRect",
            {
                latmin: latMin,
                lngmin: lngMin,
                latmax: latMax,
                lngmax: lngMax
            },
            (r: any) => this.toGeofences(r));
    }

    private toGeofences(r: any): IRGeoFence[] {
        let items = [];
        for (let it in r) {
            let temp = <IRGeoFence>(r[it]);
            temp.Fill = this.colorFromARGB(temp.Fill);
            temp.Line = this.colorFromARGB(temp.Line);
            items.push(temp);
        }
        return items;
    }

    public GetOnlineInfo(ids?: string[]): Promise<IROnlineInfo[]> {
        return this.post<IROnlineInfo[]>(
            ids == null ? "GetOnlineInfoAll" : "GetOnlineInfo",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => this.toArray<IROnlineInfo[]>(r))
    }

    public GetProperties(ids: string[]): Promise<IRProperties[]> {
        return this.post<IRProperties[]>("GetProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IRProperties[]>(r));
    }

    public GetImplementsProperties(ids: string[]): Promise<IRProperties[]> {
        return this.post<IRProperties[]>("GetImplementProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IRProperties[]>(r));
    }

    public GetGFProperties(ids: string[]): Promise<IRProperties[]> {
        return this.post<IRProperties[]>("GetGFProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IRProperties[]>(r));
    }

    public GetDriverProperties(ids: string[]): Promise<IRProperties[]> {
        return this.post<IRProperties[]>("GetDriverProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IRProperties[]>(r));
    }

    public GetTrips(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1, tripParams: string[] = [], tripTotalParams: string[] = []): Promise<IRTrips[]> {
        return this.post<IRTrips[]>("GetTrips",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
                tripParams: tripParams.length ? tripParams.join(",") : "",
                tripTotalParams: tripParams.length ? tripParams.join(",") : ""
            },
            (r: any) => this.toArray<IRTrips>(r));
    }

    public GetStage(ids: string[], sd: Date, ed: Date, stageName: string, tripParams: string[] = [], tripTotalParams: string[] = []): Promise<IRTripStage[]> {
        return this.post<IRTripStage[]>("GetStage",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                stageName: stageName,
                tripParams: tripParams.length ? tripParams.join(",") : "",
                tripTotalParams: tripParams.length ? tripParams.join(",") : ""
            },
            (r: any) => this.toArray<IRTripStage>(r));
    }

    public GetTrack(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1): Promise<ITrackResult[]> {
        return this.post<ITrackResult[]>("GetTrack",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
            },
            (r: IRTrackInfo[]) => {
                let items: ITrackResult[] = [];
                for (let it in r)
                    if (r[it])
                        items.push({
                            ID: it,
                            Item: r[it]
                        });
                return items;
            });
    }

    public GetTripTables(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1, onlineParams: string[] = []): Promise<IRTripTables[]> {
        return this.post<IRTripTables[]>("GetTripTables",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
                onlineParams: onlineParams.length ? onlineParams.join(",") : ""
            },
            (r: any) => r);
    }

    public DataEnum(name: string): Promise<any> {
        return this.post<IDataLoadSaveResult>("DataEnum",
            {
                serviceName: this.serviceName,
                name: name
            },
            (r: any) => {
                if (r.ok) {
                    let result: any = {};
                    for (let v in r.data)
                        result[v] = new Date(parseInt(r.data[v].match(/\d+/)[0]));
                    return result;
                }
                return null;
            });
    }

    public DataLoad(name: string): Promise<any> {
        return this.post<IDataLoadSaveResult>("DataLoad",
            {
                serviceName: this.serviceName,
                name: name
            },
            (r: any) => r.ok ? r.data : null);
    }

    public DataSave(name: string, data: string): Promise<any> {
        return this.post<IDataLoadSaveResult>("DataSave",
            {
                serviceName: this.serviceName,
                name: name,
                data: data
            },
            (r: IDataLoadSaveResult) => r.ok);
    }

    public CacheFind(ids: string[], sd: Date, ed: Date, stageName: string, values: string[]): Promise<ICacheFindResult[]> {
        return this.post<ICacheFindResult[]>("CacheFind",
            {
                IDs: ids != null && ids.length > 0 ? ids.join(",") : "all",
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                stageName: stageName,
                values: values.join(',')
            },
            (r: any) => this.toArray<ICacheFindResult>(r));
    }
}