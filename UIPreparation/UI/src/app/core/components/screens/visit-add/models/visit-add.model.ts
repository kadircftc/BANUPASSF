export interface Visitor {
    name: string;
}

export interface VehicleData {
    plate: string;
    visitStartDate: Date | null;
    visitEndDate: Date | null;
}

export interface MultiVisiter {
    id?: string;
    createdDate?: Date;
    visitId?: string;
    visitorFullName: string;
}

export interface PedestrianEntranceRequest {
    personnelId: number;
    visitorFullName: string;
    vehicleEntry: boolean;
    multiPersonVisit: boolean;
    isExit: boolean;
    status: boolean;
    isConfirm: boolean;
    isReject: boolean;
    approvalDate?: Date;
    exitDate?: Date;
    visitStartDate: Date;
    visitEndDate: Date;
    multiVisitersList?: MultiVisiter[];
    visitorLicensePlate?: string;
} 