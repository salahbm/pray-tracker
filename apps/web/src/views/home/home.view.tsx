"use client"

import React from "react"
import { MotionDiv } from "@/lib/motion"

const features = [
  {
    title: "Shared prayer lists",
    description: "Create a circle for your family or community and see every request in one place.",
  },
  {
    title: "Gentle reminders",
    description: "Receive thoughtful nudges so you never miss a moment to pray or follow up.",
  },
  {
    title: "Answered stories",
    description: "Celebrate wins together with a timeline of answered prayers and gratitude notes.",
  },
]

const benefits = [
  {
    title: "Stay connected",
    description: "Noor keeps your people close with a shared space for prayer, care, and encouragement.",
  },
  {
    title: "Grow consistent habits",
    description: "Daily streaks and highlights help you build a steady prayer rhythm that sticks.",
  },
  {
    title: "Feel supported",
    description: "Quick reactions, reminders, and updates show your circle that you are present.",
  },
]

const steps = [
  {
    title: "Create your Noor circle",
    description: "Invite the people you pray with most and personalize your space.",
  },
  {
    title: "Share prayer requests",
    description: "Post requests, add details, and let everyone respond with support.",
  },
  {
    title: "Track progress together",
    description: "Mark updates, celebrate answered prayers, and record gratitude moments.",
  },
]

const testimonials = [
  {
    quote: "Noor helped our family stay connected during a busy season. We never miss prayer updates now.",
    name: "Mariam A.",
    title: "Family Organizer",
  },
  {
    quote: "The reminders are gentle and encouraging. It feels like the app is cheering us on.",
    name: "Omar H.",
    title: "Community Lead",
  },
]

const HomeView: React.FC = () => {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-36 lg:pt-40">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#d6f2f2,transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-secondary/40 blur-3xl md:h-72 md:w-72" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-forground">
              Noor · Shared Prayer Companion
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              A calmer way to pray together, follow up, and celebrate answered moments.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-forground md:text-lg">
              Noor brings your prayer circle into one peaceful space. Share requests, set reminders, and stay connected
              with the people who matter most.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <StoreButton store="app" />
              <StoreButton store="play" variant="secondary" />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-forground">
              <div className="rounded-full bg-white px-4 py-2 shadow-sm">4.9★ rating</div>
              <div className="rounded-full bg-white px-4 py-2 shadow-sm">50K+ prayer updates</div>
              <div className="rounded-full bg-white px-4 py-2 shadow-sm">Private & secure</div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
              <div className="absolute -top-8 right-8 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-forground shadow">
                New: Prayer streaks
              </div>
              <div className="rounded-2xl bg-muted px-5 py-6">
                <h2 className="text-lg font-semibold">Today in Noor</h2>
                <div className="mt-4 space-y-4">
                  {[
                    "Aisha · Surgery recovery",
                    "Youth group · Exam peace",
                    "Family · Travel safety",
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{item}</span>
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-forground">
                        Prayed
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-dashed border-secondary/40 bg-white px-4 py-3 text-sm text-muted-forground">
                  “We just received good news!” · 2 minutes ago
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <section id="features" className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Features</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Everything you need for a shared prayer rhythm.</h2>
          </MotionDiv>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="rounded-2xl border border-muted bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-forground">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-6 py-12 text-primary-forground md:px-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold md:text-4xl">Built for shared care, not clutter.</h2>
              <p className="mt-4 text-base text-primary-forground/80">
                Noor replaces scattered chats with a calm, organized prayer experience. Every update is easy to find,
                celebrate, and revisit.
              </p>
            </MotionDiv>
            <div className="space-y-5">
              {benefits.map((benefit) => (
                <MotionDiv
                  key={benefit.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/10 px-5 py-4"
                >
                  <h3 className="text-base font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-primary-forground/80">{benefit.description}</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Start in minutes, stay consistent for years.</h2>
          </MotionDiv>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="rounded-2xl border border-muted bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-forground">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-forground">{step.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Loved by circles</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Stories from the Noor community.</h2>
          </MotionDiv>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <MotionDiv
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="rounded-2xl border border-muted bg-white p-6 shadow-sm"
              >
                <p className="text-base text-foreground">“{item.quote}”</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-forground">{item.title}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl bg-secondary px-6 py-12 text-secondary-forground md:px-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold md:text-4xl">Ready to bring your prayer circle together?</h2>
              <p className="mt-3 text-base text-secondary-forground/80">
                Download Noor today and start sharing prayer updates with the people you love.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <StoreButton store="app" variant="light" />
              <StoreButton store="play" variant="light" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const StoreButton = ({
  store,
  variant = "primary",
}: {
  store: "app" | "play"
  variant?: "primary" | "secondary" | "light"
}) => {
  const isApp = store === "app"
  const href = isApp ? "https://apps.apple.com" : "https://play.google.com/store"
  const label = isApp ? "App Store" : "Google Play"
  const description = isApp ? "Download on the" : "Get it on"
  const variantStyles = {
    primary: "bg-primary text-primary-forground",
    secondary: "bg-white text-foreground border border-muted",
    light: "bg-white text-foreground",
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-w-[180px] items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${
        variantStyles[variant]
      }`}
    >
      <span className="text-xs font-medium opacity-80">{description}</span>
      <span className="text-base">{label}</span>
    </a>
  )
}

export { HomeView }
