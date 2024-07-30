"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../card";

import { BackButton } from "./back-button";

import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  blackButtonHref: string;

}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  blackButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] max-w[600px] shadow-md  my-6">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={blackButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
