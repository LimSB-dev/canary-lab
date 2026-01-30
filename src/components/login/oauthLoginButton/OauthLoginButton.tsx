import Image from "next/image";

interface IOauthLoginButton {
  provider: "github" | "google";
  theme: "light" | "dark";
  type: "default";
}

const OauthLoginButton = ({ provider, theme, type }: IOauthLoginButton) => {
  return (
    <Image
      src={`/assets/oauth/${provider}_${theme}_${type}.svg`}
      alt={`${provider}_${theme}_${type}`}
      width={140}
      height={30}
    />
  );
};

export default OauthLoginButton;
