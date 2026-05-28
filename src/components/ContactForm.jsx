import { useState } from 'react'
import { send } from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_2ix40f2'
const EMAILJS_TEMPLATE_ID = 'template_lmnnu9u'
const EMAILJS_PUBLIC_KEY = 'KuEOHJmOosbt4Nfqw'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    try {
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      )

      setSubmitted(true)
      setError('')
      setFormData({ name: '', email: '', message: '' })
      form.reset()
    } catch (submitError) {
      setError('Oops! Something went wrong. Please try again.')
      console.error(submitError)
    }
  }

  return (
    <section id="contact" className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Contact</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Let's build something together
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Send a quick message and I&apos;ll reply as soon as possible.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.55)]">
          {submitted ? (
            <div
              className="rounded-3xl border border-emerald-500 bg-emerald-500/10 p-8 text-center"
              aria-live="polite"
            >
              <h3 className="text-2xl font-semibold text-white">
                Message sent!
              </h3>
              <p className="mt-3 text-slate-300">
                Thanks for reaching out — I&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-slate-200">
                  <span className="mb-2">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </label>

                <label className="flex flex-col text-sm font-medium text-slate-200">
                  <span className="mb-2">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </label>
              </div>

              <label className="flex flex-col text-sm font-medium text-slate-200">
                <span className="mb-2">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="min-h-44 resize-none rounded-4xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                />
              </label>

              {error && (
                <p className="text-sm text-rose-400">{error}</p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
