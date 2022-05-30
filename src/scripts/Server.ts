export const ExternalSettings: IExternalSettings = (window as any)['external-settings'];

export interface IExternalSettings {
    Name: string;
    Version: string;
    Urls: IExternalSettingsUrls;
    Token: string;
    User: IUser;
    Organization: IOrganization;
    Settings: { [key: string]: string };
    LocaleDefault: string;
    LocaleCurrent: string;
}

export interface IExternalSettingsUrls {
    Service: string;
    Relative: string;
    Content: string;
    App: string;
    ImageCar: string;
    ImageGF: string;
    ImageImplements: string;
    ImageDrivers: string;
}

export interface IUser {
    ID: number;
    UID: any;
    Name: string;
    Login: string;
    Mail: string;
    Theme: any;
    Props: { [key: string]: string };
}

export interface IOrganization {
    ID: number;
    UID: any;
    Name: string;
    Props: { [key: string]: string };
}

export interface IRSchema {
    ID: string;
    Name: string;
    Group: string;
}

export interface IRTripArea {
    ColorR: number;
    ColorG: number;
    ColorB: number;
    Polygons: number[][][];
}

export interface IRBillingDevice {
    ID: any;
    State: boolean;
    StateFrom: any;
    IDPlan: any;
    PlanFrom: any;
}

export interface IRBillingOrg {
    ID: any;
    State: boolean;
    MaxCredit: number;
    WarningThreshold: number;
}

export interface IRBillingOrgBalance {
    ID: any;
    Balance: number;
}

export interface IRBillingPayment {
    ID: any;
    DT: any;
    Amount: number;
    IDT: number;
    Comment: string;
}

export interface IRBillingPlan {
    ID: any;
    Name: string;
    State: boolean;
    PPD: number;
    BillingPeriod: number;
}

export interface IRGetCommandLogItem {
    ID: number;
    Name: string;
    Command: string;
    CommandText: string;
    IDCAR: any;
    Serial: number;
    DT: any;
    ResponseDT: any;
    Response: string;
    Status: number;
    Arguments: string[];
}

export interface IREnumDevices {
    ID: string;
    Groups: IRGroupItem[];
    Items: IRDeviceItem[];
    VirtualTrees: IRVirtualTree[];
    VirtualTreeAssigned: any;
}

export interface IRDeviceItem extends IRGroupItem {
    Serial: number;
    Allowed: boolean;
    Properties: IRProperty[];
    FixedLocation: IRPoint;
    Image: string;
    ImageColored: string;
    TripSplitters: IRTripSplitter[];
    IsAreaEnabled: boolean;
    ImageHue: number;
}

export interface IRFindDevice {
    FindBy: number;
    Item: IRDeviceItem;
    Path: IRGroupItem[];
}

export interface IRTripSplitter {
    ID: number;
    Name: string;
}

export interface IRVirtualTree {
    ID: any;
    Name: string;
}

export interface IREnumDrivers {
    ID: string;
    Groups: IRGroupItem[];
    Items: IRDriverItem[];
    VirtualTrees: IRVirtualTree[];
    VirtualTreeAssigned: any;
}

export interface IRDriverItem extends IRGroupItem {
    DriverID: string;
    Properties: IRProperty[];
    Image: string;
    ImageColored: string;
}

export interface IREnumGeofences {
    ID: string;
    Groups: IRGroupItem[];
    Items: IRGeofenceItem[];
    VirtualTrees: IRVirtualTree[];
    VirtualTreeAssigned: any;
}

export interface IRGeofenceItem extends IRGroupItem {
    Properties: IRProperty[];
    Image: string;
    ImageColored: string;
}

export interface IREnumImplements {
    ID: string;
    Groups: IRGroupItem[];
    Items: IRImplementItem[];
    VirtualTrees: IRVirtualTree[];
    VirtualTreeAssigned: any;
}

export interface IRImplementItem extends IRGroupItem {
    ImplementID: string;
    Properties: IRProperty[];
    Image: string;
    ImageColored: string;
}

export interface IRParameters {
    ID: any;
    Name: string;
    FinalParams: IRParameter[];
    OnlineParams: IRParameter[];
    TripsParams: IRParameter[];
}

export interface IRParameter {
    GroupName: string;
    Color: number;
    Expression: string;
}

export interface IRDeviceStatus {
    ID: number;
    Name: string;
    ImageName: string;
    Enabled: boolean;
}

export interface IRDeviceStatusItem {
    ID: number;
    Status: IRDeviceStatus;
    From: any;
    Success: boolean;
}

export interface IRDeviceInfo {
    Stages: IRDeviceStage[];
}

