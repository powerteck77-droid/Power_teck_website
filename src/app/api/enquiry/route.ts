import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, fullName, email } = body;

    if (!type || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required enquiry parameters (type, fullName, email)' },
        { status: 400 }
      );
    }

    const newEnquiry = {
      ...body,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // If Supabase is connected in environment, persist to 'enquiries' table
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('enquiries').insert([newEnquiry]);
      if (error) {
        console.warn('Supabase insert warning:', error.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received successfully. Our team will contact you.',
        enquiry: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process enquiry', details: message },
      { status: 500 }
    );
  }
}
