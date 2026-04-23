"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const INITIAL: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, INITIAL);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" placeholder="비밀번호" required />
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <Button type="submit" disabled={pending}>
            {pending ? "로그인 중..." : "로그인"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="underline text-foreground">
              회원가입
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
