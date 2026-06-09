import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { paymentMethod, amountZar, customerEmail, productIdentifier } = await req.json();
    const uniqueTxRef = `TX-${Date.now()}`;

    switch (paymentMethod) {
      case 'payfast':
        return NextResponse.json({
          success: true,
          gateway: 'payfast',
          endpoint: 'https://sandbox.payfast.co.za/eng/process',
          payload: { merchant_id: '10000100', amount: amountZar.toFixed(2), item_name: productIdentifier }
        });

      case 'ozow':
        return NextResponse.json({
          success: true,
          gateway: 'ozow',
          endpoint: 'https://pay.ozow.com/',
          payload: { siteCode: 'MOCK-01', amount: amountZar.toFixed(2), transactionReference: uniqueTxRef }
        });

      case 'fnb_eft':
      default:
        return NextResponse.json({
          success: true,
          gateway: 'direct_eft',
          bankingDetails: {
            institution: 'First National Bank (FNB)',
            accountName: 'Pure Pull Solutions PTY Ltd',
            accountNumber: '62901122334',
            branchCode: '250655',
            accountType: 'Business Checking Account',
            requiredReference: `PULL-${uniqueTxRef.slice(-6)}`,
            instructions: 'Send verification receipt to confirmation@yourdomain.co.za'
          }
        });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
