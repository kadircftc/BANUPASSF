export interface Visitor {
    visitorFullName: string;
}

export interface VisitRequest {
    visitorFullName: string;
    vehicleEntry: boolean;
    visitorLicensePlate?: string;
    visitStartDate: Date;
    visitEndDate: Date;
    multiPersonVisit: boolean;
}

export interface Visit {
    id?: number;
    personnelId: number;
    visitorFullName: string;
    visitorLicensePlate?: string;
    vehicleEntry: boolean;
    multiPersonVisit: boolean;
    isConfirm: boolean;
    isExit: boolean;
    status: boolean;
    reasonForRejection?: string;
    isReject?: boolean;
    approvalDate?: Date;
    exitDate: Date;
    visitStartDate: Date;
    visitEndDate: Date;
} 