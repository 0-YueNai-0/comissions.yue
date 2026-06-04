import { useState } from 'react';
import { Pencil, Trash2, Send } from 'lucide-react';

const COMMISSION_TYPES = [
  {
    category: 'Normal',
    options: [
      { label: 'Line art - Bust', price: 4 },
      { label: 'Line art - Half Body', price: 6 },
      { label: 'Line art - Full Body', price: 8 },
      { label: 'Color base - Bust', price: 9 },
      { label: 'Color base - Half Body', price: 10 },
      { label: 'Color base - Full Body', price: 13 },
      { label: 'Renderizado - Bust', price: 11 },
      { label: 'Renderizado - Half Body', price: 13 },
      { label: 'Renderizado - Full Body', price: 15 },
    ],
  },
  {
    category: 'Chibi',
    options: [
      { label: 'Chibi - Color base', price: 5 },
      { label: 'Chibi - Renderizado', price: 8 },
    ],
  },
  {
    category: 'Especial',
    options: [
      { label: 'Mini cómic', price: 10 },
      { label: 'Ficha de personaje', price: 25 },
      { label: 'Hoja de modelo', price: 25 },
    ],
  },
];

interface OrderItem {
  id: number;
  tipo: string;
  costo: number;
  specs: string;
}

export function OrderSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [specs, setSpecs] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  const selectedOption = COMMISSION_TYPES.flatMap(c => c.options).find(o => o.label === selectedType);

  const handleAdd = () => {
    if (!selectedType || !selectedOption) return;
    if (editingId !== null) {
      setItems(items.map(item =>
        item.id === editingId
          ? { ...item, tipo: selectedType, costo: selectedOption.price, specs }
          : item
      ));
      setEditingId(null);
    } else {
      setItems([...items, { id: nextId, tipo: selectedType, costo: selectedOption.price, specs }]);
      setNextId(nextId + 1);
    }
    setSelectedType('');
    setSpecs('');
  };

  const handleEdit = (item: OrderItem) => {
    setSelectedType(item.tipo);
    setSpecs(item.specs);
    setEditingId(item.id);
  };

  const handleRemove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    if (editingId === id) { setEditingId(null); setSelectedType(''); setSpecs(''); }
  };

  const total = items.reduce((sum, item) => sum + item.costo, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { alert('Please add at least one commission to your order! 🎨'); return; }
    alert(`Thank you, ${name || 'dear client'}! Your order has been received! I'll contact you at ${email || 'your email'} within 24 hours~ 💖✨`);
  };

  return (
    <section id="order" className="py-24 relative bg-gradient-to-b from-transparent via-secondary/20 to-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-primary font-bold">Let's Work Together</span>
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Place Your Order!
          </h2>
          <p className="text-lg text-foreground/70">
            Fill out your details, choose your commissions and add them to your order~ 💕
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-3 border-primary/20 rounded-3xl p-8 shadow-2xl space-y-6">

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-primary">Name (Username) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name or username"
                className="w-full px-4 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-primary">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>
          </div>

          {/* Commission type + Specs */}
          <div>
            <p className="text-sm font-semibold text-foreground/80 mb-3">Commission type</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Radio list */}
              <div className="border-2 border-border rounded-2xl p-4 space-y-3 bg-muted/20">
                {COMMISSION_TYPES.map(cat => (
                  <div key={cat.category}>
                    <p className="font-bold text-foreground text-sm mb-1">{cat.category}</p>
                    <div className="space-y-1 pl-2">
                      {cat.options.map(opt => (
                        <label key={opt.label} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="commissionType"
                            value={opt.label}
                            checked={selectedType === opt.label}
                            onChange={() => setSelectedType(opt.label)}
                            className="accent-primary w-3.5 h-3.5"
                          />
                          <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            {opt.label}
                          </span>
                          <span className="ml-auto text-xs font-bold text-primary">${opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Specs textarea */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground/80">Specifications:</label>
                <textarea
                  value={specs}
                  onChange={e => setSpecs(e.target.value)}
                  rows={10}
                  placeholder="Describe your character, pose, expression, references, colors..."
                  className="w-full h-full min-h-[200px] px-3 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Add button */}
          <div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedType}
              className="px-8 py-2.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-yellow-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 text-sm"
            >
              {editingId !== null ? 'Update ✏️' : 'Add ➕'}
            </button>
          </div>

          {/* Order table */}
          <div className="border-2 border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-yellow-100 border-b-2 border-border">
                <tr>
                  <th className="px-4 py-2.5 text-left font-bold text-foreground/70 w-12">No.</th>
                  <th className="px-4 py-2.5 text-left font-bold text-foreground/70">Type</th>
                  <th className="px-4 py-2.5 text-right font-bold text-foreground/70 w-20">Cost</th>
                  <th className="px-4 py-2.5 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No commissions added yet~ Select a type and click Add! 🎨
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id} className={`border-t border-border/40 ${editingId === item.id ? 'bg-primary/5' : 'hover:bg-muted/30'} transition-colors`}>
                      <td className="px-4 py-2.5 text-foreground/60">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-foreground">{item.tipo}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-primary">${item.costo}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          <button type="button" onClick={() => handleEdit(item)} className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={() => handleRemove(item.id)} className="p-1 rounded-lg hover:bg-rose-100 text-rose-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <p className="text-base font-bold text-foreground">
              Total: <span className="text-primary text-xl">${total}</span>
            </p>
          </div>

          {/* Terms note */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              By submitting this form, you agree to our Terms and Conditions and Payment Policy.
              A 50% deposit is required to start work.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-full hover:from-primary/90 hover:to-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-2 group hover:scale-105"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Submit Order! 💖
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Prefer to reach out directly?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary hover:text-primary/80 underline"
            >
              Contact me here
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
