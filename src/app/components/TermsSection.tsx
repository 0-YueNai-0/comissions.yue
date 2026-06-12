import { Shield, Clock, Ban, FileText, RefreshCw, CreditCard } from 'lucide-react';

const terms = [
  {
    icon: CreditCard,
    title: 'Payment',
    points: [
      '50% upfront deposit required to start work',
      'Remaining 50% due before final file delivery',
      'Accepted methods: PayPal, Stripe, Ko-fi',
      'All prices in USD',
    ],
  },
  {
    icon: Clock,
    title: 'Timeline',
    points: [
      'Standard turnaround: 3-7 business days',
      'Complex scenes may take up to 14 days',
      'Rush delivery available for +$50',
      'Regular WIP updates provided',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Revisions',
    points: [
      'Major revisions during sketch phase: free',
      'Minor tweaks during final phase: included',
      'Additional revision rounds: $3 each',
      'Must request within 7 days of delivery',
    ],
  },
  {
    icon: Shield,
    title: 'Usage Rights',
    points: [
      'Personal use included in all commissions',
      'Artist retains right to display work in portfolio',
      'Credit appreciated but not required',
    ],
  },
  {
    icon: Ban,
    title: 'What I Don\'t Draw',
    points: [
      'Hateful or discriminatory content',
      'NSFW/explicit adult content',
      'Heavy gore or violence',
      'Traced or copied existing artwork',
      'Furries (sorry)',
    ],
  },
  {
    icon: FileText,
    title: 'Delivery',
    points: [
      'High-resolution PNG (2500px minimum)',
      'Delivered via email or Google Drive',
      'Watermark-free finals after full payment',
    ],
  },
];

export function TermsSection() {
  return (
    <section id="terms" className="py-24 relative bg-gradient-to-b from-transparent via-muted/20 to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">📜</span>
            <span className="text-primary font-bold">Important Info</span>
            <span className="text-2xl">📜</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Terms & Conditions
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Please read these carefully before ordering! By commissioning me, you agree to these terms~ 💕
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term, index) => {
            const Icon = term.icon;
            return (
              <div
                key={index}
                className="bg-white border-3 border-border rounded-3xl p-6 hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{term.title}</h3>
                  </div>

                  <ul className="space-y-2">
                    {term.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/10 via-secondary to-accent/10 border border-border/50 rounded-2xl p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Refund Policy</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Full Refund Available:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Before work has started</li>
                  <li>• If I cannot complete the commission</li>
                  <li>• If delivery exceeds 30 days (unless agreed)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Partial Refund (50%):</p>
                <ul className="space-y-1 ml-4">
                  <li>• After sketch phase is complete</li>
                  <li>• Client cancellation after WIP approval</li>
                  <li>• Completed work will still be delivered</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about these terms?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary hover:text-primary/80 underline"
            >
              Contact me
            </button>{' '}
            and I'll be happy to clarify.
          </p>
        </div>
      </div>
    </section>
  );
}
