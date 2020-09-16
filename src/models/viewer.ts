// Create a new Viewer interface
export default interface IViewer {
    auth_id: string;
    sp_auth_id: string;
    email: string;
    name: string;
    title: string;
    retailerAccess: {
        allAccess: boolean;
        retailers: string[];
    };
    companyAccess: {
        allAccess: boolean;
        companies: string[];
    };
    viewerAccess: {
        allAccess: boolean;
        viewers: string[];
    };
    flags: {
        demo: boolean;
    };
    dashboardAccess: string[];
    permissions: {
        createAndEditDashboards: boolean;
        createAndEditUsers: boolean;
        shareDashboards: boolean;
    };
    admin: boolean;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;
}
