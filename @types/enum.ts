export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}

export interface Headers {
  className?: string;
  title?: string;
  text?: string;
  tag?: string;
}
export interface TagLineProps {
  className?: string;
  children: React.ReactNode;
}

export interface SectionLine {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string;
  children: React.ReactNode;
}

export interface DeleteButtonPros {
  label: string,
  onDelete: () => {}
}

export interface CategoryState {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProductState {
  id: string;
  name: string;
  slug: string;
  label: string
  imgUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandState {
  id: string;
  name: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
}