import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { env } from "@root/env.mjs";

interface SignInEmailProps {
  authUrl?: string;
}

const baseUrl = env.NEXT_PUBLIC_APP_URL;

export const SignInEmail = ({ authUrl = "" }: SignInEmailProps) => {
  const previewText = `Hey 👋, click the link below to sign in to your account.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/fiipractic.png`}
                width="40"
                height="37"
                alt="FII Practic"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Hey 👋, click the link below to sign in to your account.
            </Heading>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={authUrl}
              >
                Sign in
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              This link expires in 24 hours and can only be used once. If you
              did not try to log into your account, you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SignInEmail;