export interface IRDeviceStage {
    Name: string;
    Parameter: string;
    IsGroup: boolean;
    Caption: string;
    Image: string;
}

export interface IRGeoFence {
    ID: any;
    ParentID: any;
    Name: string;
    IsPolygon: boolean;
    R: number;
    Lat: number[];
    Lng: number[];
    Holes: IRGeoFenceHole[];
    ImageName: string;
    ImageHue: number;
    Fill: string;
    Line: string;
    LineWidth: number;
}

export interface IRGeoFenceHole {
    Lat: number[];
    Lng: number[];
}

export interface IRGeofenceSetResult {
    Created: any[];
    Modified: any[];
    Deleted: any[];
}

export interface IRNote {
    UID: any;
    SD: any;
    ED: any;
    Stage: string;
    StageCaption: string;
    State: number;
    Point: IRPoint;
    Severity: number;
    Comment: string;
    Image: string;
}

export interface IROnlineInfo {
    ID: any;
    Name: string;
    LastPosition: IRPoint;
    DT: any;
    State: ROnlineState;
    Speed: number;
    Course: number;
    Address: string;
    Final: { [key: string]: any };
    LastCoords: any;
    LastData: any;
}

export enum ROnlineState {
    Park = 0,
    Move = 1,
    Flight = 2
}

export interface ITrackResult{
    ID: string;
    Item: IRTrackInfo;
}

export interface IRTrackInfo {
    Index: number;
    DT: any[];
    Speed: number[];
    Lat: number[];
    Lng: number[];
    Photos: IRTrackInfoPhoto[];
    ColorSettings: any;
}

export interface IRTrackInfoPhoto {
    Index: number;
    FileName: string;
}

export interface IRTripItemContainer {
    ID: any;
    Name: string;
    Params: string[];
    ParamTypes: number[];
    Items: IRTripItem[];
}

export interface IRTripItem {
    TripIndex: number;
    Stage: string;
    DT: any;
    Duration: any;
    Caption: string;
    Status: number;
    StatusID: any;
    Values: any[];
}

export interface IRTrips {
    ID: any;
    Name: string;
    Serial: number;
    SD: any;
    ED: any;
    VRN: string;
    Trips: IRTrip[];
    Total: { [key: string]: any };
    LastPosition: IRPoint;
    LastCoords: any;
    LastData: any;
}

export interface IRTrip {
    Index: number;
    Divisors: string[];
    SD: any;
    ED: any;
    PointStart: IRPoint;
    PointEnd: IRPoint;
    Stages: IRTripStage[];
    Total: { [key: string]: any };
    Areas: IRTripArea[];
}

export interface IRTripStage {
    Name: string;
    Alias: string;
    Params: string[];
    ParamTypes: number[];
    TotalTypes: number[];
    Items: IRTripStageItem[];
    Statuses: any[];
    Total: { [key: string]: any };
}

export interface IRTripStageItem {
    Index: number;
    SD: any;
    ED: any;
    Status: number;
    StatusID: any;
    StatusIDs: any[];
    StartPoint: IRPoint;
    EndPoint: IRPoint;
    Caption: string;
    Values: any[];
}

export interface IRTripGroupedItem {
    Complete: number;
    CompletePercent: number;
    Incomplete: number;
    IncompletePercent: number;
    MaxOverlap: number;
    OverlapFull: number;
    Overlap: number;
    OverlapPercent: number;
    Total: number;
    ID: any;
    Name: string;
}

export interface IRTripGroupByArea extends IRTripGroupedItem {
    Devices: IRTripGroupByArea_Device[];
}

export interface IRTripGroupByArea_Device extends IRTripGroupedItem {
    Implements: IRTripGroupBy_Implement[];
}

export interface IRTripGroupByDevice extends IRTripGroupedItem {
    Areas: IRTripGroupByDevice_Area[];
}

export interface IRTripGroupByDevice_Area extends IRTripGroupedItem {
    Implements: IRTripGroupBy_Implement[];
}

export interface IRTripGroupBy_Implement extends IRTripGroupedItem {
}

export interface IRTripTableValues {
    Values: any[];
}

export interface IRTripTableItem {
    Index: number;
    SD: any;
    ED: any;
    PointStart: IRPoint;
    PointEnd: IRPoint;
    DT: any[];
    Values: IRTripTableValues[];
}

export interface IRTripTables {
    ID: any;
    Name: string;
    Serial: number;
    Trips: IRTripTableItem[];
}

export interface IRGroupItem {
    ID: any;
    ParentID: any;
    Name: string;
}

