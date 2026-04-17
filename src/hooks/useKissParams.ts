export interface KissUrlParams {
  abonnementId: string | null;
  amount: number | null;
}

export function parseKissParams(): KissUrlParams {
  const params = new URLSearchParams(window.location.search);

  const aboId = params.get('abonnement_id');
  const parsedAbo = aboId === 'null' ? null : aboId;

  const amt = params.get('amount');
  let parsedAmount: number | null = null;
  if (amt && amt !== 'null') {
    const num = Number(amt);
    if (!isNaN(num) && num > 0) {
      parsedAmount = num;
    }
  }

  return {
    abonnementId: parsedAbo,
    amount: parsedAmount,
  };
}
