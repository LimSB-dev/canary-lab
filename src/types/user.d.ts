interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  userType: "normal" | "admin";
  /** 저장된 언어 (ko | en) */
  locale?: string;
}
