import React from "react";
import { Header } from "../../common/components/header/header";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};
