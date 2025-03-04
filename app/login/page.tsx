// app/login/page.tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginSignupPage() {
  return (
    <div className="container max-w-md py-12">
      <Card className="p-6">
        <CardHeader className="text-2xl font-bold">Welcome to OSP</CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded-md bg-background"
              placeholder="email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label>Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-md bg-background"
              placeholder="••••••••"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Sign In</Button>
          <div className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}