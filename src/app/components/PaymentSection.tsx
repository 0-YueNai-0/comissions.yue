import { CreditCard, Wallet, DollarSign, Shield } from 'lucide-react';

const paymentMethods = [
  {
    icon: CreditCard,
    name: 'PayPal',
    description: 'Most popular option. Secure and widely accepted worldwide.',
    features: ['Instant processing', 'Buyer protection', 'Credit/debit cards'],
    preferred: true,
  },
];

export function PaymentSection() {
  return (
    <section id="payment" className="py-24 bg-gradient-to-b from-muted/20 via-secondary/30 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">💳</span>
            <span className="text-primary font-bold">Payment Option</span>
            <span className="text-2xl">💳</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Safe & Secure Payments!
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
           If you use any other bank, please talk to me first to see what we can do 💕
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-12">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className={`relative bg-white border-3 rounded-3xl p-6 ${
                  method.preferred
                    ? 'border-primary shadow-2xl shadow-primary/20'
                    : 'border-border hover:border-primary/50'
                } transition-all hover:-translate-y-1 duration-300`}
              >
                {method.preferred && (
                  <div className="absolute -top-4 right-4 px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full text-sm font-bold shadow-xl animate-pulse">
                    ⭐ Preferred!
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border/50">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-3 border-primary/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Payment Process</h3>
            </div>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  1
                </span>
                <span>Submit commission request through the order form</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  2
                </span>
                <span>Receive invoice with 50% deposit amount</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  3
                </span>
                <span>Pay deposit via your preferred method</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  4
                </span>
                <span>Work begins after deposit confirmation</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                  5
                </span>
                <span>Final 50% payment before file delivery</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-primary/15 via-secondary/30 to-accent/15 border-3 border-primary/20 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold">Important Notes</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>All prices are quoted in USD. Currency conversion fees may apply.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Payment must be completed before I begin working on your commission.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Invoice will include detailed breakdown of base price and any add-ons.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Payment confirmation receipts will be provided for your records.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span>Having payment issues? Contact me and we'll find a solution.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-3 border-primary/30 rounded-3xl p-6 text-center shadow-lg">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Secure payments:</span> All payment processors use industry-standard
            encryption and security measures to protect your financial information.
          </p>
        </div>
      </div>
    </section>
  );
}
