import Head from "next/head";
import "./globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";

const RootLayout = ({ children }) => (
  <html lang="es">
    <Head>
      <link rel="shortcut icon" href="./favicon.ico" />
    </Head>
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
