"use client"

import Footer from "@/app/[locale]/(main)/footer";
import Header from "@/app/[locale]/(main)/header";

import { getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react";

export function SignIn() {
  const [csrfToken, setCsrfToken] = useState("")

  useEffect(() => {
    async function loadProviders() {
      const csrf = await getCsrfToken()
      setCsrfToken(csrf)
    }
    loadProviders()
  }, [])


  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-10 md:pt-8">
        <Header />
        <form
          className="flex flex-col items-center justify-start gap-4 p-4 "
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <section className="flex flex-col items-start gap-2">
            <label className="flex flex-col items-start gap-1 ">
              <p className="text-base font-semibold">请输入页面密码</p>
              <input
                className="px-1 border-[1px] rounded-[5px]"
                name="password"
                type="password"
              />
            </label>
            <button className=" px-1.5 py-0.5 w-fit text-sm font-semibold rounded-[8px] border bg-card hover:brightness-95 transition-all text-card-foreground shadow-lg shadow-neutral-200/40 dark:shadow-none">
              确认
            </button>
          </section>
        </form>
        <Footer />
      </main>
    </div>
  );
}