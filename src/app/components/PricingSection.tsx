import { Check, Plus, Sparkles } from 'lucide-react';

const normalTiers = [
  { size: 'Bust', lineArt: 4, colorBase: 9, rendered: 11 },
  { size: 'Half Body', lineArt: 6, colorBase: 10, rendered: 13 },
  { size: 'Full Body', lineArt: 8, colorBase: 12, rendered: 15 },
];

const chibiTiers = [
  { size: 'Half Body', colorBase: 5, rendered: 8 },
  { size: 'Full Body', colorBase: 5, rendered: 8 },
];

const especialItems = [
  {
    name: 'Mini Comic',
    price: '$10',
    note: 'Price varies by length & detail',
    includes: ['Multiple panels', 'Sequential art', 'Custom story'],
  },
  {
    name: 'Character Sheet',
    price: '$25',
    note: null,
    includes: ['2 full bodies', '1 half body', '1 chibi'],
  },
  {
    name: 'Model Sheet',
    price: '$25',
    note: null,
    includes: ['2 full bodies', '3 half bodies', 'Expression sheet'],
  },
];

export function PricingSection() {
  const scrollToOrder = () => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-secondary/20 via-muted/20 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <span className="text-primary font-bold">Fair Pricing</span>
            <span className="text-2xl">💰</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Transparent & Affordable!
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Clear upfront pricing with no hidden fees! All commissions include revisions and source files~ 💖
          </p>
        </div>

        {/* Normal commissions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full text-sm shadow-md">Normal</span>
            <p className="text-sm text-muted-foreground">Line art, Flat Color & Rendered</p>
          </div>
          <div className="bg-white border-3 border-border rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-sm">
              <thead className="bg-primary/10 border-b-2 border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-foreground/70">Size</th>
                  <th className="px-6 py-3 text-center font-bold text-foreground/70">Line Art</th>
                  <th className="px-6 py-3 text-center font-bold text-foreground/70">Flat Color</th>
                  <th className="px-6 py-3 text-center font-bold text-foreground/70">Rendered</th>
                </tr>
              </thead>
              <tbody>
                {normalTiers.map((tier, idx) => (
                  <tr key={tier.size} className={`border-t border-border/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'} hover:bg-primary/5 transition-colors`}>
                    <td className="px-6 py-4 font-bold text-foreground">{tier.size}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 font-bold rounded-full">${tier.lineArt}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 font-bold rounded-full">${tier.colorBase}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded-full">${tier.rendered}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chibi commissions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-400 to-violet-400 text-white font-bold rounded-full text-sm shadow-md">Chibi</span>
            <p className="text-sm text-muted-foreground">Super cute chibi style commissions</p>
          </div>
          <div className="bg-white border-3 border-border rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-sm">
              <thead className="bg-purple-50 border-b-2 border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-foreground/70">Type</th>
                  <th className="px-6 py-3 text-center font-bold text-foreground/70">Flat Color</th>
                  <th className="px-6 py-3 text-center font-bold text-foreground/70">Renderized</th>
                </tr>
              </thead>
              <tbody>
                {chibiTiers.map(tier => (
                  <tr key={tier.size} className="hover:bg-purple-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">
                      {tier.size}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 font-bold rounded-full">${tier.colorBase}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded-full">${tier.rendered}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Especial commissions */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 font-bold rounded-full text-sm shadow-md">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              Especial
            </span>
            <p className="text-sm text-muted-foreground">Mini comics, character sheets & model sheets</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {especialItems.map((item) => (
              <div
                key={item.name}
                className="relative bg-white border-3 border-border rounded-3xl p-6 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/15"
              >
                <div className="space-y-4">
                  <div className="space-y-1 text-center">
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{item.price}</div>
                    {item.note && <p className="text-xs text-muted-foreground italic">{item.note}</p>}
                  </div>
                  <div className="space-y-2 pt-4 border-t-2 border-border/30">
                    {item.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{inc}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={scrollToOrder}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-accent to-accent/80 text-white font-bold rounded-full hover:from-accent/90 hover:to-accent transition-all shadow-md hover:shadow-lg hover:scale-105 text-sm"
                  >
                    Order Now! ✨
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="bg-white border-3 border-primary/20 rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Plus className="w-7 h-7 text-accent" />
              <h3 className="text-2xl font-bold">Add-ons & Extras!</h3>
              <Plus className="w-7 h-7 text-accent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Additional character', price: '+50%' },
                { name: 'Complex background', price: '+$8' },
                { name: 'Extra revision round', price: '+$3' },
                { name: 'Rush delivery (2-3 days)', price: '+$10' },
                { name: 'Basic background', price: '+$3' },
                { name: 'Process video/timelapse', price: '+$2' },
              ].map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/40 to-muted/40 rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all hover:scale-105"
                >
                  <span className="text-sm font-semibold">{addon.name}</span>
                  <span className="font-bold text-primary">{addon.price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-4 border-t-2 border-border/30 text-center">
              ⭐ All prices in USD • Payment required upfront • Custom quotes available! ⭐
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
