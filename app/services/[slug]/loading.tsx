import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="pt-32">
      <Container className="pb-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 rounded-full bg-slate-200" />
          <div className="h-16 max-w-3xl rounded-[2rem] bg-slate-200" />
          <div className="h-8 max-w-2xl rounded-[2rem] bg-slate-200" />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="h-40 rounded-[2rem] bg-slate-200 lg:col-span-2" />
            <div className="h-40 rounded-[2rem] bg-slate-200" />
          </div>
        </div>
      </Container>
    </div>
  );
}
