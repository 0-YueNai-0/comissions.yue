import { useState } from 'react';
import { Pencil, Trash2, Send, Loader2 } from 'lucide-react';
import {
  buildOrderPayload,
  type Commission,
  type CommissionCategory,
  
} from '../types/order';

const COMMISSION_TYPES: CommissionCategory[] = [
  {
    category: 'Normal',
    options: [
      { label: 'Line art - Bust', price: 4 },
      { label: 'Line art - Half Body', price: 6 },
      { label: 'Line art - Full Body', price: 8 },
      { label: 'Flat Color - Bust', price: 9 },
      { label: 'Flat Color - Half Body', price: 10 },
      { label: 'Flat Color - Full Body', price: 12 },
      { label: 'Rendered - Bust', price: 11 },
      { label: 'Rendered - Half Body', price: 13 },
      { label: 'Rendered - Full Body', price: 15 },
    ],
  },
  {
    category: 'Chibi',
    options: [
      { label: 'Half Body (Small) - Flat Color', price: 2 },
      { label: 'Half Body (Small) - Rendered', price: 6 },
      { label: 'Full Body (Small) - Flat Color', price: 5 },
      { label: 'Full body (Small) - Rendered', price: 8 },
      { label: 'Half Body (Large) - Flat Color', price: 5 },
      { label: 'Half Body (Large) - Rendered', price: 9 },
      { label: 'Full Body (Large) - Flat Color', price: 8 },
      { label: 'Full Body (Large) - Rendered', price: 12 },
    ],
  },
  {
    category: 'Special',
    options: [
      { label: 'Mini Comic', price: 10 },
      { label: 'Character Sheet', price: 25 },
      { label: 'Model Sheet', price: 25 },
    ],
  },
   {
  category: 'Add-ons & Extras',
     options: [
      { label: 'Rush delivery (2-3 days)', price: 10 },
      { label: 'Complex background', price: 8 },
      { label: 'Basic background', price: 3 },
      { label: 'Extra revision round', price: 3 },
      { label: 'Process video/timelapse', price: 2 },
     ],
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const ALL_OPTIONS = COMMISSION_TYPES.flatMap((category) => category.options);

function findOptionByLabel(label: string) {
  return ALL_OPTIONS.find((option) => option.label === label);
}

export function OrderSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCommissionType, setSelectedCommissionType] = useState('');
  const [additionalCharacter, setAdditionalCharacter] = useState(false);
  const [specifications, setSpecifications] = useState('');
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  const [addError, setAddError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
const isEditing = editingId !== null;
const total = commissions.reduce(
  (sum, commission) =>
    sum +
    (commission.additionalCharacter
      ? Math.round(commission.price * 1.5)
      : commission.price),
  0
);
  const resetCommissionForm = () => {
    setSelectedCommissionType('');
    setSpecifications('');
    setEditingId(null);
    setAddError(null);
    setAdditionalCharacter(false);
  };

  const resetEntireForm = () => {
    setName('');
    setEmail('');
    setCommissions([]);
    setNextId(1);
    resetCommissionForm();
    setAdditionalCharacter(false);
    setSubmitError(null);
  };

  const handleAddOrUpdate = () => {
    setAddError(null);
    }

    if (!selectedCommissionType) {
      setAddError('Select a commission type before adding.');
      return;
    }

    if (!specifications.trim()) {
      setAddError('Describe the specifications of your commission.');
      return;
    }

    const selectedOption = findOptionByLabel(selectedCommissionType);

if (!selectedOption) {
  setAddError('The selected commission type is not valid.');
  return;
}

    
 if (isEditing) {
  setCommissions((prev) =>
    prev.map((commission) =>
      commission.id === editingId
        ? {
            ...commission,
            type: selectedCommissionType,
            price: selectedOption.price,
            additionalCharacter: additionalCharacter,
            specifications: specifications.trim(),
          }
        : commission,
    ),
  );
    } else {
      setCommissions((prev) => [
        ...prev,
        {
  id: nextId,
  type: selectedCommissionType,
  price: selectedOption.price,
  additionalCharacter: additionalCharacter,
  specifications: specifications.trim(),
},
      ]);
      setNextId((prev) => prev + 1);
    }

    resetCommissionForm();
  };

  const handleEdit = (commission: Commission) => {
    setSelectedCommissionType(commission.type);
    setSpecifications(commission.specifications);
    setEditingId(commission.id);
    setAddError(null);
    setSubmitError(null);
  };

  const handleDelete = (id: number) => {
    setCommissions((prev) => prev.filter((commission) => commission.id !== id));

    if (editingId === id) {
      resetCommissionForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitStatus('idle');

    if (!name.trim()) {
      setSubmitError('Enter your name or username.');
      return;
    }

    if (!email.trim()) {
      setSubmitError('Enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setSubmitError('The email address is invalid.');
      return;
    }

    if (commissions.length === 0) {
      setSubmitError('Add at least one commission to your order.');
      return;
    }

    setSubmitStatus('loading');

    try {
      const orderPayload = buildOrderPayload(name, email, commissions);

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Error sending order');
      }

      setSubmitStatus('success');
      resetEntireForm();
    } catch {
      setSubmitStatus('error');
      setSubmitError('Error sending order');
    }
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
              <label htmlFor="order-name" className="block text-sm font-semibold text-primary">
                Name (Username) *
              </label>
              <input
                type="text"
                id="order-name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (submitError || submitStatus === 'success') {
                    setSubmitError(null);
                    setSubmitStatus('idle');
                  }
                }}
                disabled={isSubmitting}
                placeholder="Your name or username"
                className="w-full px-4 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="order-email" className="block text-sm font-semibold text-primary">
                Email *
              </label>
              <input
                type="email"
                id="order-email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitError || submitStatus === 'success') {
                    setSubmitError(null);
                    setSubmitStatus('idle');
                  }
                }}
                disabled={isSubmitting}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Commission type + Specifications */}
          <div>
            <p className="text-sm font-semibold text-foreground/80 mb-3">Commission type</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-2 border-border rounded-2xl p-4 space-y-3 bg-muted/20">
                {COMMISSION_TYPES.map((category) => (
                  <div key={category.category}>
                    <p className="font-bold text-foreground text-sm mb-1">{category.category}</p>
                    <div className="space-y-1 pl-2">
                      {category.options.map((option) => (
                        <label key={option.label} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="commissionType"
                            value={option.label}
                            checked={selectedCommissionType === option.label}
                            onChange={() => {
                              setSelectedCommissionType(option.label);
                              setAddError(null);
                            }}
                            disabled={isSubmitting}
                            className="accent-primary w-3.5 h-3.5"
                          />
                          <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            {option.label}
                          </span>
                          <span className="ml-auto text-xs font-bold text-primary">${option.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

  <div className="space-y-1.5">
  <label htmlFor="order-specifications" className="block text-sm font-semibold text-foreground/80">
    Specifications:
  </label>

  <textarea
    id="order-specifications"
    value={specifications}
    onChange={(e) => {
      setSpecifications(e.target.value);
      setAddError(null);
    }}
    disabled={isSubmitting}
    rows={10}
    placeholder="Describe your character, pose, expression, references, colors..."
    className="w-full min-h-[200px] px-3 py-2.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none text-sm"
  />

  <label className="flex items-center gap-2 text-sm mt-2">
    <input
      type="checkbox"
      checked={additionalCharacter}
      onChange={(e) => setAdditionalCharacter(e.target.checked)}
    />
    Additional Character (+50%)
  </label>
</div>

          {/* Add / Update button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleAddOrUpdate}
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-yellow-900 font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 text-sm"
            >
              {isEditing ? 'Update ✏️' : 'Add ➕'}
            </button>

            {addError && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                {addError}
              </p>
            )}
          </div>

          {/* Order table */}
          <div className="border-2 border-border rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-yellow-100 border-b-2 border-border">
                <tr>
                  <th className="px-4 py-2.5 text-left font-bold text-foreground/70 w-12">No.</th>
                  <th className="px-4 py-2.5 text-left font-bold text-foreground/70 w-40">Type</th>
                  <th className="px-4 py-2.5 text-left font-bold text-foreground/70">Specifications</th>
                  <th className="px-4 py-2.5 text-right font-bold text-foreground/70 w-20">Cost</th>
                  <th className="px-4 py-2.5 text-center font-bold text-foreground/70 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No commissions added yet~ Select a type and click Add! 🎨
                    </td>
                  </tr>
                ) : (
                  commissions.map((commission, index) => (
                    <tr
                      key={commission.id}
                      className={`border-t border-border/40 ${
                        editingId === commission.id ? 'bg-primary/5' : 'hover:bg-muted/30'
                      } transition-colors`}
                    >
                      <td className="px-4 py-2.5 text-foreground/60 align-top">{index + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-foreground align-top">{commission.type}</td>
                      <td className="px-4 py-2.5 text-foreground/80 align-top whitespace-pre-wrap break-words">
                        {commission.specifications}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-primary align-top">
                        ${commission.additionalCharacter
  ? Math.round(commission.price * 1.5)
  : commission.price}
                      </td>
                      <td className="px-4 py-2.5 align-top">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEdit(commission)}
                            disabled={isSubmitting}
                            aria-label={`Edit ${commission.type}`}
                            className="p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(commission.id)}
                            disabled={isSubmitting}
                            aria-label={`Delete ${commission.type}`}
                            className="p-1 rounded-lg hover:bg-rose-100 text-rose-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
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
          <form>
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-full hover:from-primary/90 hover:to-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-2 group hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando orden...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Submit Order! 💖
              </>
            )}
          </button>

          {submitStatus === 'success' && (
            <p
              role="status"
              className="text-sm text-center text-green-600 bg-green-50 border border-green-200 rounded-2xl px-4 py-3"
            >
              Orden enviada correctamente.
            </p>
          )}

          {submitError && (
            <p
              role="alert"
              className="text-sm text-center text-red-600 bg-red-50 border border-red-200 rounded-2xl px-4 py-3"
            >
              {submitError}
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Prefer to reach out directly?{' '}
            <button
              type="button"
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
