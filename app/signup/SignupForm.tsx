"use client";

import { useActionState } from "react";
import { signup, type SignupState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const INITIAL: SignupState = { error: null };

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, INITIAL);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" placeholder="6자 이상" required />
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <Button type="submit" disabled={pending}>
            {pending ? "가입 중..." : "가입하기"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="underline text-foreground">
              로그인
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
