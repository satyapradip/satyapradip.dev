import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans text-foreground">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="max-w-md text-4xl font-extrabold tracking-tight">
            Welcome to my Portfolio
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Full-stack portfolio built with Next.js, Tailwind CSS v4, and shadcn UI.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" className="gap-2">
            <Code2 className="h-4 w-4" />
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Documentation
          </Button>
        </div>
      </main>
    </div>
  );
}
