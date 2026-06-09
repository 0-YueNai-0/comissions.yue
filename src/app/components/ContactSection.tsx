import { useState } from 'react';
import { Mail, MessageSquare, Send, Twitter, Instagram, Globe, Loader2, Music2 } from 'lucide-react';
import { EXTERNAL_LINK_PROPS, SOCIAL_LINKS } from '../constants/socialLinks';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Oculta mensajes previos al editar el formulario
    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setFormData(INITIAL_FORM_DATA);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'loading';

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-b from-secondary/20 via-muted/30 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">💌</span>
            <span className="text-primary font-bold">Let's Chat</span>
            <span className="text-2xl">💌</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Get In Touch!
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Have questions or want to discuss a commission? I'd love to hear from you~ 💕
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white border-3 border-primary/20 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-2xl font-semibold">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/40 to-muted/40 rounded-2xl border-2 border-border/30">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">commissions@artist.example</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/40 to-muted/40 rounded-2xl border-2 border-border/30">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Discord</p>
                    <p className="text-sm text-muted-foreground">ArtistName#0000</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h4 className="font-medium mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.x}
                    {...EXTERNAL_LINK_PROPS}
                    aria-label="X (Twitter)"
                    className="w-11 h-11 rounded-xl bg-white hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    {...EXTERNAL_LINK_PROPS}
                    aria-label="Instagram"
                    className="w-11 h-11 rounded-xl bg-white hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.tumblr}
                    {...EXTERNAL_LINK_PROPS}
                    aria-label="Tumblr"
                    className="w-11 h-11 rounded-xl bg-white hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    {...EXTERNAL_LINK_PROPS}
                    aria-label="TikTok"
                    className="w-11 h-11 rounded-xl bg-white hover:bg-primary hover:text-white border-2 border-primary/30 hover:border-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110"
                  >
                    <Music2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/15 via-secondary/30 to-accent/15 border-3 border-primary/20 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Response Time</h3>
              <p className="text-sm text-muted-foreground mb-4">
                I typically respond within 24-48 hours. If you haven't heard back, please check your spam folder or
                reach out again!
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">Usually active: 10 AM - 8 PM EST</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border-3 border-primary/20 rounded-3xl p-8 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-semibold">Send a Message</h3>

            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-sm text-muted-foreground">
                Your Name *
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/30 rounded-2xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-sm text-muted-foreground">
                Email Address *
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/30 rounded-2xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm text-muted-foreground">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/30 rounded-2xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="What's this about?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-muted-foreground">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                className="w-full px-4 py-3 bg-muted/30 rounded-2xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Tell me what's on your mind..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-full hover:from-primary/90 hover:to-primary transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 flex items-center justify-center gap-2 group hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message! 💌
                </>
              )}
            </button>

            {status === 'success' && (
              <p
                role="status"
                className="text-sm text-center text-green-600 bg-green-50 border border-green-200 rounded-2xl px-4 py-3"
              >
                Tu mensaje fue enviado correctamente.
              </p>
            )}

            {status === 'error' && (
              <p
                role="alert"
                className="text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-2xl px-4 py-3"
              >
                No fue posible enviar el mensaje. Intenta nuevamente.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
