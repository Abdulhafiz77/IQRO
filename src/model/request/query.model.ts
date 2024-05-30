import { PaginationParams } from ".";

export interface QueryParams extends PaginationParams {
    search: string | undefined;
    date: any | undefined;
    status: number | undefined;
    parent_id: number | undefined;
    organization_id: number | undefined;
}

export interface EmployeeParams extends PaginationParams {
    search: string | undefined;
    date: any | undefined;
    status: number | undefined;
    branch_id: number | undefined;
    position_id: number | undefined;
}