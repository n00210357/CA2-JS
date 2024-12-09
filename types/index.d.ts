export interface CompanyType 
{
    _id: string;
    name: string;
    description: string;
    ceo_email: string;
    image_path: string;
}

export interface MineralType 
{
    _id: string;
    name: string;
    description: string;
    image_path: string;
}

export interface MineType 
{
    _id: string;
    name: string;
    latitude: string;
    longitude: string;
    manager_email: string;
    company_name: string;
    image_path: string;
}

export interface WorkerType 
{
    _id: string;
    full_name: string;
    description: string;
    email: string;
    password: string;
    phone: string;
    image_path: string;
}

export interface IAuthContext 
{
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}