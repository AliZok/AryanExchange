import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase.js';

export async function GET() {
  try {
    const { data: currencies, error } = await supabase
      .from('currencies')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching currencies:', error);
      return NextResponse.json({ error: 'Failed to fetch currencies' }, { status: 500 });
    }

    return NextResponse.json(currencies || []);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data: currency, error } = await supabase
      .from('currencies')
      .insert({
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating currency:', error);
      return NextResponse.json({ error: 'Failed to create currency' }, { status: 500 });
    }

    return NextResponse.json(currency, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const { data: currency, error } = await supabase
      .from('currencies')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating currency:', error);
      return NextResponse.json({ error: 'Failed to update currency' }, { status: 500 });
    }

    return NextResponse.json(currency);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const { error } = await supabase
      .from('currencies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting currency:', error);
      return NextResponse.json({ error: 'Failed to delete currency' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
