"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { AdminContact, AdminLead } from "@/lib/admin/leads";

const statusColumns = [
  { value: "new", label: "Нова" },
  { value: "in_progress", label: "В роботі" },
  { value: "qualified", label: "Кваліфікована" },
  { value: "proposal_sent", label: "КП відправлено" },
  { value: "won", label: "Виграна" },
  { value: "lost", label: "Втрачена" },
  { value: "no_response", label: "Без відповіді" },
];

function getContactHref(contact: AdminContact) {
  if (contact.type === "telegram") {
    const username =
      contact.value.startsWith("@") ? contact.value.slice(1) : contact.label?.match(/@([A-Za-z0-9_]+)/)?.[1];

    return username ? `https://t.me/${username}` : null;
  }

  if (contact.type === "phone") {
    return `tel:${contact.value}`;
  }

  if (contact.type === "viber") {
    return `viber://chat?number=${encodeURIComponent(contact.value)}`;
  }

  if (contact.type === "whatsapp") {
    return `https://wa.me/${contact.value.replace(/\D/g, "")}`;
  }

  if (contact.type === "email") {
    return `mailto:${contact.value}`;
  }

  return null;
}

function getPrimaryContact(contacts: AdminContact[]) {
  return contacts.find((contact) => contact.isPrimary) ?? contacts[0] ?? null;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function KanbanCard({ lead }: { lead: AdminLead }) {
  const primaryContact = getPrimaryContact(lead.contacts);
  const contactHref = primaryContact ? getContactHref(primaryContact) : null;
  const clientName = lead.client.company ?? lead.client.name ?? "Клієнт без імені";

  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", lead.publicId);
        event.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grab rounded-[9px] border border-[#E3DBD0] bg-[#FFFCF7] p-3 shadow-[0_8px_20px_rgba(80,62,43,0.07)] active:cursor-grabbing"
    >
      <div className="grid gap-2">
        <Link href={`/admin/leads/${lead.publicId}`} className="break-words text-base font-bold text-[#A95815] hover:text-[#F2994A]">
          {lead.publicId}
        </Link>
      </div>
      <p className="mt-2 text-base font-bold leading-6 text-[#25201A]">{clientName}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-[#5F5A54]">{lead.productInterest ?? "Напрям не вказано"}</p>
      <div className="mt-3 grid gap-2 border-t border-[#EEE6DC] pt-3">
        {primaryContact ? (
          contactHref ? (
            <a
              href={contactHref}
              className="w-fit rounded-[8px] border border-[#D8CFC2] bg-white px-2.5 py-1.5 text-sm font-bold text-[#5F5A54] transition hover:border-[#F2994A]/55 hover:text-[#A95815]"
            >
              {primaryContact.value}
            </a>
          ) : (
            <span className="text-sm font-semibold text-[#6F675E]">{primaryContact.value}</span>
          )
        ) : null}
        <p className="text-sm font-semibold text-[#8A8176]">{formatDate(lead.createdAt)}</p>
      </div>
    </article>
  );
}

export function LeadsKanbanBoard({ leads }: { leads: AdminLead[] }) {
  const [items, setItems] = useState(leads);
  const [pendingPublicId, setPendingPublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const leadsByStatus = useMemo(
    () =>
      statusColumns.map((column) => ({
        ...column,
        leads: items.filter((lead) => lead.status === column.value),
      })),
    [items],
  );

  function moveLead(publicId: string, status: string) {
    const currentLead = items.find((lead) => lead.publicId === publicId);

    if (!currentLead || currentLead.status === status) {
      return;
    }

    const previousItems = items;
    setItems((value) =>
      value.map((lead) => (lead.publicId === publicId ? { ...lead, status } : lead)),
    );
    setPendingPublicId(publicId);
    setError(null);

    startTransition(async () => {
      const response = await fetch("/admin/leads/status", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ publicId, status }),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        setItems(previousItems);
        setError(
          typeof responseBody?.error === "string"
            ? responseBody.error
            : "Не вдалося змінити статус. Онови сторінку і спробуй ще раз.",
        );
      }

      setPendingPublicId(null);
    });
  }

  return (
    <section className="space-y-3">
      {error ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-base font-semibold text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid grid-flow-col auto-cols-[15.5rem] gap-3 overflow-x-auto pb-3">
        {leadsByStatus.map((column) => (
          <section
            key={column.value}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
            }}
            onDrop={(event) => {
              event.preventDefault();
              moveLead(event.dataTransfer.getData("text/plain"), column.value);
            }}
            className="min-h-[20rem] w-[15.5rem] overflow-hidden rounded-[10px] border border-[#E1D7C8] bg-white"
          >
            <div className="flex min-h-14 items-center gap-2 border-b border-[#EEE6DC] bg-[#F4EFE8] px-3 py-3">
              <h2 className="min-w-0 text-sm font-bold uppercase tracking-[0.12em] text-[#8A8176]">
                {column.label}
              </h2>
              <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#FFFCF7] px-2 text-sm font-bold text-[#5F5A54]">
                {column.leads.length}
              </span>
            </div>
            <div className="grid gap-2.5 p-2.5">
              {column.leads.map((lead) => (
                <div key={lead.id} className={pendingPublicId === lead.publicId ? "opacity-55" : undefined}>
                  <KanbanCard lead={lead} />
                </div>
              ))}
              {!column.leads.length ? (
                <p className="w-full max-w-full rounded-[9px] border border-dashed border-[#D8CFC2] px-2 py-4 text-center text-sm font-semibold leading-5 text-[#8A8176]">
                  Немає заявок
                </p>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
