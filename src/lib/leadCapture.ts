/**
 * Lead capture submission helper.
 * Submits lead data to `/api/lead-capture` and returns the JSON response.
 */
export type LeadCapturePayload = {
  name: string;
  phone: string;
  email: string;
  timeline: string;
  propertyType: 'COMMERCIAL' | 'RESIDENTIAL';
  city: string;
  state: string;
};

export type LeadCaptureResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

/**
 * Submit lead capture payload to backend.
 * Throws an error if the response is not ok.
 */
export async function submitLeadCapture(payload: LeadCapturePayload): Promise<LeadCaptureResponse> {
  // Basic validation to avoid empty submissions
  const required: (keyof LeadCapturePayload)[] = ['name', 'phone', 'email', 'propertyType', 'city', 'state'];
  for (const k of required) {
    if (!payload[k]) {
      throw new Error(`Missing field: ${k}`);
    }
  }

  const res = await fetch('/api/lead-capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as LeadCaptureResponse;
  if (!res.ok) {
    throw new Error(data?.error || data?.message || 'Lead submission failed');
  }
  return data;
}