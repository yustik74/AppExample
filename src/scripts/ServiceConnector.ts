/* eslint-disable */
import moment from "moment";

export class ServiceConnector {
    public url: string = "";
    public token: string = "";
    public schemaID: string = "";
    public serviceName:string = "";
    FMT_DT: string = "YYYYMMDD-HHmm";

    constructor(url: string, token: string, serviceName:string, schemaID?: string) {
        this.url = url + "/";
        this.token = token;
        this.schemaID = schemaID || "";
        this.serviceName = serviceName || "";
    }

    dataToFormData(data?:any):string {
        if (data) {
            let r = [];
            for (let k in data)
                r.push(k + "=" + data[k]);
            return r.join('&');
        }
        return "";
    }

    post<T>(method: string, data?: any, converter?: Function | undefined): Promise<T> {
        if(this.token) {
            if (data) data['session'] = this.token;
            else data = {session: this.token};
        }

        if(this.schemaID) {
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
    public EnumSchemas(): Promise<ISchemaItem[]> {
        return this.post("EnumSchemas");
    }

    public EnumDevices(): Promise<IEnumDevicesResult> {
        return this.post("EnumDevices");
    }

    public EnumGeofences(): Promise<IEnumGeofencesResult> {
        return this.post("EnumGeoFences");
    }

    public EnumDrivers(): Promise<IEnumDriversResult> {
        return this.post("EnumDrivers");
    }

    public EnumImplements(): Promise<IEnumImplementsResult> {
        return this.post("EnumImplements");
    }

    public EnumParameters(ids: string[]): Promise<IEnumParameter[]> {
        return this.post<IEnumParameter[]>("EnumParameters",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => this.toArray<IEnumParameter[]>(r));
    }

    public GetGeofences(ids: string[]): Promise<IGeofenceItem[]> {
        return this.post<IGeofenceItem[]>("GetGeoFences",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => {
                let items = [];
                for (let it in r) {
                    let temp = <IGeofenceItem>(r[it]);
                    temp.Fill = this.colorFromARGB(temp.Fill);
                    temp.Line = this.colorFromARGB(temp.Line);
                    items.push(temp);
                }
                return items;
            });
    }

    public GetGeofencesInRect(latMin:number, lngMin:number, latMax:number, lngMax:number): Promise<IGeofenceItem[]> {
        return this.post<IGeofenceItem[]>("GetGeoFencesInRect",
            {
                latmin: latMin,
                lngmin: lngMin,
                latmax: latMax,
                lngmax: lngMax
            },
            (r: any) => {
                let items = [];
                for (let it in r) {
                    let temp = <IGeofenceItem>(r[it]);
                    temp.Fill = this.colorFromARGB(temp.Fill);
                    temp.Line = this.colorFromARGB(temp.Line);
                    items.push(temp);
                }
                return items;
            });
    }

    public GetOnlineInfo(ids?: string[]): Promise<IGetOnlineInfoItem[]> {
        return this.post<IGetOnlineInfoItem[]>(
            ids == null ? "GetOnlineInfoAll" : "GetOnlineInfo",
            {
                IDs: ids == null ? "" : ids.join(",")
            },
            (r: any) => this.toArray<IGetOnlineInfoItem[]>(r))
    }

    public GetProperties(ids: string[]): Promise<IGetPropertiesResult[]> {
        return this.post<IGetPropertiesResult[]>("GetProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IGetPropertiesResult[]>(r));
    }

    public GetImplementsProperties(ids: string[]): Promise<IGetPropertiesResult[]> {
        return this.post<IGetPropertiesResult[]>("GetImplementProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IGetPropertiesResult[]>(r));
    }

    public GetGFProperties(ids: string[]): Promise<IGetPropertiesResult[]> {
        return this.post<IGetPropertiesResult[]>("GetGFProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IGetPropertiesResult[]>(r));
    }

    public GetDriverProperties(ids: string[]): Promise<IGetPropertiesResult[]> {
        return this.post<IGetPropertiesResult[]>("GetDriverProperties",
            {
                IDs: ids.join(",")
            },
            (r: any) => this.toArray<IGetPropertiesResult[]>(r));
    }

    public GetTrips(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1, tripParams: string[] = [], tripTotalParams: string[] = []): Promise<ITripResult[]> {
        return this.post<ITripResult[]>("GetTrips",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
                tripParams: tripParams.length ? tripParams.join(",") : "",
                tripTotalParams: tripParams.length ? tripParams.join(",") : ""
            },
            (r: any) => this.toArray<ITripResult>(r));
    }

    public GetStage(ids: string[], sd: Date, ed: Date, stageName: string, tripParams: string[] = [], tripTotalParams: string[] = []): Promise<ITripStage[]> {
        return this.post<ITripStage[]>("GetStage",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                stageName: stageName,
                tripParams: tripParams.length ? tripParams.join(",") : "",
                tripTotalParams: tripParams.length ? tripParams.join(",") : ""
            },
            (r: any) => this.toArray<ITripStage>(r));
    }

    public GetTrack(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1): Promise<ITrackResult[]> {
        return this.post<ITrackResult[]>("GetTrack",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
            },
            (r: any) => {
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

    public GetTripTables(ids: string[], sd: Date, ed: Date, tripSplitterIndex: number = -1, onlineParams: string[] = []): Promise<ITripTableResult[]> {
        return this.post<ITripTableResult[]>("GetTripTables",
            {
                IDs: ids.join(","),
                SD: moment(sd).format(this.FMT_DT),
                ED: moment(ed).format(this.FMT_DT),
                tripSplitterIndex: tripSplitterIndex,
                onlineParams: onlineParams.length ? onlineParams.join(",") : ""
            },
            (r: any) => this.toArray<ITripTableResult>(r));
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

    public CacheFind(ids: string[], sd: Date, ed: Date, stageName: string, values:string[]): Promise<ICacheFindResult[]> {
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

export interface ISchemaItem {
    ID: string;
    Name: string;
    Group: string;
}

export interface ILatLng {
    Lat: number;
    Lng: number;
}

export interface IPropertyItem {
    Name: string;
    Value: any;
}

export interface IEnumCommonGroup {
    ID: string;
    ParentID?: string;
    Name: string;
    Properties: IPropertyItem[];
}

export interface IEnumCommonItem {
    ID: string;
    ParentID?: string;
    Name: string;
    Properties: IPropertyItem[];
}

// devices
export interface IEnumDevicesResult {
    Items: IEnumDeviceItem[];
    Groups: IEnumCommonGroup[];
}

export interface IEnumDeviceItem extends IEnumCommonItem {
    Serial: number;
    Image: string;
    ImageColored: string;
}

// geofences
export interface IEnumGeofencesResult {
    Items: IEnumGeofenceItem[];
    Groups: IEnumCommonGroup[];
}

export interface IEnumGeofenceItem extends IEnumCommonItem {

}

export interface IGeofenceItem {
    ID: string;
    ParentID: string;
    Name: string;
    ImageName: string;
    Line: string;
    Fill: string;
    IsPolygon: boolean;
    R: number;
    Lat: number[];
    Lng: number[];
}

// drivers
export interface IEnumDriversResult {
    Items: IEnumDriverItem[];
    Groups: IEnumCommonGroup[];
}

export interface IEnumDriverItem extends IEnumCommonItem {
    DriverID: string;
}

// drivers
export interface IEnumImplementsResult {
    Items: IEnumImplementItem[];
    Groups: IEnumCommonGroup[];
}

export interface IEnumImplementItem extends IEnumCommonItem {

}

// parameters
export interface IEnumParameter {
    ID: string;
    Name: string;
    FinalParams: IParameter[];
    OnlineParams: IParameter[];
    TripsParams: IParameter[];
}

export interface IParameter {
    Name: string;
    Alias: string;
    Caption: string;
    GroupName: string;
    ReturnType: ReturnType;
    ValueType: number;
    Unit: string;
    Format: string;
    Statuses: IParameterStatus[];
}

export interface IParameterStatus {
    Value: number;
    Caption: string;
    ReferenceID: string;
    ReferenceIDs?: string[];
}

export enum ReturnType {
    Boolean = 0,
    Byte = 1,
    Int32 = 2,
    Int64 = 3,
    Double = 4,
    DateTime = 5,
    TimeSpan = 6,
    Guid = 7,
    Guid4 = 8,
    String = 9,
    Image = 10,
    Coordinates = 11
}

// online
export interface IGetOnlineInfoItem {
    ID: string;
    Name: string;
    Speed: number;
    State: number;
    DT: string;
    Course: number;
    Address: string;
    LastPosition: ILatLng;
    Final: any;
    _LastCoords: string;
    _LastData: string;
}

export interface IGetPropertiesResult {
    ID: string;
    Name: string;
    Properties: any;
    PropertyTypes: any;
}

export interface IConvertedProperty {
    Name: string;
    Type: number;
    Value: any;
}

export interface ILatLng {
    Lat: number;
    Lng: number;
}

export interface IDataLoadSaveResult {
    ok: boolean;
    data: any[];
}

// trips
export interface ITripResult {
    ID: string;
    Name: string;
    Serial: number;
    VRN: string;
    SD: string;
    ED: string;
    _LastCoords: string;
    _LastData: string;

    Trips: ITripItem[];
    Total: any;
    LastPosition: ILatLng;
}

export interface ITripItem {
    Index: number;
    SD: string;
    ED: string;
    PointStart: ILatLng;
    PointEnd: ILatLng;
    Total: any;
    Stages: ITripStage[];
}

export interface ITripStage {
    ID: string;
    Name: string;
    Alias: string;
    Params: string[];
    ParamTypes: number[];
    TotalTypes: number[];
    Total: any;
    Items: ITripStageItem[];
    Statuses: ITripStageItemStatus[];
}

export interface ITripStageItem {
    Index: number;
    SD: string;
    ED: string;
    Status: number;
    StatusID: string;
    StatusIDs?: string[];
    StartPoint: ILatLng;
    EndPoint: ILatLng;
    Caption: string;
    Values: any[];
}

export interface ITripStageItemStatus {
    Value: number;
    Caption: string;
    ReferenceID: string;
    ReferenceIDs?: string[];
}

// trip tables
export interface ITripTableResult {
    ID: string;
    Name: string;
    Serial: number;
    Trips: ITripTableItem[];
}

export interface ITripTableItem {
    Index: number;
    SD: string;
    ED: string;
    PointStart: ILatLng;
    PointEnd: ILatLng;
    DT: string[];
    Values: ITripTableValueItem[];
}

export interface ITripTableValueItem {
    Name: string;
    Caption: string;
    Alias?: string;
    ReturnType: ReturnType;
    ValueType: number;
    Unit: string;
    Format: string;
    Statuses: ITripStageItemStatus[];
    Values: any[];
}

export interface ITrackResult {
    ID: string;
    Item: ITrackInfo[];
}

export interface ITrackInfo {
    Index: number;
    DT: string;
    Speed: number[];
    Lat: number[];
    Lng: number[];
}

export interface ICacheFindResult {
    ID: string;
    Name: string;
    Serial: number;
    Items: ICacheFindResultItem[];
}

export interface ICacheFindResultItem {
    SD: string;
    ED: string;
    Status: string;
    Caption: string;
    StartPoint: ILatLng;
    EndPoint: ILatLng;
    Values: any;
}
