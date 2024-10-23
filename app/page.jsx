"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, GitBranch, Search, Share2, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Users className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">FamilyRoot</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Family Tree"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/hero-image.png"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Roots with FamilyRoot
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Uncover your family history, connect with relatives, and
                    build a beautiful family tree with our easy-to-use platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    onClick={() => (window.location.href = "/new")}
                  >
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl text-center font-bold tracking-tighter md:text-4xl/tight">
              Features
            </h2>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <GitBranch className="h-12 w-12" />
                <h3 className="text-xl font-bold">Interactive Tree Building</h3>
                <p className="text-muted-foreground">
                  Create and visualize your family tree with our intuitive
                  drag-and-drop interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Search className="h-12 w-12" />
                <h3 className="text-xl font-bold">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Find long-lost relatives and discover new connections with our
                  powerful search tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Share2 className="h-12 w-12" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-muted-foreground">
                  Share your family history with loved ones and collaborate on
                  building your tree.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col gap-2 p-6 bg-background rounded-lg shadow">
                <p className="text-sm text-muted-foreground">
                  "FamilyRoot helped me discover relatives I never knew I had.
                  It's been an incredible journey!"
                </p>
                <p className="font-semibold">- Sarah Johnson</p>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-background rounded-lg shadow">
                <p className="text-sm text-muted-foreground">
                  "The interface is so intuitive. I was able to build my family
                  tree in no time!"
                </p>
                <p className="font-semibold">- Michael Chen</p>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-background rounded-lg shadow">
                <p className="text-sm text-muted-foreground">
                  "I love how easy it is to collaborate with my family members
                  on our shared history."
                </p>
                <p className="font-semibold">- Emily Rodriguez</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Start Your Family Tree Journey Today
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who have discovered their roots and
                  connected with long-lost relatives.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 FamilyRoot. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
