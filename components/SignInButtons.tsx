"use client";

import { signIn } from "next-auth/react";
import {Button} from '@/components/ui/button'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'



export default function SignInButtons() {

  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     const response = await getProviders();
  //     setProviders(response);
  //   };

  //   fetchProviders();
  // }, []);

  // if (!providers) return <div>Loading...</div>;

  return (
    <Card className="flex flex-col justify-center items-center gap-3 px-6 py-6">
          <CardHeader>
            <CardTitle className="justify-center items-center flex flex-col"><h2>Sign In </h2></CardTitle>
            <CardDescription>We respect your privacy and won&apos;t share your data with anyone.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant='outline' onClick={() => signIn('google')} className="">
              <div className="flex justify-center items-center gap-3">
                <GoogleIcon sx={{ color: "#EA4335" }} className="m-0 p-0"/>
                <p className="mb-6">Sign in with Google</p>
              </div>
            </Button>
            <Button disabled={true} variant='outline' onClick={() => signIn('facebook')} className="">
              <div className="flex justify-center items-center gap-3">
                <FacebookIcon sx={{ color: "#4285F4" }} className="m-0 p-0"/>
                <p className="mb-6">Sign in with Facebook</p>
              </div>
            </Button>
          </CardContent>
     
    </Card>
  );
}
