import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/master.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
