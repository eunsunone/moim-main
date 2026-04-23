import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">모임에 오신 걸 환영합니다</h1>
      <p className="text-muted-foreground text-lg max-w-md">
        이벤트를 만들고 공유하세요. 참석자들과 실시간으로 소통하세요.
      </p>
      {user ? (
        <Button render={<Link href="/new" />} nativeButton={false} size="lg">
          이벤트 만들기
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button render={<Link href="/signup" />} nativeButton={false} size="lg">
            시작하기
          </Button>
          <Button render={<Link href="/login" />} nativeButton={false} variant="outline" size="lg">
            로그인
          </Button>
        </div>
      )}
    </div>
  );
}
