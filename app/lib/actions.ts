'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId') as string;
  const amount = Number(formData.get('amount'));
  const status = formData.get('status') as string;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}