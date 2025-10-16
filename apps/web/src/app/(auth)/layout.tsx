import Image from "next/image";
import Link from "next/link";
import { siteDetails } from "@/data/siteDetails";
import { AnimatedContainer } from "./_components/animated-container";
import { variants } from "./_components/config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <Link href="/">
          <AnimatedContainer
            variants={variants.logo}
            className="flex justify-center"
          >
            <div className="relative w-16 h-16">
              <Image
                src="/images/icon-light-rounded.png"
                alt={siteDetails.siteName}
                fill
                className="object-contain select-none"
                priority
              />
            </div>
          </AnimatedContainer>
        </Link>

        {/* Form Container */}
        <AnimatedContainer
          variants={variants.form}
          className="relative bg-white rounded-2xl lg:shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-accent/5" />
          <div className="relative px-6 py-8 sm:px-12">{children}</div>
        </AnimatedContainer>

        {/* Back Link */}
        <Link href="/">
          <AnimatedContainer
            variants={variants.link}
            className="text-center text-sm text-primary mt-6"
          >
            ← Back to Home
          </AnimatedContainer>
        </Link>
      </div>
    </div>
  );
}
