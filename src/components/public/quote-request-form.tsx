"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  quoteRequestSchema,
  type QuoteRequestValues,
} from "@/lib/quote-requests/schema";
import { submitQuoteRequest } from "@/lib/quote-requests/submit";

const livingPlans = [
  "Sürekli yaşam",
  "Hafta sonu / dönemsel kullanım",
  "Misafir evi",
  "Çalışma / yaratıcı alan",
  "Henüz net değil",
] as const;

const inputClassName =
  "min-h-13 w-full border border-charcoal/20 bg-soft-white px-4 text-base text-charcoal outline-none transition-[border-color,box-shadow] placeholder:text-warm-gray/70 hover:border-charcoal/35 focus:border-charcoal focus-visible:ring-1 focus-visible:ring-charcoal/25 motion-reduce:transition-none lg:min-h-14 lg:px-5";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-2 text-sm leading-5 text-[#8a3f32]">
      {message}
    </p>
  );
}

export function QuoteRequestForm({ modelNames }: { modelNames: string[] }) {
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);
  const submissionPending = useRef(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      model: "",
      livingPlan: "",
      projectLocation: "",
      message: "",
      privacyConsent: false,
    },
  });

  const onValidSubmit = async (values: QuoteRequestValues) => {
    try {
      await submitQuoteRequest(values);
      reset();
      setSubmissionNotice(
        "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      );
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Quote request submission failed:", error);
      }
      setSubmissionNotice(
        "Teklif talebi gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.",
      );
    }
  };

  return (
    <form
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        if (submissionPending.current) return;
        submissionPending.current = true;
        setSubmissionNotice(null);
        try {
          await handleSubmit(onValidSubmit)(event);
        } finally {
          submissionPending.current = false;
        }
      }}
      aria-busy={isSubmitting}
      className="border-t border-charcoal/15"
    >
      <div className="grid gap-x-6 gap-y-7 border-b border-charcoal/15 py-8 sm:grid-cols-2 sm:py-10">
        <div>
          <label htmlFor="fullName" className="mb-3 block text-sm font-medium text-charcoal">
            Ad Soyad <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClassName}
            {...register("fullName")}
          />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>

        <div>
          <label htmlFor="email" className="mb-3 block text-sm font-medium text-charcoal">
            E-posta <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClassName}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-3 block text-sm font-medium text-charcoal">
            Telefon <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClassName}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <div>
          <label htmlFor="model" className="mb-3 block text-sm font-medium text-charcoal">
            İlgilendiğiniz Model <span aria-hidden="true">*</span>
          </label>
          <select
            id="model"
            aria-invalid={Boolean(errors.model)}
            aria-describedby={errors.model ? "model-error" : undefined}
            className={`${inputClassName} appearance-none bg-[linear-gradient(45deg,transparent_50%,#74736D_50%),linear-gradient(135deg,#74736D_50%,transparent_50%)] bg-[position:calc(100%-19px)_50%,calc(100%-14px)_50%] bg-[size:5px_5px,5px_5px] bg-no-repeat pr-11`}
            {...register("model")}
          >
            <option value="">Model seçin</option>
            {modelNames.map((modelName) => (
              <option key={modelName} value={modelName}>
                {modelName}
              </option>
            ))}
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
          <FieldError id="model-error" message={errors.model?.message} />
        </div>

        <div>
          <label htmlFor="livingPlan" className="mb-3 block text-sm font-medium text-charcoal">
            Yaşam Planınız
          </label>
          <select
            id="livingPlan"
            className={`${inputClassName} appearance-none bg-[linear-gradient(45deg,transparent_50%,#74736D_50%),linear-gradient(135deg,#74736D_50%,transparent_50%)] bg-[position:calc(100%-19px)_50%,calc(100%-14px)_50%] bg-[size:5px_5px,5px_5px] bg-no-repeat pr-11`}
            {...register("livingPlan")}
          >
            <option value="">Seçim yapın</option>
            {livingPlans.map((livingPlan) => (
              <option key={livingPlan} value={livingPlan}>
                {livingPlan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectLocation" className="mb-3 block text-sm font-medium text-charcoal">
            Proje Konumu
          </label>
          <input
            id="projectLocation"
            type="text"
            autoComplete="address-level2"
            placeholder="Antalya, Kaş"
            className={inputClassName}
            {...register("projectLocation")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-3 block text-sm font-medium text-charcoal">
            Eklemek İstedikleriniz
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Alan ihtiyacınız, teslim beklentiniz veya paylaşmak istediğiniz diğer detaylar..."
            className={`${inputClassName} min-h-40 resize-y py-4 leading-7 lg:py-[1.125rem]`}
            {...register("message")}
          />
        </div>
      </div>

      <div className="py-8 sm:py-10">
        <label className="flex max-w-2xl cursor-pointer items-start gap-4 text-[0.9375rem] leading-7 text-charcoal/75 sm:gap-5">
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent ? "privacyConsent-error" : undefined
            }
            className="mt-1 size-4 shrink-0 appearance-none border border-charcoal/40 bg-soft-white checked:border-charcoal checked:bg-charcoal checked:bg-[linear-gradient(135deg,transparent_43%,#FAF9F6_43%,#FAF9F6_57%,transparent_57%)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-charcoal"
            {...register("privacyConsent")}
          />
          <span>
            Kişisel verilerimin teklif talebimin değerlendirilmesi amacıyla
            kullanılmasını kabul ediyorum. <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError
          id="privacyConsent-error"
          message={errors.privacyConsent?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-8 inline-flex min-h-14 items-center border border-charcoal bg-charcoal px-7 text-sm font-medium tracking-[0.03em] text-soft-white transition-colors duration-300 hover:bg-transparent hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal motion-reduce:transition-none"
        >
          {isSubmitting ? "Gönderiliyor..." : "Teklif Talebi Gönder"}
          <span
            aria-hidden="true"
            className="ml-3 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </button>

        {submissionNotice ? (
          <p
            role="status"
            aria-atomic="true"
            className="mt-5 max-w-xl border-l border-olive pl-4 text-sm leading-6 text-charcoal/70"
          >
            {submissionNotice}
          </p>
        ) : null}
      </div>
    </form>
  );
}
