// import { Project } from 'src/app/projects/models/project.model';

export interface AdminState {
    usersList: any[];
    usersListLoading: boolean;
    userModels: any;
    userGalleries: any;
    userModelsLoading: boolean;
    userGalleriesLoading: boolean;
    userBookings: any;
    userBookingsLoading: boolean;
    error: any;
}

export const adminInitialState: AdminState = {
    usersList: [],
    usersListLoading: false,
    userModels: {},
    userGalleries: {},
    userModelsLoading: false,
    userGalleriesLoading: false,
    userBookings: {},
    userBookingsLoading: false,
    error: null
};