export interface IRMonitoringRule {
    ID: any;
    Parameter: string;
    ParameterType: RParameterType;
    Condition: RMonitoringRuleCondition;
    Value: string;
    ValueType: string;
    ValueTo: string;
    ValueToType: string;
    TargetObject: any;
    State: boolean;
    Severity: number;
    IgnorePeriod: number;
    MinDuration: number;
    NotificationDelay: number;
    Templates: { [key: string]: string };
    Subjects: { [key: string]: string };
    PutToJournal: boolean;
    ChangeStateRuleID: any;
    ChangeStateRuleTo: boolean;
    NotifyUsers: { [key: number]: number };
    NotifyTargets: { [key in number]: IRMonitoringNotifyItem };
    Schedule: { [key: number]: number };
    Created: any;
    Updated: any;
}

export enum RParameterType {
    Tabular = 0,
    Final = 2
}

export enum RMonitoringRuleCondition {
    LessThan = 0,
    Equal = 1,
    NotEqual = 2,
    MoreThan = 3,
    Range = 4,
    List = 5
}

export interface IRMonitoringNotifyItem {
    Target: string;
    Lang: string;
}

export interface IRPoint {
    Lat: number;
    Lng: number;
}

export interface IRReportScheduleItem {
    ID: any;
    Reports: string[];
    SplitToTrips: boolean;
    SplitToTripsIndex: number;
    PeriodType: RSchedulePeriodType;
    From: any;
    To: any;
    OutFormat: RScheduleOutFormat;
    PackToZip: boolean;
    PackToZipPassword: string;
    StartFrom: any;
    TargetUsers: any[];
    TargetMails: string[];
    SaveToDB: boolean;
    ValidUntil: any;
    MailSubject: string;
    State: boolean;
}

export enum RScheduleOutFormat {
    HTML = 0,
    PDF = 1,
    Excel2007 = 2,
    Word2007 = 3,
    RTF = 4,
    XPS = 5,
    ODS = 6,
    ODT = 7
}

export enum RSchedulePeriodType {
    UserDefined = 0,
    SinceStartDay = 1,
    SinceStartWeek = 2,
    SinceStartMonth = 3,
    LastDay = 4,
    LastWeek = 5,
    LastMonth = 6,
    SinceStartHour = 7,
    LastHour = 8,
    PrevHour = 9,
    PrevDay = 10,
    PrevWeek = 11,
    PrevMonth = 12
}

export interface IRRole {
    ID: any;
    Name: string;
    Data: string;
    IsGlobal: boolean;
}

export interface IRUser {
    ID: any;
    Login: string;
    State: boolean;
    IDRoles: any[];
    IDGlobalRoles: any[];
    Mail: string;
    ICQ: string;
    Jabber: string;
    Phone: string;
    Telegram: string;
    Viber: string;
    Whatsapp: string;
    Restrictions: any;
}

export interface IRProperties {
    ID: any;
    Name: string;
    Properties: { [key: string]: any };
    PropertyTypes: { [key: string]: RPropType };
}

export interface IRProperty {
    Inherited: boolean;
    Type: RPropType;
    Name: string;
    Value: any;
}

export interface IRPropertyTable {
    Inherited: boolean;
    Type: RPropType;
    Name: string;
    Values: IRPropertyTableValue[];
}

export interface IRPropertyTableValue {
    SD: any;
    ED: any;
    Value: any;
}

export interface IRPropertyTareTable {
    Approximation: RTareTableApproximation;
    DependsOnSupply: boolean;
    Items: IRPropertyTareTableItem[];
}

export interface IRPropertyTareTableItem {
    Input: number;
    Output: number;
    Supply: number;
}

export enum RTareTableApproximation {
    Linear = 0,
    Polynomial = 1
}

export enum RPropType {
    String = 0,
    Number = 1,
    Date = 2,
    TareTable = 3,
    Time = 4,
    Memo = 5,
    Color = 6,
    Bool = 7,
    Radio = 8,
    Image = 9,
    File = 10,
    ProgressBar = 11,
    Combobox = 12,
    FileLink = 13,
    Device = 14,
    GeoFence = 15,
    Driver = 16,
    Implement = 17,
    Task = 18,
    CheckDays = 19
}

export interface IRVirtualTreeItem {
    ID: any;
    OrgId: any;
    Name: string;
    Icon: string;
    Items: IRVirtualTreeItemModel[];
}

export interface IRTreeObjectItem {
    id: any;
    parentId: any;
    name: string;
    virt: boolean;
}

export interface IRVirtualTreeItemModel extends IRTreeObjectItem {
    options: IRVirtualTreeEditItemOptions;
}

export interface IRVirtualTreeEditItemOptions {
    url: string;
}

export interface IDataLoadSaveResult {
    ok: boolean;
    data: any[];
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

export interface ILatLng {
    Lat: number;
    Lng: number;
}