export interface IFormData {
  name: string;
  talent: string;
  profession: string;
  category: string;
  mail: string;
  phone: string;
  workExperience: string;
  education: string;
  birthday: string;
  address?: string;
}
export interface IGenerateData {
  talent: string;
  profession: string;
  category: string;
  workExperience: string;
}
export interface IGeminiGenerateData {
  talent: string;
  profession: string;
  category: string;
}
