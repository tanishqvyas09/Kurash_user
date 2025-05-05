// app/sign-in/[[...sign-in]]/page.jsx
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn 
        forceRedirectUrl='/homepage' 
        signUpUrl="/sign-up"
      />
    </div>
  )
} 