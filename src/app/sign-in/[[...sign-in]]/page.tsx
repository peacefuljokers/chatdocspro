import { SignIn } from "@clerk/nextjs";
import { headers } from 'next/headers'
import Script from 'next/script';

export default function Page() {

  const nonce = headers().get('x-nonce');
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Script
        nonce={nonce ?? '123'}
      />
        
      <SignIn />
    </div>
  );
}
