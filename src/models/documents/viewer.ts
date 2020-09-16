import IViewer from '../viewer';

class ViewerDoc implements IViewer {
    auth_id: string;
    sp_auth_id: string;
    email: string;
    name: string;
    title: '';
    retailerAccess: { allAccess: false; retailers: ['Walmart'] };
    companyAccess: { allAccess: boolean; companies: string[] };
    viewerAccess: { allAccess: false; viewers: [] };
    flags: { demo: false };
    dashboardAccess: [];
    permissions: {
        createAndEditDashboards: true;
        createAndEditUsers: false;
        shareDashboards: true;
    };
    admin: false;

    constructor(auth_id: string, email: string, name: string, companies: string[]) {
        this.auth_id = auth_id;
        this.sp_auth_id = auth_id;
        this.email = email;
        this.name = name;
        this.companyAccess = {
            allAccess: false,
            companies: companies,
        };
    }

    // Returns the Viewer Document to be inserted
    GetViewerDoc() {
        return {
            auth_id: this.auth_id,
            sp_auth_id: this.sp_auth_id,
            email: this.email,
            name: this.name,
            title: this.title,
            retailerAccess: this.retailerAccess,
            companyAccess: this.companyAccess,
            viewerAccess: this.viewerAccess,
            flags: this.flags,
            dashboardAccess: this.dashboardAccess,
            permissions: this.permissions,
            admin: this.admin,
        };
    }
}

export default ViewerDoc;
