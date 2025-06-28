import { StaticImageData } from 'next/image';

export type HomeWrapperProps = {
  bg?: string;
  pics?: string | StaticImageData; 
  // picsIcon1?: IconType;
  // picsIcon2?: IconType;
  date?: string;
  duration?: string;
  h1?: string | React.ReactNode;
  p?: string | React.ReactNode;
  img?: string | StaticImageData;
  imgName?: string;
  btnCol?: string;
  tag?: string;
  category?: string;
path: string;
};
export interface AuthState {
    email: string;
    password: string;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export interface setAuthProps {
    email: '',
    name: '',
    bio: ''
  }