import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const { passcode } = await req.json();

  const correctPasscode = Deno.env.get('ADMIN_PASSCODE');

  if (!correctPasscode) {
    return Response.json({ error: 'Passcode not configured' }, { status: 500 });
  }

  if (passcode === correctPasscode) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false }, { status: 401 });
  }
});